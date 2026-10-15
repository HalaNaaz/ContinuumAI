'use client';

import React, { useState } from 'react';
import { GraphDataResponse, GraphNode, GraphEdge } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Network, ZoomIn, ZoomOut, Maximize2, ListFilter } from 'lucide-react';

interface GraphCanvasProps {
  graphData: GraphDataResponse;
  isLoading?: boolean;
}

export const GraphCanvas: React.FC<GraphCanvasProps> = ({ graphData, isLoading = false }) => {
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [viewMode, setViewMode] = useState<'canvas' | 'list'>('canvas');
  const [zoom, setZoom] = useState<number>(1);

  if (isLoading) {
    return (
      <div className="h-[500px] border border-border bg-bg flex flex-col items-center justify-center text-xs font-mono text-muted">
        <Network className="w-8 h-8 text-accent animate-spin mb-3" />
        <span>Loading FalkorDB Knowledge Graph...</span>
      </div>
    );
  }

  const nodes = graphData.nodes || [];
  const edges = graphData.edges || [];

  return (
    <div className="relative border border-border bg-bg overflow-hidden flex flex-col h-[560px]">
      {/* Canvas Top Bar Controls */}
      <div className="border-b border-border bg-surface px-4 py-2.5 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs uppercase font-semibold text-text flex items-center gap-2">
            <Network className="w-4 h-4 text-accent" /> FalkorDB Graph Canvas
          </span>
          <span className="text-[10px] font-mono text-muted">
            {nodes.length} nodes · {edges.length} edges
          </span>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <button
            onClick={() => setViewMode(viewMode === 'canvas' ? 'list' : 'canvas')}
            className="px-2.5 py-1 border border-border hover:bg-surface-2 text-text flex items-center gap-1.5"
          >
            <ListFilter className="w-3.5 h-3.5 text-muted" />
            {viewMode === 'canvas' ? 'Accessible List View' : 'Interactive Canvas'}
          </button>
          {viewMode === 'canvas' && (
            <div className="flex items-center border border-border">
              <button
                onClick={() => setZoom((z) => Math.min(z + 0.15, 1.8))}
                className="p-1.5 hover:bg-surface-2 text-muted hover:text-text"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setZoom((z) => Math.max(z - 0.15, 0.6))}
                className="p-1.5 hover:bg-surface-2 text-muted hover:text-text border-l border-border"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setZoom(1)}
                className="p-1.5 hover:bg-surface-2 text-muted hover:text-text border-l border-border"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Graph Content */}
      {viewMode === 'list' ? (
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="text-xs font-mono uppercase text-muted mb-2">Connected Entities</div>
          {nodes.map((n) => (
            <div key={n.id} className="p-3 border border-border bg-surface flex items-center justify-between">
              <div>
                <span className="text-xs font-mono font-medium text-text">{n.id}</span>
                <p className="text-xs text-muted mt-0.5">{n.data?.label}</p>
              </div>
              <Badge variant="neutral">{n.type}</Badge>
            </div>
          ))}
        </div>
      ) : (
        <div className="relative flex-1 bg-[radial-gradient(#383835_1px,transparent_1px)] [background-size:20px_20px] overflow-auto p-8">
          <div
            className="relative min-w-[700px] min-h-[450px] transition-transform duration-150 origin-top-left"
            style={{ transform: `scale(${zoom})` }}
          >
            {/* SVG Relationship Edges */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {edges.map((e) => {
                // Approximate positions based on node index
                const srcIdx = nodes.findIndex((n) => n.id === e.source);
                const tgtIdx = nodes.findIndex((n) => n.id === e.target);
                if (srcIdx === -1 || tgtIdx === -1) return null;

                const x1 = 120 + (srcIdx % 3) * 220;
                const y1 = 80 + Math.floor(srcIdx / 3) * 160;
                const x2 = 120 + (tgtIdx % 3) * 220;
                const y2 = 80 + Math.floor(tgtIdx / 3) * 160;

                return (
                  <g key={e.id}>
                    <line
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke={e.animated ? '#FF681F' : '#383835'}
                      strokeWidth={e.animated ? 2 : 1.5}
                      strokeDasharray={e.animated ? '5,5' : 'none'}
                    />
                    <text
                      x={(x1 + x2) / 2}
                      y={(y1 + y2) / 2 - 6}
                      fill="#A6A49E"
                      fontSize="9"
                      fontFamily="IBM Plex Mono"
                      textAnchor="middle"
                    >
                      {e.label}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Interactive Nodes */}
            <div className="grid grid-cols-3 gap-16 relative z-10 max-w-3xl">
              {nodes.map((n, idx) => {
                const isSelected = selectedNode?.id === n.id;
                const isMem = n.type.toLowerCase().includes('memory');
                const isEpisodic = n.data?.type === 'episodic';

                return (
                  <div
                    key={n.id}
                    onClick={() => setSelectedNode(n)}
                    className={`cursor-pointer p-3 border transition-all duration-150 ${
                      isSelected
                        ? 'border-accent bg-surface-2 shadow-glow'
                        : 'border-border bg-surface hover:border-muted'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-mono text-muted uppercase truncate max-w-[120px]">
                        {n.id}
                      </span>
                      <span
                        className={`w-2 h-2 rounded-full ${
                          isMem ? (isEpisodic ? 'bg-accent' : 'bg-success') : 'bg-warning'
                        }`}
                      />
                    </div>
                    <div className="text-xs font-mono font-semibold text-text line-clamp-2">
                      {n.data?.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Selected Node Details Drawer */}
      {selectedNode && (
        <div className="absolute right-0 top-12 bottom-0 w-80 bg-surface border-l border-border p-5 z-20 overflow-y-auto">
          <div className="flex items-center justify-between pb-3 border-b border-border mb-4">
            <span className="font-mono text-xs uppercase font-semibold text-text">Node Inspector</span>
            <button
              onClick={() => setSelectedNode(null)}
              className="text-xs font-mono text-muted hover:text-text"
            >
              ✕
            </button>
          </div>

          <div className="space-y-4 text-xs font-mono">
            <div>
              <div className="text-[10px] text-muted uppercase">Identifier</div>
              <div className="text-text font-semibold mt-0.5">{selectedNode.id}</div>
            </div>

            <div>
              <div className="text-[10px] text-muted uppercase">Entity Type</div>
              <Badge variant="neutral" className="mt-1">
                {selectedNode.type}
              </Badge>
            </div>

            <div>
              <div className="text-[10px] text-muted uppercase">Content / Summary</div>
              <p className="text-text mt-1 text-xs leading-relaxed bg-bg p-3 border border-border">
                {selectedNode.data?.label}
              </p>
            </div>

            {selectedNode.data?.details && (
              <div className="pt-2">
                <div className="text-[10px] text-muted uppercase mb-1.5">Graph Provenance</div>
                <div className="space-y-1 text-[11px] text-muted">
                  {Object.entries(selectedNode.data.details).map(([k, v]) => (
                    <div key={k} className="truncate">
                      <span className="text-muted/60">{k}:</span> {String(v)}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
