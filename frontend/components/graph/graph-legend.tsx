import React from 'react';

export const GraphLegend: React.FC = () => {
  return (
    <div className="bg-surface/90 border border-border p-3 flex flex-wrap items-center gap-4 text-[10px] font-mono text-muted">
      <div className="flex items-center gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full bg-accent"></span>
        <span>Episodic Memory</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full bg-success"></span>
        <span>Semantic Memory</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full bg-warning"></span>
        <span>Procedural / Task</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full bg-border"></span>
        <span>Agent / Session</span>
      </div>
      <div className="flex items-center gap-1.5 ml-auto">
        <span className="text-accent font-semibold">RELATES_TO</span>
        <span>(Continuation Edge)</span>
      </div>
    </div>
  );
};
