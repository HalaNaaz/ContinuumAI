"""Handoff data models."""

from typing import Optional
from pydantic import BaseModel


class HandoffCreate(BaseModel):
    workspace_id: str
    task_id: str
    source_agent_id: str
    target_agent_id: Optional[str] = None
    session_id: str
    summary: str
    next_action: str


class HandoffResponse(BaseModel):
    id: str
    workspace_id: str
    task_id: str
    source_agent_id: str
    target_agent_id: Optional[str] = None
    session_id: str
    summary: str
    next_action: str
    created_at: str
