import React from 'react';
import { cn } from '../../lib/utils';

interface CornersProps {
  className?: string;
  size?: 'sm' | 'md';
}

/**
 * Four corner-bracket ticks for framing panels and images.
 * Parent must be `relative`.
 */
const Corners: React.FC<CornersProps> = ({ className, size = 'md' }) => {
  const dim = size === 'sm' ? 'h-2 w-2' : 'h-3 w-3';
  const edge = cn('pointer-events-none absolute border-primary/70', dim, className);

  return (
    <>
      <span aria-hidden className={cn(edge, 'top-0 left-0 border-t border-l')} />
      <span aria-hidden className={cn(edge, 'top-0 right-0 border-t border-r')} />
      <span aria-hidden className={cn(edge, 'bottom-0 left-0 border-b border-l')} />
      <span aria-hidden className={cn(edge, 'bottom-0 right-0 border-b border-r')} />
    </>
  );
};

export { Corners };
