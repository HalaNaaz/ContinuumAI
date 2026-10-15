"""Session data models."""

from typing import List, Optional
from pydantic import BaseModel, Field
from .memory import MemoryResponse


class SessionCreate(BaseModel):
    workspace_id: str
    agent_id: str
    task_id: Optional[str] = None


class SessionResponse(BaseModel):
    id: str
    workspace_id: str
    status: str = "active"
    agent_ids: List[str] = Field(default_factory=list)
    task_id: Optional[str] = None
    started_at: str
    ended_at: Optional[str] = None


class SessionDetail(SessionResponse):
    memories_created: List[MemoryResponse] = Field(default_factory=list)
    memories_retrieved: List[MemoryResponse] = Field(default_factory=list)
    handoff_summary: Optional[str] = None
