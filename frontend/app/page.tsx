import React from 'react';
import Link from 'next/link';
import { LandingNav } from '@/components/layout/landing-nav';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Database,
  ArrowRight,
  GitBranch,
  Layers,
  Cpu,
  ShieldCheck,
  Repeat,
  CheckCircle2,
} from 'lucide-react';
import { AgentNetworkVisual } from '@/components/graph/agent-network-visual';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-bg text-text">
      <LandingNav />

      {/* 02 — HERO SECTION */}
      <section className="relative border-b border-border py-20 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 border border-border px-3 py-1 bg-surface">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-[11px] font-mono uppercase tracking-widest text-muted">
                Track 2: Agent Memory & Coordination
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight uppercase leading-[0.95]">
              AI THAT <span className="text-accent">REMEMBERS.</span>
              <br />
              AGENTS THAT <span className="text-text">CONTINUE.</span>
            </h1>

            <p className="text-base sm:text-lg text-muted max-w-xl leading-relaxed">
              ContinuumAI is a graph-powered memory and coordination layer for multi-agent systems.
              Powered by FalkorDB, it enables agents to retain context across independent sessions, share discoveries,
              and resume work without starting from zero.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link href="/app">
                <Button size="lg" variant="primary">
                  Explore The Demo →
                </Button>
              </Link>
              <a
                href="https://github.com/WeMakeDevs"
                target="_blank"
                rel="noreferrer"
              >
                <Button size="lg" variant="outline">
                  View On GitHub
                </Button>
              </a>
            </div>
          </div>

          {/* Hero Right Composition: Animated AI Agent Network Visual */}
          <div className="lg:col-span-5 relative">
            <AgentNetworkVisual autoPlay={true} className="shadow-glow" />
          </div>
        </div>
      </section>

      {/* 03 — CAPABILITY STRIP */}
      <section className="border-b border-border bg-surface">
        <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
          <div className="py-4 md:py-0 md:px-6 first:pl-0">
            <span className="text-[10px] font-mono uppercase tracking-widest text-accent font-semibold block mb-1">
              01 · PERSISTENT MEMORY
            </span>
            <p className="text-xs font-mono text-muted">
              Discoveries remain accessible in FalkorDB after sessions terminate.
            </p>
          </div>
          <div className="py-4 md:py-0 md:px-6">
            <span className="text-[10px] font-mono uppercase tracking-widest text-accent font-semibold block mb-1">
              02 · SHARED STATE
            </span>
            <p className="text-xs font-mono text-muted">
              Agents query and build upon discoveries authored by other agents.
            </p>
          </div>
          <div className="py-4 md:py-0 md:px-6 last:pr-0">
            <span className="text-[10px] font-mono uppercase tracking-widest text-accent font-semibold block mb-1">
              03 · STRUCTURED HANDOFFS
            </span>
            <p className="text-xs font-mono text-muted">
              Transitions carry explicit context, evidence, and pending next actions.
            </p>
          </div>
        </div>
      </section>

      {/* 04 — THE PROBLEM */}
      <section className="py-20 border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mb-12">
            <span className="text-[10px] font-mono uppercase tracking-widest text-accent font-semibold">
              THE CHALLENGE
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase mt-2">
              EVERY SESSION SHOULDN'T START FROM ZERO.
            </h2>
            <p className="text-sm text-muted mt-3">
              Standard LLM agents lose their working state the moment a session closes. Flat chat logs
              are impossible to query associatively, causing agents to duplicate expensive investigations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-danger/40 bg-surface/50">
              <span className="text-xs font-mono uppercase text-danger font-semibold block mb-2">
                WITHOUT GRAPH MEMORY (DISCONNECTED)
              </span>
              <ul className="space-y-3 text-xs font-mono text-muted">
                <li className="flex items-start gap-2">
                  <span className="text-danger">✕</span> Session 1 ends; findings are lost to ephemeral memory.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-danger">✕</span> Agent B repeats identical diagnostic queries.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-danger">✕</span> Zero relationship tracing between evidence, decisions, and tasks.
                </li>
              </ul>
            </Card>

            <Card className="border-success/40 bg-surface/50 corner-marker">
              <span className="text-xs font-mono uppercase text-success font-semibold block mb-2">
                WITH CONTINUUMAI + FALKORDB (CONNECTED)
              </span>
              <ul className="space-y-3 text-xs font-mono text-muted">
                <li className="flex items-start gap-2">
                  <span className="text-success">✓</span> Agent A saves structured memory & Cypher relationships.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-success">✓</span> Agent B queries FalkorDB, retrieves prior memory with provenance.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-success">✓</span> Agent B executes the next step, linking new knowledge to old knowledge.
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* 07 — HOW IT WORKS (5-STEP PIPELINE) */}
      <section id="how-it-works" className="py-20 border-b border-border bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-[10px] font-mono uppercase tracking-widest text-accent font-semibold">
              COORDINATION LIFECYCLE
            </span>
            <h2 className="font-display text-3xl font-bold uppercase mt-2">
              REMEMBER. CONNECT. CONTINUE.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { step: '01', title: 'Task Assigned', desc: 'Agent receives an objective and checks FalkorDB for prior knowledge.' },
              { step: '02', title: 'Graph Retrieval', desc: 'Active memories, evidence, and prior handoffs are retrieved via Cypher.' },
              { step: '03', title: 'Bounded Action', desc: 'Agent executes the next step without repeating previous investigations.' },
              { step: '04', title: 'Graph Mutation', desc: 'New findings and RELATES_TO edges are persisted into FalkorDB.' },
              { step: '05', title: 'Session Handoff', desc: 'A structured handoff is recorded for the successor agent.' },
            ].map((s) => (
              <div key={s.step} className="p-5 border border-border bg-bg relative">
                <span className="text-xl font-display font-bold text-accent">{s.step}</span>
                <h3 className="font-mono text-xs font-semibold text-text uppercase mt-2 mb-1">
                  {s.title}
                </h3>
                <p className="text-xs text-muted leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 08 — MEMORY TYPES */}
      <section id="memory-types" className="py-20 border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mb-12">
            <span className="text-[10px] font-mono uppercase tracking-widest text-accent font-semibold">
              KNOWLEDGE ARCHITECTURE
            </span>
            <h2 className="font-display text-3xl font-bold uppercase mt-2">
              THREE COGNITIVE MEMORY TYPES
            </h2>
            <p className="text-sm text-muted mt-3">
              ContinuumAI separates agent memories into explicit graph categories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card cornerMarker>
              <Badge variant="episodic" className="mb-3">
                EPISODIC MEMORY
              </Badge>
              <h3 className="font-display text-base font-bold text-text mb-2">Experiences & Events</h3>
              <p className="text-xs text-muted leading-relaxed mb-4">
                Records specific occurrences during a task run. Example: "In Session 1, Agent A observed 504 timeouts under 500 RPS load."
              </p>
              <div className="text-[10px] font-mono text-muted/60 border-t border-border pt-3">
                Scope: Session-bound events
              </div>
            </Card>

            <Card cornerMarker>
              <Badge variant="semantic" className="mb-3">
                SEMANTIC MEMORY
              </Badge>
              <h3 className="font-display text-base font-bold text-text mb-2">Facts & Relationships</h3>
              <p className="text-xs text-muted leading-relaxed mb-4">
                Stores reusable system facts, dependencies, and rules. Example: &quot;Payment service requires max_connections &gt;= 50.&quot;
              </p>
              <div className="text-[10px] font-mono text-muted/60 border-t border-border pt-3">
                Scope: Universal domain facts
              </div>
            </Card>

            <Card cornerMarker>
              <Badge variant="procedural" className="mb-3">
                PROCEDURAL MEMORY
              </Badge>
              <h3 className="font-display text-base font-bold text-text mb-2">Methods & Steps</h3>
              <p className="text-xs text-muted leading-relaxed mb-4">
                Stores reusable strategies for resolving classes of problems. Example: "Triage protocol: check connection pools before restarting pods."
              </p>
              <div className="text-[10px] font-mono text-muted/60 border-t border-border pt-3">
                Scope: Reusable workflows
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* 09 — TECHNICAL ARCHITECTURE MATRIX */}
      <section id="architecture" className="py-20 border-b border-border bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mb-12">
            <span className="text-[10px] font-mono uppercase tracking-widest text-accent font-semibold">
              SYSTEM ARCHITECTURE
            </span>
            <h2 className="font-display text-3xl font-bold uppercase mt-2">
              BUILT FOR HIGH-FREQUENCY GRAPH TRAVERSAL
            </h2>
            <p className="text-sm text-muted mt-3">
              Four engineered tiers connecting autonomous agent routines directly to FalkorDB low-latency graph storage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card cornerMarker className="bg-surface/80">
              <span className="text-[10px] font-mono uppercase text-accent font-semibold block mb-2">
                TIER 01 · GRAPH STORAGE
              </span>
              <h3 className="font-display text-lg font-bold text-text mb-2">FalkorDB Engine</h3>
              <p className="text-xs text-muted leading-relaxed mb-4">
                Low-latency GraphBLAS linear-algebra engine executing OpenCypher queries with sub-millisecond relationship hops.
              </p>
              <div className="text-[10px] font-mono text-muted/70 border-t border-border pt-3">
                Protocol: Redis / Bolt Protocol
              </div>
            </Card>

            <Card cornerMarker className="bg-surface/80">
              <span className="text-[10px] font-mono uppercase text-accent font-semibold block mb-2">
                TIER 02 · COORDINATION
              </span>
              <h3 className="font-display text-lg font-bold text-text mb-2">Multi-Agent Core</h3>
              <p className="text-xs text-muted leading-relaxed mb-4">
                Role-bounded agents (Investigator, Planner, Executor, Reviewer) exchanging state through verified handoff edges.
              </p>
              <div className="text-[10px] font-mono text-muted/70 border-t border-border pt-3">
                Handoffs: Structured DAG Edges
              </div>
            </Card>

            <Card cornerMarker className="bg-surface/80">
              <span className="text-[10px] font-mono uppercase text-accent font-semibold block mb-2">
                TIER 03 · REST BACKEND
              </span>
              <h3 className="font-display text-lg font-bold text-text mb-2">FastAPI Service</h3>
              <p className="text-xs text-muted leading-relaxed mb-4">
                Typed OpenAPI endpoints managing session orchestration, memory ingestion, and workspace tenant isolation.
              </p>
              <div className="text-[10px] font-mono text-muted/70 border-t border-border pt-3">
                Validation: Pydantic v2 Models
              </div>
            </Card>

            <Card cornerMarker className="bg-surface/80">
              <span className="text-[10px] font-mono uppercase text-accent font-semibold block mb-2">
                TIER 04 · INTERFACE
              </span>
              <h3 className="font-display text-lg font-bold text-text mb-2">Next.js Stencil UI</h3>
              <p className="text-xs text-muted leading-relaxed mb-4">
                Accessible memory graph canvas with dynamic SVG particle animations, node inspectors, and real-time session telemetry.
              </p>
              <div className="text-[10px] font-mono text-muted/70 border-t border-border pt-3">
                Stack: React 18 / Tailwind / SVG
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* 14 — FAQ */}
      <section id="faq" className="py-20 border-b border-border bg-surface">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-[10px] font-mono uppercase tracking-widest text-accent font-semibold">
              QUESTIONS & ANSWERS
            </span>
            <h2 className="font-display text-3xl font-bold uppercase mt-2">
              FREQUENTLY ASKED QUESTIONS
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'How does FalkorDB power ContinuumAI?',
                a: 'FalkorDB stores the entire graph memory topology—including Workspaces, Sessions, Agents, Tasks, Memories, and Handoffs. Cypher queries are used to traverse dependencies and retrieve context across sessions.',
              },
              {
                q: 'What is the signature Session 1 → Session 2 workflow?',
                a: 'Agent A investigates a task in Session 1, saves findings and a handoff to FalkorDB, and Session 1 ends. In a separate Session 2, Agent B retrieves Agent A’s memory, continues the task without re-running work, and commits the resolution.',
              },
              {
                q: 'How is tenant memory isolated?',
                a: 'All Cypher queries enforce strict workspace scoping with parameterized identifiers. Workspace A cannot query or mutate Workspace B records.',
              },
              {
                q: 'Can ContinuumAI run locally during development?',
                a: 'Yes. FalkorDB runs as a lightweight Docker container (port 6379), FastAPI runs via Uvicorn, and Next.js runs via npm run dev.',
              },
            ].map((faq, idx) => (
              <div key={idx} className="p-5 border border-border bg-bg">
                <h4 className="font-mono text-sm font-semibold text-text mb-2">{faq.q}</h4>
                <p className="text-xs text-muted leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 15 — FINAL CTA */}
      <section className="py-24 text-center">
        <div className="max-w-3xl mx-auto px-6 space-y-6">
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold uppercase">
            GIVE YOUR AGENTS THE MEMORY TO MOVE FORWARD.
          </h2>
          <p className="text-sm text-muted max-w-lg mx-auto">
            Experience cross-session persistence and verifiable multi-agent coordination powered by FalkorDB.
          </p>
          <div className="pt-4">
            <Link href="/app">
              <Button size="lg" variant="primary">
                Open Interactive Demo →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
