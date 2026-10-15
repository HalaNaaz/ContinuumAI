"""Graph visualization serialization endpoint for React Flow."""

from fastapi import APIRouter, Depends, Query
from ...core.config import settings
from ...models.graph import GraphDataResponse
from ...graph.repository import FalkorDBRepository
from ..deps import get_repository

router = APIRouter(prefix="/graph", tags=["Graph"])


@router.get("", response_model=GraphDataResponse)
async def get_graph(
    workspace_id: str = Query(default=settings.DEFAULT_WORKSPACE_ID),
    repo: FalkorDBRepository = Depends(get_repository)
):
    """Return workspace-scoped nodes and edges for React Flow visualization."""
    return repo.get_workspace_graph(workspace_id)
