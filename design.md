# ContinuumAI — Design System & Vibe-Coding Guide

> **Product:** ContinuumAI  
> **Track:** FalkorDB Hackathon — Track 2: Agent Memory and Coordination  
> **Tagline:** AI that remembers. Agents that continue.  
> **Purpose of this file:** Give AI coding tools a clear, consistent design brief so the landing page and product UI feel like one premium product.

---

## 1. Product Understanding

ContinuumAI is a graph-powered multi-agent system designed to help AI agents:

- Retain useful memory across sessions.
- Share relevant knowledge between agents.
- Preserve decisions, evidence, unfinished tasks, and dependencies.
- Resume a workflow instead of restarting from scratch.
- Update shared memory as new information becomes available.

**Core proof point:** An agent stores a useful memory in Session 1. After that session ends, another agent retrieves the memory in Session 2, uses it to continue the task, and saves new knowledge back to FalkorDB.

The graph database must support the actual product behavior. Do not treat the graph as decorative artwork.

### Product design principles

1. **Show, don't just claim.** Prioritize an understandable working demo over generic AI marketing copy.
2. **Premium, not noisy.** Use a distinctive editorial layout, restrained animation, and precise spacing.
3. **Technical, not intimidating.** Developers and hackathon judges should understand the workflow quickly.
4. **Honest UI.** Never present sample metrics, mock agent activity, or placeholder graph data as live system data.
5. **Function before decoration.** Interactions must work; animations must not hide important information.
6. **One visual identity.** Landing page, documentation, and dashboard should share colors, typography, borders, and interaction patterns.

---

## 2. Visual Direction

### Primary inspiration

Use the supplied 21st.dev **Startup Accelerator Website Template with Stencil Type** as the main visual reference:

https://21st.dev/@kedhareswer/templates/startup-accelerator-website-template-with-stencil-type

Take inspiration from its:
- Oversized geometric stencil headlines.
- Near-black backgrounds and warm off-white typography.
- Bright orange calls to action.
- Thin grid lines and boxed editorial layouts.
- Asymmetric, multi-column hero composition.
- Monospace labels and compact technical metadata.
- Distinctive 3D object in the hero.
- Large typographic footer and structured FAQ.
- Small corner markers, index labels, and fine borders.

**Do not copy the original site's brand, wording, statistics, team identities, or unrelated accelerator content.** Adapt the visual language to ContinuumAI and its real capabilities.

### Desired impression

The product should feel like a blend of:
- An experimental AI infrastructure startup.
- A polished developer tool.
- A technical research lab.
- An editorial, grid-based design system.

Avoid the default “purple gradient AI SaaS template” look. Orange is the signature accent; use it sparingly and consistently.

---

## 3. Color Tokens

Use these initial design tokens. Adjust only if the existing template or accessibility checks require it.

| Token | Hex | Usage |
|---|---|---|
| `--color-bg` | `#111111` | Main page background (deep near-black) |
| `--color-surface` | `#171717` | Cards, raised panels, node backdrops |
| `--color-surface-2` | `#1D1D1B` | Highlighted surfaces, hover states |
| `--color-text` | `#F0EFEA` / `#FFFFFF` | Primary text and high-contrast headlines |
| `--color-muted` | `#A6A49E` / `#888888` | Supporting technical metadata and secondary text |
| `--color-border` | `#383835` / `#262626` | Fine technical grid lines and node borders |
| `--color-accent` | `#FF6A00` | Primary activity accent, pulse glows, data-flow particles |
| `--color-success` | `#8DD8B5` | Verified persistence and healthy connection states |
| `--color-warning` | `#E8BD70` | Handoff warnings and transitional states |
| `--color-danger` | `#F07878` | Errors and critical states |

### Color rules

- Keep approximately 75–85% of the visual area neutral/dark.
- Use orange for high-value actions, active graph links, section markers, and small highlights—not every icon.
- Do not use glowing gradients on every card.
- Keep body text contrast accessible.
- Status colors must carry meaning and must not be purely decorative.

---

## 4. Typography

### Typography roles

