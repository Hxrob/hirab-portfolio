import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, asChild = false, onClick, type, disabled }, ref) => {
    const baseClasses =
      'inline-flex items-center justify-center font-mono uppercase tracking-[0.18em] transition-colors duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:opacity-50 disabled:pointer-events-none';

    const variants = {
      primary: 'clip-notch bg-primary text-background hover:bg-primary-hover',
      secondary: 'border border-white/20 text-text hover:border-primary/60 hover:text-primary',
      ghost: 'text-text-muted hover:text-primary',
    };

    const sizes = {
      sm: 'px-4 py-2 text-[10px]',
      md: 'px-6 py-3 text-xs',
      lg: 'px-8 py-4 text-xs md:text-sm',
    };

    const classes = cn(
      baseClasses,
      variants[variant],
      sizes[size],
      className
    );

    if (asChild) {
      return (
        <motion.div
          className={classes}
          whileTap={{ scale: 0.97 }}
          onClick={onClick}
        >
          {children}
        </motion.div>
      );
    }

    return (
      <motion.button
        ref={ref}
        className={classes}
        whileTap={{ scale: 0.97 }}
        onClick={onClick}
        type={type}
        disabled={disabled}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
