import React from 'react';
import { motion } from 'framer-motion';
import { Section } from './Section';
import { SectionHeading } from './ui/SectionHeading';
import { Corners } from './ui/Corners';
import LogoLoop from './ui/LogoLoop';
import { SITE } from '../data/site';
import {
  SiTypescript, SiPython, SiCplusplus, SiPostgresql, SiGo,
  SiReact, SiNextdotjs, SiNodedotjs, SiExpress, SiFlask, SiFastapi,
  SiTailwindcss, SiFramer, SiOpenai, SiFirebase, SiMongodb,
  SiAmazon, SiDocker, SiVite, SiGit,
  SiJavascript, SiGooglecloud, SiResend,
  SiGithub
} from 'react-icons/si';

const Skills: React.FC = () => {
  const techLogos = [
    // Languages
    { node: <SiTypescript style={{ color: 'white' }} />, title: "TypeScript", href: "" },
    { node: <SiPython style={{ color: 'white' }} />, title: "Python", href: "" },
    { node: <SiCplusplus style={{ color: 'white' }} />, title: "C/C++", href: "" },
    { node: <SiPostgresql style={{ color: 'white' }} />, title: "SQL", href: "" },
    { node: <SiGo style={{ color: 'white' }} />, title: "Go", href: "" },
    { node: <SiJavascript style={{ color: 'white' }} />, title: "JavaScript", href: "" },

    // Frameworks
    { node: <SiReact style={{ color: 'white' }} />, title: "React", href: "" },
    { node: <SiNextdotjs style={{ color: 'white' }} />, title: "Next.js", href: "" },
    { node: <SiNodedotjs style={{ color: 'white' }} />, title: "Node.js", href: "" },
    { node: <SiExpress style={{ color: 'white' }} />, title: "Express", href: "" },
    { node: <SiFlask style={{ color: 'white' }} />, title: "Flask", href: "" },
    { node: <SiFastapi style={{ color: 'white' }} />, title: "FastAPI", href: "" },
    { node: <SiTailwindcss style={{ color: 'white' }} />, title: "Tailwind CSS", href: "" },
    { node: <SiFramer style={{ color: 'white' }} />, title: "Framer Motion", href: "" },

    // APIs & Tools
    { node: <SiOpenai style={{ color: 'white' }} />, title: "OpenAI API", href: "" },
    { node: <SiFirebase style={{ color: 'white' }} />, title: "Firebase", href: "" },
    { node: <SiMongodb style={{ color: 'white' }} />, title: "MongoDB", href: "" },
    { node: <SiAmazon style={{ color: 'white' }} />, title: "AWS", href: "" },
    { node: <SiDocker style={{ color: 'white' }} />, title: "Docker", href: "" },
    { node: <SiVite style={{ color: 'white' }} />, title: "Vite", href: "" },
    { node: <SiGit style={{ color: 'white' }} />, title: "Git", href: "" },
    { node: <SiGithub style={{ color: 'white' }} />, title: "GitHub", href: "" },
    { node: <SiGooglecloud style={{ color: 'white' }} />, title: "Google Cloud", href: "" },
    { node: <SiResend style={{ color: 'white' }} />, title: "Resend API", href: "" },
  ];

  const groups: { id: string; label: string; items: readonly string[] }[] = [
    { id: 'A', label: 'Languages', items: SITE.skills.languages },
    { id: 'B', label: 'Frameworks', items: SITE.skills.frameworks },
    { id: 'C', label: 'APIs + Tools', items: SITE.skills.apisTools },
  ];

  return (
    <Section id="skills" className="relative deferred-section">
      <div className="relative z-10">
        <SectionHeading
          index="01"
          overline="Capabilities"
          title="Tech Stack"
          subtitle="A comprehensive toolkit for building modern applications."
        />

        {/* Spec-sheet columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {groups.map((group, groupIndex) => (
            <motion.div
              key={group.id}
              className="relative border border-white/10 bg-surface/40"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: groupIndex * 0.12 }}
            >
              <Corners size="sm" className="border-white/25" />
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                <span className="hud-label text-primary">
                  MOD.{group.id} // {group.label}
                </span>
                <span className="hud-label">
                  ×{String(group.items.length).padStart(2, '0')}
                </span>
              </div>
              <ul className="divide-y divide-white/5">
                {group.items.map((item, i) => (
                  <li
                    key={item}
                    className="group flex items-baseline gap-3 px-4 py-2.5 hover:bg-white/[0.03] transition-colors duration-150"
                  >
                    <span className="font-mono text-[10px] text-white/25 group-hover:text-primary/60 transition-colors duration-150">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-mono text-sm text-text-muted group-hover:text-text transition-colors duration-150">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Logo ticker */}
        <motion.div
          className="mt-16 border-y border-white/10 py-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div style={{ height: '96px', position: 'relative', overflow: 'hidden' }}>
            <LogoLoop
              logos={techLogos}
              speed={60}
              direction="left"
              logoHeight={40}
              gap={44}
              pauseOnHover
              scaleOnHover
              fadeOut
              fadeOutColor="#08090A"
              ariaLabel="Technologies and tools I work with"
            />
          </div>
        </motion.div>
      </div>
    </Section>
  );
};

export { Skills };
