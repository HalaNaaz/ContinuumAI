'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { apiClient } from '@/lib/api-client';
import { WorkspaceResponse, Session, TaskRunResponse } from '@/lib/types';
import { Bot, Network, Play, RefreshCw, CheckCircle2, ArrowRight } from 'lucide-react';

export default function OverviewPage() {
  const [workspace, setWorkspace] = useState<WorkspaceResponse | null>(null);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isRunningS1, setIsRunningS1] = useState(false);
  const [isRunningS2, setIsRunningS2] = useState(false);
  const [lastResult, setLastResult] = useState<TaskRunResponse | null>(null);

  const loadData = async () => {
    try {
      const ws = await apiClient.getWorkspace();
      setWorkspace(ws);
      const sess = await apiClient.listSessions();
      setSessions(sess);
    } catch (e) {
      console.warn('Could not load workspace/session stats (backend may be offline)');
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRunSession1 = async () => {
    setIsRunningS1(true);
    try {
      // 1. Create Session 1
      const s1 = await apiClient.createSession({
        workspace_id: 'demo-workspace-01',
        agent_id: 'agent-a-investigator',
        task_id: 'task-01',
      });
      // 2. Execute Agent A
      const res = await apiClient.runTask('task-01', {
        workspace_id: 'demo-workspace-01',
        session_id: s1.id,
        agent_role: 'investigator',
      });
      setLastResult(res);
      await loadData();
    } catch (err: any) {
      alert(`Error running Session 1: ${err.message}`);
    } finally {
      setIsRunningS1(false);
    }
  };

  const handleRunSession2 = async () => {
    setIsRunningS2(true);
    try {
      // 1. Create Session 2 (separate session)
      const s2 = await apiClient.createSession({
        workspace_id: 'demo-workspace-01',
        agent_id: 'agent-b-continuation',
        task_id: 'task-01',
      });
      // 2. Execute Agent B (retrieves Agent A memory)
      const res = await apiClient.runTask('task-01', {
        workspace_id: 'demo-workspace-01',
        session_id: s2.id,
        agent_role: 'continuation',
      });
      setLastResult(res);
      await loadData();
    } catch (err: any) {
      alert(`Error running Session 2: ${err.message}`);
    } finally {
      setIsRunningS2(false);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Page Header */}
      <div>
        <div className="text-[10px] font-mono uppercase tracking-widest text-accent font-semibold">
          DEMO WORKSPACE DASHBOARD
        </div>
        <h1 className="font-display text-3xl font-bold uppercase text-text mt-1">
          Workspace Overview
        </h1>
        <p className="text-xs text-muted mt-1 font-mono">
          Persistent agent coordination and cross-session memory powered by FalkorDB.
        </p>
      </div>

      {/* Stats Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Active Agents', value: workspace?.stats?.agents_count ?? 2 },
          { label: 'Completed Sessions', value: sessions.length || workspace?.stats?.sessions_count || 0 },
          { label: 'Persisted Memories', value: workspace?.stats?.memories_count ?? 0 },
          { label: 'FalkorDB Engine', value: 'Ready', isText: true },
        ].map((stat, i) => (
          <Card key={i} className="p-4">
            <span className="text-[10px] font-mono text-muted uppercase">{stat.label}</span>
            <div className="font-display text-2xl font-bold text-text mt-1">
              {stat.isText ? (
                <span className="text-success text-lg">{stat.value}</span>
              ) : (
                stat.value
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Signature Demo Control Panel */}
      <Card cornerMarker className="p-6 border-accent/40 bg-surface">
        <div className="flex items-center justify-between pb-4 border-b border-border mb-6">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-accent font-bold">
              SIGNATURE TRACK 2 WORKFLOW
            </span>
            <h2 className="font-display text-lg font-bold uppercase text-text mt-0.5">
              Cross-Session Memory Continuity
            </h2>
          </div>
          <Badge variant="semantic">Deterministic Demo</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Step 1: Session 1 */}
          <div className="p-4 border border-border bg-bg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-semibold text-text">STEP 1: SESSION 1</span>
                <Badge variant="episodic">Agent A</Badge>
              </div>
              <p className="text-xs text-muted mb-4">
                Agent A investigates the service timeout, isolates connection pool saturation, and saves
                episodic memory with an explicit handoff target to FalkorDB.
              </p>
            </div>
            <Button
              onClick={handleRunSession1}
              disabled={isRunningS1}
              variant="primary"
              size="sm"
              className="w-full"
            >
              {isRunningS1 ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin mr-2" />
              ) : (
                <Play className="w-3.5 h-3.5 mr-2" />
              )}
              {isRunningS1 ? 'Running Session 1...' : 'Run Session 1 (Agent A)'}
            </Button>
          </div>

          {/* Step 2: Session 2 */}
          <div className="p-4 border border-border bg-bg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-semibold text-text">STEP 2: SESSION 2</span>
                <Badge variant="semantic">Agent B</Badge>
              </div>
              <p className="text-xs text-muted mb-4">
                Agent B launches in an independent session, retrieves Agent A's memory from FalkorDB,
                applies the fix, and commits new knowledge linked via RELATES_TO.
              </p>
            </div>
            <Button
              onClick={handleRunSession2}
              disabled={isRunningS2}
              variant="secondary"
              size="sm"
              className="w-full"
            >
              {isRunningS2 ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin mr-2" />
              ) : (
                <ArrowRight className="w-3.5 h-3.5 mr-2" />
              )}
              {isRunningS2 ? 'Running Session 2...' : 'Run Session 2 (Agent B)'}
            </Button>
          </div>
        </div>

        {/* Execution Output Feedback */}
        {lastResult && (
          <div className="mt-6 pt-4 border-t border-border bg-surface-2 p-4 font-mono text-xs">
            <div className="flex items-center justify-between text-success font-semibold mb-2">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-success" /> Run Completed ({lastResult.status})
              </span>
              <span className="text-[10px] text-muted">Task: {lastResult.task_id}</span>
            </div>
            <p className="text-text/90 mb-2">{lastResult.summary}</p>
            <div className="text-[10px] text-muted space-y-1">
              {lastResult.memories_retrieved.length > 0 && (
                <div>Memories Retrieved: {lastResult.memories_retrieved.join(', ')}</div>
              )}
              {lastResult.memories_created.length > 0 && (
                <div>Memories Created: {lastResult.memories_created.join(', ')}</div>
              )}
              {lastResult.next_action && <div>Next Action: {lastResult.next_action}</div>}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
