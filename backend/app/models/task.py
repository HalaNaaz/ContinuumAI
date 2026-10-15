"""Task data models."""

from typing import List, Optional
from pydantic import BaseModel, Field


class TaskCreate(BaseModel):
    workspace_id: str
    title: str
    context: Optional[str] = None


class TaskResponse(BaseModel):
    id: str
    workspace_id: str
    title: str
    status: str = "pending"
    context: Optional[str] = None
    created_at: str
    resolved_at: Optional[str] = None


class TaskRunRequest(BaseModel):
    workspace_id: str
    session_id: str
    agent_role: str = "investigator"
    mode: str = "live"


class TaskRunResponse(BaseModel):
    task_id: str
    session_id: str
    status: str
    summary: str
    memories_retrieved: List[str] = Field(default_factory=list)
    memories_created: List[str] = Field(default_factory=list)
    next_action: Optional[str] = None
    handoff_created: bool = False
