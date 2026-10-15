import React from 'react';
import { AgentEvent } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Bot, ArrowRight, Database, CheckCircle, FileText } from 'lucide-react';

interface TimelineProps {
  events: AgentEvent[];
}

export const Timeline: React.FC<TimelineProps> = ({ events }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'task_received':
        return <Bot className="w-3.5 h-3.5 text-text" />;
      case 'memory_written':
        return <Database className="w-3.5 h-3.5 text-accent" />;
      case 'memory_retrieved':
        return <ArrowRight className="w-3.5 h-3.5 text-success" />;
      case 'handoff_created':
        return <FileText className="w-3.5 h-3.5 text-warning" />;
      default:
        return <CheckCircle className="w-3.5 h-3.5 text-muted" />;
    }
  };

  if (!events || events.length === 0) {
    return (
      <div className="p-8 text-center text-xs font-mono text-muted border border-dashed border-border">
        No observable events recorded yet. Run a session to see agent actions.
      </div>
    );
  }

  return (
    <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[1px] before:bg-border">
      {events.map((evt) => (
        <div key={evt.id} className="relative group">
          {/* Timeline Dot */}
          <div className="absolute -left-6 top-1 w-4 h-4 bg-surface border border-border flex items-center justify-center">
            {getIcon(evt.event_type)}
          </div>

          <div className="bg-surface border border-border p-4 hover:border-muted transition-colors">
            <div className="flex items-center justify-between gap-4 mb-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-semibold text-text">{evt.agent_id}</span>
                <Badge variant={evt.event_type === 'memory_retrieved' ? 'semantic' : 'episodic'}>
                  {evt.event_type.replace('_', ' ')}
                </Badge>
              </div>
              <span className="text-[10px] font-mono text-muted">{formatDate(evt.timestamp)}</span>
            </div>

            <p className="text-xs text-text/90 font-mono leading-relaxed">{evt.description}</p>

            {evt.metadata && Object.keys(evt.metadata).length > 0 && (
              <div className="mt-3 pt-2 border-t border-border/50 text-[10px] font-mono text-muted flex gap-3">
                {Object.entries(evt.metadata).map(([k, v]) => (
                  <span key={k}>
                    <span className="text-muted/60">{k}:</span> {String(v)}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
