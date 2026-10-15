"""Centralized dependency injection providers for FastAPI routes and services."""

from typing import Optional
from fastapi import Depends
from fastapi.params import Depends as DependsClass
from ..graph.connection import get_falkordb_driver
from ..graph.repository import FalkorDBRepository
from ..services.session_service import SessionService
from ..services.task_service import TaskService
from ..services.memory_service import MemoryService
from ..services.handoff_service import HandoffService
from ..agents.orchestrator import AgentOrchestrator

# Shared singleton instances across all API routers
_repository: Optional[FalkorDBRepository] = None
_session_service: Optional[SessionService] = None
_task_service: Optional[TaskService] = None
_memory_service: Optional[MemoryService] = None
_handoff_service: Optional[HandoffService] = None
_orchestrator: Optional[AgentOrchestrator] = None


def _resolve(val, getter):
    """Resolve dependency if called outside FastAPI request lifecycle."""
    if val is None or isinstance(val, DependsClass):
        return getter()
    return val


def get_repository() -> FalkorDBRepository:
    """Return shared FalkorDB repository singleton."""
    global _repository
    if _repository is None:
        driver = get_falkordb_driver()
        _repository = FalkorDBRepository(driver)
    return _repository


def get_session_service(
    repo: FalkorDBRepository = Depends(get_repository)
) -> SessionService:
    """Return shared SessionService singleton."""
    global _session_service
    real_repo = _resolve(repo, get_repository)
    if _session_service is None:
        _session_service = SessionService(real_repo)
    return _session_service


def get_task_service(
    repo: FalkorDBRepository = Depends(get_repository)
) -> TaskService:
    """Return shared TaskService singleton."""
    global _task_service
    real_repo = _resolve(repo, get_repository)
    if _task_service is None:
        _task_service = TaskService(real_repo)
    return _task_service


def get_memory_service(
    repo: FalkorDBRepository = Depends(get_repository)
) -> MemoryService:
    """Return shared MemoryService singleton."""
    global _memory_service
    real_repo = _resolve(repo, get_repository)
    if _memory_service is None:
        _memory_service = MemoryService(real_repo)
    return _memory_service


def get_handoff_service(
    repo: FalkorDBRepository = Depends(get_repository)
) -> HandoffService:
    """Return shared HandoffService singleton."""
    global _handoff_service
    real_repo = _resolve(repo, get_repository)
    if _handoff_service is None:
        _handoff_service = HandoffService(real_repo)
    return _handoff_service


def get_orchestrator(
    memory_service: MemoryService = Depends(get_memory_service),
    session_service: SessionService = Depends(get_session_service),
    handoff_service: HandoffService = Depends(get_handoff_service),
) -> AgentOrchestrator:
    """Return shared AgentOrchestrator singleton."""
    global _orchestrator
    real_mem = _resolve(memory_service, get_memory_service)
    real_sess = _resolve(session_service, get_session_service)
    real_handoff = _resolve(handoff_service, get_handoff_service)
    if _orchestrator is None:
        _orchestrator = AgentOrchestrator(
            memory_service=real_mem,
            session_service=real_sess,
            handoff_service=real_handoff,
        )
    return _orchestrator


def reset_services_for_workspace(workspace_id: str):
    """Reset workspace data across all shared services and repository."""
    repo = get_repository()
    repo.reset_workspace(workspace_id)
    
    sess_svc = get_session_service(repo)
    sess_svc.reset_workspace(workspace_id)
    
    task_svc = get_task_service(repo)
    task_svc.reset_workspace(workspace_id)
    
    orch = get_orchestrator()
    orch.reset_workspace(workspace_id)


def clear_singletons():
    """Clear cached singletons (useful for test isolation)."""
    global _repository, _session_service, _task_service, _memory_service, _handoff_service, _orchestrator
    _repository = None
    _session_service = None
    _task_service = None
    _memory_service = None
    _handoff_service = None
    _orchestrator = None
