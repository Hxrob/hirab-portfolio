import React from 'react';
import { cn } from '../lib/utils';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ children, className, containerClassName, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn('section-padding', className)}
        {...props}
      >
        <div className={cn('section-container', containerClassName)}>
          {children}
        </div>
      </section>
    );
  }
);

Section.displayName = 'Section';

export { Section };
