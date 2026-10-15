"""Service managing agent handoff contracts and coordination."""

import uuid
from typing import Dict, List
from ..graph.repository import FalkorDBRepository
from ..models.handoff import HandoffCreate, HandoffResponse
from ..core.logging import logger


class HandoffService:
    """Manages explicit handoff contracts between agents."""

    def __init__(self, repo: FalkorDBRepository):
        self.repo = repo
        self._handoffs: Dict[str, HandoffResponse] = {}

    def create_handoff(self, handoff_in: HandoffCreate) -> HandoffResponse:
        """Create and store an explicit handoff entity."""
        handoff_id = f"handoff-{uuid.uuid4().hex[:8]}"
        logger.info(
            "Creating handoff %s from agent '%s' for task '%s'",
            handoff_id,
            handoff_in.source_agent_id,
            handoff_in.task_id
        )

        res = self.repo.create_handoff(
            handoff_id=handoff_id,
            workspace_id=handoff_in.workspace_id,
            task_id=handoff_in.task_id,
            source_agent_id=handoff_in.source_agent_id,
            session_id=handoff_in.session_id,
            summary=handoff_in.summary,
            next_action=handoff_in.next_action
        )

        response = HandoffResponse(
            id=handoff_id,
            workspace_id=handoff_in.workspace_id,
            task_id=handoff_in.task_id,
            source_agent_id=handoff_in.source_agent_id,
            target_agent_id=handoff_in.target_agent_id,
            session_id=handoff_in.session_id,
            summary=handoff_in.summary,
            next_action=handoff_in.next_action,
            created_at=res["created_at"]
        )
        self._handoffs[handoff_id] = response
        return response

    def list_handoffs(self, workspace_id: str) -> List[HandoffResponse]:
        """List handoffs for a given workspace."""
        return [h for h in self._handoffs.values() if h.workspace_id == workspace_id]
