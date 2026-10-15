"""Test Pydantic models and memory type validation."""

import pytest
from app.models.memory import MemoryCreate, MemoryType
from app.models.task import TaskCreate


def test_memory_create_valid():
    mem = MemoryCreate(
        workspace_id="ws-1",
        memory_type=MemoryType.EPISODIC,
        content="Test finding",
        source_agent_id="agent-a",
        source_session_id="sess-1"
    )
    assert mem.memory_type == MemoryType.EPISODIC
    assert mem.content == "Test finding"


def test_memory_invalid_type():
    with pytest.raises(ValueError):
        MemoryCreate(
            workspace_id="ws-1",
            memory_type="invalid_type",  # type: ignore
            content="Test",
            source_agent_id="agent-a",
            source_session_id="sess-1"
        )
