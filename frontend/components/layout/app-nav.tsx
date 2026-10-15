'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LayoutDashboard, History, Bot, Network, Database, Settings } from 'lucide-react';

export const AppNav: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { label: 'Overview', href: '/app', icon: LayoutDashboard },
    { label: 'Sessions', href: '/app/sessions', icon: History },
    { label: 'Agent Activity', href: '/app/agents', icon: Bot },
    { label: 'Memory Graph', href: '/app/graph', icon: Network },
    { label: 'Memory Explorer', href: '/app/memories', icon: Database },
    { label: 'Settings', href: '/app/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 border-r border-border bg-surface flex flex-col justify-between shrink-0 h-screen sticky top-0">
      <div>
        <div className="h-16 px-6 border-b border-border flex items-center justify-between">
          <Link href="/" className="font-display text-lg font-bold tracking-tight text-text">
            CONTINUUM<span className="text-accent">AI</span>
          </Link>
          <span className="text-[10px] font-mono bg-accent/15 text-accent border border-accent/40 px-1.5 py-0.5">
            DEMO
          </span>
        </div>

        <div className="px-4 py-6">
          <div className="text-[10px] font-mono uppercase tracking-widest text-muted px-3 mb-3">
            Navigation
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 text-xs font-mono uppercase tracking-wider transition-colors',
                    isActive
                      ? 'bg-surface-2 text-text border-l-2 border-accent pl-2.5 font-medium'
                      : 'text-muted hover:text-text hover:bg-surface-2/50'
                  )}
                >
                  <Icon className={cn('w-4 h-4', isActive ? 'text-accent' : 'text-muted')} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="p-4 border-t border-border">
        <div className="p-3 bg-bg border border-border">
          <div className="text-[10px] font-mono text-muted uppercase">Workspace Scope</div>
          <div className="text-xs font-mono font-medium text-text mt-0.5 truncate">demo-workspace-01</div>
          <div className="flex items-center gap-1.5 mt-2">
            <span className="w-2 h-2 rounded-full bg-success"></span>
            <span className="text-[10px] font-mono text-muted">FalkorDB Active</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