Use the original template's stencil-style display typography for large, short headings only. Pair it with a highly readable technical body font.

Suggested font stack (check availability/licensing before shipping):

- **Display:** `Oxanium`, `Michroma`, or a comparable geometric/stencil-inspired font.
- **Body and UI:** `IBM Plex Mono` for technical labels and selected UI text; use `Inter` or `Geist Sans` for longer paragraphs and dense dashboard content.
- **Fallbacks:** `Arial, sans-serif` for body; `ui-monospace, SFMono-Regular, Menlo, monospace` for technical labels.

Example CSS:

```css
:root {
  --font-display: "Oxanium", "Arial", sans-serif;
  --font-body: "Geist Sans", "Inter", Arial, sans-serif;
  --font-mono: "IBM Plex Mono", ui-monospace, monospace;
}
```

### Typography rules

- Hero headline: large, bold, tight line height, preferably 2–4 short lines.
- Section titles: display face, but smaller than the hero.
- Body copy: readable sans-serif; avoid using the stencil font for paragraphs.
- Eyebrows, section indexes, timestamps, node metadata: monospace, uppercase, letter-spaced.
- Use tabular numerals for metrics and timestamps where useful.
- Keep line lengths comfortable; do not let body copy span the entire viewport.
- Never shrink all text just to preserve the desktop layout on mobile.

**Font licensing and loading:** Verify the font's license and use a reliable font source. Provide local/system fallbacks. Avoid loading several heavy font families unnecessarily.

---

## 5. Layout, Grid & Spacing

### Grid

- Use a 12-column desktop grid or a consistent 4-column editorial grid where the template calls for it.
- Create a centered content container with a sensible maximum width (roughly 1280–1440px).
- Use thin borders to create intentional section divisions.
- Use asymmetric layouts: headline and copy on one side, product visual on the other.
- Keep edges and columns aligned across adjacent sections.
- Use small orange corner markers only at meaningful visual anchors.

### Spacing

Use a consistent spacing scale, for example: `4, 8, 12, 16, 24, 32, 48, 64, 96px`.

- Give hero and major sections generous vertical spacing.
- Keep cards internally consistent.
- Do not add rounded cards everywhere; the reference relies more on borders and grid structure.
- Use modest corner radii for functional UI controls; preserve the template's sharper editorial aesthetic.
- Avoid horizontal overflow at all viewport widths.

### Responsive behavior

- Desktop: preserve the full editorial grid and asymmetric hero.
- Tablet: reduce columns and simplify the 3D visual.
- Mobile: stack hero content and product visual, scale the display font down, and convert multi-column sections into vertical blocks.
- Navigation must collapse cleanly; controls must remain touch-friendly.
- Graph interactions should support zoom/pan and have an accessible list/details alternative.

---

## 6. Motion & Animation

Animation should make memory and coordination easier to understand, not just make the page look active.

### Landing-page motion

1. **Initial reveal:** Subtle opacity and short upward movement for eyebrow, headline, description, and CTAs. Stagger slightly; do not delay access to content.
2. **Hero object:** Slowly rotate or gently drift the interlinked 3D object. Keep motion low-amplitude and provide a static fallback.
3. **Graph connections:** Reveal a few graph edges sequentially to imply relationships becoming available.
4. **Section reveal:** Use restrained opacity/translate transitions as sections enter view.
5. **CTA hover:** Slight color/position change and arrow movement; no excessive bounce.
6. **Counters:** Animate only when displaying genuine metrics. Never invent numbers for animation.

### Product UI motion

- Agent states should change through clear, small transitions.
- Show a visible event timeline for memory retrieval, writes, and handoffs.
- Use animated edges only for current activity; static edges should remain legible.
- Provide loading, success, empty, and error states.
- Avoid continuously pulsing every node, excessive particle effects, cursor trails, or scroll hijacking.

### Motion accessibility and performance

- Respect `prefers-reduced-motion`.
- Do not make essential content dependent on animation.
- Avoid large animation libraries unless the project already uses one or there is a clear need.
- Lazy-load heavy 3D assets; do not block the main heading on a WebGL scene.
- If 3D performance is poor, use a lightweight SVG/CSS illustration instead.

