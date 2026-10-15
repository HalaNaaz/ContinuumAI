"""Agent A — Investigator / Producer (Session 1)."""

from typing import Any, Dict
from ..models.memory import MemoryCreate, MemoryType
from ..models.task import TaskRunResponse
from ..services.memory_service import MemoryService
from ..services.handoff_service import HandoffService
from ..core.logging import logger


class AgentA:
    """Investigator agent responsible for initial triage and writing findings to FalkorDB."""

    ID = "agent-a-investigator"
    ROLE = "Investigator"

    def __init__(self, memory_service: MemoryService, handoff_service: HandoffService):
        self.mem_service = memory_service
        self.handoff_service = handoff_service

    async def run_session_1(self, workspace_id: str, session_id: str, task_id: str) -> TaskRunResponse:
        """Execute Session 1: investigate, record finding in FalkorDB, create handoff."""
        logger.info("[Session 1] Agent A started investigation on task '%s'", task_id)

        # 1. Query prior memories (expected: 0 found)
        prior_memories = self.mem_service.retrieve_memories_for_task(workspace_id, task_id)
        retrieved_ids = [m.id for m in prior_memories]

        # 2. Perform bounded investigation
        content = (
            "Investigation reveals service HTTP 504 timeouts are caused by connection pool "
            "exhaustion under 500 RPS load. Current pool limit is 10 connections."
        )
        summary = "Connection pool exhausted (10/10 limit reached)"
        next_action = "Increase max_connections to 50 in pool configuration and verify throughput."

        # 3. Store structured memory in FalkorDB
        memory = self.mem_service.create_memory(MemoryCreate(
            workspace_id=workspace_id,
            memory_type=MemoryType.EPISODIC,
            content=content,
            summary=summary,
            source_agent_id=self.ID,
            source_session_id=session_id,
            task_id=task_id,
            metadata={"pool_limit": 10, "rps": 500}
        ))

        # 4. Record explicit handoff contract
        from ..models.handoff import HandoffCreate
        self.handoff_service.create_handoff(HandoffCreate(
            workspace_id=workspace_id,
            task_id=task_id,
            source_agent_id=self.ID,
            target_agent_id="agent-b-continuation",
            session_id=session_id,
            summary=summary,
            next_action=next_action
        ))

        logger.info("[Session 1] Agent A finished. Memory saved: %s. Handoff created.", memory.id)

        return TaskRunResponse(
            task_id=task_id,
            session_id=session_id,
            status="completed",
            summary=summary,
            memories_retrieved=retrieved_ids,
            memories_created=[memory.id],
            next_action=next_action,
            handoff_created=True
        )
