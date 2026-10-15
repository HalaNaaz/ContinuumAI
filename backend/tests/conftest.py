"""Test fixtures and setup."""

import pytest
from app.graph.repository import FalkorDBRepository
from app.services.memory_service import MemoryService
from app.services.session_service import SessionService
from app.services.handoff_service import HandoffService
from app.agents.orchestrator import AgentOrchestrator


@pytest.fixture
def repo():
    """Provides an isolated repository instance."""
    return FalkorDBRepository()


@pytest.fixture
def memory_service(repo):
    """Provides a memory service instance."""
    return MemoryService(repo)


@pytest.fixture
def session_service(repo):
    """Provides a session service instance."""
    return SessionService(repo)


@pytest.fixture
def handoff_service(repo):
    """Provides a handoff service instance."""
    return HandoffService(repo)


@pytest.fixture
def orchestrator(memory_service, session_service, handoff_service):
    """Provides an agent orchestrator instance."""
    return AgentOrchestrator(memory_service, session_service, handoff_service)