---

## 7. Hero Section

### Suggested copy

Eyebrow:
`PERSISTENT MEMORY FOR AI AGENTS`

Headline:
`AI THAT REMEMBERS.`
`AGENTS THAT CONTINUE.`

Supporting copy:
`ContinuumAI helps agents retain useful memories across sessions, share knowledge, and resume unfinished workflows through a shared graph powered by FalkorDB.`

Primary CTA:
`EXPLORE THE DEMO`

Secondary CTA:
`VIEW ON GITHUB`

Use only working links. If the demo or repository is not ready, use a clearly labeled preview or disable/remove the CTA until it works.

### Hero composition

- Left/large panel: eyebrow, oversized stencil headline, concise explanation, two CTAs.
- Right/narrow panel: one distinctive 3D visual or animated graph sculpture.
- Below: a compact capability strip:
  - Persistent Memory
  - Shared Knowledge
  - Cross-Session Continuity

Do not show fake customer logos, unverified awards, made-up metrics, or placeholder claims such as “10,000+ memories.”

---

## 8. Landing Page Sections & Order

Build a product-first landing page, not a generic agency/accelerator site.

### 01 — Navigation
- ContinuumAI wordmark.
- Links: Product, How It Works, Memory Graph, Documentation (only if those destinations exist).
- CTA: `OPEN DEMO` or `EXPLORE THE PROJECT`.
- Theme control only if both themes are properly implemented; dark-first is the default.

### 02 — Hero
- Use the composition and copy in Section 7.
- Include a visual that communicates linked memory/continuity.
- Ensure the heading remains readable and dominant.

### 03 — Capability Strip
Three compact blocks:
- Persistent Memory — information remains available after a session ends.
- Shared Knowledge — agents can retrieve relevant memories created by others.
- Workflow Continuity — agents resume unfinished tasks with prior context.

Use no unsupported metrics.

### 04 — The Problem
Heading idea: `EVERY SESSION SHOULDN'T START FROM ZERO.`
Explain:
- Context disappears between sessions.
- Agents duplicate previous work.
- Findings and decisions get isolated.
- Handoffs lose critical details.

Use a clear before/after visual: disconnected agents vs. connected shared memory.

### 05 — Interactive Product Demo
This is one of the highest-priority sections.

Demonstrate:
1. Agent A receives a task.
2. Agent A stores a useful finding in FalkorDB.
3. Session 1 ends.
4. Agent B starts a new session.
5. Agent B retrieves the prior memory and continues the work.
6. Agent B adds a new finding to the graph.

Include session switching, event logs, retrieved memory details, and graph updates. Use a real backend whenever available. If a static demo is used, label it clearly as a simulation.

### 06 — Memory Graph Explorer
- Show actual FalkorDB nodes and relationships.
- Node types can include Agent, Session, Memory, Task, Decision, and Evidence, depending on the implemented schema.
- Selecting a node opens a details panel.
- Show memory source/provenance and timestamps if the backend records them.
- Include loading, no-data, and error states.
- Never represent hardcoded sample graph data as live production data.

### 07 — Core Capabilities
Three feature groups:
- Persistent Memory
- Shared Agent Knowledge
- Agent Handoffs & Coordination

For each, explain the problem, what ContinuumAI does, and one concrete example.

### 08 — How It Works
Use a five-step visual pipeline:
`TASK → RETRIEVE MEMORY → REASON & ACT → UPDATE GRAPH → HAND OFF / RESUME`

Explain the role of FalkorDB in storing and retrieving relationships and shared state.

### 09 — Memory Types
Include only types that are implemented or explicitly supported in the prototype:
- Episodic: past events and experiences.
- Semantic: facts and relationships.
- Procedural: reusable methods or steps.

Show a concrete example for each rather than generic definitions alone.

### 10 — Architecture
Show the actual implementation, such as:
`Agent(s) → FastAPI → FalkorDB`
Include model/API integrations only after they are selected and working. The architecture diagram must match the codebase.

