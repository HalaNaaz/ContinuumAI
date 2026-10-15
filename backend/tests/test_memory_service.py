"""Test memory service creation and retrieval."""

from app.models.memory import MemoryCreate, MemoryType


def test_memory_creation_and_retrieval(memory_service):
    # 1. Create episodic memory
    mem = memory_service.create_memory(MemoryCreate(
        workspace_id="ws-test",
        memory_type=MemoryType.EPISODIC,
        content="Service latency spiked due to CPU throttle.",
        summary="CPU throttle latency spike",
        source_agent_id="agent-a",
        source_session_id="sess-001",
        task_id="task-100"
    ))
    assert mem.id.startswith("mem-")
    assert mem.workspace_id == "ws-test"

    # 2. Retrieve memories for task
    retrieved = memory_service.retrieve_memories_for_task(workspace_id="ws-test", task_id="task-100")
    assert len(retrieved) == 1
    assert retrieved[0].id == mem.id
    assert retrieved[0].content == "Service latency spiked due to CPU throttle."
