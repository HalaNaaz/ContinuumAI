"""Test multi-tenant workspace isolation."""

from app.models.memory import MemoryCreate, MemoryType


def test_workspace_isolation(memory_service):
    # Create memory in Workspace A
    mem_a = memory_service.create_memory(MemoryCreate(
        workspace_id="workspace-alpha",
        memory_type=MemoryType.EPISODIC,
        content="Secret Alpha Architecture Notes",
        source_agent_id="agent-a",
        source_session_id="sess-alpha",
        task_id="task-shared-id"
    ))

    # Query from Workspace B using the same task_id
    memories_b = memory_service.retrieve_memories_for_task(
        workspace_id="workspace-beta",
        task_id="task-shared-id"
    )

    # Workspace B must NOT see Workspace A's memory
    assert len(memories_b) == 0
    assert mem_a.id not in [m.id for m in memories_b]
