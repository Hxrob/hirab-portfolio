import React, { useLayoutEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github } from 'lucide-react';
import { Section } from './Section';
import { SectionHeading } from './ui/SectionHeading';
import { Corners } from './ui/Corners';
import { SITE } from '../data/site';
import { getOptimizedImageUrl, getOptimizedSrcSet } from '../lib/vercelImage';

gsap.registerPlugin(ScrollTrigger);

const PROJECT_IMAGE_WIDTHS = [480, 768, 1024, 1440];
const PROJECT_IMAGE_SIZES =
  '(min-width: 1280px) 34vw, (min-width: 768px) 40vw, 92vw';

const Projects: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-project-img]').forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: 'inset(0 0 100% 0)' },
          {
            clipPath: 'inset(0 0 0% 0)',
            duration: 1.1,
            ease: 'power4.out',
            scrollTrigger: { trigger: el, start: 'top 82%' },
          }
        );
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <Section id="projects" className="relative deferred-section">
      <div ref={rootRef} className="relative z-10">
        <SectionHeading
          index="02"
          overline="Deployments"
          title="Featured Work"
        />

        {/* Project dossiers */}
        <div className="mt-4 space-y-16 md:space-y-24">
          {SITE.projects.map((project, index) => {
            const isEven = index % 2 === 1;
            const num = String(index + 1).padStart(2, '0');

            return (
              <motion.article
                key={project.title}
                className="border-t border-white/10 pt-8 md:pt-12"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6 }}
              >
                {/* Row meta */}
                <div className="flex items-center justify-between mb-6 md:mb-8">
                  <span className="font-mono text-sm text-primary tracking-[0.2em]">
                    /{num}
                  </span>
                  <span className="hud-label hidden sm:block">
                    PROJECT_FILE.{num} // STATUS: SHIPPED
                  </span>
                </div>

                <div
                  className={`w-full flex flex-col items-center gap-8 md:gap-14 ${
                    isEven ? 'md:flex-row-reverse' : 'md:flex-row'
                  }`}
                >
                  {/* Image pane */}
                  <div className="relative md:w-2/5 w-full flex-shrink-0">
                    <div className="relative border border-white/10 bg-surface/40 p-2">
                      <Corners size="sm" />
                      <div data-project-img className="overflow-hidden">
                        {project.image ? (
                          <img
                            src={getOptimizedImageUrl(project.image, 1024, 68)}
                            srcSet={getOptimizedSrcSet(project.image, PROJECT_IMAGE_WIDTHS, 68)}
                            sizes={PROJECT_IMAGE_SIZES}
                            alt={project.title}
                            className="w-full h-auto object-contain hover:scale-[1.02] transition-transform duration-500"
                            width={project.imageWidth}
                            height={project.imageHeight}
                            loading="lazy"
                            decoding="async"
                          />
                        ) : (
                          <div className="w-full aspect-video bg-primary/5" />
                        )}
                      </div>
                      <div className="flex items-center justify-between pt-2 px-1">
                        <span className="hud-label text-primary">FIG.{num}</span>
                        <span className="hud-label">{project.title.toUpperCase()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Details pane */}
                  <div className="md:w-3/5 w-full flex flex-col justify-center gap-5 md:gap-6">
                    <h3 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-text leading-tight">
                      {project.title}
                    </h3>

                    <p className="font-mono text-sm md:text-[0.9rem] text-text-muted leading-relaxed border-l border-white/15 pl-4">
                      {project.description}
                    </p>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="chip">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3 pt-1">
                      {'demo' in project.links && project.links.demo && (
                        <a
                          href={project.links.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="clip-notch inline-flex items-center gap-2 px-6 py-3 font-mono text-xs uppercase tracking-[0.18em] bg-primary text-background hover:bg-primary-hover hover:text-background transition-colors duration-200"
                          aria-label={`View live demo of ${project.title}`}
                        >
                          Launch Demo
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}

                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 font-mono text-xs uppercase tracking-[0.18em] border border-white/20 text-text hover:border-primary/60 hover:text-primary transition-colors duration-200"
                        aria-label={`View source code for ${project.title} on GitHub`}
                      >
                        <Github className="h-4 w-4" />
                        Source
                      </a>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Call to action */}
        <motion.div
          className="mt-16 md:mt-24 border-t border-white/10 pt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-xs md:text-sm text-text-muted max-w-xl">
            // Additional deployments, experiments and contributions archived on GitHub.
          </p>
          <a
            href={SITE.socials.find(s => s.label === 'GitHub')?.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-6 py-3 font-mono text-xs uppercase tracking-[0.18em] border border-white/20 text-text hover:border-primary/60 hover:text-primary transition-colors duration-200 whitespace-nowrap"
          >
            <Github className="h-4 w-4" />
            View All Projects
            <ExternalLink className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </motion.div>
      </div>
    </Section>
  );
};

export { Projects };
