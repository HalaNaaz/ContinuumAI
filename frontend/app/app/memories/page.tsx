'use client';

import React, { useState, useEffect } from 'react';
import { apiClient } from '@/lib/api-client';
import { Memory, MemoryType } from '@/lib/types';
import { MemoryList } from '@/components/memory/memory-list';
import { Search, Filter, RefreshCw } from 'lucide-react';

export default function MemoriesPage() {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [loading, setLoading] = useState(false);

  const fetchMemories = async () => {
    setLoading(true);
    try {
      const data = await apiClient.listMemories();
      setMemories(data);
    } catch (e) {
      console.warn('Could not fetch memories:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMemories();
  }, []);

  const filteredMemories = memories.filter((m) => {
    const matchesSearch =
      m.content.toLowerCase().includes(search.toLowerCase()) ||
      (m.summary && m.summary.toLowerCase().includes(search.toLowerCase())) ||
      m.id.toLowerCase().includes(search.toLowerCase());

    const matchesType = filterType === 'all' || m.memory_type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-widest text-accent font-semibold">
            KNOWLEDGE BASE
          </div>
          <h1 className="font-display text-3xl font-bold uppercase text-text mt-1">
            Memory Explorer
          </h1>
          <p className="text-xs text-muted mt-1 font-mono">
            Search, filter, and inspect structured memories stored in FalkorDB.
          </p>
        </div>

        <button
          onClick={fetchMemories}
          className="p-2 border border-border hover:bg-surface text-muted hover:text-text font-mono text-xs flex items-center gap-1.5"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Search and Filters Bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-8 relative">
          <Search className="w-4 h-4 text-muted absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search memory text, summaries, or IDs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-surface border border-border pl-10 pr-4 py-2.5 text-xs font-mono text-text focus:outline-none focus:border-accent"
          />
        </div>

        <div className="md:col-span-4 flex items-center gap-2">
          {['all', 'episodic', 'semantic', 'procedural'].map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`flex-1 py-2.5 text-[11px] font-mono uppercase tracking-wider border transition-colors ${
                filterType === t
                  ? 'bg-accent text-bg border-accent font-semibold'
                  : 'bg-surface text-muted border-border hover:border-muted'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Memory Cards Grid */}
      <MemoryList memories={filteredMemories} />
    </div>
  );
}