### 11 — Use Cases
Possible use cases (clearly described as examples, not existing features unless implemented):
- Long-running AI research.
- Multi-agent software development.
- Incident investigation and response.
- Repeated business workflows.

Keep this section compact; prioritize the core demo over a long use-case catalog.

### 12 — Reliability & Memory Isolation
Describe only implemented behavior:
- How user/session memory is scoped.
- How conflicting or updated memories are handled.
- How retrieval failures are surfaced.
- How agent writes and handoffs are tracked.
Do not claim enterprise-grade security, concurrency, or backup guarantees without testing.

### 13 — Open Source / Project Resources
- GitHub repository.
- Setup instructions.
- Architecture documentation.
- Demo video.
- FalkorDB integration details.
Use actual links only.

### 14 — FAQ
Suggested questions:
- What is ContinuumAI?
- How does memory persist across sessions?
- How does FalkorDB fit into the system?
- How do agents share memory?
- What memory types are supported?
- Can I run it locally?
- What is implemented versus planned?

### 15 — Final CTA
Headline:
`GIVE YOUR AGENTS THE MEMORY TO MOVE FORWARD.`

Buttons:
- `TRY THE DEMO`
- `EXPLORE THE CODE`

### 16 — Footer
- ContinuumAI identity and short description.
- Product section links.
- GitHub and documentation links if available.
- Hackathon/technology credits where appropriate.
- Privacy and terms only if real pages exist.
- Large stencil wordmark or oversized `CONTINUUMAI` typography, inspired by the template footer.

---

## 9. Product Dashboard Visual Language

The dashboard is a separate application experience. Reuse the same colors, typography, grid lines, and orange accent, but prioritize usability over the landing page's dramatic typography.

Suggested dashboard navigation:
- Overview
- Sessions
- Agent Activity
- Memory Graph
- Memory Explorer
- Settings (only if implemented)

Dashboard principles:
- Use compact headings and readable body text.
- Prioritize event history, memory provenance, agent state, and graph inspection.
- Use tables, timelines, filters, and detail panels where appropriate.
- Keep the graph interactive and connected to backend data.
- Do not force giant stencil headings into dense dashboard views.
- Clearly identify demo/sample data.

---

## 10. Component & Interaction Requirements

Create reusable components for:
- Header/navigation.
- Stencil display heading.
- Section eyebrow and index label.
- Grid/bordered panel.
- CTA button with arrow.
- Capability block.
- Agent status indicator.
- Memory/event timeline item.
- Graph node details panel.
- FAQ accordion.
- Footer.

Interaction expectations:
- Navigation anchors work.
- CTA buttons navigate to valid destinations.
- FAQ accordions open and close accessibly.
- Theme toggle works if shown.
- Graph controls work.
- Forms show validation and submission feedback if any are included.
- Hover effects have keyboard-focus equivalents.
- Links have clear focus states and adequate contrast.

Avoid placeholder buttons that do nothing.

---

## 11. Technical Implementation Guidance

First inspect the existing repository, framework, dependencies, routes, and components. Preserve useful existing code.

- Reuse the supplied 21st.dev template where practical, subject to its license/usage terms.
- Do not replace the stack without a concrete reason.
- Keep landing page components modular and maintainable.
- Use semantic HTML and accessible labels.
- Optimize images, fonts, and 3D assets.
- Prevent layout shift; give media containers explicit dimensions/aspect ratios.
- Lazy-load noncritical visual assets.
- Ensure the mobile layout works at narrow widths.
- Run the existing lint, type-check, and production build commands after changes.
- Fix errors introduced by the implementation.
- Do not claim tests or build checks passed unless they were actually run.

### If the stack is not yet known

Inspect the repository before choosing libraries. For a compatible existing Next.js project, reasonable options may include:
- Tailwind CSS for styling.
- React Flow for graph visualization.
- FastAPI for the backend.
- FalkorDB as the graph database.

These are suggestions, not permission to overwrite a working architecture.

---

## 12. Content & Honesty Rules

