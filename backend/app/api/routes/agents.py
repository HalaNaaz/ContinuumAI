"""Agent inspection and activity timeline routes."""

from typing import List, Optional
from fastapi import APIRouter, Depends, Query
from ...models.agent import AgentResponse, AgentRole, AgentStatus, AgentEvent
from ...agents.orchestrator import AgentOrchestrator
from ..deps import get_orchestrator

router = APIRouter(prefix="/agents", tags=["Agents"])


@router.get("", response_model=List[AgentResponse])
async def list_agents(workspace_id: str = Query(default="demo-workspace-01")):
    """List available agents and their current statuses."""
    return [
        AgentResponse(
            id="agent-a-investigator",
            workspace_id=workspace_id,
            role=AgentRole.INVESTIGATOR,
            status=AgentStatus.IDLE,
            last_active="2026-10-10T14:05:00Z"
        ),
        AgentResponse(
            id="agent-b-continuation",
            workspace_id=workspace_id,
            role=AgentRole.CONTINUATION,
            status=AgentStatus.IDLE,
            last_active="2026-10-10T14:10:00Z"
        )
    ]


@router.get("/events", response_model=List[AgentEvent])
async def get_agent_events(
    workspace_id: Optional[str] = None,
    orch: AgentOrchestrator = Depends(get_orchestrator)
):
    """Retrieve observable chronological timeline events."""
    return orch.get_events(workspace_id)
