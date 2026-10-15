# ContinuumAI — Deterministic Demonstration Script

> **Status:** Planned Demonstration Procedure (*To be executed and verified once the backend and UI are implemented during the hackathon*).  
> **Source of Truth:** [`PRD.md`](file:///c:/Users/Hala/Downloads/Project%20Files/ContinuumAI/PRD.md#L306-L335) and [`design.md`](file:///c:/Users/Hala/Downloads/Project%20Files/ContinuumAI/design.md#L261-L273).

---

## 1. Demo Objective

Prove verifiable cross-session agent memory and coordination powered by **FalkorDB**:
- **Agent A** runs in **Session 1**, discovers a finding, and saves structured memory, evidence, and an unfinished next step to FalkorDB.
- **Session 1 ends.** Memory buffers and agent execution context are terminated.
- **Agent B** launches in **Session 2**, queries FalkorDB, and retrieves Agent A's memory with provenance.
- **Agent B continues the task** without repeating Agent A's work, resolves the problem, and saves new knowledge back to the graph.
- The **Memory Graph** and **Activity Timeline** show real, verifiable graph mutations.

---

## 2. Prerequisites & Initial State

1. **Backend Running:** FastAPI server active at `http://localhost:8000`.
2. **Frontend Running:** Next.js application active at `http://localhost:3000`.
3. **Database Connected:** FalkorDB running and reachable (verified on `/app/settings`).
4. **Clean Workspace State:** Navigate to `/app/settings` and click **"Reset Demo Workspace"** (or initialize with workspace ID `demo-workspace-01`).

---

## 3. Step-by-Step Demonstration Walkthrough

### Step 1: Initialize Workspace & Task
1. Open [http://localhost:3000/app](http://localhost:3000/app).
2. Confirm the active workspace is `demo-workspace-01`.
3. Verify that the graph (`/app/graph`) displays an initial empty or base task state:
   - Node: `Task: "Investigate Payment Service Latency Spike"`
   - Status: `Pending`

### Step 2: Launch Session 1 (Agent A — Investigator)
1. On the Overview page (`/app`), click **"Run Session 1: Agent A"**.
2. **Under the Hood:**
   - Backend creates `Session: sess-001` linked to `Agent: agent-a-investigator`.
   - Agent A queries FalkorDB for existing context on `task-01`.
   - Result: No prior memory found (`0 memories retrieved`).
   - Agent A analyzes the simulated incident (e.g., service timeout logs).
   - Agent A concludes: *"Connection pool starvation in database service."*
   - Agent A records:
     - `Memory: mem-001` (type: `episodic`, content: *"Database connection pool exhausted under 500 RPS load"*).
     - `Evidence: ev-001` (*"Error 504: connection checkout timeout after 30000ms"*).
     - `Handoff: handoff-001` (next action: *"Increase max_connections to 50 and tune pool size in service config"*).
3. **Expected UI Observation:**
   - Activity Timeline (`/app/agents`) shows 4 events:
     1. `Session 1 Started`
     2. `Memory Search (0 found)`
     3. `Memory Written (mem-001)`
     4. `Handoff Created`
   - Graph View (`/app/graph`) updates to show new nodes (`Agent A`, `Session 1`, `Memory 1`, `Handoff`) connected via Cypher relationships.

### Step 3: Conclude & Terminate Session 1
1. Session 1 transitions to status: `Completed`.
2. The active in-memory agent process terminates.
3. Review `/app/sessions`:
   - `sess-001` is marked complete.
   - Shows 1 memory created (`mem-001`).

### Step 4: Launch Session 2 (Agent B — Continuation)
1. On the Overview page (`/app`), click **"Run Session 2: Agent B"**.
2. **Under the Hood:**
   - Backend creates a completely new session: `Session: sess-002` with `Agent: agent-b-continuation`.
   - Agent B issues a Cypher query to FalkorDB for `task-01` memories and pending handoffs.
   - FalkorDB returns `mem-001` and `handoff-001` authored by Agent A.
   - Agent B uses this retrieved memory: instead of re-investigating error logs, it directly applies the recommended next action (*"Increase max_connections to 50"*).
   - Agent B verifies the fix and writes a new finding:
     - `Memory: mem-002` (type: `semantic`, content: *"Setting max_connections=50 stabilized checkout latency to 42ms"*).
     - Graph edge: `(mem-002)-[:RELATES_TO {relationship: 'continues_investigation'}]->(mem-001)`.
   - Task `task-01` is marked `Resolved`.

### Step 5: Verification & Inspection
1. **Sessions View (`/app/sessions`):**
   - Click on `sess-002`.
   - Inspect the **"Context Reused"** card. Confirm it explicitly cites `mem-001` with provenance: Author `Agent A`, Session `sess-001`.
2. **Memory Graph Canvas (`/app/graph`):**
   - Click the new `mem-002` node.
   - Notice the directional edge connecting `mem-002` back to `mem-001`.
   - Toggle filters: Verify episodic vs. semantic memory styling.
3. **Memory Explorer (`/app/memories`):**
   - Search for `"pool"`: confirms both `mem-001` and `mem-002` are indexed and filterable by type and agent.

### Step 6: Repeatability Verification
1. Navigate to `/app/settings`.
2. Click **"Reset Demo Workspace"** and confirm.
3. Confirm all created nodes and relationships are cleared or returned to the initial state.
4. Re-run Steps 1 through 5 to ensure consistent determinism.

---

## 4. Failure Checks & Edge Cases

| Scenario | Expected System Behavior | What Must NOT Happen |
| :--- | :--- | :--- |
| **FalkorDB Unreachable** | UI shows red banner: *"Database unavailable. Memory write aborted."* HTTP 503 returned. | Must NOT display false success or fake saved nodes. |
| **No Prior Memory Found** | Agent proceeds from cold start; UI indicates *"0 relevant memories found"*. | Must NOT hallucinate prior knowledge or fabricate citations. |
| **Workspace Cross-Leakage** | Switching to `workspace-02` shows zero nodes from `demo-workspace-01`. | Memories from `demo-workspace-01` must never appear in other workspaces. |
