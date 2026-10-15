import React from 'react';
import { AppNav } from '@/components/layout/app-nav';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-bg text-text">
      <AppNav />
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="h-16 border-b border-border bg-surface px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <span className="font-display text-sm font-bold uppercase text-text">
              ContinuumAI Platform
            </span>
            <span className="text-[10px] font-mono text-muted uppercase tracking-widest border border-border px-2 py-0.5">
              Workspace: demo-workspace-01
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-muted">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-success"></span>
              <span>FastAPI + FalkorDB Ready</span>
            </span>
          </div>
        </header>

        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
