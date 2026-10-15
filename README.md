# ContinuumAI — Persistent Memory & Multi-Agent Coordination

<p align="center">
  <img src="https://img.shields.io/badge/CONTINUUMAI-Persistent_Memory-090A0C?style=for-the-badge&logoColor=white" alt="ContinuumAI" />
  <img src="https://img.shields.io/badge/Status-Active_Prototype-F59E0B?style=for-the-badge" alt="Active Prototype" />
  <img src="https://img.shields.io/badge/Tests-10_Passed-0A9EDC?style=for-the-badge&logo=pytest&logoColor=white" alt="10 Tests Passed" />
  <img src="https://img.shields.io/badge/Graph_Engine-FalkorDB-FF5722?style=for-the-badge" alt="FalkorDB Engine" />
  <img src="https://img.shields.io/badge/Isolation-Workspace_Scoped-10B981?style=for-the-badge" alt="Workspace Scoped" />
</p>

<p align="center">
  <strong>Give AI agents continuity across sessions.</strong><br />
  A graph-powered memory and coordination layer structuring agent experiences, operational findings, task states, and multi-agent handoffs into a persistent knowledge graph.
</p>

<p align="center">
  <a href="https://github.com/Halanaaz1401/ContinuumAI">📦 GitHub Repository</a> •
  <a href="#-system-architecture">🏗️ Architecture</a> •
  <a href="#-graph-data-model">🕸️ Graph Model</a> •
  <a href="#-installation--quickstart">🚀 Quickstart</a> •
  <a href="#-table-of-contents">📖 Documentation</a>
</p>

<p align="center">
  <strong>Engineered by Hala Naaz</strong>
</p>

---

## Technology Stack

<p align="center">
  <img src="https://img.shields.io/badge/Python-3.11+-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python 3.11+" />
  <img src="https://img.shields.io/badge/FastAPI-0.110+-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI" />
  <img src="https://img.shields.io/badge/FalkorDB-1.0+-FF5722?style=for-the-badge" alt="FalkorDB" />
  <img src="https://img.shields.io/badge/Redis_Protocol-v8+-DC382D?style=for-the-badge&logo=redis&logoColor=white" alt="Redis Protocol" />
  <img src="https://img.shields.io/badge/Next.js-14.2-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js 14" />
  <img src="https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 18" />
  <img src="https://img.shields.io/badge/TypeScript-5.4-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/React_Flow-@xyflow/react-FF0072?style=for-the-badge" alt="React Flow" />
  <img src="https://img.shields.io/badge/Pydantic-v2.6-E92063?style=for-the-badge&logo=pydantic&logoColor=white" alt="Pydantic v2" />
  <img src="https://img.shields.io/badge/Uvicorn-ASGI-499848?style=for-the-badge" alt="Uvicorn" />
  <img src="https://img.shields.io/badge/Docker-Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker Compose" />
  <img src="https://img.shields.io/badge/Pytest-8.0+-0A9EDC?style=for-the-badge&logo=pytest&logoColor=white" alt="Pytest" />
  <img src="https://img.shields.io/badge/Lucide-React_Icons-F56565?style=for-the-badge" alt="Lucide React" />
</p>

### Stack at a Glance

| Architectural Layer | Core Technologies | Primary Operational Purpose |
| :--- | :--- | :--- |
| **Frontend Framework** | Next.js 14.2 (App Router), React 18.3, TypeScript 5.4 | Server & client UI rendering, typed REST consumers, responsive workspace shells |
| **Graph Observability** | React Flow (`@xyflow/react` v12), Lucide React | Interactive node-and-edge visualizer mapping real-time agent memory networks |
| **Design & UI System** | Tailwind CSS 3.4, PostCSS, IBM Plex Mono & Oxanium | Technical stencil-grid aesthetic, high-contrast dark theme, accessible status badges |
| **Backend API Engine** | Python 3.11+, FastAPI 0.110+, Uvicorn (ASGI) | High-throughput async REST endpoints, request validation, dependency singletons |
| **Data Modeling & Validation** | Pydantic v2.6, Pydantic Settings | Strict schema enforcement for memory nodes, handoffs, sessions, and environment config |
| **Primary Graph Database** | FalkorDB (via official `falkordb` Python client) | Low-latency graph engine executing parameterized openCypher statements |
| **Protocol Transport** | Redis Protocol (`redis-py` v8+) | High-performance wire protocol connecting FastAPI services to FalkorDB |
| **Memory Fallback Store** | In-Memory Python State Dictionaries | Resilient fallback ensuring unit tests and offline demos execute without a live DB |
| **Testing & Quality Assurance** | Pytest 8.0+, pytest-asyncio, HTTPX, TypeScript `tsc` | Automated test runner verifying workspace isolation, dependency singletons, and route contracts |
| **Containerization** | Docker, Docker Compose (v3.8) | Multi-service orchestration configuring FalkorDB, backend, and frontend containers |

---
## 📖 Table of Contents

