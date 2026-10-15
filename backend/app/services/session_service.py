"""Session lifecycle service."""

import uuid
from datetime import datetime, timezone
from typing import Dict, List, Optional
from ..graph.repository import FalkorDBRepository
from ..models.session import SessionCreate, SessionResponse, SessionDetail
from ..core.logging import logger


class SessionService:
    """Manages sessions, active tracking, and cross-session inspection."""

    def __init__(self, repo: FalkorDBRepository):
        self.repo = repo
        self._sessions: Dict[str, Dict] = {}

    def create_session(self, session_in: SessionCreate) -> SessionResponse:
        """Create a new session record."""
        session_id = f"sess-{uuid.uuid4().hex[:8]}"
        now = datetime.now(timezone.utc).isoformat()
        
        session_data = {
            "id": session_id,
            "workspace_id": session_in.workspace_id,
            "status": "active",
            "agent_ids": [session_in.agent_id],
            "task_id": session_in.task_id,
            "started_at": now,
            "ended_at": None,
            "memories_created": [],
            "memories_retrieved": [],
            "handoff_summary": None
        }
        self._sessions[session_id] = session_data
        logger.info("Session '%s' created for agent '%s'", session_id, session_in.agent_id)
        
        return SessionResponse(
            id=session_id,
            workspace_id=session_in.workspace_id,
            status="active",
            agent_ids=[session_in.agent_id],
            task_id=session_in.task_id,
            started_at=now
        )

    def complete_session(
        self,
        session_id: str,
        handoff_summary: Optional[str] = None,
        memories_created: Optional[List[Any]] = None,
        memories_retrieved: Optional[List[Any]] = None
    ) -> Optional[SessionResponse]:
        """Mark a session as completed and record its end timestamp and memory associations."""
        if session_id in self._sessions:
            now = datetime.now(timezone.utc).isoformat()
            self._sessions[session_id]["status"] = "completed"
            self._sessions[session_id]["ended_at"] = now
            if handoff_summary:
                self._sessions[session_id]["handoff_summary"] = handoff_summary
            if memories_created is not None:
                self._sessions[session_id]["memories_created"] = memories_created
            if memories_retrieved is not None:
                self._sessions[session_id]["memories_retrieved"] = memories_retrieved
            data = self._sessions[session_id]
            logger.info("Session '%s' completed at %s", session_id, now)
            return SessionResponse(**{k: v for k, v in data.items() if k in SessionResponse.model_fields})
        return None

    def list_sessions(self, workspace_id: str) -> List[SessionResponse]:
        """List sessions in the workspace."""
        results = [
            SessionResponse(**{k: v for k, v in s.items() if k in SessionResponse.model_fields})
            for s in self._sessions.values()
            if s.get("workspace_id") == workspace_id
        ]
        results.sort(key=lambda s: s.started_at, reverse=True)
        return results

    def get_session_detail(
        self,
        session_id: str,
        workspace_id: Optional[str] = None
    ) -> Optional[SessionDetail]:
        """Get detailed session inspection view, enforcing workspace isolation if provided."""
        if session_id in self._sessions:
            s = self._sessions[session_id]
            if workspace_id and s.get("workspace_id") != workspace_id:
                return None
            return SessionDetail(**s)
        return None

    def reset_workspace(self, workspace_id: str):
        """Remove sessions belonging to a specific workspace."""
        to_delete = [
            sid for sid, data in self._sessions.items()
            if data.get("workspace_id") == workspace_id
        ]
        for sid in to_delete:
            del self._sessions[sid]

