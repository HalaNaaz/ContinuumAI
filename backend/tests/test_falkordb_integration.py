"""Integration tests verifying live FalkorDB Cypher execution.

NOTE: This test suite requires a running FalkorDB instance (e.g., local Docker on port 6379 or FalkorDB Cloud).
Run with: pytest -m integration
"""

import pytest
from app.graph.connection import get_falkordb_driver
from app.graph.repository import FalkorDBRepository
from app.models.memory import MemoryType


@pytest.mark.integration
def test_live_falkordb_read_write():
    conn = get_falkordb_driver()
    if not conn.connect():
        pytest.skip("Live FalkorDB instance not reachable; skipping integration test.")

    repo = FalkorDBRepository(conn)
    repo.initialize_schema()

    ws_id = "test-live-ws"
    repo.create_or_get_workspace(ws_id, "Live Test WS")

    # Create memory via Cypher
    mem = repo.create_memory(
        memory_id="live-mem-01",
        workspace_id=ws_id,
        memory_type=MemoryType.EPISODIC,
        content="Live Cypher test memory",
        source_agent_id="test-agent",
        source_session_id="test-sess",
        task_id="test-task",
        summary="Live test"
    )

    # Read back via Cypher
    retrieved = repo.retrieve_memories_for_task(ws_id, "test-task")
    assert any(m.id == "live-mem-01" for m in retrieved)

    # Clean up
    repo.reset_workspace(ws_id)
