import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  overline?: string;
  className?: string;
  centered?: boolean;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  overline,
  className,
  centered = false,
}) => {
  return (
    <motion.div
      className={cn(
        'mb-12 md:mb-16',
        centered ? 'text-center' : '',
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
    >
      {overline && (
        <motion.div
          className="text-primary text-sm font-medium uppercase tracking-wider mb-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          {overline}
        </motion.div>
      )}
      
      <motion.h2
        className="text-3xl md:text-4xl lg:text-5xl font-bold text-text mb-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1, duration: 0.6 }}
      >
        {title}
      </motion.h2>
      
      {subtitle && (
        <motion.p
          className={cn(
            "text-lg text-text-muted max-w-2xl",
            centered ? "mx-auto" : ""
          )}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
};

export { SectionHeading };