- Never invent testimonials, users, customers, adoption metrics, performance benchmarks, or security certifications.
- Never show fake live agent activity as real.
- Clearly label any mocked demo or sample graph.
- Use the correct project name: **ContinuumAI**.
- Keep all messaging aligned with the hackathon's **Agent Memory and Coordination** track.
- FalkorDB must be central to memory retrieval and relationships.
- Avoid unrelated features that dilute the core problem.
- Avoid generic filler like “revolutionizing the future of AI.”
- Prefer specific, demonstrable statements over unsupported superlatives.

---

## 13. Suggested Build Priority

### Priority 1 — Required
- Strong hero and navigation.
- Problem explanation.
- Working Session 1 → Session 2 memory demo.
- Real FalkorDB graph visualization.
- Core capability explanation.
- How-it-works section.
- GitHub/documentation links when ready.
- Responsive layout and accessible interactions.

### Priority 2 — Valuable
- Memory type explorer.
- Agent event timeline.
- Architecture diagram.
- FAQ.
- Reduced-motion support and performance polish.

### Priority 3 — Only if time allows
- Advanced 3D/WebGL scene.
- Elaborate scroll-linked animation.
- Theme switching.
- Newsletter signup.
- Blog/news carousel.

Do not let advanced visual effects delay the working cross-session memory demo.

---

## 14. Final Instructions for the Coding Agent

Before editing:
1. Inspect the existing project and identify the entry page, routes, styling system, fonts, and animations.
2. Inspect how the 21st.dev template is implemented and determine which components can be reused.
3. Confirm the template's license/usage terms.
4. Map each proposed section to the existing codebase.
5. Identify which product features are implemented, mocked, or still planned.

During implementation:
- Preserve the stencil-grid-orange design language.
- Adapt every section to ContinuumAI's actual purpose.
- Build reusable components instead of duplicating markup.
- Keep the landing page visually distinctive but readable.
- Never fabricate data or working behavior.

After implementation:
- Test responsive behavior.
- Test every CTA and interaction.
- Run lint, type-check, and build commands that exist in the repository.
- Report what changed, what was tested, and what remains incomplete.

**Definition of success:** A premium, distinctive ContinuumAI website whose design is inspired by the supplied 21st.dev template and whose central experience clearly proves persistent cross-session memory and agent-to-agent coordination through FalkorDB.

---

## 15. Animated AI Agent Network & Knowledge Topology Visual Specification

> **Design Reference:** Dark, high-contrast cybersecurity and network security telemetry interfaces.  
> **Adaptation Constraint:** Do not copy the reference's authentication layout or branding. Translate its high-density, technical aesthetic into ContinuumAI's multi-agent memory and coordination engine.

### 15.1 Core Visual Direction & Atmosphere
- **Canvas Backdrop:** Pure dark depth (`#111111` to `#0A0A0A`) with subtle technical Cartesian grid lines (`#1E1E1E` or `#262626` at 24px intervals) and faint coordinate/radial crosshairs.
- **Signal & Activity Accent:** Vivid electric orange (`#FF6A00`), reserved exclusively for active data signals, focused node glows, directional particles, and live coordination handoffs.
- **Contrast Hierarchy:** Crisp stark white (`#FFFFFF`) for primary entity names and active metrics; muted technical grey (`#A6A49E` / `#737373`) for timestamps, Cypher labels, and idle connections.
- **Restrained Editorial Structure:** Sharp, 1px technical borders (`#262626`), deliberate spacing scales, small corner tick marks, and zero generic purple glowing gradients.

### 15.2 Central Visual Topology
The network layout centers around a unified, load-bearing core surrounded by coordinated autonomous agents and branching persistent memory nodes:

```text
                  [Investigator Agent] (Session 1)
                           │
       [Semantic Memory]   │   [Episodic Memory]
              \            │            /
               ▼           ▼           ▼
          ╭───────────────────────────────────╮
          │    CONTINUUM CORE / SHARED MEMORY │
          │         (FalkorDB Engine)         │
          ╰───────────────────────────────────╯
               ▲           ▲           ▲
              /            │            \
       [Procedural Memory] │   [Handoff Contract]
                           │
                   [Executor Agent] (Session 2 Continuation)
```

