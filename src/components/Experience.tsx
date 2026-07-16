import React from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, MapPin } from 'lucide-react';
import { Section } from './Section';
import { SectionHeading } from './ui/SectionHeading';
import { SITE } from '../data/site';

const Experience: React.FC = () => {
  return (
    <Section id="experience" className="relative deferred-section bg-background/40">
      <div className="relative z-10">
        <SectionHeading
          title="Work Experience"
          centered
        />

        <div className="relative mx-auto max-w-4xl">
          <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-primary/20 via-primary/80 to-primary/20 md:left-5" />

          {SITE.experience.map((job, index) => (
            <motion.article
              key={`${job.organization}-${job.period}`}
              className="relative pb-14 pl-14 last:pb-0 md:pl-20"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
            >
              <div className="absolute left-0 top-1 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-primary/40 bg-background text-sm font-bold text-primary shadow-[0_0_0_7px_rgba(10,10,10,0.92)] md:h-10 md:w-10">
                {String(index + 1).padStart(2, '0')}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-text-muted">
                  <span className="flex items-center gap-2 text-primary">
                    <CalendarDays className="h-4 w-4" />
                    {job.period}
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    {job.location}
                  </span>
                </div>

                <h3 className="mt-3 text-2xl font-semibold leading-tight text-text md:text-3xl">
                  {job.role}
                </h3>
                <p className="mt-1 text-lg text-text-muted">
                  {job.organization}
                </p>
                <p className="mt-2 text-sm font-medium uppercase tracking-wider text-primary">
                  {job.focus}
                </p>

                <ul className="mt-5 space-y-3">
                  <li className="flex gap-3 text-text-muted">
                    <span className="mt-2 h-2 w-2 flex-none rounded-full bg-primary" />
                    <span className="leading-relaxed">{job.summary}</span>
                  </li>
                  {job.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3 text-text-muted">
                      <span className="mt-2 h-2 w-2 flex-none rounded-full bg-primary" />
                      <span className="leading-relaxed">{highlight}</span>
                    </li>
                  ))}
                </ul>

                <p className="mt-5 text-sm text-text-muted">
                  <span className="font-medium text-text">Tools:</span>{' '}
                  {job.tools.join(', ')}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </Section>
  );
};

export { Experience };
