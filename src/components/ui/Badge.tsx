import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface BadgeProps {
  variant?: 'default' | 'secondary' | 'outline';
  children: React.ReactNode;
  className?: string;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', children }, ref) => {
    const variants = {
      default: 'bg-primary/20 text-primary border-primary/30',
      secondary: 'bg-white/5 text-text border-white/10',
      outline: 'text-text-muted border-white/20 bg-transparent',
    };

    return (
      <motion.div
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-colors',
          variants[variant],
          className
        )}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    );
  }
);

Badge.displayName = 'Badge';

export { Badge };
