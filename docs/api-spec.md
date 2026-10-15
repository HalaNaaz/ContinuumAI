# ContinuumAI — REST API Specification

> **Status:** Planned API Blueprint (None of these endpoints are implemented in this repository preparation phase; they will be built in FastAPI during the active hackathon phase).  
> **Source of Truth:** [`PRD.md`](file:///c:/Users/Hala/Downloads/Project%20Files/ContinuumAI/PRD.md#L586-L610).

---

## 1. Global Conventions & Workspace Scoping

- **Base URL:** `/api`
- **Content-Type:** `application/json`
- **Workspace Scoping Rule:** Every request modifying or retrieving data must be scoped to a valid `workspace_id`. If `workspace_id` is missing or unrecognized, the API returns `400 Bad Request` or `404 Workspace Not Found`.
- **Standard Error Response:**
  ```json
  {
    "error": {
      "code": "RESOURCE_NOT_FOUND",
      "message": "Detailed error explanation",
      "details": {}
    }
  }
  ```

---

## 2. Planned API Endpoints

### 2.1 System & Health

#### `GET /api/health`
- **Purpose:** Health check reporting backend status and FalkorDB connectivity without leaking credentials.
- **Request:** None.
- **Response (200 OK):**
  ```json
  {
    "status": "healthy",
    "version": "1.0.0",
    "database": {
      "connected": true,
      "engine": "FalkorDB"
    },
    "llm_provider": {
      "provider": "gemini",
      "status": "ready"
    }
  }
  ```
- **Error Cases:** `503 Service Unavailable` if FalkorDB cannot be reached.

---

### 2.2 Workspace

#### `GET /api/workspaces/current`
- **Purpose:** Returns the active workspace metadata and configuration.
- **Request:** Query param `?workspace_id=demo-workspace-01` (defaults to active session scope).
- **Response (200 OK):**
  ```json
  {
    "id": "demo-workspace-01",
    "name": "ContinuumAI Demo Workspace",
    "created_at": "2026-10-10T14:00:00Z",
    "stats": {
      "agents_count": 2,
      "sessions_count": 2,
      "memories_count": 5
    }
  }
  ```

---

### 2.3 Sessions

#### `GET /api/sessions`
- **Purpose:** List sessions in the active workspace.
- **Query Params:** `workspace_id` (required), `limit` (int, default 50), `offset` (int, default 0).
- **Response (200 OK):**
  ```json
  {
    "sessions": [
      {
        "id": "sess-001",
        "workspace_id": "demo-workspace-01",
        "status": "completed",
        "started_at": "2026-10-10T14:05:00Z",
        "ended_at": "2026-10-10T14:07:00Z",
        "agent_ids": ["agent-a-investigator"],
        "task_id": "task-01"
      }
    ],
    "total": 1
  }
  ```

#### `POST /api/sessions`
- **Purpose:** Create and initialize a new session.
- **Request Body:**
  ```json
  {
    "workspace_id": "demo-workspace-01",
    "agent_id": "agent-b-continuation",
    "task_id": "task-01"
  }
  ```
- **Validation Rules:** `workspace_id` and `agent_id` must exist in FalkorDB.
- **Response (201 Created):**
  ```json
  {
    "id": "sess-002",
    "workspace_id": "demo-workspace-01",
    "status": "active",
    "started_at": "2026-10-10T14:10:00Z"
  }
  ```

#### `GET /api/sessions/{session_id}`
- **Purpose:** Retrieve full session detail including memories created, memories retrieved, and handoff records.
- **Response (200 OK):**
  ```json
  {
    "id": "sess-002",
    "workspace_id": "demo-workspace-01",
    "status": "active",
    "task_id": "task-01",
    "memories_retrieved": [
      {
        "id": "mem-001",
        "source_agent": "agent-a-investigator",
        "content": "Service timeout caused by unindexed query on service_logs."
      }
    ],
    "memories_created": []
  }
  ```

---

### 2.4 Tasks & Orchestration

#### `POST /api/tasks`
- **Purpose:** Create a new task within a workspace.
- **Request Body:**
  ```json
  {
    "workspace_id": "demo-workspace-01",
    "title": "Investigate payment service latency spike",
    "context": "Sample service experiencing 504 timeouts on checkout."
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "id": "task-01",
    "title": "Investigate payment service latency spike",
    "status": "pending",
    "created_at": "2026-10-10T14:01:00Z"
  }
  ```

#### `POST /api/tasks/{task_id}/run`
- **Purpose:** Trigger an agent execution phase (Session 1 investigation or Session 2 continuation).
- **Request Body:**
  ```json
  {
    "workspace_id": "demo-workspace-01",
    "session_id": "sess-001",
    "agent_role": "investigator",
    "mode": "live"
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "task_id": "task-01",
    "session_id": "sess-001",
    "status": "completed",
    "summary": "Agent A isolated timeout to database connection pool saturation.",
    "memories_created": ["mem-001"],
    "next_action": "Inspect PostgreSQL pool size and query logs.",
    "handoff_created": true
  }
  ```

---

### 2.5 Memories

#### `GET /api/memories`
- **Purpose:** Search and filter stored memories.
- **Query Params:**
  - `workspace_id` *(required, string)*
  - `task_id` *(optional, string)*
  - `memory_type` *(optional, string: episodic | semantic | procedural)*
  - `agent_id` *(optional, string)*
  - `search` *(optional, string)*
- **Response (200 OK):**
  ```json
  {
    "memories": [
      {
        "id": "mem-001",
        "workspace_id": "demo-workspace-01",
        "memory_type": "episodic",
        "content": "Service timeout caused by database pool starvation.",
        "summary": "DB pool saturated",
        "source_agent_id": "agent-a-investigator",
        "source_session_id": "sess-001",
        "created_at": "2026-10-10T14:06:00Z",
        "status": "active"
      }
    ],
    "total": 1
  }
  ```

#### `POST /api/memories`
- **Purpose:** Directly create and link a structured memory in FalkorDB.
- **Request Body:**
  ```json
  {
    "workspace_id": "demo-workspace-01",
    "memory_type": "semantic",
    "content": "Service B requires max_pool_size >= 20 to avoid queue timeout.",
    "source_agent_id": "agent-a-investigator",
    "source_session_id": "sess-001",
    "task_id": "task-01"
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "id": "mem-002",
    "workspace_id": "demo-workspace-01",
    "status": "created",
    "created_at": "2026-10-10T14:07:00Z"
  }
  ```

---

### 2.6 Graph Data

#### `GET /api/graph`
- **Purpose:** Return workspace-scoped nodes and edges for the React Flow visualizer canvas.
- **Query Params:** `workspace_id` (required).
- **Response (200 OK):**
  ```json
  {
    "nodes": [
      {
        "id": "task-01",
        "type": "taskNode",
        "data": { "label": "Payment Latency Spike", "status": "resolved" }
      },
      {
        "id": "mem-001",
        "type": "memoryNode",
        "data": { "label": "DB Pool Starvation", "memory_type": "episodic", "agent": "Agent A" }
      }
    ],
    "edges": [
      {
        "id": "e1",
        "source": "task-01",
        "target": "mem-001",
        "label": "HAS_MEMORY"
      }
    ]
  }
  ```
