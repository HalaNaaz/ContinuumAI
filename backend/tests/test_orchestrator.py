"""Test the signature Session 1 -> Session 2 agent workflow."""

import pytest


@pytest.mark.asyncio
async def test_session_1_to_session_2_workflow(orchestrator, session_service):
    workspace_id = "ws-demo"
    task_id = "task-demo-42"

    # Step 1: Session 1 with Agent A
    from app.models.session import SessionCreate
    s1 = session_service.create_session(SessionCreate(
        workspace_id=workspace_id,
        agent_id="agent-a-investigator",
        task_id=task_id
    ))

    res_1 = await orchestrator.execute_task(
        workspace_id=workspace_id,
        session_id=s1.id,
        task_id=task_id,
        role="investigator"
    )
    assert res_1.status == "completed"
    assert len(res_1.memories_created) == 1
    assert res_1.handoff_created is True
    first_mem_id = res_1.memories_created[0]

    # Verify Session 1 ended
    s1_detail = session_service.get_session_detail(s1.id)
    assert s1_detail.status == "completed"

    # Step 2: Session 2 with Agent B (separate session)
    s2 = session_service.create_session(SessionCreate(
        workspace_id=workspace_id,
        agent_id="agent-b-continuation",
        task_id=task_id
    ))
    assert s2.id != s1.id

    res_2 = await orchestrator.execute_task(
        workspace_id=workspace_id,
        session_id=s2.id,
        task_id=task_id,
        role="continuation"
    )
    assert res_2.status == "resolved"
    assert first_mem_id in res_2.memories_retrieved
    assert len(res_2.memories_created) == 1
    assert "Resolved" in res_2.summary
