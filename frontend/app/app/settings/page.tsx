'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { apiClient } from '@/lib/api-client';
import { HealthResponse } from '@/lib/types';
import { ShieldCheck, Database, RefreshCw, AlertTriangle } from 'lucide-react';

export default function SettingsPage() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [resetMessage, setResetMessage] = useState<string | null>(null);

  useEffect(() => {
    apiClient
      .getHealth()
      .then((data) => setHealth(data))
      .catch((e) => console.warn('Could not fetch health:', e));
  }, []);

  const handleResetWorkspace = async () => {
    if (!confirm('Are you sure you want to reset demo-workspace-01 to a clean state?')) {
      return;
    }
    setIsResetting(true);
    try {
      const res = await apiClient.resetWorkspace();
      setResetMessage(res.message);
    } catch (err: any) {
      alert(`Reset failed: ${err.message}`);
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <div className="text-[10px] font-mono uppercase tracking-widest text-accent font-semibold">
          SYSTEM CONFIGURATION
        </div>
        <h1 className="font-display text-3xl font-bold uppercase text-text mt-1">
          Settings & Workspace
        </h1>
        <p className="text-xs text-muted mt-1 font-mono">
          Tenant memory isolation, database connectivity, and demo reset controls.
        </p>
      </div>

      {/* Workspace Scope Card */}
      <Card cornerMarker className="p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-border">
          <span className="font-mono text-xs uppercase font-semibold text-text">
            Active Workspace Scope
          </span>
          <Badge variant="semantic">Tenant Scoped</Badge>
        </div>

        <div className="space-y-2 text-xs font-mono">
          <div>
            <span className="text-[10px] text-muted uppercase">Workspace ID</span>
            <div className="text-text font-semibold">demo-workspace-01</div>
          </div>
          <div>
            <span className="text-[10px] text-muted uppercase">Isolation Mechanism</span>
            <p className="text-muted leading-relaxed mt-0.5">
              All Cypher queries enforce strict workspace parameter binding (`$workspace_id`).
              Memories cannot be queried across different workspace boundaries.
            </p>
          </div>
        </div>
      </Card>

      {/* Backend & FalkorDB Connection Status */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-border">
          <span className="font-mono text-xs uppercase font-semibold text-text flex items-center gap-2">
            <Database className="w-4 h-4 text-accent" /> FalkorDB Graph Connectivity
          </span>
          <Badge variant={health?.database?.connected ? 'success' : 'warning'}>
            {health?.database?.connected ? 'Connected' : 'Offline / Standalone'}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-4 text-xs font-mono">
          <div>
            <span className="text-[10px] text-muted uppercase">Database Engine</span>
            <div className="text-text mt-0.5">{health?.database?.engine || 'FalkorDB'}</div>
          </div>
          <div>
            <span className="text-[10px] text-muted uppercase">LLM Provider</span>
            <div className="text-text mt-0.5">{health?.llm_provider?.provider || 'mock (offline demo)'}</div>
          </div>
        </div>
      </Card>

      {/* Reset Workspace Demo */}
      <Card className="p-6 border-danger/40 bg-surface/50">
        <div className="flex items-center justify-between pb-3 border-b border-border mb-4">
          <span className="font-mono text-xs uppercase font-semibold text-danger flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-danger" /> Danger Zone
          </span>
        </div>

        <p className="text-xs font-mono text-muted mb-4 leading-relaxed">
          Resetting will clear all created sessions, memories, and handoffs from demo-workspace-01 in FalkorDB,
          returning the environment to an empty state for repeating the demo.
        </p>

        <Button
          onClick={handleResetWorkspace}
          disabled={isResetting}
          variant="danger"
          size="sm"
        >
          {isResetting ? 'Resetting...' : 'Reset Demo Workspace'}
        </Button>

        {resetMessage && (
          <div className="mt-4 p-3 bg-bg border border-border text-xs font-mono text-success">
            {resetMessage}
          </div>
        )}
      </Card>
    </div>
  );
}
