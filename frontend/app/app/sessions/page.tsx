'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { apiClient } from '@/lib/api-client';
import { Session, SessionDetail } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import { History, ArrowRight, Database, Bot, Clock } from 'lucide-react';

export default function SessionsPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [selectedSession, setSelectedSession] = useState<SessionDetail | null>(null);

  useEffect(() => {
    apiClient
      .listSessions()
      .then((data) => setSessions(data))
      .catch((e) => console.warn('Could not fetch sessions:', e));
  }, []);

  const handleSelectSession = async (sessId: string) => {
    try {
      const detail = await apiClient.getSessionDetail(sessId);
      setSelectedSession(detail);
    } catch {
      // fallback
      const found = sessions.find((s) => s.id === sessId);
      if (found) {
        setSelectedSession({
          ...found,
          memories_created: [],
          memories_retrieved: [],
        });
      }
    }
  };

  return (
    <div className="space-y-8 max-w-6xl">
      <div>
        <div className="text-[10px] font-mono uppercase tracking-widest text-accent font-semibold">
          SESSION CONTINUITY
        </div>
        <h1 className="font-display text-3xl font-bold uppercase text-text mt-1">
          Session History
        </h1>
        <p className="text-xs text-muted mt-1 font-mono">
          Inspect cross-session execution logs and verified memory reuse.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sessions List */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-mono uppercase text-muted mb-2">Available Sessions</div>
          {sessions.length === 0 ? (
            <div className="p-8 border border-dashed border-border text-center text-xs font-mono text-muted">
              No sessions found. Run Session 1 on the Overview tab to create one.
            </div>
          ) : (
            sessions.map((sess) => (
              <div
                key={sess.id}
                onClick={() => handleSelectSession(sess.id)}
                className={`p-4 border cursor-pointer transition-colors ${
                  selectedSession?.id === sess.id
                    ? 'border-accent bg-surface-2'
                    : 'border-border bg-surface hover:border-muted'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-semibold text-text">{sess.id}</span>
                  <Badge variant={sess.status === 'completed' ? 'success' : 'neutral'}>
                    {sess.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-[10px] font-mono text-muted">
                  <span className="flex items-center gap-1">
                    <Bot className="w-3 h-3 text-muted" /> {sess.agent_ids.join(', ')}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-muted" /> {formatDate(sess.started_at)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Selected Session Inspector */}
        <div className="lg:col-span-7">
          {selectedSession ? (
            <Card cornerMarker className="p-6">
              <div className="flex items-center justify-between pb-4 border-b border-border mb-6">
                <div>
                  <span className="text-[10px] font-mono text-muted uppercase">Session Inspector</span>
                  <h3 className="font-display text-lg font-bold text-text mt-0.5">{selectedSession.id}</h3>
                </div>
                <Badge variant="semantic">{selectedSession.status}</Badge>
              </div>

              <div className="space-y-6 text-xs font-mono">
                <div>
                  <span className="text-[10px] text-muted uppercase block mb-1">Participating Agents</span>
                  <div className="text-text font-semibold">{selectedSession.agent_ids.join(', ')}</div>
                </div>

                <div>
                  <span className="text-[10px] text-muted uppercase block mb-1">Target Task</span>
                  <div className="text-text">{selectedSession.task_id || 'task-01'}</div>
                </div>

                {selectedSession.handoff_summary && (
                  <div>
                    <span className="text-[10px] text-warning uppercase block mb-1">Handoff Summary</span>
                    <p className="p-3 bg-bg border border-border text-text">
                      {selectedSession.handoff_summary}
                    </p>
                  </div>
                )}

                {/* Context Reused Section */}
                <div className="pt-4 border-t border-border">
                  <span className="text-[10px] text-success uppercase block mb-2 font-bold flex items-center gap-1.5">
                    <ArrowRight className="w-3.5 h-3.5 text-success" /> Context Reused From Prior Session
                  </span>
                  {selectedSession.memories_retrieved.length > 0 ? (
                    <div className="space-y-2">
                      {selectedSession.memories_retrieved.map((m) => (
                        <div key={m.id} className="p-3 bg-bg border border-success/30 text-xs">
                          <span className="text-success font-semibold">{m.id}</span>
                          <p className="text-muted mt-1">{m.content}</p>
                          <div className="mt-2 text-[10px] text-muted/60">Author: {m.source_agent_id}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-xs text-muted/60 italic">
                      No prior context retrieved (Session 1 initial triage).
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ) : (
            <div className="h-64 border border-dashed border-border flex items-center justify-center text-xs font-mono text-muted">
              Select a session from the left column to inspect its memory provenance.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
