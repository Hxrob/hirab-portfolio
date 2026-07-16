import React, { useLayoutEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { Github, Linkedin, Mail, FileDown } from 'lucide-react';
import { Section } from './Section';
import { Button } from './ui/Button';
import { Magnetic } from './ui/Magnetic';
import { Corners } from './ui/Corners';
import { SITE } from '../data/site';
import TextType from './ui/TextType';

const TICKER_ITEMS = [
  'SOFTWARE ENGINEER',
  'ML / AI',
  'FULL-STACK',
  'CLOUD',
  'RESEARCH',
  'PHILADELPHIA, PA',
  'OPEN TO WORK',
];

const Hero: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [firstName, ...restName] = SITE.name.split(' ');

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-reveal]',
        { y: 26, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', stagger: 0.08, delay: 0.1 }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const handleScrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <Section id="intro" className="relative min-h-[70vh] sm:min-h-screen flex items-center overflow-hidden pb-24 sm:pb-32">
      {/* Engineering-grid backdrop */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-blueprint" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 55% at 50% 0%, rgba(200,245,66,0.06), transparent 65%)',
          }}
        />
        {/* crosshair ticks */}
        <span className="absolute top-1/3 left-[8%] hidden lg:block font-mono text-white/15 select-none">+</span>
        <span className="absolute top-2/3 left-[46%] hidden lg:block font-mono text-white/15 select-none">+</span>
        <span className="absolute top-1/4 right-[6%] hidden lg:block font-mono text-white/15 select-none">+</span>
      </div>

      {/* HUD corner readouts */}
      <div aria-hidden className="absolute top-24 left-6 lg:left-10 hidden md:block hud-label">
        HA — PORTFOLIO_v2.0
      </div>
      <div aria-hidden className="absolute top-24 right-6 lg:right-10 hidden md:block hud-label">
        39.9526°N / 75.1652°W
      </div>

      <div ref={rootRef} className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full">
        {/* Left content */}
        <div className="space-y-6 sm:space-y-8">
          {/* Status line */}
          <div className="flex items-center gap-3" data-reveal>
            <span className="w-1.5 h-1.5 bg-primary animate-blink" />
            <span className="hud-label text-primary">SYS.ONLINE</span>
            <span className="hud-label">// {SITE.role.toUpperCase()}</span>
          </div>

          {/* Name */}
          <h1 className="font-bold uppercase leading-[0.92] tracking-tight text-[clamp(2.75rem,6.5vw,6rem)]">
            <span className="block text-text" data-reveal>{firstName}</span>
            <span
              className="block text-transparent"
              style={{ WebkitTextStroke: '1.5px rgba(231,234,226,0.85)' }}
              data-reveal
            >
              {restName.join(' ')}
            </span>
          </h1>

          {/* Typed headline */}
          <div className="font-mono text-sm sm:text-base md:text-lg min-h-[1.75rem]" data-reveal>
            <span className="text-white/30 mr-2 select-none">&gt;</span>
            <TextType
              text={SITE.intro.headline}
              className="text-primary"
              pauseDuration={3000}
              typingSpeed={100}
              deletingSpeed={50}
              loop={true}
              showCursor={true}
              cursorCharacter="█"
              cursorClassName="text-primary"
            />
          </div>

          {/* Description */}
          <p className="font-mono text-xs sm:text-sm text-text-muted max-w-xl leading-relaxed border-l border-white/15 pl-4" data-reveal>
            {SITE.intro.subtext}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3 sm:gap-4" data-reveal>
            <Magnetic>
              <motion.a
                href={SITE.intro.ctaPrimary.href}
                target="_blank"
                rel="noopener noreferrer"
                className="clip-notch inline-flex items-center justify-center gap-2 px-6 py-3 font-mono text-xs uppercase tracking-[0.18em] bg-primary text-background hover:bg-primary-hover hover:text-background transition-colors duration-200"
                whileTap={{ scale: 0.97 }}
              >
                <Linkedin className="h-4 w-4" />
                {SITE.intro.ctaPrimary.label}
              </motion.a>
            </Magnetic>

            <Button
              variant="secondary"
              size="md"
              onClick={() => handleScrollToSection(SITE.intro.ctaSecondary.href)}
            >
              {SITE.intro.ctaSecondary.label}
            </Button>

            <Magnetic>
              <motion.a
                href="/Hirab_Abdourazak_2025.pdf"
                download
                className="inline-flex items-center gap-2 px-6 py-3 font-mono text-xs uppercase tracking-[0.18em] border border-white/20 text-text hover:border-primary/60 hover:text-primary transition-colors duration-200"
                whileTap={{ scale: 0.97 }}
              >
                <FileDown className="h-4 w-4" />
                Resume
              </motion.a>
            </Magnetic>
          </div>

          {/* Social links */}
          <div className="flex justify-center sm:justify-start gap-6 pt-2 sm:pt-4" data-reveal>
            {SITE.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-text-muted hover:text-primary transition-colors duration-200"
              >
                {social.label === 'GitHub' && <Github className="h-4 w-4" />}
                {social.label === 'LinkedIn' && <Linkedin className="h-4 w-4" />}
                {social.label === 'Email' && <Mail className="h-4 w-4" />}
                <span className="hidden sm:inline">{social.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Right content - framed portrait */}
        <div className="relative flex items-center justify-center lg:justify-end order-first lg:order-last mt-8 lg:mt-0" data-reveal>
          <div className="relative w-full max-w-[260px] sm:max-w-xs md:max-w-md lg:max-w-lg">
            <div className="relative border border-white/10 bg-surface/40 p-2">
              <Corners />
              <div className="relative aspect-square overflow-hidden">
                <img
                  src="/hero-image.webp"
                  alt={`${SITE.name} - ${SITE.role}`}
                  className="w-full h-full object-cover grayscale-[30%] contrast-105 hover:grayscale-0 transition-[filter] duration-500"
                  fetchPriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent pointer-events-none" />
              </div>
              <div className="flex items-center justify-between pt-2 px-1">
                <span className="hud-label text-primary">FIG.01</span>
                <span className="hud-label">{SITE.location.toUpperCase()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-20 sm:bottom-24 left-1/2 -translate-x-1/2 hidden sm:block text-center cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.4 }}
        onClick={() => handleScrollToSection('#skills')}
      >
        <span className="hud-label">Scroll</span>
        <motion.span
          className="block w-px h-8 bg-primary/70 mx-auto mt-2 origin-top"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Ticker strip */}
      <div className="absolute bottom-0 left-0 right-0 border-y border-white/10 bg-background/70 backdrop-blur-sm py-3 marquee">
        <div className="marquee-track" aria-hidden>
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="inline-flex items-center font-mono text-[11px] uppercase tracking-[0.3em] text-text-muted">
              {item}
              <span className="text-primary mx-8 select-none">+</span>
            </span>
          ))}
        </div>
      </div>
    </Section>
  );
};

export { Hero };
