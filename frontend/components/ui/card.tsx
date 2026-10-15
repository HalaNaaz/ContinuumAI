import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  cornerMarker?: boolean;
}

export const Card: React.FC<CardProps> = ({ className, cornerMarker = false, children, ...props }) => {
  return (
    <div
      className={cn(
        'bg-surface border border-border p-5 relative',
        cornerMarker && 'corner-marker',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
