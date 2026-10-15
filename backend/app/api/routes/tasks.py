"""Task creation and agent execution routes."""

from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from ...models.task import TaskCreate, TaskResponse, TaskRunRequest, TaskRunResponse
from ...services.task_service import TaskService
from ...agents.orchestrator import AgentOrchestrator
from ..deps import (
    get_task_service,
    get_orchestrator,
    get_session_service,
    get_memory_service,
    get_handoff_service,
    get_repository,
)

router = APIRouter(prefix="/tasks", tags=["Tasks"])

# Module-level exports for backwards compatibility with any direct imports
repo = get_repository()
memory_service = get_memory_service()
session_service = get_session_service()
handoff_service = get_handoff_service()
task_service = get_task_service()
orchestrator = get_orchestrator()


@router.post("", response_model=TaskResponse, status_code=201)
async def create_task(
    task_in: TaskCreate,
    service: TaskService = Depends(get_task_service)
):
    """Create a new task within a workspace."""
    return service.create_task(task_in)


@router.get("/{task_id}", response_model=TaskResponse)
async def get_task(
    task_id: str,
    workspace_id: Optional[str] = Query(default=None),
    service: TaskService = Depends(get_task_service)
):
    """Get task by ID, optionally validating workspace isolation."""
    task = service.get_task(task_id, workspace_id=workspace_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task


@router.post("/{task_id}/run", response_model=TaskRunResponse)
async def run_task(
    task_id: str,
    run_in: TaskRunRequest,
    t_service: TaskService = Depends(get_task_service),
    orch: AgentOrchestrator = Depends(get_orchestrator)
):
    """Run agent workflow (Session 1 Investigator or Session 2 Continuation)."""
    # Verify task existence or dynamically register within tenant workspace
    existing_task = t_service.get_task(task_id, workspace_id=run_in.workspace_id)
    if not existing_task:
        t_service.create_task(
            TaskCreate(
                workspace_id=run_in.workspace_id,
                title="Incident Investigation",
                context="Dynamically initiated investigation run."
            )
        )

    try:
        res = await orch.execute_task(
            workspace_id=run_in.workspace_id,
            session_id=run_in.session_id,
            task_id=task_id,
            role=run_in.agent_role
        )
        new_status = "resolved" if res.status == "resolved" else "in_progress"
        t_service.update_task_status(task_id, new_status, workspace_id=run_in.workspace_id)
        return res
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))
