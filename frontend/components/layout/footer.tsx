import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border bg-surface pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-16 border-b border-border">
          <div className="md:col-span-2">
            <div className="font-display text-2xl font-bold tracking-tight text-text">
              CONTINUUM<span className="text-accent">AI</span>
            </div>
            <p className="mt-3 text-sm text-muted max-w-md">
              AI that remembers. Agents that continue. A graph-powered persistent memory and coordination layer
              for multi-agent workflows, powered by FalkorDB.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted border border-border px-2 py-1">
                Track 2: Agent Memory & Coordination
              </span>
            </div>
          </div>

          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-muted mb-4">Architecture</div>
            <ul className="space-y-2 text-xs font-mono text-muted">
              <li>Next.js Frontend</li>
              <li>FastAPI Backend</li>
              <li>FalkorDB Graph</li>
              <li>OpenCypher Engine</li>
            </ul>
          </div>

          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-muted mb-4">Resources</div>
            <ul className="space-y-2 text-xs font-mono text-muted">
              <li><a href="#how-it-works" className="hover:text-text">How It Works</a></li>
              <li><a href="#architecture" className="hover:text-text">System Specs</a></li>
              <li><a href="/app" className="hover:text-text">Interactive Demo</a></li>
            </ul>
          </div>
        </div>

        {/* Oversized Stencil Wordmark */}
        <div className="pt-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="font-display text-4xl md:text-6xl font-extrabold text-border/40 select-none tracking-tighter">
            CONTINUUMAI
          </div>
          <div className="text-xs font-mono text-muted text-right">
            Built for WeMakeDevs × FalkorDB Hackathon (2026)
          </div>
        </div>
      </div>
    </footer>
  );
};
