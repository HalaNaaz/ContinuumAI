"""Handoff inspection and creation routes."""

from typing import List
from fastapi import APIRouter, Depends, Query
from ...core.config import settings
from ...models.handoff import HandoffCreate, HandoffResponse
from ...services.handoff_service import HandoffService
from ..deps import get_handoff_service

router = APIRouter(prefix="/handoffs", tags=["Handoffs"])


@router.get("", response_model=List[HandoffResponse])
async def list_handoffs(
    workspace_id: str = Query(default=settings.DEFAULT_WORKSPACE_ID),
    service: HandoffService = Depends(get_handoff_service)
):
    """List handoff records for active workspace."""
    return service.list_handoffs(workspace_id)


@router.post("", response_model=HandoffResponse, status_code=201)
async def create_handoff(
    handoff_in: HandoffCreate,
    service: HandoffService = Depends(get_handoff_service)
):
    """Manually record a handoff."""
    return service.create_handoff(handoff_in)
