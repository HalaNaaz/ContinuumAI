"""Tests verifying shared dependency injection and cross-route state visibility without workspace leakage."""

import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.api.deps import get_repository, get_session_service, get_task_service, clear_singletons


@pytest.fixture(autouse=True)
def setup_teardown():
    """Ensure clean dependency singletons for tests."""
    clear_singletons()
    yield
    clear_singletons()


def test_dependency_singletons():
    """Verify that dependency providers return shared singleton instances."""
    repo_1 = get_repository()
    repo_2 = get_repository()
    assert repo_1 is repo_2

    sess_1 = get_session_service()
    sess_2 = get_session_service()
    assert sess_1 is sess_2
    assert sess_1.repo is repo_1

    task_1 = get_task_service()
    task_2 = get_task_service()
    assert task_1 is task_2
    assert task_1.repo is repo_1


def test_cross_route_session_and_task_visibility():
    """Test that sessions and tasks created via one route are visible to tasks/run and session detail."""
    client = TestClient(app)
    ws_id = "ws-cross-route-test"

    # 1. Create task via /api/tasks
    task_res = client.post("/api/tasks", json={
        "workspace_id": ws_id,
        "title": "Investigate High Memory Usage",
        "context": "Node worker exceeding 90% memory threshold."
    })
    assert task_res.status_code == 201
    task_data = task_res.json()
    task_id = task_data["id"]

    # 2. Verify task is queryable via GET /api/tasks/{task_id}
    get_task_res = client.get(f"/api/tasks/{task_id}")
    assert get_task_res.status_code == 200
    assert get_task_res.json()["title"] == "Investigate High Memory Usage"

    # 3. Create Session 1 via /api/sessions
    s1_res = client.post("/api/sessions", json={
        "workspace_id": ws_id,
        "agent_id": "agent-a-investigator",
        "task_id": task_id
    })
    assert s1_res.status_code == 201
    s1_id = s1_res.json()["id"]

    # 4. Verify session appears in /api/sessions
    list_sess_res = client.get(f"/api/sessions?workspace_id={ws_id}")
    assert list_sess_res.status_code == 200
    session_ids = [s["id"] for s in list_sess_res.json()]
    assert s1_id in session_ids

    # 5. Run task in Session 1 via /api/tasks/{task_id}/run
    run_1_res = client.post(f"/api/tasks/{task_id}/run", json={
        "workspace_id": ws_id,
        "session_id": s1_id,
        "agent_role": "investigator"
    })
    assert run_1_res.status_code == 200
    run_1_data = run_1_res.json()
    assert run_1_data["status"] == "completed"
    assert len(run_1_data["memories_created"]) == 1
    mem_1_id = run_1_data["memories_created"][0]

    # 6. Verify Session 1 is now marked completed and contains memory in /api/sessions/{session_id}
    s1_detail_res = client.get(f"/api/sessions/{s1_id}")
    assert s1_detail_res.status_code == 200
    s1_detail = s1_detail_res.json()
    assert s1_detail["status"] == "completed"
    assert s1_detail["handoff_summary"] is not None
    assert any(m["id"] == mem_1_id for m in s1_detail["memories_created"])

    # 7. Create Session 2 for continuation
    s2_res = client.post("/api/sessions", json={
        "workspace_id": ws_id,
        "agent_id": "agent-b-continuation",
        "task_id": task_id
    })
    assert s2_res.status_code == 201
    s2_id = s2_res.json()["id"]

    # 8. Run continuation in Session 2 via /api/tasks/{task_id}/run
    run_2_res = client.post(f"/api/tasks/{task_id}/run", json={
        "workspace_id": ws_id,
        "session_id": s2_id,
        "agent_role": "continuation"
    })
    assert run_2_res.status_code == 200
    run_2_data = run_2_res.json()
    assert run_2_data["status"] == "resolved"
    assert mem_1_id in run_2_data["memories_retrieved"]

    # 9. Verify Session 2 details contain reused memory context
    s2_detail_res = client.get(f"/api/sessions/{s2_id}")
    assert s2_detail_res.status_code == 200
    s2_detail = s2_detail_res.json()
    assert s2_detail["status"] == "completed"
    assert any(m["id"] == mem_1_id for m in s2_detail["memories_retrieved"])

    # 10. Verify task status is updated to resolved
    final_task_res = client.get(f"/api/tasks/{task_id}")
    assert final_task_res.status_code == 200
    assert final_task_res.json()["status"] == "resolved"


def test_workspace_isolation_across_routes():
    """Verify that sessions, tasks, and memories do not leak across workspace boundaries."""
    client = TestClient(app)
    ws_alpha = "workspace-alpha"
    ws_beta = "workspace-beta"

    # Create task in Alpha
    alpha_task = client.post("/api/tasks", json={
        "workspace_id": ws_alpha,
        "title": "Alpha Confidential Migration",
        "context": "Private alpha data."
    }).json()

    # Create session in Alpha
    alpha_sess = client.post("/api/sessions", json={
        "workspace_id": ws_alpha,
        "agent_id": "agent-a-investigator",
        "task_id": alpha_task["id"]
    }).json()

    # Create memory directly in Alpha
    client.post("/api/memories", json={
        "workspace_id": ws_alpha,
        "memory_type": "episodic",
        "content": "Confidential Alpha memory snippet",
        "summary": "Alpha snippet",
        "source_agent_id": "agent-a-investigator",
        "source_session_id": alpha_sess["id"],
        "task_id": alpha_task["id"]
    })

    # Beta listing sessions: must NOT see alpha_sess
    beta_sessions = client.get(f"/api/sessions?workspace_id={ws_beta}").json()
    assert alpha_sess["id"] not in [s["id"] for s in beta_sessions]

    # Beta fetching alpha_sess with workspace check: must return 404
    beta_sess_detail = client.get(f"/api/sessions/{alpha_sess['id']}?workspace_id={ws_beta}")
    assert beta_sess_detail.status_code == 404

    # Beta fetching alpha_task with workspace check: must return 404
    beta_task_detail = client.get(f"/api/tasks/{alpha_task['id']}?workspace_id={ws_beta}")
    assert beta_task_detail.status_code == 404

    # Beta listing memories: must NOT contain Alpha memory
    beta_mems = client.get(f"/api/memories?workspace_id={ws_beta}").json()
    assert not any("Confidential Alpha" in m["content"] for m in beta_mems)


def test_workspace_reset_clears_shared_services():
    """Verify that POST /api/workspaces/reset clears sessions and memories in that workspace."""
    client = TestClient(app)
    ws_id = "ws-cleanup-test"

    # Setup task and session
    t = client.post("/api/tasks", json={"workspace_id": ws_id, "title": "Cleanup Test"}).json()
    s = client.post("/api/sessions", json={"workspace_id": ws_id, "agent_id": "agent-a"}).json()
    client.post("/api/memories", json={
        "workspace_id": ws_id,
        "memory_type": "episodic",
        "content": "To be wiped",
        "source_agent_id": "agent-a",
        "source_session_id": s["id"],
        "task_id": t["id"]
    })

    # Verify existing
    assert len(client.get(f"/api/sessions?workspace_id={ws_id}").json()) == 1
    assert len(client.get(f"/api/memories?workspace_id={ws_id}").json()) == 1

    # Reset workspace
    reset_res = client.post(f"/api/workspaces/reset?workspace_id={ws_id}")
    assert reset_res.status_code == 200

    # Verify everything in that workspace is cleared
    assert len(client.get(f"/api/sessions?workspace_id={ws_id}").json()) == 0
    assert len(client.get(f"/api/memories?workspace_id={ws_id}").json()) == 0
