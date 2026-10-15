"""Service managing memory creation, search, categorization, and retrieval."""

import uuid
from typing import List, Optional
from ..graph.repository import FalkorDBRepository
from ..models.memory import MemoryCreate, MemoryResponse, MemoryType
from ..core.logging import logger


class MemoryService:
    """Handles memory lifecycle and retrieval across agent sessions."""

    def __init__(self, repo: FalkorDBRepository):
        self.repo = repo

    def create_memory(self, memory_in: MemoryCreate) -> MemoryResponse:
        """Store a new structured memory in FalkorDB with full provenance."""
        memory_id = f"mem-{uuid.uuid4().hex[:8]}"
        logger.info(
            "Creating %s memory '%s' for workspace '%s'",
            memory_in.memory_type.value,
            memory_id,
            memory_in.workspace_id
        )
        return self.repo.create_memory(
            memory_id=memory_id,
            workspace_id=memory_in.workspace_id,
            memory_type=memory_in.memory_type,
            content=memory_in.content,
            source_agent_id=memory_in.source_agent_id,
            source_session_id=memory_in.source_session_id,
            task_id=memory_in.task_id or "task-general",
            summary=memory_in.summary
        )

    def retrieve_memories_for_task(self, workspace_id: str, task_id: str) -> List[MemoryResponse]:
        """Query FalkorDB for active memories linked to a specific task."""
        logger.info("Retrieving memories for task '%s' in workspace '%s'", task_id, workspace_id)
        return self.repo.retrieve_memories_for_task(workspace_id=workspace_id, task_id=task_id)

    def link_continuation(self, new_memory_id: str, prior_memory_id: str) -> bool:
        """Link a new continuation finding to an earlier finding via RELATES_TO."""
        logger.info("Linking memory %s -> %s (continuation)", new_memory_id, prior_memory_id)
        return self.repo.link_memory_continuation(new_memory_id, prior_memory_id)
