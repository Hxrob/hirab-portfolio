import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { Scramble } from './Scramble';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  overline?: string;
  index?: string;
  className?: string;
  centered?: boolean;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  overline,
  index = '00',
  className,
}) => {
  return (
    <motion.div
      className={cn('mb-12 md:mb-16', className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center gap-4 mb-5">
        <span className="hud-label text-primary">[{index}]</span>
        {overline && <span className="hud-label">{overline}</span>}
        <span aria-hidden className="h-px flex-1 bg-white/10" />
        <span aria-hidden className="hud-label hidden sm:block text-white/20">///</span>
      </div>

      <Scramble
        as="h2"
        text={title.toUpperCase()}
        className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text"
      />

      {subtitle && (
        <motion.p
          className="mt-5 max-w-2xl font-mono text-xs md:text-sm text-text-muted leading-relaxed"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.5 }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
};

export { SectionHeading };
