'use client';

import React, { useState, useEffect } from 'react';
import { apiClient } from '@/lib/api-client';
import { GraphDataResponse } from '@/lib/types';
import { GraphCanvas } from '@/components/graph/graph-canvas';
import { GraphLegend } from '@/components/graph/graph-legend';
import { RefreshCw, Network } from 'lucide-react';

export default function GraphPage() {
  const [graphData, setGraphData] = useState<GraphDataResponse>({
    workspace_id: 'demo-workspace-01',
    nodes: [],
    edges: [],
  });
  const [loading, setLoading] = useState(true);

  const fetchGraph = async () => {
    setLoading(true);
    try {
      const data = await apiClient.getGraph('demo-workspace-01');
      setGraphData(data);
    } catch (e) {
      console.warn('Could not fetch graph data:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGraph();
  }, []);

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-widest text-accent font-semibold">
            TOPOLOGY VISUALIZER
          </div>
          <h1 className="font-display text-3xl font-bold uppercase text-text mt-1">
            FalkorDB Memory Graph
          </h1>
          <p className="text-xs text-muted mt-1 font-mono">
            Interactive visualization of active nodes, relationships, and provenances stored in FalkorDB.
          </p>
        </div>

        <button
          onClick={fetchGraph}
          className="p-2 border border-border hover:bg-surface text-muted hover:text-text font-mono text-xs flex items-center gap-1.5"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          Refresh Graph
        </button>
      </div>

      <GraphLegend />

      <GraphCanvas graphData={graphData} isLoading={loading} />
    </div>
  );
}
