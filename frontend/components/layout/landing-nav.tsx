import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const LandingNav: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-bg/90 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-display text-xl font-bold tracking-tight text-text">
            CONTINUUM<span className="text-accent">AI</span>
          </span>
          <span className="text-[10px] font-mono text-muted uppercase tracking-widest border border-border px-1.5 py-0.5">
            FalkorDB
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-wider text-muted">
          <a href="#how-it-works" className="hover:text-text transition-colors">How It Works</a>
          <a href="#memory-types" className="hover:text-text transition-colors">Memory Types</a>
          <a href="#architecture" className="hover:text-text transition-colors">Architecture</a>
          <a href="#faq" className="hover:text-text transition-colors">FAQ</a>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/app">
            <Button size="sm" variant="primary">
              Open Demo →
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};
