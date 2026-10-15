import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bot, CheckCircle2, Clock } from 'lucide-react';
import { Agent } from '@/lib/types';

interface AgentCardProps {
  agent: Agent;
}

export const AgentCard: React.FC<AgentCardProps> = ({ agent }) => {
  return (
    <Card cornerMarker className="flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Bot className="w-4 h-4 text-accent" />
            <span className="font-display font-semibold text-sm text-text">{agent.role}</span>
          </div>
          <Badge variant={agent.status === 'completed' ? 'success' : 'neutral'}>
            {agent.status}
          </Badge>
        </div>
        <div className="text-xs font-mono text-muted mb-4">{agent.id}</div>
        <p className="text-xs text-muted leading-relaxed">
          {agent.role === 'Investigator'
            ? 'Runs in Session 1. Triage issues, extracts evidence, and writes episodic memories to FalkorDB with handoff targets.'
            : 'Runs in Session 2. Queries FalkorDB for existing memories, reuses prior findings, and commits resolved state.'}
        </p>
      </div>

      <div className="pt-4 mt-4 border-t border-border flex items-center justify-between text-[10px] font-mono text-muted">
        <span>Workspace: {agent.workspace_id}</span>
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3 text-muted" /> Active
        </span>
      </div>
    </Card>
  );
};
