import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Memory } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import { Database, UserCheck, Calendar } from 'lucide-react';

interface MemoryCardProps {
  memory: Memory;
  onSelect?: (memory: Memory) => void;
}

export const MemoryCard: React.FC<MemoryCardProps> = ({ memory, onSelect }) => {
  return (
    <Card
      cornerMarker
      onClick={() => onSelect?.(memory)}
      className="cursor-pointer hover:border-accent/60 transition-colors"
    >
      <div className="flex items-center justify-between gap-4 mb-3">
        <div className="flex items-center gap-2">
          <Database className="w-3.5 h-3.5 text-accent" />
          <span className="font-mono text-xs font-semibold text-text">{memory.id}</span>
        </div>
        <Badge variant={memory.memory_type}>{memory.memory_type}</Badge>
      </div>

      <div className="font-medium text-xs text-text mb-2 line-clamp-2">
        {memory.summary || memory.content}
      </div>

      <p className="text-xs text-muted leading-relaxed line-clamp-3 mb-4">
        {memory.content}
      </p>

      <div className="pt-3 border-t border-border flex items-center justify-between text-[10px] font-mono text-muted">
        <span className="flex items-center gap-1">
          <UserCheck className="w-3 h-3 text-muted" /> {memory.source_agent_id}
        </span>
        <span className="flex items-center gap-1">
          <Calendar className="w-3 h-3 text-muted" /> {formatDate(memory.created_at)}
        </span>
      </div>
    </Card>
  );
};
