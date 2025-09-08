
import React from 'react';
import { motion } from 'framer-motion';

type AnimatedBackgroundVariant = 'skills' | 'projects' | 'contact';

interface AnimatedBackgroundProps {
  variant?: AnimatedBackgroundVariant;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ variant = 'skills' }) => {
  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  if (prefersReducedMotion) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={
            variant === 'skills'
              ? 'absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent'
              : variant === 'projects'
              ? 'absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-primary-hover/5'
              : 'absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary-hover/5'
          }
        />
      </div>
    );
  }

  // Shared subtle gradient overlay per variant
  const GradientOverlay = () => (
    <div
      className={
        variant === 'skills'
          ? 'absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary-hover/5'
          : variant === 'projects'
          ? 'absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-primary-hover/10'
          : 'absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-primary/5'
      }
    />
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Variant: skills → soft orbs and rounded shapes */}
      {variant === 'skills' && (
        <>
          <motion.div
            className="absolute top-1/4 left-1/4 w-32 h-32 border border-primary/20 rounded-full"
            animate={{ y: [0, -20, 0], rotate: [0, 90, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute top-1/2 right-1/3 w-16 h-16 bg-primary/10 rounded-lg"
            animate={{ x: [0, 15, 0], y: [0, -25, 0], rotate: [0, -45, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />
          <motion.div
            className="absolute bottom-1/3 left-1/2 w-24 h-24 border-2 border-primary/15 rounded-full"
            animate={{ y: [0, 30, 0], x: [0, -10, 0], scale: [1, 0.9, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          />
          <motion.div
            className="absolute top-3/4 right-1/4 w-12 h-12 bg-gradient-to-br from-primary/20 to-primary-hover/10 rounded-full"
            animate={{ y: [0, -15, 0], x: [0, 20, 0], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          />
        </>
      )}

      {/* Variant: projects → grid, rectangles, scanning lines */}
      {variant === 'projects' && (
        <>
          {/* Subtle grid */}
          <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="pgrid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#7C3AED" strokeOpacity="0.15" strokeWidth="0.25" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#pgrid)" />
          </svg>
          {/* Scanning line */}
          <motion.div
            className="absolute left-0 right-0 h-12 bg-gradient-to-b from-primary/10 via-primary/0 to-transparent"
            animate={{ top: ['10%', '80%', '10%'] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* Floating cards */}
          <motion.div
            className="absolute top-1/3 left-1/5 w-20 h-14 bg-primary/10 border border-primary/20 rounded-xl"
            animate={{ y: [0, -12, 0], rotate: [0, 3, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-28 h-16 bg-primary-hover/10 border border-primary/20 rounded-xl"
            animate={{ y: [0, 10, 0], x: [0, -6, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
          />
        </>
      )}

      {/* Variant: contact → waves and small dots */}
      {variant === 'contact' && (
        <>
          {/* Animated waves */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <motion.path
              d="M0,70 C20,60 40,80 60,70 C80,60 90,65 100,60"
              fill="none"
              stroke="#7C3AED"
              strokeOpacity="0.15"
              strokeWidth="0.6"
              animate={{ pathLength: [0.2, 1, 0.2] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.path
              d="M0,85 C25,75 45,90 65,82 C85,74 95,78 100,75"
              fill="none"
              stroke="#8B5CF6"
              strokeOpacity="0.15"
              strokeWidth="0.6"
              animate={{ pathLength: [0.1, 1, 0.1] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            />
          </svg>
          {/* Dots */}
          {[...Array(10)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-primary/40"
              style={{ top: `${10 + (i * 7) % 80}%`, left: `${(i * 13) % 90}%` }}
              animate={{ opacity: [0.2, 0.7, 0.2], y: [0, -6, 0] }}
              transition={{ duration: 4 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
            />
          ))}
        </>
      )}

      {/* Shared overlay */}
      <GradientOverlay />
    </div>
  );
};

export { AnimatedBackground };
