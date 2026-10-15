'use client';

import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Bot, Database, ArrowRight, Activity, ShieldCheck, Zap } from 'lucide-react';

export type AnimationState =
  | 'idle'
  | 'agent_active'
  | 'memory_retrieval'
  | 'memory_creation'
  | 'handoff'
  | 'session_resume';

interface AgentNetworkVisualProps {
  initialState?: AnimationState;
  autoPlay?: boolean;
  className?: string;
}

export const AgentNetworkVisual: React.FC<AgentNetworkVisualProps> = ({
  initialState = 'idle',
  autoPlay = false,
  className = '',
}) => {
  const [animState, setAnimState] = useState<AnimationState>(initialState);

  // Optional auto-cycle through states for interactive demo
  useEffect(() => {
    if (!autoPlay) return;
    const states: AnimationState[] = [
      'idle',
      'agent_active',
      'memory_creation',
      'handoff',
      'session_resume',
      'memory_retrieval',
    ];
    let idx = states.indexOf(animState);
    const interval = setInterval(() => {
      idx = (idx + 1) % states.length;
      setAnimState(states[idx]);
    }, 3800);
    return () => clearInterval(interval);
  }, [autoPlay, animState]);

  const stateDescriptions: Record<AnimationState, { title: string; desc: string }> = {
    idle: {
      title: 'STATE 01 · STANDBY',
      desc: 'Autonomous agent ring connected to FalkorDB Knowledge Core in ready state.',
    },
    agent_active: {
      title: 'STATE 02 · AGENT A ACTIVE',
      desc: 'Investigator Agent active in Session 1, isolating connection pool bottleneck.',
    },
    memory_creation: {
      title: 'STATE 03 · KNOWLEDGE PERSISTED',
      desc: 'Structured episodic memory & evidence written to FalkorDB graph.',
    },
    handoff: {
      title: 'STATE 04 · COORDINATION HANDOFF',
      desc: 'Session 1 terminates; explicit handoff signal and next action routed to Executor.',
    },
    session_resume: {
      title: 'STATE 05 · SESSION 2 RESUMED',
      desc: 'Agent B launches in fresh session and retrieves Session 1 memory with provenance.',
    },
    memory_retrieval: {
      title: 'STATE 06 · DATA FLOW APPLIED',
      desc: 'Executor resolves task and commits new semantic knowledge linked via RELATES_TO.',
    },
  };

  return (
    <div className={`border border-border bg-[#0D0D0D] p-5 font-mono relative overflow-hidden ${className}`}>
      {/* Subtle Coordinate Grid Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#262626_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none" />

      {/* Top Telemetry Header */}
      <div className="relative z-10 flex flex-wrap items-center justify-between pb-3 border-b border-border text-[10px] text-muted mb-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#FF6A00] animate-pulse" />
          <span className="text-text font-semibold uppercase">FalkorDB Agent Network</span>
          <span className="border border-border px-1.5 py-0.2 text-[9px] bg-surface text-muted">
            OPENCYPHER v1.0
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-muted">ACTIVE STATE:</span>
          <span className="text-accent font-bold uppercase">{animState.replace('_', ' ')}</span>
        </div>
      </div>

      {/* Interactive Topology Display (SVG Canvas + Technical Nodes) */}
      <div className="relative min-h-[380px] flex items-center justify-center my-2 select-none">
        {/* SVG Connection Lines & Particle Streams */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          {/* Top Line: Core to Investigator */}
          <line
            x1="50%"
            y1="50%"
            x2="50%"
            y2="18%"
            stroke={animState === 'agent_active' || animState === 'memory_creation' ? '#FF6A00' : '#262626'}
            strokeWidth="1.5"
            className={animState === 'memory_creation' ? 'animate-particle-flow' : ''}
          />
          {/* Left Line: Core to Planner */}
          <line
            x1="50%"
            y1="50%"
            x2="18%"
            y2="50%"
            stroke="#262626"
            strokeWidth="1.5"
          />
          {/* Right Line: Core to Reviewer */}
          <line
            x1="50%"
            y1="50%"
            x2="82%"
            y2="50%"
            stroke="#262626"
            strokeWidth="1.5"
          />
          {/* Bottom Line: Core to Executor */}
          <line
            x1="50%"
            y1="50%"
            x2="50%"
            y2="82%"
            stroke={animState === 'session_resume' || animState === 'memory_retrieval' ? '#FF6A00' : '#262626'}
            strokeWidth="1.5"
            className={animState === 'memory_retrieval' ? 'animate-particle-flow' : ''}
          />

          {/* Handoff Diagonal Path: Investigator (Top) to Executor (Bottom) */}
          {animState === 'handoff' && (
            <path
              d="M 50% 18% Q 75% 50% 50% 82%"
              fill="none"
              stroke="#FF6A00"
              strokeWidth="2"
              className="animate-particle-flow"
            />
          )}

          {/* Memory Branch Lines */}
          <line x1="50%" y1="50%" x2="28%" y2="28%" stroke="#383835" strokeDasharray="2,4" />
          <line x1="50%" y1="50%" x2="72%" y2="28%" stroke="#383835" strokeDasharray="2,4" />
          <line x1="50%" y1="50%" x2="72%" y2="72%" stroke="#383835" strokeDasharray="2,4" />
        </svg>

        {/* CENTRAL HUB — CONTINUUM CORE / SHARED MEMORY (FalkorDB) */}
        <div
          className={`relative z-10 p-4 border bg-surface text-center max-w-[200px] transition-all duration-300 ${
            animState !== 'idle'
              ? 'border-accent shadow-glow'
              : 'border-border'
          }`}
        >
          <div className="flex items-center justify-center gap-1.5 text-accent text-[10px] font-bold uppercase mb-1">
            <Database className="w-3.5 h-3.5" /> CONTINUUM CORE
          </div>
          <div className="text-xs font-bold text-text uppercase tracking-tight">
            Shared Memory Hub
          </div>
          <div className="text-[9px] text-muted mt-1 border-t border-border/60 pt-1">
            FalkorDB Graph Engine
          </div>
        </div>

        {/* TOP AGENT — INVESTIGATOR (AGENT A) */}
        <div
          className={`absolute top-4 left-1/2 -translate-x-1/2 z-10 p-3 border bg-[#141414] text-center w-40 transition-all duration-300 ${
            animState === 'agent_active' || animState === 'memory_creation'
              ? 'border-accent animate-agent-active bg-surface-2'
              : 'border-border'
          }`}
        >
          <div className="flex items-center justify-between text-[9px] text-muted mb-1">
            <span>AGENT A</span>
            <span className={animState === 'agent_active' ? 'text-accent font-bold' : ''}>
              {animState === 'agent_active' ? 'ACTIVE' : 'READY'}
            </span>
          </div>
          <div className="text-xs font-semibold text-text">Investigator</div>
          <div className="text-[8px] text-muted/70 mt-0.5">Session 1 · Triage</div>
        </div>

        {/* BOTTOM AGENT — EXECUTOR / CONTINUATION (AGENT B) */}
        <div
          className={`absolute bottom-4 left-1/2 -translate-x-1/2 z-10 p-3 border bg-[#141414] text-center w-40 transition-all duration-300 ${
            animState === 'session_resume' || animState === 'memory_retrieval'
              ? 'border-accent animate-agent-active bg-surface-2'
              : 'border-border'
          }`}
        >
          <div className="flex items-center justify-between text-[9px] text-muted mb-1">
            <span>AGENT B</span>
            <span className={animState === 'session_resume' || animState === 'memory_retrieval' ? 'text-accent font-bold' : ''}>
              {animState === 'session_resume' ? 'RESUMING' : animState === 'memory_retrieval' ? 'EXECUTING' : 'READY'}
            </span>
          </div>
          <div className="text-xs font-semibold text-text">Executor</div>
          <div className="text-[8px] text-muted/70 mt-0.5">Session 2 · Continuity</div>
        </div>

        {/* LEFT AGENT — PLANNER */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2.5 border border-border bg-[#141414] text-center w-32">
          <div className="text-[9px] text-muted">COORDINATOR</div>
          <div className="text-xs font-semibold text-text">Planner</div>
          <div className="text-[8px] text-muted/70 mt-0.5">Route & Strategy</div>
        </div>

        {/* RIGHT AGENT — REVIEWER */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2.5 border border-border bg-[#141414] text-center w-32">
          <div className="text-[9px] text-muted">VALIDATION</div>
          <div className="text-xs font-semibold text-text">Reviewer</div>
          <div className="text-[8px] text-muted/70 mt-0.5">Regression Check</div>
        </div>

        {/* PERSISTENT KNOWLEDGE NODES (Branching) */}
        {/* Episodic Memory (Top-Right) */}
        <div
          className={`absolute top-10 right-14 z-10 px-2 py-1 border text-[9px] bg-bg transition-all ${
            animState === 'memory_creation'
              ? 'border-accent text-accent animate-materialize'
              : 'border-border text-muted'
          }`}
        >
          <span className="font-bold">mem-001</span> · Episodic
        </div>

        {/* Semantic Memory (Bottom-Right) */}
        <div
          className={`absolute bottom-10 right-14 z-10 px-2 py-1 border text-[9px] bg-bg transition-all ${
            animState === 'memory_retrieval'
              ? 'border-success text-success animate-materialize'
              : 'border-border text-muted'
          }`}
        >
          <span className="font-bold">mem-002</span> · Semantic
        </div>

        {/* Procedural Memory (Top-Left) */}
        <div className="absolute top-10 left-14 z-10 px-2 py-1 border border-border text-[9px] bg-bg text-muted">
          <span className="font-bold">proc-01</span> · Protocol
        </div>
      </div>

      {/* State Explanation Banner */}
      <div className="relative z-10 mt-3 pt-3 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
        <div>
          <span className="text-accent font-semibold">{stateDescriptions[animState].title}: </span>
          <span className="text-muted">{stateDescriptions[animState].desc}</span>
        </div>

        {/* Manual State Selector Buttons for Interactive Verification */}
        <div className="flex flex-wrap items-center gap-1.5 self-end sm:self-auto">
          {(['idle', 'agent_active', 'memory_creation', 'handoff', 'session_resume', 'memory_retrieval'] as AnimationState[]).map(
            (st) => (
              <button
                key={st}
                onClick={() => setAnimState(st)}
                className={`text-[9px] uppercase px-2 py-1 border transition-colors ${
                  animState === st
                    ? 'border-accent bg-accent text-bg font-bold'
                    : 'border-border bg-surface text-muted hover:text-text'
                }`}
              >
                {st.replace('_', ' ')}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};
