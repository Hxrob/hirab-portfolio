import React from 'react';
import { motion } from 'framer-motion';
import { Section } from './Section';
import { SectionHeading } from './ui/SectionHeading';
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

  return (
    <Section id="skills" className="bg-background/50 relative">
      <div className="relative z-10">
        <SectionHeading
          overline="Skills"
          title="Technologies I Use"
          subtitle="A comprehensive toolkit for building modern applications"
          centered
        />

        {/* LogoLoop for all technologies */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div style={{ height: '120px', position: 'relative', overflow: 'hidden' }}>
            <LogoLoop
              logos={techLogos}
              speed={60}
              direction="left"
              logoHeight={48}
              gap={40}
              pauseOnHover
              scaleOnHover
              fadeOut
              fadeOutColor="#0a0a0a"
              ariaLabel="Technologies and tools I work with"
            />
          </div>
        </motion.div>

        {/* Stats section */}
        <motion.div
          className="mt-20 grid grid-cols-3 gap-8 justify-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {[
            { label: 'Languages', value: SITE.skills.languages.length },
            { label: 'Frameworks', value: SITE.skills.frameworks.length },
            { label: 'Tools', value: SITE.skills.apisTools.length }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
            >
              <motion.div
                className="text-3xl md:text-4xl font-bold text-gradient mb-2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.8 + index * 0.1,
                  type: 'spring',
                  stiffness: 200
                }}
              >
                {stat.value}+
              </motion.div>
              <div className="text-text-muted text-sm">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
};

export { Skills };
