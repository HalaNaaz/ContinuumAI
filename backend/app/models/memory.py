"""Memory data models and enums."""

from enum import Enum
from typing import Any, Dict, List, Optional
from pydantic import BaseModel, Field


class MemoryType(str, Enum):
    EPISODIC = "episodic"
    SEMANTIC = "semantic"
    PROCEDURAL = "procedural"


class MemoryCreate(BaseModel):
    workspace_id: str
    memory_type: MemoryType
    content: str
    summary: Optional[str] = None
    source_agent_id: str
    source_session_id: str
    task_id: Optional[str] = None
    metadata: Optional[Dict[str, Any]] = Field(default_factory=dict)


class MemoryResponse(BaseModel):
    id: str
    workspace_id: str
    memory_type: MemoryType
    content: str
    summary: Optional[str] = None
    source_agent_id: str
    source_session_id: str
    task_id: Optional[str] = None
    status: str = "active"
    created_at: str
    updated_at: Optional[str] = None
    metadata: Optional[Dict[str, Any]] = Field(default_factory=dict)
