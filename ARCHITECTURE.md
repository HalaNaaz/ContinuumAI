# ContinuumAI — System Architecture Document

> **Status:** Pre-build architectural blueprint  
> **Source of Truth:** Aligned with [`PRD.md`](file:///c:/Users/Hala/Downloads/Project%20Files/ContinuumAI/PRD.md) and [`design.md`](file:///c:/Users/Hala/Downloads/Project%20Files/ContinuumAI/design.md).  
> **Hackathon Track:** WeMakeDevs × FalkorDB — Track 2: Agent Memory and Coordination

---

## 1. Architectural Principles

1. **FalkorDB as the Load-Bearing Core:** The knowledge graph is the primary operational state store. Memories, sessions, agents, tasks, and handoffs are modeled as first-class graph entities rather than flattened relational records.
2. **Explicit Provenance:** Every memory written to the graph must link to its author agent (`Agent`), originating session (`Session`), and relevant task (`Task`).
3. **Strict Tenant & Workspace Isolation:** All Cypher queries must be scoped by `workspace_id`. Cross-workspace reads or writes are strictly prohibited.
4. **Resilient Failure Handling:** If the database or model API fails, the backend must surface a clear error without falsely reporting successful persistence.
5. **No Synthetic Hallucinations:** When no relevant memory exists in the graph, the system explicitly returns "no context found" rather than inventing background facts.

---

## 2. Component Responsibilities

```mermaid
flowchart TB
    subgraph Client ["Frontend (Next.js 14/15 + Tailwind CSS)"]
        UI_Landing["Public Landing Page (/)"]
        UI_Dash["Dashboard Shell (/app)"]
        UI_Graph["Interactive Graph Canvas (@xyflow/react)"]
        UI_Sessions["Session Inspector & Continuity View"]
        UI_Agents["Agent Activity Timeline"]
        UI_Memories["Memory Explorer & Search"]
    end

    subgraph Server ["Backend API (FastAPI + Python 3.11+)"]
        API_Router["REST API Layer (Pydantic Validation)"]
        Scope_Guard["Workspace Scoping & Security Guard"]
        Agent_Orch["Agent Orchestration Engine"]
        Mem_Service["Memory Service (Episodic, Semantic, Procedural)"]
        LLM_Adapter["Model Provider Adapter (Gemini / OpenAI / Mock)"]
        Repo_Falkor["FalkorDB Repository Layer (Parameterized Cypher)"]
    end

    subgraph Storage ["Graph Engine (FalkorDB)"]
        FalkorDB_Engine[("FalkorDB Instance\nNodes: Workspace, Agent, Session, Task, Memory, Decision, Evidence, Handoff\nEdges: CREATED, RECORDED, RELATES_TO, SUPPORTS, REFERENCES, HANDED_OFF_TO")]
    end

    subgraph External ["External Services"]
        LLM_Cloud["LLM Cloud API"]
    end

    Client -->|HTTPS / JSON REST| API_Router
    API_Router --> Scope_Guard
    Scope_Guard --> Agent_Orch
    Scope_Guard --> Mem_Service
    Agent_Orch --> LLM_Adapter
    Agent_Orch --> Mem_Service
    Mem_Service --> Repo_Falkor
    LLM_Adapter --> LLM_Cloud
    Repo_Falkor -->|Redis Protocol / Cypher| FalkorDB_Engine
```

### 2.1 Frontend (Next.js + TypeScript)
- **Role:** Presents the public product landing page and interactive application dashboard.
- **Visual Identity:** 21st.dev stencil-grid aesthetic (`Oxanium` display headings, `IBM Plex Mono` labels, `#FF681F` orange accents, near-black `#111111` backdrop).
- **Graph Visualizer:** Uses React Flow (`@xyflow/react`) to render real nodes and edges retrieved from the FalkorDB repository.
- **Isolation Constraint:** Never holds database credentials or directly executes Cypher queries.

### 2.2 Backend API (FastAPI)
- **Role:** Handles validation, business logic, agent orchestration, and graph data access.
- **Workspace Security Guard:** Enforces `workspace_id` validation on every incoming request.
- **Pydantic Schemas:** Enforces strict typing for memory creation, agent execution results, and graph responses.

### 2.3 Agent Orchestration Engine
- Manages the lifecycle of two core agent roles:
  - **Agent A (Investigator / Producer):** In Session 1, queries prior memory, executes bounded work, produces findings, decisions, evidence, and an unfinished next step, then saves this to FalkorDB.
  - **Agent B (Continuation / Consumer):** In Session 2, queries FalkorDB for memories linked to the task, reads Agent A's context, executes the next action, and writes a linked continuation finding back to the graph.

### 2.4 FalkorDB Repository Layer
- Executes parameterized Cypher queries via the official `falkordb` Python client.
- Excludes secrets and raw string interpolation to eliminate Cypher injection risks.

---

## 3. Request Flow & Memory Lifecycle

### 3.1 Signature Workflow: Session 1 → Session 2 Continuity

```mermaid
sequenceDiagram
    autonumber
    actor User as User / Reviewer
    participant API as FastAPI Backend
    participant Orch as Agent Orchestrator
    participant DB as FalkorDB
    participant LLM as LLM Provider

    Note over User, DB: SESSION 1: Initial Investigation
    User->>API: POST /api/tasks/{task_id}/run (Session 1, Agent A)
    API->>DB: Query existing memories for task (Cypher)
    DB-->>API: Return existing context (or empty)
    API->>LLM: Prompt Agent A with task & context
    LLM-->>API: Structured result (finding, decision, evidence, next_step)
    API->>DB: Cypher: Create Memory, Decision, Evidence, Task links
    API->>DB: Cypher: Create Handoff record (next_step: "Inspect DB config")
    DB-->>API: Confirm persistence & graph relationships
    API-->>User: Session 1 Complete (Finding persisted)

    Note over User, DB: SESSION 2: Independent Continuation
    User->>API: POST /api/tasks/{task_id}/continue (Session 2, Agent B)
    API->>DB: Cypher: Retrieve Session 1 memories & handoff for task
    DB-->>API: Return Memory nodes + provenance + next_step
    API->>LLM: Prompt Agent B with retrieved memory & next_step
    LLM-->>API: Agent B finding (identifies root cause based on prior clue)
    API->>DB: Cypher: Write new Memory (linked to Session 1 Memory via RELATES_TO)
    DB-->>API: Confirm graph update
    API-->>User: Session 2 Complete (Task resolved using retrieved memory)
```

---

## 4. Agent Handoff Lifecycle

When a session finishes with unfinished work:
1. **Creation:** A `Handoff` entity is recorded in FalkorDB with attributes:
   - `task_id`: Task being handed off
   - `source_agent_id`: Agent completing the initial phase
   - `summary`: High-level synopsis of discoveries
   - `next_action`: Concrete, actionable directive for the successor agent
   - `created_at`: ISO timestamp
2. **Persistence:** The handoff is linked via `(Agent)-[:HANDED_OFF_TO]->(Agent)` and `(Session)-[:RECORDED]->(Handoff)`.
3. **Retrieval:** The successor session queries open handoffs for the task and immediately initiates the next action without re-evaluating completed steps.

---

## 5. Security & Isolation Architecture

### 5.1 Workspace Scoping
Every graph query includes an explicit workspace anchor:
```cypher
MATCH (w:Workspace {id: $workspace_id})-[:HAS_TASK]->(t:Task {id: $task_id})
MATCH (t)-[:HAS_MEMORY]->(m:Memory)
RETURN m, t
```
Cross-workspace queries fail at the Cypher filter level because no relationships exist between different `Workspace` subgraphs.

### 5.2 Secret Management
- Database passwords and API keys are stored exclusively in backend environment variables.
- The Next.js client only receives public metadata and anonymized workspace identifiers.

---

## 6. Architectural Decisions & Open Questions

| Decision | Choice | Rationale |
| :--- | :--- | :--- |
| **Graph Database** | FalkorDB | Mandatory hackathon requirement; low-latency graph queries via Cypher. |
| **Frontend Framework** | Next.js (App Router) | High performance, static rendering for landing page, dynamic client components for React Flow graph. |
| **Graph Visualizer** | React Flow (`@xyflow/react`) | Industry-standard, highly customizable node rendering, robust pan/zoom support. |
| **Backend Framework** | FastAPI (Python) | Native support for official `falkordb` Python SDK and Pydantic data modeling. |
| **Deterministic Mode** | Built-in fallback runner | Ensures the demo can run reliably during evaluation even if external LLM API rate limits are hit. |

### Open Questions to Resolve During Hackathon
1. **FalkorDB Deployment:** Cloud free tier vs. local Docker container (will support both via `.env` configuration).
2. **Procedural Memory Node Representation:** Should procedures be stored as distinct `:Procedure` nodes or as `:Memory` nodes with `memory_type: "procedural"`? (Recommended: unified `:Memory` label with a `memory_type` property for query simplicity).
