'use client';

import React, { useState, useEffect } from 'react';
import { apiClient } from '@/lib/api-client';
import { Agent, AgentEvent } from '@/lib/types';
import { AgentCard } from '@/components/agents/agent-card';
import { Timeline } from '@/components/agents/timeline';
import { RefreshCw } from 'lucide-react';

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [events, setEvents] = useState<AgentEvent[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const ags = await apiClient.listAgents();
      setAgents(ags);
      const evs = await apiClient.getAgentEvents();
      setEvents(evs);
    } catch (e) {
      console.warn('Could not fetch agents or events:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-widest text-accent font-semibold">
            MULTI-AGENT COORDINATION
          </div>
          <h1 className="font-display text-3xl font-bold uppercase text-text mt-1">
            Agent Activity & Timeline
          </h1>
          <p className="text-xs text-muted mt-1 font-mono">
            Observable actions, task handoffs, and memory reads/writes.
          </p>
        </div>
        <button
          onClick={fetchData}
          className="p-2 border border-border hover:bg-surface text-muted hover:text-text font-mono text-xs flex items-center gap-1.5"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Agents Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {agents.map((ag) => (
          <AgentCard key={ag.id} agent={ag} />
        ))}
      </div>

      {/* Chronological Activity Timeline */}
      <div className="pt-6 border-t border-border">
        <h2 className="font-display text-lg font-bold uppercase text-text mb-6">
          Observable Audit Timeline
        </h2>
        <Timeline events={events} />
      </div>
    </div>
  );
}
