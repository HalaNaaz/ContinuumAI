"""Memory management and search routes."""

from typing import List, Optional
from fastapi import APIRouter, Depends, Query
from ...core.config import settings
from ...models.memory import MemoryCreate, MemoryResponse, MemoryType
from ...services.memory_service import MemoryService
from ...graph.repository import FalkorDBRepository
from ..deps import get_memory_service, get_repository

router = APIRouter(prefix="/memories", tags=["Memories"])


@router.get("", response_model=List[MemoryResponse])
async def list_memories(
    workspace_id: str = Query(default=settings.DEFAULT_WORKSPACE_ID),
    task_id: Optional[str] = None,
    memory_type: Optional[MemoryType] = None,
    search: Optional[str] = None,
    mem_service: MemoryService = Depends(get_memory_service),
    repo: FalkorDBRepository = Depends(get_repository)
):
    """Search and filter memories stored in FalkorDB."""
    if task_id:
        memories = mem_service.retrieve_memories_for_task(workspace_id, task_id)
    else:
        # Fetch all in workspace
        graph = repo.get_workspace_graph(workspace_id)
        memories = []
        for node in graph.nodes:
            if "memory" in node.type.lower() and "details" in node.data:
                d = node.data["details"]
                memories.append(MemoryResponse(
                    id=d["id"],
                    workspace_id=d["workspace_id"],
                    memory_type=MemoryType(d["memory_type"]),
                    content=d["content"],
                    summary=d.get("summary"),
                    source_agent_id=d["source_agent_id"],
                    source_session_id=d["source_session_id"],
                    task_id=d.get("task_id"),
                    status=d.get("status", "active"),
                    created_at=d["created_at"]
                ))

    # Apply filters
    if memory_type:
        memories = [m for m in memories if m.memory_type == memory_type]
    if search:
        s_lower = search.lower()
        memories = [m for m in memories if s_lower in m.content.lower() or (m.summary and s_lower in m.summary.lower())]

    return memories


@router.post("", response_model=MemoryResponse, status_code=201)
async def create_memory(
    memory_in: MemoryCreate,
    mem_service: MemoryService = Depends(get_memory_service)
):
    """Directly record and link a validated memory."""
    return mem_service.create_memory(memory_in)
