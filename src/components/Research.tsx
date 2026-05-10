import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Download,
  Eye,
  X,
  ZoomIn,
  FileText,
  GraduationCap,
  ArrowUpRight,
} from 'lucide-react';
import { Section } from './Section';
import { SectionHeading } from './ui/SectionHeading';
import { Button } from './ui/Button';
import { SITE } from '../data/site';

const Research: React.FC = () => {
  const research = SITE.research;
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen]);

  return (
    <Section id="research" className="relative">
      {/* Bespoke background — dotted grid + soft horizon glow, scholarly tone */}
      <div className="absolute inset-0 -z-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              'radial-gradient(rgba(139,92,246,0.35) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
            maskImage:
              'radial-gradient(ellipse at 50% 30%, black 30%, transparent 75%)',
            WebkitMaskImage:
              'radial-gradient(ellipse at 50% 30%, black 30%, transparent 75%)',
          }}
        />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[60rem] h-[60rem] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </div>

      <div className="relative z-10">
        <SectionHeading
          overline="Research"
          title="Selected Publication"
          centered
        />

        {/* Editorial card */}
        <motion.article
          className="relative mx-auto max-w-[84rem]"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          {/* Card frame */}
          <div className="relative rounded-[28px] border border-white/10 bg-surface/40 backdrop-blur-md overflow-hidden">
            {/* Top meta strip */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-6 md:px-10 pt-6 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-text-muted">
                <span className="inline-flex items-center gap-2 text-primary">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  {research.type}
                </span>
                <span className="text-white/20">/</span>
                <span>{research.role}</span>
              </div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-text-muted">
                <GraduationCap className="w-3.5 h-3.5 text-primary" />
                <span>Neuroscience · Psychology</span>
              </div>
            </div>

            <div className="grid gap-0 lg:grid-cols-12">
              {/* Poster preview */}
              <div className="relative p-6 md:p-10 lg:col-span-8 lg:border-r border-white/10">
                <motion.button
                  type="button"
                  onClick={() => setIsOpen(true)}
                  className="group relative flex w-full items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-black/40"
                  whileHover={{ scale: 1.005 }}
                  whileTap={{ scale: 0.995 }}
                  aria-label="Open full poster preview"
                >
                  <img
                    src={research.poster.preview}
                    alt={`Poster preview: ${research.title}`}
                    className="block w-full h-auto object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                  {/* Hover scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-background/80 backdrop-blur-md border border-white/15 px-4 py-2 text-xs text-text translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <ZoomIn className="w-3.5 h-3.5 text-primary" />
                    Click to expand
                  </div>
                  {/* Corner ornament */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-background/70 backdrop-blur-md border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-text-muted">
                    <FileText className="w-3 h-3 text-primary" />
                    Poster
                  </div>
                </motion.button>
              </div>

              {/* Details */}
              <div className="p-6 md:p-10 lg:col-span-4 flex flex-col gap-7">
                {/* Venue */}
                <div>
                  <div className="text-[11px] uppercase tracking-[0.22em] text-text-muted mb-2">
                    Presented at
                  </div>
                  <div className="text-text font-semibold text-lg leading-snug">
                    {research.venue}
                  </div>
                  <div className="text-text-muted text-sm mt-1">
                    {research.lab}
                  </div>
                </div>

                {/* Title — editorial display treatment */}
                <h3 className="text-2xl md:text-[1.65rem] leading-[1.2] font-semibold text-text">
                  <span className="bg-gradient-to-br from-white via-white to-white/70 bg-clip-text text-transparent">
                    {research.title}
                  </span>
                </h3>

                {/* Summary */}
                <p className="text-text-muted text-[0.97rem] leading-relaxed border-l-2 border-primary/40 pl-4">
                  {research.summary}
                </p>

                {/* Highlights */}
                <div className="grid grid-cols-3 gap-2 md:gap-3">
                  {research.highlights.map((h) => (
                    <div
                      key={h.label}
                      className="rounded-xl border border-white/10 bg-white/[0.02] px-3 py-3 min-w-0"
                    >
                      <div className="text-[10px] uppercase tracking-[0.14em] text-text-muted mb-1.5 truncate">
                        {h.label}
                      </div>
                      <div className="text-text text-[0.8rem] md:text-sm font-medium leading-tight break-words">
                        {h.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap gap-3 mt-1">
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => setIsOpen(true)}
                    aria-label="Preview poster"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                  <a
                    href={research.poster.pdf}
                    download={research.poster.filename}
                    className="inline-flex items-center justify-center font-medium px-6 py-3 text-base rounded-xl border border-white/20 hover:border-primary/60 text-text hover:bg-primary/10 transition-all duration-200"
                    aria-label="Download poster PDF"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </a>
                  <a
                    href={research.poster.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center font-medium px-5 py-3 text-sm rounded-xl text-text-muted hover:text-text transition-colors duration-200"
                    aria-label="Open PDF in new tab"
                  >
                    Open PDF
                    <ArrowUpRight className="w-4 h-4 ml-1" />
                  </a>
                </div>
              </div>
            </div>

            {/* Findings strip */}
            <div className="border-t border-white/10 px-6 md:px-10 py-6 md:py-8 bg-background/40">
              <div className="text-[11px] uppercase tracking-[0.22em] text-primary mb-4">
                Key Findings
              </div>
              <ul className="grid md:grid-cols-3 gap-x-8 gap-y-4">
                {research.findings.map((f, i) => (
                  <motion.li
                    key={i}
                    className="relative pl-6 text-text-muted text-sm leading-relaxed"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                  >
                    <span className="absolute left-0 top-0 font-mono text-[11px] text-primary tracking-widest">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {f}
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Co-authors footer */}
            <div className="border-t border-white/10 px-6 md:px-10 py-5 flex flex-col md:flex-row md:items-center gap-3 md:gap-6 bg-black/20">
              <div className="text-[11px] uppercase tracking-[0.22em] text-text-muted whitespace-nowrap">
                Co-authors
              </div>
              <div className="text-xs text-text-muted/90 leading-relaxed">
                {research.coAuthors.join(' · ')}
              </div>
            </div>
          </div>
        </motion.article>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-modal="true"
            aria-label="Poster preview"
          >
            <div
              className="absolute inset-0 bg-background/90 backdrop-blur-xl"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              className="relative z-10 w-full max-w-7xl"
              initial={{ scale: 0.96, y: 12 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 12 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="text-xs uppercase tracking-[0.22em] text-text-muted">
                  {research.venue} · {research.type}
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={research.poster.pdf}
                    download={research.poster.filename}
                    className="inline-flex items-center gap-2 rounded-full bg-primary/90 hover:bg-primary text-white text-xs font-medium px-4 py-2 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download
                  </a>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/15 text-text hover:bg-white/10 transition-colors"
                    aria-label="Close preview"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden border border-white/10 bg-black shadow-2xl shadow-primary/10">
                <img
                  src={research.poster.preview}
                  alt={`Full poster: ${research.title}`}
                  className="mx-auto max-h-[calc(100vh-7rem)] w-full h-auto object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
};

export { Research };
