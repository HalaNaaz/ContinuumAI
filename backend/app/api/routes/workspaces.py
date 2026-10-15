"""Workspace configuration and reset endpoints."""

from fastapi import APIRouter, Depends, Query
from ...core.config import settings
from ...models.common import WorkspaceResponse, WorkspaceStats
from ...graph.repository import FalkorDBRepository
from ...services.session_service import SessionService
from ...services.task_service import TaskService
from ..deps import (
    get_repository,
    get_session_service,
    get_task_service,
    reset_services_for_workspace,
)

router = APIRouter(prefix="/workspaces", tags=["Workspaces"])


@router.get("/current", response_model=WorkspaceResponse)
async def get_current_workspace(
    workspace_id: str = Query(default=settings.DEFAULT_WORKSPACE_ID),
    repo: FalkorDBRepository = Depends(get_repository),
    sess_service: SessionService = Depends(get_session_service),
    t_service: TaskService = Depends(get_task_service)
):
    """Return active demo workspace status."""
    repo.create_or_get_workspace(workspace_id, "ContinuumAI Demo Workspace")
    graph_data = repo.get_workspace_graph(workspace_id)

    mem_count = sum(1 for n in graph_data.nodes if "memory" in n.type.lower())
    sess_count = max(
        sum(1 for n in graph_data.nodes if "session" in n.type.lower()),
        len(sess_service.list_sessions(workspace_id))
    )
    agent_count = sum(1 for n in graph_data.nodes if "agent" in n.type.lower())
    task_count = max(
        sum(1 for n in graph_data.nodes if "task" in n.type.lower()),
        len(t_service.list_tasks(workspace_id))
    )

    return WorkspaceResponse(
        id=workspace_id,
        name="ContinuumAI Demo Workspace",
        created_at="2026-10-10T14:00:00Z",
        stats=WorkspaceStats(
            agents_count=max(agent_count, 2),
            sessions_count=sess_count,
            memories_count=mem_count,
            tasks_count=max(task_count, 1)
        )
    )


@router.post("/reset")
async def reset_workspace(workspace_id: str = Query(default=settings.DEFAULT_WORKSPACE_ID)):
    """Reset workspace data across all shared services and repository for reproducible demo runs."""
    reset_services_for_workspace(workspace_id)
    return {"status": "success", "message": f"Workspace {workspace_id} reset to clean state."}
