"""Agent models and execution events."""

from enum import Enum
from typing import Any, Dict, List, Optional
from pydantic import BaseModel, Field


class AgentRole(str, Enum):
    INVESTIGATOR = "Investigator"
    CONTINUATION = "Continuation"
    COORDINATOR = "Coordinator"


class AgentStatus(str, Enum):
    IDLE = "idle"
    RUNNING = "running"
    COMPLETED = "completed"
    ERROR = "error"


class AgentResponse(BaseModel):
    id: str
    workspace_id: str
    role: AgentRole
    status: AgentStatus = AgentStatus.IDLE
    last_active: Optional[str] = None


class AgentEvent(BaseModel):
    id: str
    timestamp: str
    agent_id: str
    session_id: str
    event_type: str  # task_received, memory_retrieved, memory_written, handoff_created
    description: str
    metadata: Optional[Dict[str, Any]] = Field(default_factory=dict)