- [Project Identity & Overview](#-project-identity--overview)
- [Operational Problem & Solution](#-operational-problem--solution)
  - [The Operational Problem](#the-operational-problem)
  - [The ContinuumAI Solution](#the-continuumai-solution)
  - [Target Personas & Agent Roles](#target-personas--agent-roles)
- [Key Features & Implementation Status](#-key-features--implementation-status)
  - [1. Workspace Multi-Tenant Scoping & Isolation](#1-workspace-multi-tenant-scoping--isolation)
  - [2. Provenance-Linked Memory Creation](#2-provenance-linked-memory-creation)
  - [3. Structured Agent Handoff Contracts](#3-structured-agent-handoff-contracts)
  - [4. Cross-Session Task Context Retrieval](#4-cross-session-task-context-retrieval)
  - [5. Interactive Graph Visualizer & Topology Canvas](#5-interactive-graph-visualizer--topology-canvas)
  - [6. Observable Chronological Activity Timeline](#6-observable-chronological-activity-timeline)
  - [7. Centralized Dependency Injection Architecture](#7-centralized-dependency-injection-architecture)
  - [8. Parameterized openCypher Repository Layer](#8-parameterized-opencypher-repository-layer)
- [Comprehensive Feature Matrix](#-comprehensive-feature-matrix)
- [Signature Workflow: Cross-Session Continuity](#-signature-workflow-cross-session-continuity)
- [System Architecture & Data Flow](#-system-architecture--data-flow)
- [Graph Data Model & Node Entities](#-graph-data-model--node-entities)
- [Verified Cypher Queries & Relationships](#-verified-cypher-queries--relationships)
- [Project Directory Structure](#-project-directory-structure)
- [Installation & Quickstart Guide](#-installation--quickstart-guide)
  - [Prerequisites](#prerequisites)
  - [Local Development Setup](#local-development-setup)
  - [Docker Compose Deployment](#docker-compose-deployment)
- [Environment Variables Reference](#-environment-variables-reference)
- [Running the Services](#-running-the-services)
  - [Starting FastAPI Backend](#starting-fastapi-backend)
  - [Starting Next.js Frontend](#starting-nextjs-frontend)
- [Testing & Quality Assurance](#-testing--quality-assurance)
- [FalkorDB Configuration & Dual-Path Storage](#-falkordb-configuration--dual-path-storage)
- [Current Limitations & Known Issues](#-current-limitations--known-issues)
- [Development Roadmap](#-development-roadmap)
- [Security, Privacy & Safe Operation](#-security-privacy--safe-operation)
- [Contributing Guidelines](#-contributing-guidelines)
- [License](#-license)
- [Author & Maintainer](#-author--maintainer)

---


## 🎯 Project Identity & Overview

**ContinuumAI** is an open-source, high-performance graph memory and state coordination layer engineered to give autonomous AI agents persistent, cross-session continuity.

In multi-agent environments, autonomous workflows break down because agents operate in ephemeral, stateless silos. ContinuumAI changes this paradigm by transforming transient conversational executions into an observable, persistent knowledge graph:

1. **Persistent Operational Graph**: Replaces ephemeral flat conversation logs with structured graph entities (`Workspace`, `Agent`, `Session`, `Task`, `Memory`, `Handoff`).
2. **Context-Aware Cross-Session Recovery**: When an agent session terminates, the next agent queries the graph to recover prior findings, architectural decisions, and diagnostic telemetry without redundant execution.
3. **Formal Handoff Contracts**: Eliminates prompt-based handoff ambiguity by encapsulating the findings summary, affected entities, and explicit next actions into immutable handoff nodes.
4. **Graph-Native Provenance**: Retains complete traceability for every memory, establishing exactly which agent authored the insight, in which session, for which task, and at what timestamp.
5. **Multi-Tenant Workspace Isolation**: Strictly scopes all Cypher read and write operations by `workspace_id`, preventing cross-tenant context leakage across autonomous pipelines.

---

## ⚠️ Operational Problem & Solution

### The Operational Problem

Autonomous multi-agent systems and LLM pipelines face severe architectural challenges when coordinating on complex, multi-step tasks:

* **Session Discontinuity & Amnesia**: When an agent completes its turn or an API process terminates, its working memory and context window disappear. Successive runs or downstream agents must restart investigations from ground zero.
* **Redundant Diagnostic & API Loops**: Agents repeatedly make the same network requests, database scans, or log analyses because past discoveries are not indexed as queryable knowledge.
* **Fragmented & Unstructured Context**: Important facts, system parameters, and intermediate decisions remain buried in flat text transcripts, making precision retrieval mathematically impossible for future sessions.
* **Fragile & Unstructured Handoffs**: When an investigation transitions from a triage agent to an execution agent, instructions are passed as ambiguous natural language strings without structured parameters or verifiable state.
* **Absence of Provenance & Auditability**: Teams cannot verify why an agent reached a conclusion or trace which prior session or evidence triggered a downstream automated action.

### The ContinuumAI Solution

ContinuumAI implements a closed-loop graph memory pipeline connecting transient agent sessions to persistent graph storage:

```mermaid
flowchart LR
    A[Agent Session Execution\nDiagnostic · Investigation] --> B[Structured Fact Extraction\nEpisodic · Semantic · Procedural]
    B --> C[FalkorDB Graph Persistence\nParameterized openCypher Nodes & Edges]
    C --> D[Explicit Agent Handoff\nSummary · Structured Next Action]
    D --> E[Subsequent Session Start\nAgent B Continuation]
    E --> F[Graph Context Retrieval\nMATCH Task-Scoped Active Memories]
    F --> G[Cross-Session Continuation\nLinked Resolution via RELATES_TO]
```

### Target Personas & Agent Roles

* **Investigator / Producer Agent (Agent A)**: Receives fresh tasks, conducts initial investigation, records episodic findings into the graph, and crafts structured handoffs with concrete next actions.
* **Continuation / Consumer Agent (Agent B)**: Initializes in independent, clean sessions, queries FalkorDB for active memories linked to the task, consumes prior findings, executes remediation, and links new semantic knowledge to prior nodes.
* **Platform Engineers & AI System Architects**: Configure workspace boundaries, monitor persistent agent interactions, and audit cross-agent handoff contracts.
* **Human-in-the-Loop Operators**: Inspect real-time React Flow visual topologies, review agent activity timelines, and trace memory provenance before approving automated remediations.

---


## 🚀 Key Features & Implementation Status

### 1. Workspace Multi-Tenant Scoping & Isolation

Strict workspace scoping guarantees that memories, tasks, sessions, and agents remain entirely partitioned within their tenant boundary. All repository reads, writes, and deletions require a validated `workspace_id`.

* **What it does**: Enforces boundary checks on all REST endpoints and injects `$workspace_id` parameters into every openCypher query.
* **Why it is useful**: Prevents data leakage between separate autonomous agent teams, customer projects, or staging environments.
* **Components**: [backend/app/api/deps.py](file:///c:/Users/Hala/Downloads/Project%20Files/ContinuumAI/backend/app/api/deps.py), [backend/app/services/task_service.py](file:///c:/Users/Hala/Downloads/Project%20Files/ContinuumAI/backend/app/services/task_service.py), and [backend/app/graph/repository.py](file:///c:/Users/Hala/Downloads/Project%20Files/ContinuumAI/backend/app/graph/repository.py)
* **API Endpoints**: `GET /api/workspaces/current`, `POST /api/workspaces/reset`
* **Status**: **Implemented & Tested (In-Memory)**

---

### 2. Provenance-Linked Memory Creation

Captures operational findings with rich, structured metadata categorized into **Episodic** (runtime incidents), **Semantic** (discovered system topology), or **Procedural** (diagnostic recipes) types.

* **What it does**: Generates unique memory nodes connected to authoring agent, originating session, and parent task with ISO-8601 timestamps.
* **Why it is useful**: Eliminates hallucinated facts by providing a verifiable audit trail explaining when and how an insight was discovered.
* **Components**: [backend/app/services/memory_service.py](file:///c:/Users/Hala/Downloads/Project%20Files/ContinuumAI/backend/app/services/memory_service.py) and [backend/app/models/memory.py](file:///c:/Users/Hala/Downloads/Project%20Files/ContinuumAI/backend/app/models/memory.py)
* **API Endpoints**: `POST /api/memories`, `GET /api/memories`, `GET /api/memories?task_id={id}`
* **Status**: **Implemented & Tested**

---

### 3. Structured Agent Handoff Contracts

Formalized coordination contracts allowing agents to pass work across session boundaries without ambiguous conversational prompts.

* **What it does**: Persists an explicit `Handoff` node encapsulating findings summary, affected target agent, and the concrete next action.
* **Why it is useful**: Enables asynchronous work handoffs where subsequent agents immediately know the exact action to execute.
* **Components**: [backend/app/services/handoff_service.py](file:///c:/Users/Hala/Downloads/Project%20Files/ContinuumAI/backend/app/services/handoff_service.py) and [backend/app/agents/agent_a.py](file:///c:/Users/Hala/Downloads/Project%20Files/ContinuumAI/backend/app/agents/agent_a.py)
* **API Endpoints**: `GET /api/handoffs`
* **Status**: **Implemented & Tested**

---

### 4. Cross-Session Task Context Retrieval

Enables continuation agents in fresh sessions to recover relevant historical findings linked to an ongoing task without redundant diagnostic execution.

* **What it does**: Queries the graph for active memories associated with a target `task_id` and orders them chronologically for injection into agent context.
* **Why it is useful**: Allows Agent B to continue an investigation initiated by Agent A, resolving tasks faster and saving significant LLM token costs.
* **Components**: [backend/app/agents/agent_b.py](file:///c:/Users/Hala/Downloads/Project%20Files/ContinuumAI/backend/app/agents/agent_b.py) and [backend/app/agents/orchestrator.py](file:///c:/Users/Hala/Downloads/Project%20Files/ContinuumAI/backend/app/agents/orchestrator.py)
* **API Endpoints**: `POST /api/tasks/{task_id}/run`
* **Status**: **Implemented & Tested (In-Memory)**

---

### 5. Interactive Graph Visualizer & Topology Canvas

A visual graph inspection canvas built with React Flow (`@xyflow/react`) that maps relationships between workspaces, tasks, sessions, agents, and memories.

* **What it does**: Renders graph topology with customized nodes, animated relationship edges (`RELATES_TO`), and a details drawer for deep inspection.
* **Why it is useful**: Gives operators intuitive visibility into agent reasoning, memory connections, and handoff chains.
* **Components**: [frontend/app/app/graph/page.tsx](file:///c:/Users/Hala/Downloads/Project%20Files/ContinuumAI/frontend/app/app/graph/page.tsx) and [frontend/components/graph/graph-canvas.tsx](file:///c:/Users/Hala/Downloads/Project%20Files/ContinuumAI/frontend/components/graph/graph-canvas.tsx)
* **API Endpoints**: `GET /api/graph`
* **Status**: **Implemented (Frontend Verified; Backend Serialization uses In-Memory Map)**

---

### 6. Observable Chronological Activity Timeline

Real-time audit log tracking every agent transition, task assignment, memory write, context retrieval, and handoff event.

* **What it does**: Collects structured `AgentEvent` objects during task execution and exposes them in chronological order.
* **Why it is useful**: Provides an operational trail for debugging multi-agent coordination issues and verifying compliance.
* **Components**: [frontend/app/app/agents/page.tsx](file:///c:/Users/Hala/Downloads/Project%20Files/ContinuumAI/frontend/app/app/agents/page.tsx) and [frontend/components/agents/timeline.tsx](file:///c:/Users/Hala/Downloads/Project%20Files/ContinuumAI/frontend/components/agents/timeline.tsx)
* **API Endpoints**: `GET /api/agents/events`, `GET /api/agents`
* **Status**: **Implemented & Verified**

---

### 7. Centralized Dependency Injection Architecture

Robust FastAPI dependency injection providers configured in `deps.py` that manage shared singletons across all API routers.

* **What it does**: Guarantees that `SessionService`, `TaskService`, `MemoryService`, `HandoffService`, and `AgentOrchestrator` share consistent state across distinct route modules.
* **Why it is useful**: Prevents state fragmentation across REST routes and enables clean singleton resetting during automated test teardowns.
* **Components**: [backend/app/api/deps.py](file:///c:/Users/Hala/Downloads/Project%20Files/ContinuumAI/backend/app/api/deps.py)
* **Status**: **Implemented & Unit-Tested**

---

### 8. Parameterized openCypher Repository Layer

Dedicated graph query repository utilizing strictly parameterized Cypher statements with dictionary bindings.

* **What it does**: Pre-defines indexes, constraint statements, entity creations (`MERGE`, `CREATE`), and relationship traversals (`RELATES_TO`, `RECORDED`, `HAS_MEMORY`).
* **Why it is useful**: Mitigates Cypher injection risks, prevents parsing overhead on the graph database, and formalizes graph schema contracts.
* **Components**: [backend/app/graph/queries.py](file:///c:/Users/Hala/Downloads/Project%20Files/ContinuumAI/backend/app/graph/queries.py) and [backend/app/graph/repository.py](file:///c:/Users/Hala/Downloads/Project%20Files/ContinuumAI/backend/app/graph/repository.py)
* **Status**: **Implemented (Awaiting Live Database Dual-Write Binding)**

---

## 📊 Comprehensive Feature Matrix

| Feature | Operational Capability | Implementation Status | Audit & Verification Evidence |
| :--- | :--- | :--- | :--- |
| **Workspace Tenant Scoping** | Parameterized workspace boundaries across all queries | **Implemented & Tested** | Verified by `test_isolation.py` and `test_deps_and_cross_routes.py`. |
| **Dependency Singletons** | Centralized dependency providers in FastAPI | **Implemented & Tested** | Verified by `test_dependency_singletons` in Pytest suite. |
| **Cross-Route State Sharing** | Shared task and session visibility across REST endpoints | **Implemented & Tested** | Verified by `test_cross_route_session_and_task_visibility`. |
| **Episodic Memory Creation** | Storing discrete event findings with agent provenance | **Implemented & Tested** | Unit-tested via `MemoryService.create_memory()`. |
| **Cross-Session Retrieval** | Agent B recovering Agent A context across sessions | **Implemented & Tested** | Verified in `test_orchestrator.py` (in-memory mode). |
| **Knowledge Continuation** | Linking new findings to prior nodes via `RELATES_TO` | **Implemented & Tested** | Verified by `link_memory_continuation()` in `repository.py`. |
| **Structured Handoff Contracts** | Explicit next actions and summary entities | **Implemented & Tested** | Verified via `HandoffService.create_handoff()`. |
| **Interactive Graph Visualizer** | React Flow visual canvas with details drawer | **Implemented** | Verified via `tsc --noEmit` and frontend component rendering. |
| **Activity Timeline** | Chronological audit log of agent events | **Implemented** | Verified via `/api/agents/events` and Next.js timeline view. |
| **Parameterized Cypher Schema** | Centralized openCypher queries with dictionary params | **Implemented** | Formally defined in `queries.py` with zero string concatenation. |
| **Live FalkorDB Persistence** | Dual-write persistence directly to remote graph engine | **Partially Implemented** | Connection wrapper active; live persistence unverified; fallback active. |
| **Evidence & Decision Nodes** | First-class entities for logs and architectural choices | **Planned** | Schema documented in `PRD.md`; pending graph integration. |
| **Live LLM Model Adapters** | Dynamic prompt synthesis with Gemini / OpenAI | **Planned** | Deterministic mock runner active; live provider binding planned. |

---


## 🔄 Signature Workflow: Cross-Session Continuity

The primary coordination workflow demonstrates how two autonomous agents preserve, transfer, and consume knowledge across disconnected execution sessions:

```mermaid
sequenceDiagram
    autonumber
    actor User as Operator
    participant API as FastAPI Backend
    participant Orch as Agent Orchestrator
    participant Repo as Graph Repository
    participant DB as FalkorDB Engine

    Note over User, DB: SESSION 1: Initial Triage & Investigation (Agent A)
    User->>API: POST /api/tasks/{task_id}/run (Session 1, Role: Investigator)
    API->>Orch: execute_task(task_id, Session 1, Agent A)
    Orch->>Repo: retrieve_memories_for_task(workspace_id, task_id)
    Repo-->>Orch: 0 prior memories discovered (Cold Start)
    Orch->>Orch: Agent A executes diagnostic investigation
    Note over Orch: Finding: Connection pool exhausted (10/10 limit reached under 500 RPS)
    Orch->>Repo: create_memory(Episodic: "Connection pool exhausted (10/10 limit)")
    Repo->>DB: Cypher: CREATE (m:Memory) -[:CREATED]-(AgentA), -[:RECORDED]-(Session1)
    Orch->>Repo: create_handoff("Increase max_connections to 50 in pool config")
    Repo->>DB: Cypher: CREATE (h:Handoff) -[:HAS_HANDOFF]-(Task)
    Orch->>API: Mark Session 1 Completed & Record Timeline Event
    API-->>User: Investigation Completed, Findings & Handoff Stored

    Note over User, DB: SESSION 2: Context Recovery & Continuation (Agent B)
    User->>API: POST /api/tasks/{task_id}/run (Session 2, Role: Continuation)
    API->>Orch: execute_task(task_id, Session 2, Agent B)
    Orch->>Repo: retrieve_memories_for_task(workspace_id, task_id)
    Repo-->>Orch: Return Session 1 Memory ("Connection pool exhausted (10/10 limit)")
    Orch->>Orch: Agent B reads Session 1 context & executes next action
    Note over Orch: Action: Increased pool to 50; under 500 RPS p99 latency dropped to 42ms
    Orch->>Repo: create_memory(Semantic: "Pool resized to 50, throughput stable")
    Repo->>DB: Cypher: CREATE (NewMem:Memory)
    Orch->>Repo: link_memory_continuation(NewMem.id, PriorMem.id)
    Repo->>DB: Cypher: CREATE (NewMem)-[:RELATES_TO {rel: 'continues_investigation'}]->(PriorMem)
    Orch->>API: Mark Session 2 Completed & Update Task Status to 'resolved'
    API-->>User: Task Successfully Resolved with Graph Traceability
```

### Operational Lifecycle Breakdown

1. **Task Assignment & Cold Check (Session 1)**: Agent A is assigned task `task-01` in clean session `sess-01`. It queries the repository for historical context; zero memories are found, confirming an initial cold investigation.
2. **Diagnostic Execution**: Agent A conducts bounded diagnostic analysis, discovering HTTP 504 gateway timeouts caused by connection pool exhaustion under 500 RPS load.
3. **Episodic Memory Graph Commit**: Agent A stores an `EPISODIC` memory entity linked to author `agent-a-investigator`, session `sess-01`, and task `task-01`.
4. **Structured Handoff Creation**: Agent A creates an explicit `Handoff` record specifying the target role (`agent-b-continuation`), findings summary, and the concrete next action: *"Increase max_connections to 50 in pool configuration and verify throughput."*
5. **Session 1 Termination**: Session 1 completes, recording its end timestamp and memory associations. Its in-memory execution process ends.
6. **Session 2 Initialization**: An independent session `sess-02` begins with Agent B. Agent B has no internal conversational context from Session 1.
7. **Task-Scoped Graph Recovery**: Agent B executes `retrieve_memories_for_task()` via openCypher, immediately recovering Agent A's findings and next action without re-running diagnostics.
8. **Continuation & Relationship Linking**: Agent B executes the remediation, verifies latency reduction, saves a `SEMANTIC` memory, and executes `link_memory_continuation()` to create a directional `RELATES_TO` edge in the graph. The task status updates to `resolved`.

---

## 🏗️ System Architecture & Data Flow

ContinuumAI is architected around a decoupled three-tier design: a typed Next.js 14 client, an asynchronous FastAPI service layer with centralized dependency singletons, and a dual-path graph persistence tier.

```mermaid
flowchart TB
    subgraph Client ["Client Presentation Layer (Next.js 14 App Router + TypeScript)"]
        UI_Landing["Public Landing Page (/)"]
        UI_Dash["Dashboard Shell (/app)"]
        UI_Graph["Interactive Graph Canvas (@xyflow/react)"]
        UI_Sessions["Session Inspector & Handoff View (/app/sessions)"]
        UI_Agents["Chronological Activity Timeline (/app/agents)"]
        UI_Memories["Categorized Memory Explorer (/app/memories)"]
    end

    subgraph Backend ["Service & Orchestration Layer (FastAPI + Python 3.11+)"]
        API_Router["Modular REST Router (/api)"]
        Deps["Centralized Dependency Singletons (deps.py)"]
        Orchestrator["Agent Orchestration Coordinator"]
        AgentA["Agent A (Investigator / Producer)"]
        AgentB["Agent B (Continuation / Consumer)"]
        MemService["Memory Service (Episodic / Semantic / Procedural)"]
        SessionService["Session Lifecycle Service"]
        TaskService["Task State & Isolation Service"]
        HandoffService["Structured Handoff Service"]
        Repo["FalkorDB openCypher Repository Layer"]
    end

    subgraph Storage ["Data & Persistence Tier"]
        FalkorDB[("FalkorDB Primary Graph Engine\n(Redis Wire Protocol · Parameterized openCypher)")]
        Fallback["In-Memory State Fallback\n(_in_memory_nodes · Unit Testing & Offline Mode)"]
    end

    Client -->|HTTP / JSON REST| API_Router
    API_Router --> Deps
    Deps --> Orchestrator
    Deps --> MemService
    Deps --> SessionService
    Deps --> TaskService
    Deps --> HandoffService
    Orchestrator --> AgentA
    Orchestrator --> AgentB
    AgentA --> MemService
    AgentA --> HandoffService
    AgentB --> MemService
    MemService --> Repo
    SessionService -.->|Dual-Write in Dev| Repo
    TaskService -.->|Dual-Write in Dev| Repo
    HandoffService --> Repo
    Repo -->|Live Cypher Execution| FalkorDB
    Repo -.->|Offline / Disconnected Fallback| Fallback
```

### Architectural Subsystems

1. **Client Presentation Tier (Next.js 14)**: Built with React 18 and Tailwind CSS, featuring an interactive `@xyflow/react` graph canvas rendering real-time nodes and edges. The client communicates exclusively through standard JSON REST endpoints without executing Cypher directly.
2. **Service & Orchestration Tier (FastAPI)**: Routes requests through `deps.py` dependency singletons, guaranteeing shared state across endpoints. The orchestrator coordinates deterministic or live agent workflows across separate sessions.
3. **Persistence Tier (FalkorDB & Fallback)**: The graph repository translates domain events into parameterized Cypher statements. If a live database connection is unavailable, it gracefully routes into an in-memory dictionary store, allowing local test suites to execute reliably.

---

## Graph Data Model

The ContinuumAI schema models agent state and workflows as first-class graph entities:

```text
 (Workspace) ──[:HAS_AGENT]──► (Agent)
     │                           │
     ├──[:HAS_SESSION]──► (Session) ◄──[:PARTICIPATED_IN]──┘
     │                      │
     │                      ├──[:RECORDED]──► (Memory) ◄──[:CREATED]── (Agent)
     │                      │                   ▲
     │                      │                   │ [:RELATES_TO]
     │                      │                   │
     │                      ├──[:RECORDED]──► (Memory)
     │                      │
     │                      └──[:RECORDED]──► (Handoff)
     │                                          ▲
     └──[:HAS_TASK]─────► (Task) ───────────────┼──[:HAS_HANDOFF]
                            │                   │
                            └──[:HAS_MEMORY]────┘
```

### Entity Nodes

* **`Workspace`**: Represents an isolated tenant environment (`id`, `name`, `created_at`).
* **`Agent`**: Autonomous agent identity (`id`, `role`, `status`, `workspace_id`).
* **`Session`**: Bounded execution instance (`id`, `workspace_id`, `status`, `started_at`, `ended_at`).
* **`Task`**: Unit of work being investigated or resolved (`id`, `workspace_id`, `title`, `context`, `status`).
* **`Memory`**: Discrete knowledge finding (`id`, `workspace_id`, `memory_type`, `content`, `summary`, `status`, `created_at`).
* **`Handoff`**: Formal transition record between agents (`id`, `workspace_id`, `summary`, `next_action`, `created_at`).
* **`Decision` & `Evidence`**: *Planned for future iterations to represent supporting telemetry and architectural choices.*

---

## Graph Relationships & Cypher Queries

All graph queries are defined in `backend/app/graph/queries.py` and utilize strictly parameterized Cypher statements:

### 1. Schema Indexes
```cypher
CREATE INDEX FOR (w:Workspace) ON (w.id);
CREATE INDEX FOR (m:Memory) ON (m.id);
CREATE INDEX FOR (t:Task) ON (t.id);
CREATE INDEX FOR (s:Session) ON (s.id);
CREATE INDEX FOR (a:Agent) ON (a.id);
```

### 2. Creating a Provenance-Linked Memory
```cypher
MATCH (w:Workspace {id: $workspace_id})
MATCH (a:Agent {id: $agent_id})
MATCH (s:Session {id: $session_id})
MATCH (t:Task {id: $task_id})
CREATE (m:Memory {
    id: $memory_id,
    workspace_id: $workspace_id,
    memory_type: $memory_type,
    content: $content,
    summary: $summary,
    source_agent_id: $agent_id,
    source_session_id: $session_id,
    status: 'active',
    created_at: $created_at
})
CREATE (a)-[:CREATED]->(m)
CREATE (s)-[:RECORDED]->(m)
CREATE (t)-[:HAS_MEMORY]->(m)
RETURN m.id AS id;
```

### 3. Task Context Retrieval Across Sessions
```cypher
MATCH (w:Workspace {id: $workspace_id})-[:HAS_TASK]->(t:Task {id: $task_id})
MATCH (t)-[:HAS_MEMORY]->(m:Memory {status: 'active'})
RETURN m.id AS id,
       m.workspace_id AS workspace_id,
       m.memory_type AS memory_type,
       m.content AS content,
       m.summary AS summary,
       m.source_agent_id AS source_agent_id,
       m.source_session_id AS source_session_id,
       m.created_at AS created_at
ORDER BY m.created_at ASC;
```

### 4. Linking Knowledge Continuation
```cypher
MATCH (prior:Memory {id: $prior_memory_id})
MATCH (newMem:Memory {id: $new_memory_id})
CREATE (newMem)-[:RELATES_TO {relationship: 'continues_investigation'}]->(prior)
RETURN newMem.id AS source, prior.id AS target;
```

---


## Repository Structure

```text
ContinuumAI/
├── .env.example              # Environment variables template
├── .gitignore                # Git exclusions (secrets, caches, build files)
├── ARCHITECTURE.md           # System architecture specification
├── design.md                 # Design system tokens and UI specifications
├── docker-compose.yml        # Multi-container orchestration (FalkorDB + Backend + Frontend)
├── PRD.md                    # Product requirements document
├── README.md                 # Primary open-source project documentation
├── TASKS.md                  # Development checklist and implementation roadmap
│
├── backend/                  # FastAPI Application
│   ├── Dockerfile            # Container build definition for backend service
│   ├── requirements.txt      # Python dependencies
│   ├── app/
│   │   ├── main.py           # Application lifespan and CORS configuration
│   │   ├── agents/           # Agent orchestration engine (Agent A, Agent B)
│   │   ├── api/              # API router and modular endpoints (memories, sessions, etc.)
│   │   │   └── deps.py       # Shared singleton dependency injection providers
│   │   ├── core/             # Configuration (Pydantic Settings) and logging
│   │   ├── graph/            # FalkorDB connection, queries, and repository layer
│   │   ├── models/           # Pydantic schemas (Agent, Task, Session, Memory, Graph)
│   │   └── services/         # Domain services (Memory, Session, Task, Handoff)
│   └── tests/                # Test suite (isolation, cross-routes, orchestrator, FalkorDB)
│
├── frontend/                 # Next.js 14 Web Application
│   ├── Dockerfile            # Container build definition for frontend service
│   ├── package.json          # Node.js dependencies and build scripts
│   ├── tsconfig.json         # TypeScript configuration
│   ├── tailwind.config.js    # Tailwind styling tokens
│   ├── app/                  # Next.js App Router pages
│   │   ├── page.tsx          # Public product landing page
│   │   └── app/              # Application dashboard routes (graph, sessions, agents, etc.)
│   ├── components/           # UI components (graph nodes, timeline, drawers)
│   └── lib/                  # REST API client and TypeScript interface definitions
│
└── docs/                     # Technical specifications and API documentation
    ├── api-spec.md           # OpenAPI endpoint documentation
    ├── demo-script.md        # Reproducible demonstration walkthrough
    ├── graph-schema.md       # Cypher schema and index reference
    └── local-development.md  # Detailed setup guide
```

---

## Prerequisites

Before setting up ContinuumAI locally, ensure the following runtimes are installed:

* **Python:** Version `3.11`, `3.12`, or `3.13` (Python `3.14` pre-release is also supported by pure-Python wheels).
* **Node.js:** Version `18.x` or `20.x` LTS with `npm`.
* **Database:** Either an active instance of **FalkorDB Cloud** (free tier available) or a local Docker engine.

---

## Local Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Halanaaz1401/ContinuumAI.git
cd ContinuumAI
```

### 2. Configure Environment Variables

Copy the template to create your local `.env` file:

```bash
# On Linux/macOS
cp .env.example .env

# On Windows PowerShell
Copy-Item .env.example .env
```

Open `.env` in an editor and configure your database endpoint and preferences.

---

## Environment Variables

The application relies on configuration values managed via Pydantic Settings in `backend/app/core/config.py`:

| Variable Name | Default Value | Description |
| :--- | :--- | :--- |
| `FALKORDB_HOST` | `localhost` | FalkorDB endpoint (or cloud hostname, e.g. `db-xxxx.falkordb.cloud`). |
| `FALKORDB_PORT` | `6379` | FalkorDB listening port. |
| `FALKORDB_USERNAME` | *(empty)* | Username for ACL authentication (typically `default` on cloud instances). |
| `FALKORDB_PASSWORD` | *(empty)* | Password or auth token for database authentication. |
| `FALKORDB_GRAPH_NAME` | `continuum_ai` | Target graph database key inside the FalkorDB instance. |
| `FALKORDB_SSL` | `false` | Set to `true` when connecting to SSL/TLS-enabled cloud instances. |
| `LLM_PROVIDER` | `mock` | Model adapter: `mock` (deterministic demo runner), `gemini`, or `openai`. |
| `LLM_API_KEY` | *(empty)* | Model provider API key (required only if `LLM_PROVIDER` is live). |
| `LLM_MODEL` | `gemini-1.5-flash` | Model identifier string. |
| `BACKEND_HOST` | `0.0.0.0` | Local bind address for the FastAPI backend. |
| `BACKEND_PORT` | `8000` | Local port for FastAPI. |
| `CORS_ORIGINS` | `http://localhost:3000` | Comma-separated list of allowed origins. |
| `NEXT_PUBLIC_API_BASE_URL` | `http://localhost:8000` | Backend URL used by client-side browser requests. |

---

## Running the Backend

### Using a Python Virtual Environment

```bash
# Navigate to backend directory or remain in root
cd backend

# Create and activate a virtual environment
python -m venv .venv

# On Linux/macOS
source .venv/bin/activate

# On Windows PowerShell
.\.venv\Scripts\Activate.ps1

# Install backend dependencies
pip install -r requirements.txt

# Start the FastAPI development server with auto-reload
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

Once running:
* **Interactive OpenAPI Docs:** `http://localhost:8000/docs`
* **Health Check Endpoint:** `http://localhost:8000/api/health`

---

## Running the Frontend

```bash
# Navigate to frontend directory
cd frontend

# Install Node.js dependencies
npm install

# Start the Next.js development server
npm run dev
```

Open `http://localhost:3000` in your browser:
* **Public Landing Page:** `http://localhost:3000/`
* **Graph Canvas & Activity Dashboard:** `http://localhost:3000/app`

---

## Running Tests

### Backend Unit & Integration Tests

The test suite validates data models, memory services, workspace isolation, dependency injection, and cross-session orchestration workflows:

```bash
# Run all unit and mock tests from the root directory
pytest backend/tests

# Run specifically with verbose output
pytest -v backend/tests
```

*Note: `backend/tests/test_falkordb_integration.py` requires an active FalkorDB instance and will automatically skip if the host is unreachable.*

### Frontend Type Verification

```bash
cd frontend
npm run type-check
```

---

## FalkorDB Setup & Connection

ContinuumAI is architected to use **FalkorDB** as its primary graph engine.

### Option A: Local Instance via Docker
```bash
docker run -p 6379:6379 -it --rm falkordb/falkordb:latest
```

### Option B: FalkorDB Cloud
1. Create a free instance on [app.falkordb.cloud](https://app.falkordb.cloud/).
2. Obtain the host endpoint, assigned port, and password from the **Connectivity** tab.
3. Update `.env`:
   ```dotenv
   FALKORDB_HOST=db-your-instance.falkordb.cloud
   FALKORDB_PORT=6379
   FALKORDB_USERNAME=default
   FALKORDB_PASSWORD=your_cloud_password
   FALKORDB_GRAPH_NAME=continuum_ai
   FALKORDB_SSL=true
   ```

### Current Connection Mechanism
In the current code baseline:
* [backend/app/graph/connection.py](file:///c:/Users/Hala/Downloads/Project%20Files/ContinuumAI/backend/app/graph/connection.py) attempts to connect using the official `falkordb` Python library.
* If the package is not installed or the database is offline, the backend logs a warning and enters an **in-memory fallback mode**.
* In fallback mode, nodes and edges are stored in internal memory dictionaries (`_in_memory_nodes`), allowing the UI and mock orchestration tests to run without crashing.

---

## Current Limitations & Known Issues

1. **In-Memory Fallback Active by Default:** If FalkorDB is offline or the driver cannot connect, the backend silently falls back to in-memory dictionaries. Persistence across server restarts requires an active database connection.
2. **Graph Visualizer Serialization:** The current implementation of `get_workspace_graph()` in `repository.py` serializes nodes and edges directly from `_in_memory_nodes`. Live Cypher serialization for visualization (`GET_WORKSPACE_GRAPH`) is implemented as a query definition but awaits direct binding in the live database path.
3. **Task & Session Persistence in Cypher:** While `CREATE_SESSION` and `CREATE_TASK` Cypher queries are defined in `queries.py`, `SessionService` and `TaskService` currently maintain lifecycle states in process memory. Full dual-write persistence to the graph is in active development.
4. **Deterministic Agent Mode:** Agent A and Agent B currently run deterministic diagnostic logic ("investigation of connection pool exhaustion") designed for consistent demonstrations. Live LLM API integration via external providers (Gemini / OpenAI) is defined in architecture but unlinked.
5. **Frontend Lint Configuration:** Next.js linting requires an explicit `.eslintrc.json` configuration file, currently omitted to avoid interactive prompts during builds.

---

## Roadmap

- [ ] **Phase 1: Real-Time Graph Persistence**
  - Bind `SessionService` and `TaskService` directly to FalkorDB `CREATE` and `MATCH` queries.
  - Implement full Cypher-backed node and edge serialization in `get_workspace_graph()`.
  - Introduce explicit visual badges on the frontend indicating real graph storage vs. fallback mode.
- [ ] **Phase 2: First-Class Evidence & Decision Entities**
  - Add `Evidence` and `Decision` nodes linked to `Task` and `Memory` via `SUPPORTS` and `BASED_ON` relationships.
  - Expand the React Flow drawer to display cryptographic checksums and logs.
- [ ] **Phase 3: Multi-Provider LLM Integration**
  - Implement dynamic prompt synthesis feeding historical graph context into Gemini 1.5 Flash and OpenAI GPT-4o.
  - Support automatic episodic memory extraction from raw multi-turn agent conversations.
- [ ] **Phase 4: Advanced GraphRAG & Hybrid Search**
  - Introduce vector embeddings alongside graph topologies for semantic similarity search over stored episodic memories.

---

## Security & Configuration

* **Credential Management:** Never commit `.env` or any file containing passwords or API keys. Verify that `.env` is listed in `.gitignore`.
* **Tenant Isolation:** All graph operations must explicitly supply `workspace_id`. Cross-tenant queries are blocked at both the API route and Cypher query levels.
* **Cypher Injection Mitigation:** All Cypher operations must use parameterized queries (`$parameter_name`) with dictionary parameters. Raw string formatting or concatenation in Cypher statements is strictly prohibited.

---

## Contributing

Contributions to ContinuumAI are welcome! Please follow these guidelines:

1. Fork the repository and create a feature branch (`git checkout -b feature/amazing-feature`).
2. Adhere to strict type hints in Python (`typing`, Pydantic models) and TypeScript.
3. Ensure all backend tests pass before opening a Pull Request (`pytest backend/tests`).
4. Keep Cypher queries strictly parameterized and documented in `queries.py`.
5. Open a Pull Request with a clear description of the problem solved.

---

## License

Licensing has not yet been specified for this project. All rights are currently reserved by the maintainer. An open-source license (such as Apache 2.0 or MIT) will be designated in a future release.

---

## Maintainer

Maintained and developed by **[@Halanaaz1401](https://github.com/Halanaaz1401)**.  
Repository: [https://github.com/Halanaaz1401/ContinuumAI](https://github.com/Halanaaz1401/ContinuumAI)
