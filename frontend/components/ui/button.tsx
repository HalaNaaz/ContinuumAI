import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
  className,
  variant = 'primary',
  size = 'md',
  children,
  ...props
}) => {
  const base =
    'inline-flex items-center justify-center font-mono uppercase tracking-wider transition-colors duration-150 focus:outline-none focus:ring-1 focus:ring-accent disabled:opacity-50 disabled:pointer-events-none';

  const variants = {
    primary: 'bg-accent text-bg hover:bg-accent-hover font-semibold',
    secondary: 'bg-surface-2 text-text hover:bg-border border border-border',
    outline: 'bg-transparent text-text hover:bg-surface border border-border hover:border-muted',
    danger: 'bg-danger text-bg hover:opacity-90 font-semibold',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5',
    md: 'text-xs px-4 py-2.5',
    lg: 'text-sm px-6 py-3',
  };

  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
};
