import React from 'react';
import { Memory } from '@/lib/types';
import { MemoryCard } from './memory-card';

interface MemoryListProps {
  memories: Memory[];
  onSelect?: (memory: Memory) => void;
}

export const MemoryList: React.FC<MemoryListProps> = ({ memories, onSelect }) => {
  if (!memories || memories.length === 0) {
    return (
      <div className="p-12 text-center text-xs font-mono text-muted border border-dashed border-border">
        No memories found for this query in FalkorDB.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {memories.map((m) => (
        <MemoryCard key={m.id} memory={m} onSelect={onSelect} />
      ))}
    </div>
  );
};
