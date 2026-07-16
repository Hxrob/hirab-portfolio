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
import { Corners } from './ui/Corners';
import { SITE } from '../data/site';
import { getOptimizedImageUrl, getOptimizedSrcSet } from '../lib/vercelImage';

const RESEARCH_IMAGE_WIDTHS = [640, 960, 1200, 1600];
const RESEARCH_IMAGE_SIZES =
  '(min-width: 1280px) 60vw, (min-width: 1024px) 54vw, 92vw';

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
    <Section id="research" className="relative deferred-section">
      {/* Dotted-grid backdrop */}
      <div className="absolute inset-0 -z-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.16]"
          style={{
            backgroundImage:
              'radial-gradient(rgba(200,245,66,0.3) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
            maskImage:
              'radial-gradient(ellipse at 50% 30%, black 30%, transparent 75%)',
            WebkitMaskImage:
              'radial-gradient(ellipse at 50% 30%, black 30%, transparent 75%)',
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </div>

      <div className="relative z-10">
        <SectionHeading
          index="03"
          overline="Publications"
          title="Selected Research"
        />

        {/* Dossier card */}
        <motion.article
          className="relative mx-auto max-w-[84rem]"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <div className="relative border border-white/10 bg-surface/40 backdrop-blur-md overflow-hidden">
            <Corners />
            {/* Top meta strip */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-6 md:px-10 pt-6 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3 hud-label">
                <span className="inline-flex items-center gap-2 text-primary">
                  <span className="w-1.5 h-1.5 bg-primary animate-blink" />
                  {research.type}
                </span>
                <span className="text-white/20">/</span>
                <span>{research.role}</span>
              </div>
              <div className="flex items-center gap-2 hud-label">
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
                  className="group relative flex w-full items-center justify-center overflow-hidden border border-white/10 bg-black/40"
                  whileTap={{ scale: 0.995 }}
                  aria-label="Open full poster preview"
                >
                  <img
                    src={getOptimizedImageUrl(research.poster.preview, 1200, 68)}
                    srcSet={getOptimizedSrcSet(
                      research.poster.preview,
                      RESEARCH_IMAGE_WIDTHS,
                      68
                    )}
                    sizes={RESEARCH_IMAGE_SIZES}
                    alt={`Poster preview: ${research.title}`}
                    className="block w-full h-auto object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                    width={research.poster.previewWidth}
                    height={research.poster.previewHeight}
                    loading="lazy"
                    decoding="async"
                  />
                  {/* Hover scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-background/80 backdrop-blur-md border border-white/15 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-text translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <ZoomIn className="w-3.5 h-3.5 text-primary" />
                    Expand
                  </div>
                  {/* Corner ornament */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-background/70 backdrop-blur-md border border-white/10 px-3 py-1 hud-label">
                    <FileText className="w-3 h-3 text-primary" />
                    Poster
                  </div>
                </motion.button>
              </div>

              {/* Details */}
              <div className="p-6 md:p-10 lg:col-span-4 flex flex-col gap-7">
                {/* Venue */}
                <div>
                  <div className="hud-label mb-2">Presented at</div>
                  <div className="text-text font-semibold text-lg leading-snug">
                    {research.venue}
                  </div>
                  <div className="font-mono text-xs text-text-muted mt-1.5">
                    {research.lab}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl leading-[1.25] font-semibold text-text">
                  {research.title}
                </h3>

                {/* Summary */}
                <p className="font-mono text-xs text-text-muted leading-relaxed border-l border-primary/40 pl-4">
                  {research.summary}
                </p>

                {/* Highlights — spec table */}
                <div className="border border-white/10 bg-white/[0.02] divide-y divide-white/10">
                  {research.highlights.map((h) => (
                    <div
                      key={h.label}
                      className="flex items-baseline justify-between gap-4 px-4 py-3"
                    >
                      <span className="hud-label whitespace-nowrap">{h.label}</span>
                      <span className="font-mono text-xs text-text font-medium text-right">
                        {h.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap gap-3 mt-1">
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => setIsOpen(true)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                  <a
                    href={research.poster.pdf}
                    download={research.poster.filename}
                    className="inline-flex items-center justify-center px-6 py-3 font-mono text-xs uppercase tracking-[0.18em] border border-white/20 text-text hover:border-primary/60 hover:text-primary transition-colors duration-200"
                    aria-label="Download poster PDF"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </a>
                  <a
                    href={research.poster.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-4 py-3 font-mono text-xs uppercase tracking-[0.18em] text-text-muted hover:text-primary transition-colors duration-200"
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
              <div className="hud-label text-primary mb-5">
                // Key Findings
              </div>
              <ul className="grid md:grid-cols-3 gap-x-8 gap-y-4">
                {research.findings.map((f, i) => (
                  <motion.li
                    key={i}
                    className="relative pl-7 font-mono text-xs text-text-muted leading-relaxed"
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
              <div className="hud-label whitespace-nowrap">Co-authors</div>
              <div className="font-mono text-[11px] text-text-muted/90 leading-relaxed">
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
                <div className="hud-label">
                  {research.venue} · {research.type}
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={research.poster.pdf}
                    download={research.poster.filename}
                    className="clip-notch inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-background hover:text-background font-mono text-[10px] uppercase tracking-[0.18em] px-4 py-2 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download
                  </a>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="inline-flex items-center justify-center w-9 h-9 border border-white/15 text-text hover:border-primary/60 hover:text-primary transition-colors"
                    aria-label="Close preview"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="relative overflow-hidden border border-white/10 bg-black shadow-2xl shadow-primary/10">
                <Corners />
                <img
                  src={getOptimizedImageUrl(research.poster.preview, 1600, 72)}
                  srcSet={getOptimizedSrcSet(
                    research.poster.preview,
                    RESEARCH_IMAGE_WIDTHS,
                    72
                  )}
                  sizes="100vw"
                  alt={`Full poster: ${research.title}`}
                  className="mx-auto max-h-[calc(100vh-7rem)] w-full h-auto object-contain"
                  width={research.poster.previewWidth}
                  height={research.poster.previewHeight}
                  decoding="async"
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
