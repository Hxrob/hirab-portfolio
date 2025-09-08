import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { Section } from './Section';
import { SectionHeading } from './ui/SectionHeading';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/Card';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { Tilt } from './ui/Tilt';
import { AnimatedBackground } from './ui/AnimatedBackground';
import { SITE } from '../data/site';

const Projects: React.FC = () => {
  return (
    <Section id="projects" className="relative">
      {/* Animated Background (projects variant) */}
      <AnimatedBackground variant="projects" />

      <div className="relative z-10">
      <SectionHeading
        overline="Projects"
        title="Featured Work"
        subtitle="A selection of projects that showcase my skills and experience"
        centered
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SITE.projects.map((project, index) => (
          <Tilt key={project.title} className="h-full">
            <Card className="h-full flex flex-col bg-glow group">
              {/* Project image placeholder with gradient */}
              <div className="relative h-48 bg-gradient-to-br from-primary/20 to-primary-hover/10 rounded-t-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-surface/80 to-transparent" />
                <motion.div
                  className="absolute bottom-4 left-4 right-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="flex gap-2">
                    {project.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="default" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </motion.div>
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <CardHeader className="flex-grow">
                <CardTitle className="text-xl group-hover:text-primary transition-colors duration-200">
                  {project.title}
                </CardTitle>
                <CardDescription className="text-text-muted">
                  {project.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-1">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="pt-0 gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex-1 group/btn"
                  onClick={() => window.open(project.links.github, '_blank')}
                >
                  <Github className="h-4 w-4 mr-2 group-hover/btn:rotate-12 transition-transform" />
                  Code
                </Button>
                
                {project.links.demo && (
                  <Button
                    variant="secondary"
                    size="sm"
                    className="flex-1 group/btn"
                    onClick={() => window.open(project.links.demo, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                    Demo
                  </Button>
                )}
              </CardFooter>
            </Card>
          </Tilt>
        ))}
      </div>

      {/* Call to action */}
      <motion.div
        className="mt-16 text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
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