1. **Central Hub — Continuum Core / Shared Memory:**
   - Represents the active FalkorDB knowledge graph and OpenCypher execution layer.
   - Visually rendered as an anchored octagonal or bordered technical core with status telemetry: `FalkorDB: ONLINE`, node count, and active memory count.
2. **Surrounding Agent Nodes:**
   - **Investigator (Agent A):** Initial triage, log inspection, evidence recording.
   - **Planner:** Multi-step strategy breakdown and task routing.
   - **Executor / Continuation (Agent B):** Context resumption, fix application, state verification.
   - **Reviewer:** Final validation, regression checks, and knowledge verification.
3. **Connected Persistent Knowledge Nodes:**
   - Branching memory nodes representing actual records saved to FalkorDB:
     - **Episodic Nodes:** Orange-tinted badge (`#FF6A00`), tagged with session & agent provenance.
     - **Semantic Nodes:** Green-tinted badge (`#8DD8B5`), tagged with universal domain facts.
     - **Procedural Nodes:** Gold-tinted badge (`#E8BD70`), tagged with reusable triage methods.

### 15.3 The Six Core Animation States
All motion must be purposeful, communicating verifiable state changes rather than decorative noise:

| State | Visual Behavior & Animation Specifications |
| :--- | :--- |
| **1. Idle** | Nodes rest at low luminosity with subtle borders (`#262626`). Static edges remain thin, crisp, and neutral. A very low-frequency ambient breathing glow (opacity 0.2 to 0.4 over 4s) indicates standby readiness. |
| **2. Agent Active** | The active agent node illuminates with an intense orange halo (`box-shadow: 0 0 25px -4px rgba(255, 106, 0, 0.45)`). Its status badge transitions to `RUNNING` with an orange indicator pulse. |
| **3. Memory Retrieval** | A high-velocity orange data particle or smooth dashed stroke (`stroke-dashoffset` animation) travels from the FalkorDB Core along the relevant Cypher relationship edge into the retrieving agent node. |
| **4. Memory Creation** | Upon task completion, a new memory node scales in with a crisp 200ms entry transition, accompanied by a brief orange connection pulse from the authoring agent into the FalkorDB Core. |
| **5. Handoff** | A distinctive directional signal travels along the `[:HANDED_OFF_TO]` edge from Agent A (Investigator) to Agent B (Executor), accompanied by a slide-in summary badge displaying the concrete next action. |
| **6. Session Resume** | When Session 2 begins, Agent B issues a retrieval query. The earlier Session 1 memory node illuminates, drawing a verified provenance connection line that visually demonstrates cross-session continuity. |

### 15.4 Functional & Engineering Requirements
1. **React Flow Compatibility:**
   - The canvas must be compatible with `@xyflow/react` (React Flow v12) using custom node renderers (`AgentNode`, `CoreNode`, `MemoryNode`) and custom animated edges (`DataFlowEdge`).
2. **Real Data Binding:**
   - All rendered nodes and edges must correspond to actual graph responses fetched from `/api/graph`.
   - Live animations must trigger only from verifiable API events (`/api/tasks/{id}/run`, `/api/agents/events`).
3. **Deterministic Demo Guard:**
   - When running without a live FalkorDB cluster or LLM API keys, the UI must explicitly display a persistent `[DEMO / SIMULATION MODE]` indicator. Never disguise mock events as live FalkorDB operations.
4. **State Fallbacks:**
   - **Loading:** Subtle scanning radar line across the technical grid with monospace `INITIALIZING TOPOLOGY...`.
   - **Disconnected / Database Offline:** Nodes display amber warning borders (`#E8BD70`) with an explicit callout: `FalkorDB Offline — Using In-Memory Fallback`.
   - **Error:** Targeted red node highlight (`#F07878`) indicating query or transaction failure without breaking the canvas.
5. **Accessibility & Reduced Motion:**
   - Full compliance with `prefers-reduced-motion: reduce`. When active, particle flows and pulse animations are replaced with static solid high-contrast borders and clear textual status indicators.
   - Full screen-reader and keyboard fallback via an accessible data list toggle (`/app/graph` list view).

