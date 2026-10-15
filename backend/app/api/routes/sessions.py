"""Session inspection endpoints."""

from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from ...core.config import settings
from ...models.session import SessionCreate, SessionResponse, SessionDetail
from ...services.session_service import SessionService
from ..deps import get_session_service

router = APIRouter(prefix="/sessions", tags=["Sessions"])


@router.get("", response_model=List[SessionResponse])
async def list_sessions(
    workspace_id: str = Query(default=settings.DEFAULT_WORKSPACE_ID),
    session_service: SessionService = Depends(get_session_service)
):
    """List sessions in current workspace."""
    return session_service.list_sessions(workspace_id)


@router.post("", response_model=SessionResponse, status_code=201)
async def create_session(
    session_in: SessionCreate,
    session_service: SessionService = Depends(get_session_service)
):
    """Create a new session."""
    return session_service.create_session(session_in)


@router.get("/{session_id}", response_model=SessionDetail)
async def get_session_detail(
    session_id: str,
    workspace_id: Optional[str] = Query(default=None),
    session_service: SessionService = Depends(get_session_service)
):
    """Inspect session details, memories created, and context reused."""
    detail = session_service.get_session_detail(session_id, workspace_id=workspace_id)
    if not detail:
        raise HTTPException(status_code=404, detail=f"Session {session_id} not found")
    return detail
