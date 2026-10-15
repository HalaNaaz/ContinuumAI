# ContinuumAI — Product Requirements Document (PRD)
**Version:** 1.0  
**Status:** Pre-build specification / hackathon planning  
**Project:** ContinuumAI  
**Hackathon:** WeMakeDevs × FalkorDB — Track 2: Agent Memory and Coordination  
**Tagline:** AI that remembers. Agents that continue.  
**Primary graph database:** FalkorDB  
**Design reference:** [21st.dev — Startup Accelerator Website Template with Stencil Type](https://21st.dev/@kedhareswer/templates/startup-accelerator-website-template-with-stencil-type)  
**Related design guide:** `design.md`

> This PRD defines the product problem, scope, behavior, architecture, pages, data model, APIs, UI expectations, testing, and acceptance criteria. Treat it as the product source of truth while building. Where this document says “planned,” do not represent that feature as implemented until it is working and tested.

---

# 1. Executive Summary

ContinuumAI is a graph-powered memory and coordination layer for multi-agent AI workflows. It helps agents retain useful context across sessions, share relevant knowledge with other agents, and resume unfinished work without starting from zero.

The product is built around a demonstrable workflow:

1. Agent A receives a task and discovers useful information.
2. Agent A saves a structured memory and its relationships to FalkorDB.
3. Session 1 ends.
4. Agent B starts a new session and retrieves relevant memories from FalkorDB.
5. Agent B uses that context to continue the task and records new findings.
6. The graph reflects the updated knowledge and provenance.

FalkorDB must be essential to the product: it stores and retrieves connected memories, sessions, agents, tasks, decisions, and handoffs. The system must not be merely a chatbot with a conversation log or a graph used only as decoration.

## 1.1 One-sentence description

**ContinuumAI gives AI agents persistent, connected memory and a shared state so they can continue work and coordinate across sessions.**

## 1.2 Target users

- Developers building multi-agent AI systems.
- AI engineers experimenting with persistent agent memory.
- Researchers running long-lived, multi-step AI workflows.
- Technical evaluators and hackathon judges assessing agent memory and coordination.

## 1.3 Core differentiator

The product demonstrates verifiable continuity: a later session or different agent retrieves an earlier agent's relevant memory, uses it to continue work, and writes updated knowledge back to the shared graph.

---

# 2. Problem Statement

Multi-agent systems can lose useful context between sessions or fail to share discoveries across agents. Important facts, evidence, decisions, dependencies, and unfinished tasks may remain isolated in transient prompts or separate conversation histories.

This creates several problems:

1. **Session discontinuity:** a new session starts without the context required to continue prior work.
2. **Repeated work:** agents repeat investigations or actions because previous results are not discoverable.
3. **Fragmented knowledge:** one agent's discovery is unavailable or difficult for another agent to retrieve.
4. **Weak handoffs:** tasks transfer without enough context, decisions, evidence, or next steps.
5. **Unstructured memory:** flat chat history is difficult to query by relationships, task, source, or relevance.
6. **Memory lifecycle problems:** new findings need to update, supersede, or connect to existing memories rather than simply accumulate.
7. **Isolation and concurrency concerns:** memory should be scoped to the correct user/workspace, and concurrent reads/writes should not silently corrupt state.

## 2.1 Problem statement for the landing page

“AI agents lose context between sessions, repeat previous work, and struggle to share discoveries. ContinuumAI gives them persistent graph-based memory and a shared state to continue work together.”

---

# 3. Proposed Solution

ContinuumAI provides a shared graph-memory service and a small, observable multi-agent workflow.

### Core system behavior

- Store memories as structured graph entities with metadata and relationships.
- Retrieve relevant memories using task/session context and graph relationships.
- Separate episodic, semantic, and procedural memory categories.
- Track which agent created, retrieved, or updated a memory.
- Record task state and handoff context.
- Support a later session retrieving earlier knowledge.
- Scope memory by user/workspace so unrelated users cannot access each other's records.
- Expose graph changes and memory provenance in the UI.
- Make the end-to-end behavior demonstrable from the product interface.

### What the MVP is not

- Not a general-purpose chatbot.
- Not a generic autonomous SOC/SRE platform.
- Not a model-training platform.
- Not a decorative graph dashboard.
- Not a production enterprise memory service with unverified guarantees.
- Not a collection of unrelated AI features.

Keep the implementation focused on the official Track 2 problem: **Agent Memory and Coordination**.

---

# 4. Product Goals and Non-Goals

## 4.1 Goals

1. Demonstrate persistent memory across separate sessions.
2. Demonstrate knowledge sharing between at least two agents.
3. Demonstrate a task handoff with stored context and a next step.
4. Use FalkorDB as the primary, load-bearing graph database.
5. Show graph relationships and memory provenance in the UI.
6. Provide a clear, repeatable end-to-end demo.
7. Keep setup affordable and compatible with free-tier resources where feasible.
8. Deliver a clean repository, README, architecture explanation, example Cypher queries, tests, and demo instructions.

## 4.2 Non-goals for the hackathon MVP

- Large-scale production deployment.
- Billing, subscriptions, or pricing.
- Social features or a user community.
- Testimonials, customer logos, or fabricated usage metrics.
- Fine-tuning a model.
- Complex enterprise RBAC beyond what is necessary to demonstrate user/workspace isolation.
- A full visual workflow editor.
- Many agents that add complexity without improving the core demonstration.
- A news/blog CMS.
- A public multi-tenant SaaS launch with production guarantees.

---

# 5. Track Alignment

The implementation should directly address these Agent Memory and Coordination themes:

| Track theme | ContinuumAI implementation | Proof required |
|---|---|---|
| Persistent memory | Store memories in FalkorDB and retrieve them later | End Session 1; start Session 2; retrieve a Session 1 memory |
| Memory updates over time | Add, link, revise, or supersede memories with traceable provenance | Show an existing memory being linked to or superseded by a new finding |
| Shared agent state | Multiple agents read/write shared graph records in the same workspace | Agent B retrieves a memory created by Agent A |
| Agent handoffs | Store task state, summary, findings, and next action | Handoff record is visible and Agent B resumes the task |
| Episodic memory | Record events and experiences | UI displays a past event with session/agent source |
| Semantic memory | Store facts and relationships | UI displays a fact connected to relevant entities |
| Procedural memory | Store reusable steps or methods | UI displays a reusable procedure |
| User/workspace isolation | Scope all graph operations to a workspace/user identity | Tests show workspace A cannot retrieve workspace B's memory |
| Concurrent access | Use safe, bounded writes and explicit error handling | Test concurrent requests for expected integrity; document limitations |

Do not claim a track requirement is satisfied until the behavior and evidence are present.

---

# 6. Product Scope

## 6.1 MVP must-have features

- Create and inspect a workflow/session.
- Run at least two distinguishable agents or agent roles.
- Store structured memory in FalkorDB.
- Retrieve relevant prior memory in a new session.
- Share memory between agents.
- Record task status and a handoff.
- Show memory and relationship changes in a graph view.
- Show an activity timeline with agent actions.
- Separate memory by workspace/user scope.
- Display clear loading, empty, success, and error states.
- Provide a repeatable seeded demo without pretending seed data is live activity.
- Include setup instructions and tests.

## 6.2 Stretch features (only after core behavior works)

- Memory search filters and category facets.
- A memory detail drawer with source, timestamp, and relationships.
- Visual diff/history when a memory is superseded.
- A small procedural-memory replay.
- Export a graph snapshot or event log.
- Additional agent roles.
- More elaborate 3D hero animation.

## 6.3 Explicitly defer

- Billing.
- Team invitations and enterprise permissions.
- Full user account management if it delays the demo.
- Complex vector-database integration.
- Unnecessary microservices.
- Production-scale distributed coordination.
- Unverified claims about backups, durability, or high availability.

---

# 7. Information Architecture: How Many Pages?

Build **one public landing page and six focused application pages**. This is enough to explain the product and prove the core workflow without overbuilding.

## 7.1 Public site

### Page 1 — Landing (`/`)
Purpose: explain the problem, product, workflow, and provide access to the demo and repository.

Sections in order:
1. Navigation.
2. Hero: “AI THAT REMEMBERS. AGENTS THAT CONTINUE.”
3. Capability strip: Persistent Memory / Shared Knowledge / Cross-Session Continuity.
4. Problem: why sessions and agents lose context.
5. Interactive or clearly labeled demo preview.
6. Memory graph preview.
7. How it works.
8. Memory types: episodic, semantic, procedural.
9. Architecture: Agents → API → FalkorDB.
10. Use cases, clearly distinguished from implemented features.
11. FAQ.
12. Final CTA and footer.

Visual direction: adapt the supplied 21st.dev stencil-grid template. Keep the black/off-white/orange palette, oversized geometric headings, thin grid lines, monospace metadata, asymmetric hero, and restrained motion. Do not copy the template's unrelated copy, metrics, or brand.

## 7.2 Application pages

### Page 2 — Overview (`/app`)
Purpose: a high-level view of the current demo/workspace.

Show:
- Current workspace or demo environment.
- Recent sessions.
- Agent status and last activity.
- Recent memory writes and retrievals.
- Latest handoffs.
- A clear “Run demo workflow” action if the workflow is implemented.
- Only real backend metrics, or explicitly labeled sample data.

### Page 3 — Sessions (`/app/sessions`)
Purpose: inspect session history and continuity.

Show:
- Session ID/name.
- Started/ended time if recorded.
- Agents involved.
- Task and status.
- Memories created/retrieved.
- Handoff summary.
- Session detail view with prior context and next steps.

Key interaction: select Session 1, then open Session 2 and inspect the memory reused.

### Page 4 — Agent Activity (`/app/agents`)
Purpose: explain what each agent did.

Show:
- Agent role/name and current state.
- Events such as task received, memory retrieved, finding added, memory updated, and handoff created.
- Source session and timestamp where available.
- A chronological activity timeline.
- Errors and retries, if implemented.

Do not expose hidden chain-of-thought. Show concise action summaries, inputs/outputs appropriate for debugging, tool calls, memory references, and observable events—not private reasoning traces.

### Page 5 — Memory Graph (`/app/graph`)
Purpose: visually inspect FalkorDB's actual connected data.

Show:
- Graph nodes and relationships returned from the backend.
- Node types such as Agent, Session, Memory, Task, Decision, and Evidence, according to the implemented schema.
- Relationship labels.
- Node selection and a detail panel.
- Zoom, pan, fit-to-view, and basic filters.
- Loading, empty, and error states.
- A small legend.

Graph data must come from FalkorDB through the backend. A seeded example may be offered as a demo dataset but must be labeled as such.

### Page 6 — Memory Explorer (`/app/memories`)
Purpose: search and inspect stored memories.

Show:
- Search by text or supported metadata.
- Filters for memory type, agent, session, and task where supported.
- Memory content/summary.
- Source/provenance.
- Created/updated time if recorded.
- Connected entities/relationships.
- Status such as active or superseded, only if the lifecycle is implemented.

### Page 7 — Settings & Workspace (`/app/settings`)
Purpose: make workspace scope and demo configuration understandable.

MVP scope:
- Current workspace/demo identity.
- Memory isolation explanation.
- Backend/database connection status without exposing credentials.
- Model/provider configuration status, if relevant.
- Clear demo reset action, with confirmation, only if safe and implemented.
- Version/build information if available.

Do not build a large settings system. It is acceptable to keep this page minimal.

## 7.3 Supporting routes (not counted as core pages)

- `/docs` only if useful documentation is built; otherwise use README.
- `/health` is an API health endpoint, not a user-facing page.
- `/app/sessions/[id]` can be a session detail route under Sessions.
- `/app/memories/[id]` can be a memory detail route or drawer.
- `/404` and error boundaries.

### Navigation labels

Public: `Product`, `How it works`, `Memory Graph`, `Documentation`, `Open Demo`  
App: `Overview`, `Sessions`, `Agent Activity`, `Memory Graph`, `Memory Explorer`, `Settings`

Only display links that lead to working destinations.

---

# 8. Primary User Journey

## 8.1 The signature demo: Session 1 → Session 2

Use a simple, deterministic example such as a research task or software debugging task. Avoid expanding into a large domain-specific product.

### Session 1
1. User starts a task: “Investigate why the sample service is failing and record what you discover.”
2. Agent A retrieves any relevant existing memories.
3. Agent A records a finding, supporting evidence, a decision, and an unfinished next step.
4. The system saves the memory and relationships to FalkorDB.
5. The UI shows the memory write and graph update.
6. Session 1 is marked complete or paused.

### Session 2
1. User starts a new session for the same continuing task.
2. Agent B queries FalkorDB for relevant memories by workspace, task context, and relationships.
3. Agent B receives the retrieved memory with provenance.
4. Agent B uses it to continue the task instead of repeating the previous steps.
5. Agent B records a new finding and links it to the earlier memory/task.
6. The UI shows the retrieval event, handoff/continuity, and graph update.

### Acceptance conditions
- Session 2 can retrieve a memory created in Session 1 after a new session/process is created.
- The retrieved memory includes a source or provenance reference.
- Agent B's next action demonstrably uses the retrieved context.
- The new finding is stored in FalkorDB and linked to the previous task/memory.
- The graph view reflects the saved records.
- The activity timeline makes the sequence understandable.
- The demo can be reset and repeated.

---

# 9. Memory Model

The MVP should distinguish memory categories without building a complicated cognitive architecture.

## 9.1 Memory types

### Episodic
Records what happened in a particular task/session.
Example: “In Session 1, Agent A tested the sample endpoint and observed a timeout.”

### Semantic
Stores a reusable fact or relationship.
Example: “Service A depends on Service B.”

### Procedural
Stores reusable steps or methods.
Example: “To investigate this class of failure: inspect logs, check dependency status, then compare the last configuration change.”

These are product categories. Their exact representation must match the graph schema and code.

## 9.2 Memory record fields

Minimum logical fields:
- `id`: stable identifier.
- `workspace_id`: required scope.
- `memory_type`: episodic, semantic, or procedural.
- `content`: concise memory text.
- `summary`: optional short summary.
- `source_agent_id`: creator/author.
- `source_session_id`: session where created.
- `task_id`: associated task, when applicable.
- `created_at`.
- `updated_at`.
- `status`: active/superseded only if implemented.
- `metadata`: bounded structured metadata, with secrets excluded.

Relationships provide connections between memories, agents, sessions, tasks, decisions, and evidence. Avoid duplicating all relationships as unstructured text.

## 9.3 Memory update behavior

Do not blindly append duplicate memories. For the MVP:
- Search for relevant memories before writing when appropriate.
- Link related memories.
- When a new fact conflicts with an old fact, preserve provenance and mark the old one superseded only if that lifecycle is implemented.
- Never silently erase important history.
- Record the agent/session responsible for a change.

---

# 10. Graph Data Model (Initial Proposal)

The exact schema should be validated against FalkorDB and the chosen graph query patterns before implementation. Keep it small.

## 10.1 Suggested node labels

- `Workspace`
- `Agent`
- `Session`
- `Task`
- `Memory`
- `Decision`
- `Evidence`
- Optional `Procedure` if procedural memory benefits from a dedicated node.

## 10.2 Suggested relationships

- `(Workspace)-[:HAS_AGENT]->(Agent)`
- `(Workspace)-[:HAS_SESSION]->(Session)`
- `(Workspace)-[:HAS_TASK]->(Task)`
- `(Agent)-[:PARTICIPATED_IN]->(Session)`
- `(Session)-[:WORKED_ON]->(Task)`
- `(Agent)-[:CREATED]->(Memory)`
- `(Session)-[:RECORDED]->(Memory)`
- `(Memory)-[:RELATES_TO]->(Memory)`
- `(Memory)-[:SUPPORTS]->(Decision)`
- `(Memory)-[:REFERENCES]->(Evidence)`
- `(Task)-[:HAS_MEMORY]->(Memory)`
- `(Agent)-[:HANDED_OFF_TO]->(Agent)` or a dedicated `Handoff` node if handoff history requires its own fields.
- `(Memory)-[:SUPERSEDES]->(Memory)` when memory versioning is implemented.

Use consistent directionality and naming. Do not create every possible relationship without a real query/use case.

## 10.3 Graph schema rules

- Every workspace-owned record must be associated with a workspace.
- Use stable IDs; do not depend on display names as identifiers.
- Validate node types, relationship types, and required fields.
- Parameterize Cypher queries wherever supported; never interpolate raw user input into query strings.
- Keep graph writes and retrieval operations in a dedicated repository/service layer.
- Document the most important Cypher queries in the README.
- Confirm FalkorDB query syntax and supported constraints/indexing in the installed version before implementing schema migrations or indexes.

---

# 11. Agent Architecture

Keep the initial agent team small: **two primary agents plus an optional coordinator**.

## 11.1 Agent roles

### Agent A — Investigator / Producer
- Receives a task.
- Retrieves relevant existing memories.
- Performs the assigned bounded work.
- Produces a concise finding and evidence reference.
- Saves an episodic memory and relationships.
- Creates or updates a next step/handoff.

### Agent B — Continuation / Consumer
- Starts in a separate session.
- Queries the shared graph for memories relevant to the same task.
- Receives the memory content and provenance.
- Continues from the stored next step.
- Saves a new finding linked to prior context.

### Optional Coordinator
- Splits or routes tasks.
- Selects the appropriate agent role.
- Creates a handoff record.
- Avoid this role if it adds complexity without improving the demo.

## 11.2 Agent execution contract

Each agent run should produce a structured result, such as:
- `status`
- `task_id`
- `session_id`
- `summary`
- `memories_retrieved`
- `memories_created_or_updated`
- `next_action`
- `handoff_target`, when applicable
- `errors`, if any

Do not store private chain-of-thought. Store task-relevant summaries, observable actions, evidence, decisions, and next steps.

## 11.3 Model provider

Keep model calls behind a provider/service interface. Choose one model provider that is accessible within available free quota during implementation. Do not hardwire product architecture to a single model's proprietary response format. Never expose API keys to the browser or commit them to source control.

If the model API is unavailable, the deterministic demo workflow should fail clearly or use a clearly labeled mock mode; do not silently present canned results as live model output.

---

# 12. Mandatory Technology vs. Chosen Stack

## 12.1 Mandatory for this product/track

| Technology or capability | Status | Why |
|---|---|---|
| FalkorDB | **Mandatory / core** | Primary graph memory and relationships; product behavior must depend on it |
| Graph queries and relationships | **Mandatory** | Memory retrieval and agent coordination must use the graph |
| Persistent session-to-session retrieval | **Mandatory behavior** | Core proof of the problem being solved |
| Shared memory across agents | **Mandatory behavior** | Core coordination proof |
| Traceable task/memory provenance | Strongly required for credible demonstration | Shows which agent/session produced and reused knowledge |
| User/workspace scope | Required product safeguard | Prevents cross-workspace memory leakage |
| Public repository and clear README | Hackathon delivery requirement to verify against official rules | Enables evaluation and reproducibility |
| Repeatable demo and tests | Essential deliverable | Makes the core behavior verifiable |

The official hackathon rules are authoritative. Re-check the live rules page before submission for exact submission format, deadline, and any additional mandatory requirements.

## 12.2 Proposed stack to use

| Layer | Choice | Role |
|---|---|---|
| Frontend | Next.js + TypeScript | Landing page and product interface |
| Styling | Tailwind CSS | Design tokens and responsive layout |
| UI primitives | Existing project components; add a component library only if needed | Consistent controls and accessibility |
| Graph visualization | React Flow (`@xyflow/react`) | Interactive graph view |
| Backend | Python + FastAPI | Agent orchestration, memory API, graph access |
| Graph database | FalkorDB Cloud free tier initially, or supported local FalkorDB for development | Persistent graph storage |
| Graph query | Cypher supported by the selected FalkorDB version | Query and mutate connected memories |
| Model | One available LLM API behind a provider adapter | Agent task execution and summarization |
| Validation | Pydantic | API and agent-result schemas |
| Testing | Pytest for backend; existing frontend test/lint/build tools | Regression and acceptance tests |
| Version control | Git + GitHub | Source, README, issues, reproducible submission |
| Deployment | Use the simplest compatible free-tier option, or local demo if reliable | Public or reproducible demo |

### Stack rules
- Inspect the repository before adding or replacing dependencies.
- If the supplied 21st.dev template has an existing framework, preserve it where practical.
- Avoid unnecessary Redis, Elasticsearch, vector DBs, message brokers, Kubernetes, or microservices for the MVP.
- Add embeddings/vector search only if basic graph/context retrieval is insufficient and there is time to test it.
- Do not assume a free-tier feature is available without checking the current plan and testing it.
- Keep database credentials and model API keys on the backend, in environment variables.

---

# 13. High-Level Platform Architecture

```text
Browser
  |
  | HTTPS / JSON
  v
Next.js + TypeScript
  |-- Public landing page
  |-- Overview / sessions / activity
  |-- Memory graph / memory explorer
  |
  | API requests
  v
FastAPI Backend
  |-- Workspace and request validation
  |-- Session and task service
  |-- Agent orchestration service
  |-- Memory retrieval service
  |-- Memory write/update service
  |-- Handoff service
  |-- FalkorDB repository (parameterized Cypher)
  |-- LLM provider adapter
  |
  +-----------------------> LLM API
  |
  v
FalkorDB
  |-- Workspace
  |-- Agents
  |-- Sessions
  |-- Tasks
  |-- Memories
  |-- Decisions / Evidence / Handoffs
  |-- Relationships and provenance
```

## 13.1 Request flow

1. Frontend sends a task/session request to FastAPI.
2. Backend validates the workspace scope and request payload.
3. Agent orchestration requests relevant memories from the memory service.
4. Memory service queries FalkorDB using the task and workspace context.
5. Agent receives retrieved memories and provenance.
6. Agent performs bounded work through the model/provider adapter and allowed tools.
7. Backend validates the agent result.
8. Memory service writes new/updated graph records and relationships.
9. Backend returns the run summary and event records.
10. Frontend refreshes the session timeline and graph view.

## 13.2 Failure handling

- Database unavailable: return a clear error; do not claim that memory was saved.
- Model API unavailable: show an actionable error or explicitly labeled deterministic demo mode.
- Invalid agent output: validate and reject or safely retry within a bounded limit.
- Missing prior memory: show “No relevant memory found” and let the agent proceed without fabricated context.
- Partial workflow failure: record the failed step and preserve successfully saved state where possible.
- Timeout: show a visible state and allow a safe retry without blindly duplicating graph records.

---

# 14. API Surface (Initial Proposal)

Route names may change to fit the existing repository, but preserve the behaviors.

| Method | Route | Purpose |
|---|---|---|
| `GET` | `/api/health` | Report backend health; do not expose secrets |
| `GET` | `/api/workspaces/current` | Return current demo/workspace context |
| `GET` | `/api/sessions` | List sessions in the current workspace |
| `POST` | `/api/sessions` | Create a session |
| `GET` | `/api/sessions/{session_id}` | Retrieve session details and summary |
| `POST` | `/api/tasks` | Create a task |
| `POST` | `/api/tasks/{task_id}/run` | Run the bounded agent workflow |
| `GET` | `/api/tasks/{task_id}/events` | Retrieve observable workflow events |
| `GET` | `/api/memories` | Search/list memories with supported filters |
| `GET` | `/api/memories/{memory_id}` | Retrieve memory details and provenance |
| `POST` | `/api/memories` | Create a validated memory |
| `PATCH` | `/api/memories/{memory_id}` | Update supported memory metadata/content |
| `GET` | `/api/graph` | Return workspace-scoped nodes and edges |
| `POST` | `/api/handoffs` | Create a handoff with summary and next step |
| `GET` | `/api/handoffs` | List handoffs for the current workspace |

Implement only endpoints needed by the UI and demo. Do not create unused APIs just because they are listed here. Use consistent response/error schemas, pagination for potentially large lists, and strict workspace scoping.

---

# 15. Security, Privacy & Reliability Requirements

Minimum safeguards:
- Never commit API keys, database URLs, or secrets.
- Keep secrets on the backend.
- Validate request payloads and constrain field sizes.
- Use parameterized Cypher queries; do not concatenate user input into query strings.
- Apply workspace scope to every graph read and write.
- Do not allow the frontend to select arbitrary workspace IDs without authorization/validation.
- Avoid storing passwords, access tokens, or unnecessary sensitive data in memories.
- Sanitize logs and do not expose credentials in errors.
- Set reasonable request timeouts and bounded retries.
- Validate graph data returned to the frontend.
- Clearly distinguish simulated mode from live mode.
- Test memory isolation with at least two separate workspace IDs.
- Document any limitations of the selected free-tier database and model API.

For a hackathon demo, implement a clearly defined demo identity/workspace scope if full authentication would delay the core proof. Do not claim that demo scoping is equivalent to production authentication.

---

# 16. Visual Design Requirements

Follow `design.md` as the detailed visual source of truth.

### Signature style
- Near-black background: `#111111`.
- Warm off-white text: `#F0EFEA`.
- Orange accent: `#FF681F`.
- Fine borders and visible editorial grid.
- Oversized geometric/stencil headings for the public landing page.
- Monospace metadata and technical labels.
- Restrained motion and a distinctive linked-node hero object.

### Landing page
Use the supplied 21st.dev template as visual inspiration, adapting the layout and copy to ContinuumAI. Do not use the original template's unrelated stats or claims.

### Application UI
Reuse the same palette, type system, grid/border style, and accent color. Prioritize legibility, data density, keyboard access, and task completion over dramatic display typography.

### Required UI states
- Loading.
- Empty/no memories.
- No relevant memory found.
- Successful memory retrieval.
- Successful memory write/update.
- Agent running/completed/failed.
- Database/API error.
- Demo/sample data clearly labeled.

### Accessibility
- Semantic HTML.
- Visible keyboard focus.
- Accessible button labels and form labels.
- Sufficient contrast.
- Reduced-motion support.
- Graph data has a textual/list alternative for users who cannot operate a visual graph.

---

# 17. Non-Functional Requirements

- **Reproducibility:** a reviewer can follow the README to run the demo.
- **Clarity:** a first-time reviewer understands the core value quickly.
- **Reliability:** the core demo can be reset and repeated.
- **Performance:** avoid large blocking 3D assets; load noncritical visuals lazily.
- **Responsive layout:** support desktop and mobile layouts.
- **Data integrity:** validate memory writes and preserve provenance.
- **Observability:** show meaningful event records for memory retrieval, writes, updates, and handoffs.
- **Maintainability:** keep graph queries and memory logic out of UI components.
- **Scope control:** prioritize the signature workflow over secondary features.

Do not state specific latency, scale, availability, or concurrency targets until they are measured and justified.

---

# 18. Acceptance Criteria

The MVP is ready for evaluation only when the core criteria below are tested.

## Core workflow
- [ ] Agent A can run a task in Session 1.
- [ ] A structured memory is written to FalkorDB.
- [ ] The saved memory has workspace, session, agent, and task provenance as applicable.
- [ ] Session 1 can end and Session 2 can start independently.
- [ ] Agent B can retrieve the relevant Session 1 memory from FalkorDB.
- [ ] Agent B's continuation uses the retrieved memory.
- [ ] Agent B writes a new memory/finding linked to the existing task or memory.
- [ ] The graph view shows the saved nodes and relationships.
- [ ] The activity timeline shows retrieval, write/update, and handoff events.
- [ ] A reviewer can repeat the workflow using documented steps.

## Isolation and error handling
- [ ] Workspace A cannot retrieve Workspace B's memories through supported API paths.
- [ ] Invalid input returns a clear validation error.
- [ ] Database failure does not produce a false “saved” success state.
- [ ] Missing memories are handled without fabricating retrieval results.
- [ ] Secrets are not committed or sent to the browser.

## UI and delivery
- [ ] Navigation and CTAs work.
- [ ] Landing page follows `design.md`.
- [ ] Core pages work at desktop and mobile widths.
- [ ] Empty/loading/error states are present.
- [ ] Frontend lint/type-check/build commands pass where configured.
- [ ] Backend tests pass.
- [ ] README includes setup, environment variables, architecture, demo steps, and known limitations.
- [ ] Important Cypher queries and graph schema are documented.
- [ ] Demo video or recording is prepared if required by official submission rules.
- [ ] AI-assisted code is understood, tested, and disclosed if required by the event rules.

---

# 19. Testing Plan

### Unit tests
- Memory schema validation.
- Workspace-scope enforcement.
- Memory type validation.
- Agent output schema validation.
- Handoff payload validation.
- Error mapping.

### Integration tests
- Write memory to FalkorDB and read it back.
- Link memory to its session, task, and agent.
- Retrieve a Session 1 memory from Session 2.
- Write an updated finding and confirm graph relationships.
- Ensure workspace isolation.
- Verify database/model failure states.

### End-to-end demo test
1. Reset or load a labeled demo workspace.
2. Run Agent A in Session 1.
3. Confirm memory write.
4. End Session 1.
5. Start Session 2 with Agent B.
6. Confirm the earlier memory is retrieved.
7. Confirm Agent B uses the memory and writes a new finding.
8. Open the graph and activity timeline.
9. Repeat from a clean state.

Use synthetic, public, or owned demonstration data. Avoid putting real secrets or private user data in the demo.

---

# 20. Hackathon Execution Plan

The event window is understood to be **15–18 October 2026**, and main coding/design work must start after the hackathon launch according to the user's understanding of the event rules. Re-check the official rules before the event.

### Before launch — planning only
- Review the official Track 2 wording and rules.
- Finalize this PRD and `design.md`.
- Plan the schema, architecture, acceptance criteria, and demo story.
- Check the chosen template's license and understand its dependencies.
- Do not begin prohibited main implementation work before the permitted start time.

### Day 1 — Foundation
- Inspect/initialize the permitted codebase.
- Set up frontend and backend.
- Connect FalkorDB.
- Implement workspace, session, task, and memory basics.
- Validate a simple graph write/read.

### Day 2 — Core differentiation
- Implement Agent A and Agent B roles.
- Implement cross-session memory retrieval.
- Implement handoff/next-step context.
- Save updated memories and relationships.
- Add the first complete deterministic demo.

### Day 3 — Product UI and validation
- Build landing page and focused app pages.
- Connect memory graph and activity timeline to backend data.
- Add isolation/error tests.
- Fix usability and responsive issues.
- Prepare README and architecture/Cypher documentation.

### Day 4 — Submission hardening
- Run the complete demo repeatedly.
- Test from a clean environment.
- Fix critical bugs only; avoid adding unrelated features.
- Record demo video if required.
- Confirm repository visibility, submission links, rules, and final checklist.

This schedule is a planning proposal, not a guarantee. Protect time for the core demo and testing.

---

# 21. Repository Structure (Suggested)

Adapt this to the existing template and repository; do not restructure blindly.

```text
continuumai/
├── design.md
├── PRD.md
├── README.md
├── .env.example
├── frontend/
│   ├── app/
│   │   ├── page.tsx
│   │   └── app/
│   │       ├── page.tsx
│   │       ├── sessions/
│   │       ├── agents/
│   │       ├── graph/
│   │       ├── memories/
│   │       └── settings/
│   ├── components/
│   ├── lib/
│   └── public/
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── api/
│   │   ├── models/
│   │   ├── services/
│   │   ├── agents/
│   │   ├── graph/
│   │   └── core/
│   ├── tests/
│   └── requirements.txt
└── docs/
    ├── architecture.md
    ├── graph-schema.md
    └── demo-script.md
```

The structure is illustrative. Preserve the actual starter/template structure when that is more appropriate.

---

# 22. Environment Variables

Use `.env.example` with placeholder values only. Never commit `.env`.

Potential variables (names can be adapted to the chosen FalkorDB client/provider):
```dotenv
FALKORDB_HOST=
FALKORDB_PORT=
FALKORDB_USERNAME=
FALKORDB_PASSWORD=
FALKORDB_GRAPH_NAME=
LLM_PROVIDER=
LLM_API_KEY=
LLM_MODEL=
NEXT_PUBLIC_API_BASE_URL=
```

Do not expose `FALKORDB_PASSWORD` or `LLM_API_KEY` through any `NEXT_PUBLIC_` variable. Confirm the connection format and TLS requirements for the selected FalkorDB deployment.

---

# 23. Landing Page Copy Starter

**Eyebrow:** PERSISTENT MEMORY FOR AI AGENTS

**Headline:** AI THAT REMEMBERS. AGENTS THAT CONTINUE.

**Supporting copy:** ContinuumAI helps agents retain useful memories across sessions, share knowledge, and resume unfinished workflows through a shared graph powered by FalkorDB.

**Primary CTA:** EXPLORE THE DEMO  
**Secondary CTA:** VIEW ON GITHUB

**Problem heading:** EVERY SESSION SHOULDN'T START FROM ZERO.

**How-it-works heading:** REMEMBER. CONNECT. CONTINUE.

**Final CTA:** GIVE YOUR AGENTS THE MEMORY TO MOVE FORWARD.

Use these as starting copy. Refine after the real workflow is implemented so the claims match the product.

---

# 24. Instructions for Antigravity

Treat `PRD.md` as the product requirements source of truth and `design.md` as the visual design source of truth.

Before writing code:
1. Inspect the current repository and summarize its framework, routes, dependencies, and existing functionality.
2. Identify which parts of the 21st.dev template can be reused and verify its usage/license terms.
3. Compare the existing codebase with this PRD.
4. Produce a short implementation plan grouped into: existing/reusable, missing/required, optional/stretch.
5. Flag conflicts or decisions that genuinely block implementation; do not silently invent answers.
6. Do not replace a working stack or remove existing functionality without a clear reason.

Then implement in small, testable increments:
1. FalkorDB connection and graph write/read.
2. Session and memory schema.
3. Session 1 → Session 2 retrieval.
4. Agent-to-agent handoff and memory update.
5. API tests and workspace isolation.
6. Graph/activity UI connected to real backend responses.
7. Landing page using `design.md`.
8. Responsive polish, docs, and demo.

After each increment:
- Run relevant tests and type checks.
- Report what was changed and what passed/failed.
- Keep a list of known limitations.
- Never claim a feature works unless it has been exercised.
- Never substitute decorative graph data for the actual FalkorDB-backed workflow.

## Final Definition of Done

ContinuumAI is a focused, polished demonstration of persistent cross-session agent memory and coordination. At least two agents share and update knowledge through FalkorDB; a new session retrieves and uses earlier memory; the graph and event timeline make this behavior verifiable; and the repository contains clear setup, architecture, test, and demo instructions.
