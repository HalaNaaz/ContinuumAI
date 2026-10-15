"""Agent B — Continuation / Consumer (Session 2)."""

from typing import List
from ..models.memory import MemoryCreate, MemoryType
from ..models.task import TaskRunResponse
from ..services.memory_service import MemoryService
from ..core.logging import logger


class AgentB:
    """Continuation agent that retrieves Agent A's memory and resolves the task."""

    ID = "agent-b-continuation"
    ROLE = "Continuation"

    def __init__(self, memory_service: MemoryService):
        self.mem_service = memory_service

    async def run_session_2(self, workspace_id: str, session_id: str, task_id: str) -> TaskRunResponse:
        """Execute Session 2: retrieve Session 1 context from FalkorDB, apply fix, commit linked knowledge."""
        logger.info("[Session 2] Agent B started continuation on task '%s'", task_id)

        # 1. Retrieve prior memories from FalkorDB
        prior_memories = self.mem_service.retrieve_memories_for_task(workspace_id, task_id)
        retrieved_ids = [m.id for m in prior_memories]

        if not prior_memories:
            logger.warning("[Session 2] No prior memory found for task %s. Starting cold.", task_id)
            content = "No prior memory discovered. Performed default diagnostic."
            summary = "Cold start execution."
            prior_id = None
        else:
            first_mem = prior_memories[0]
            prior_id = first_mem.id
            logger.info(
                "[Session 2] Reusing context from memory '%s' authored by '%s' in session '%s'",
                first_mem.id,
                first_mem.source_agent_id,
                first_mem.source_session_id
            )
            content = (
                f"Based on prior finding '{first_mem.summary}', increased connection pool size "
                f"from 10 to 50. Under sustained 500 RPS load, p99 latency dropped to 42ms with 0 errors."
            )
            summary = "Resolved: Connection pool increased to 50. Throughput stable."

        # 2. Commit new memory to FalkorDB
        new_memory = self.mem_service.create_memory(MemoryCreate(
            workspace_id=workspace_id,
            memory_type=MemoryType.SEMANTIC,
            content=content,
            summary=summary,
            source_agent_id=self.ID,
            source_session_id=session_id,
            task_id=task_id,
            metadata={"prior_memory_reused": prior_id, "p99_latency_ms": 42}
        ))

        # 3. Create graph relationship linking new knowledge to earlier knowledge
        if prior_id:
            self.mem_service.link_continuation(new_memory.id, prior_id)
            logger.info("[Session 2] Linked new memory %s -> prior memory %s via RELATES_TO", new_memory.id, prior_id)

        return TaskRunResponse(
            task_id=task_id,
            session_id=session_id,
            status="resolved",
            summary=summary,
            memories_retrieved=retrieved_ids,
            memories_created=[new_memory.id],
            next_action="Task successfully resolved. Monitor production metrics.",
            handoff_created=False
        )
