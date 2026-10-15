import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  variant?: 'episodic' | 'semantic' | 'procedural' | 'success' | 'warning' | 'danger' | 'neutral';
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ variant = 'neutral', children, className }) => {
  const variants = {
    episodic: 'bg-accent/15 text-accent border-accent/40',
    semantic: 'bg-success/15 text-success border-success/40',
    procedural: 'bg-warning/15 text-warning border-warning/40',
    success: 'bg-success/15 text-success border-success/40',
    warning: 'bg-warning/15 text-warning border-warning/40',
    danger: 'bg-danger/15 text-danger border-danger/40',
    neutral: 'bg-surface-2 text-muted border-border',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 border',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
};
