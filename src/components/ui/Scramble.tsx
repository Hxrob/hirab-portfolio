import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

const GLYPHS = '▓▒░<>/[]{}=+*#_';

interface ScrambleProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'span' | 'p' | 'div';
  duration?: number;
  delay?: number;
}

/**
 * Decode-style text reveal: glyph noise settles into the real string
 * left-to-right once the element scrolls into view.
 */
const Scramble: React.FC<ScrambleProps> = ({
  text,
  className,
  as = 'span',
  duration = 900,
  delay = 0,
}) => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(text);
      return;
    }

    let raf = 0;
    let start: number | null = null;

    const tick = (now: number) => {
      if (start === null) start = now + delay;
      const t = (now - start) / duration;
      if (t < 0) {
        raf = requestAnimationFrame(tick);
        return;
      }
      if (t >= 1) {
        setDisplay(text);
        return;
      }
      const settled = Math.floor(t * text.length);
      let out = text.slice(0, settled);
      for (let i = settled; i < text.length; i++) {
        out += text[i] === ' ' ? ' ' : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      setDisplay(out);
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, text, duration, delay]);

  return React.createElement(
    as,
    { ref, className, 'aria-label': text },
    React.createElement('span', { 'aria-hidden': true }, display)
  );
};

export { Scramble };
