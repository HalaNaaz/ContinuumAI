"""Common and shared schemas."""

from typing import Any, Dict, Optional
from pydantic import BaseModel, Field


class ErrorDetail(BaseModel):
    code: str
    message: str
    details: Optional[Dict[str, Any]] = None


class ErrorResponse(BaseModel):
    error: ErrorDetail


class WorkspaceStats(BaseModel):
    agents_count: int = 0
    sessions_count: int = 0
    memories_count: int = 0
    tasks_count: int = 0


class WorkspaceResponse(BaseModel):
    id: str
    name: str
    created_at: str
    stats: WorkspaceStats
