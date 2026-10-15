"""Agent orchestration coordinator managing sessions and timelines."""

import uuid
from datetime import datetime, timezone
from typing import Dict, List, Optional
from .agent_a import AgentA
from .agent_b import AgentB
from ..models.agent import AgentEvent
from ..models.task import TaskRunResponse
from ..services.memory_service import MemoryService
from ..services.session_service import SessionService
from ..services.handoff_service import HandoffService
from ..core.logging import logger


class AgentOrchestrator:
    """Coordinates agent execution runs, timeline events, and session switching."""

    def __init__(
        self,
        memory_service: MemoryService,
        session_service: SessionService,
        handoff_service: HandoffService
    ):
        self.mem_service = memory_service
        self.session_service = session_service
        self.handoff_service = handoff_service
        self.agent_a = AgentA(memory_service, handoff_service)
        self.agent_b = AgentB(memory_service)
        self._events: List[AgentEvent] = []

    def _record_event(
        self,
        agent_id: str,
        session_id: str,
        event_type: str,
        description: str,
        metadata: Optional[Dict] = None
    ):
        now = datetime.now(timezone.utc).isoformat()
        event = AgentEvent(
            id=f"evt-{uuid.uuid4().hex[:8]}",
            timestamp=now,
            agent_id=agent_id,
            session_id=session_id,
            event_type=event_type,
            description=description,
            metadata=metadata or {}
        )
        self._events.append(event)
        logger.info("[Event] %s | %s | %s", agent_id, event_type, description)

    async def execute_task(
        self,
        workspace_id: str,
        session_id: str,
        task_id: str,
        role: str = "investigator"
    ) -> TaskRunResponse:
        """Route task to Agent A (Session 1) or Agent B (Session 2)."""
        if role.lower() in ("investigator", "agent_a"):
            self._record_event(
                agent_id=AgentA.ID,
                session_id=session_id,
                event_type="task_received",
                description=f"Agent A assigned investigation on task {task_id}"
            )
            res = await self.agent_a.run_session_1(workspace_id, session_id, task_id)
            
            for mem_id in res.memories_created:
                self._record_event(
                    agent_id=AgentA.ID,
                    session_id=session_id,
                    event_type="memory_written",
                    description=f"Agent A saved episodic memory {mem_id} to FalkorDB",
                    metadata={"memory_id": mem_id}
                )
            
            self._record_event(
                agent_id=AgentA.ID,
                session_id=session_id,
                event_type="handoff_created",
                description="Agent A created handoff contract with next action",
                metadata={"next_action": res.next_action}
            )
            # End session 1
            all_mems = self.mem_service.retrieve_memories_for_task(workspace_id, task_id)
            created_mems = [m for m in all_mems if m.id in res.memories_created]
            self.session_service.complete_session(
                session_id,
                handoff_summary=res.summary,
                memories_created=created_mems,
                memories_retrieved=[]
            )
            return res

        elif role.lower() in ("continuation", "agent_b"):
            self._record_event(
                agent_id=AgentB.ID,
                session_id=session_id,
                event_type="task_received",
                description=f"Agent B assigned continuation on task {task_id}"
            )
            res = await self.agent_b.run_session_2(workspace_id, session_id, task_id)
            
            for ret_id in res.memories_retrieved:
                self._record_event(
                    agent_id=AgentB.ID,
                    session_id=session_id,
                    event_type="memory_retrieved",
                    description=f"Agent B retrieved prior memory {ret_id} from FalkorDB",
                    metadata={"memory_id": ret_id}
                )

            for mem_id in res.memories_created:
                self._record_event(
                    agent_id=AgentB.ID,
                    session_id=session_id,
                    event_type="memory_written",
                    description=f"Agent B saved semantic memory {mem_id} to FalkorDB",
                    metadata={"memory_id": mem_id}
                )
            
            # End session 2
            all_mems = self.mem_service.retrieve_memories_for_task(workspace_id, task_id)
            retrieved_mems = [m for m in all_mems if m.id in res.memories_retrieved]
            created_mems = [m for m in all_mems if m.id in res.memories_created]
            self.session_service.complete_session(
                session_id,
                handoff_summary=res.summary,
                memories_created=created_mems,
                memories_retrieved=retrieved_mems
            )
            return res

        raise ValueError(f"Unknown agent role: {role}")

    def get_events(self, workspace_id: Optional[str] = None) -> List[AgentEvent]:
        """Return chronological timeline events."""
        return sorted(self._events, key=lambda e: e.timestamp)

    def reset_workspace(self, workspace_id: Optional[str] = None):
        """Reset internal timeline events."""
        self._events.clear()

