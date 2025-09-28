import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { 
  SiReact, 
  SiNextdotjs, 
  SiExpress, 
  SiFirebase, 
  SiMongodb, 
  SiVercel, 
  SiGooglecloud,
  SiOpenai,
  SiAmazon,
  SiGooglemaps
} from 'react-icons/si';
import { Section } from './Section';
import { SectionHeading } from './ui/SectionHeading';
import { Button } from './ui/Button';
import { AnimatedBackground } from './ui/AnimatedBackground';
import { SITE } from '../data/site';

const Projects: React.FC = () => {
  const techIcons: Record<string, React.ReactElement> = {
    'React.js': <SiReact className="w-6 h-6 text-[#61DAFB]" />,
    'Next.js': <SiNextdotjs className="w-6 h-6 text-white" />,
    'Express': <SiExpress className="w-6 h-6 text-white" />,
    'Firebase': <SiFirebase className="w-6 h-6 text-[#FFCA28]" />,
    'MongoDB': <SiMongodb className="w-6 h-6 text-[#47A248]" />,
    'Vercel': <SiVercel className="w-6 h-6 text-white" />,
    'Google Cloud': <SiGooglecloud className="w-6 h-6 text-[#4285F4]" />,
    'OpenAI API': <SiOpenai className="w-6 h-6 text-white" />,
    'Rekognition': <SiAmazon className="w-6 h-6 text-[#FF9900]" />,
    'Google Maps API': <SiGooglemaps className="w-6 h-6 text-[#4285F4]" />,
    'Resend': <ExternalLink className="w-6 h-6 text-primary" />
  };

  return (
    <Section id="projects" className="relative">
      {/* Animated Background (projects variant) */}
      <AnimatedBackground variant="projects" />

      <div className="relative z-10">
        <SectionHeading
          overline="Projects"
          title="Featured Work"
          subtitle="A selection of projects I have worked on recently"
          centered
        />

        {/* Project sections */}
        <div className="mt-16 md:mt-20 space-y-24 md:space-y-32">
          {SITE.projects.map((project, index) => {
            const isEven = index % 2 === 1; // Second project (index 1) is "even" in display order
            
            return (
              <motion.article
                key={project.title}
                className={`w-full flex flex-col items-center gap-8 md:gap-12 ${
                  isEven ? 'md:flex-row-reverse' : 'md:flex-row'
                }`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
              >
                {/* Image pane */}
                <div className="relative md:w-2/5 w-full flex-shrink-0 flex items-center justify-center">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-auto object-contain rounded-lg"
                    />
                  ) : (
                    <div className="w-full aspect-video bg-primary/5 rounded-lg" />
                  )}
                </div>

                {/* Details pane */}
                <div className="md:w-3/5 w-full flex flex-col justify-center py-8 md:py-0 gap-6">
                {/* Title */}
                <h3 className="text-4xl md:text-5xl font-semibold text-text leading-tight">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-xl text-text-muted leading-relaxed">
                  {project.description}
                </p>

                {/* Technology Icons */}
                <div className="flex flex-wrap gap-3">
                  {project.tags.map((tag) => (
                    <div key={tag} className="p-2 rounded-lg bg-surface/30 hover:bg-surface/50 transition-colors" title={tag}>
                      {techIcons[tag] || <div className="w-6 h-6 rounded bg-primary/20 flex items-center justify-center text-xs text-primary font-medium">{tag.charAt(0)}</div>}
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-4">
                  {'demo' in project.links && project.links.demo && (
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={() => window.open((project.links as any).demo, '_blank')}
                      aria-label={`View live demo of ${project.title}`}
                    >
                      <ExternalLink className="h-5 w-5 mr-2" />
                      Demo
                    </Button>
                  )}
                  
                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={() => window.open(project.links.github, '_blank')}
                    aria-label={`View source code for ${project.title} on GitHub`}
                  >
                    <Github className="h-5 w-5 mr-2" />
                    GitHub
                  </Button>
                </div>
              </div>
            </motion.article>
            );
          })}
        </div>

        {/* Call to action */}
        <motion.div
          className="mt-16 text-center pb-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <p className="text-text-muted mb-6 max-w-2xl mx-auto">
            Want to see more? Check out my GitHub for additional projects and contributions.
          </p>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => window.open(SITE.socials.find(s => s.label === 'GitHub')?.href, '_blank')}
            className="group"
          >
            <Github className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform" />
            View All Projects
            <ExternalLink className="h-4 w-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </Section>
  );
};

export { Projects };
