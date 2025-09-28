import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';
import { Section } from './Section';
import { SectionHeading } from './ui/SectionHeading';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { AnimatedBackground } from './ui/AnimatedBackground';
import { SITE } from '../data/site';

const Projects: React.FC = () => {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const currentProject = SITE.projects[currentProjectIndex];

  const nextProject = () => {
    setCurrentProjectIndex((prev) => (prev + 1) % SITE.projects.length);
  };

  const prevProject = () => {
    setCurrentProjectIndex((prev) => (prev - 1 + SITE.projects.length) % SITE.projects.length);
  };

  return (
    <Section id="projects" className="relative min-h-screen flex flex-col">
      {/* Animated Background (projects variant) */}
      <AnimatedBackground variant="projects" />

      <div className="relative z-10 flex-1 flex flex-col">
        <SectionHeading
          overline="Projects"
          title="Featured Work"
          subtitle="A selection of projects I have worked on recently"
          centered
        />

        {/* Full-screen project display */}
        <div className="flex-1 flex items-center justify-center mt-8">
          <div className="w-full max-w-7xl mx-auto px-4">
            <motion.div
              key={currentProjectIndex}
              className="grid lg:grid-cols-2 gap-12 items-center min-h-[60vh]"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Project Image - Left Side */}
              <motion.div
                className="relative group"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-primary-hover/10 shadow-2xl">
                  <img
                    src={currentProject.image}
                    alt={currentProject.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                {/* Navigation arrows */}
                <button
                  onClick={prevProject}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-surface/80 hover:bg-surface text-text hover:text-primary p-3 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextProject}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-surface/80 hover:bg-surface text-text hover:text-primary p-3 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </motion.div>

              {/* Project Details - Right Side */}
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {/* Project Title */}
                <div>
                  <h3 className="text-4xl font-bold text-text mb-4 leading-tight">
                    {currentProject.title}
                  </h3>
                  <p className="text-xl text-text-muted leading-relaxed">
                    {currentProject.description}
                  </p>
                </div>
                {/* Tech Stack Badges */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-primary uppercase tracking-wider">
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {currentProject.tags.map((tag) => (
                      <Badge 
                        key={tag} 
                        variant="secondary" 
                        className="text-sm px-3 py-1 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="flex-1 group/btn bg-primary hover:bg-primary-hover text-white"
                    onClick={() => window.open(currentProject.links.demo, '_blank')}
                    disabled={!currentProject.links.demo}
                  >
                    <ExternalLink className="h-5 w-5 mr-2 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                    Live Demo
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="lg"
                    className="flex-1 group/btn border-primary/20 hover:border-primary/40 hover:bg-primary/10"
                    onClick={() => window.open(currentProject.links.github, '_blank')}
                  >
                    <Github className="h-5 w-5 mr-2 group-hover/btn:rotate-12 transition-transform" />
                    View Code
                  </Button>
                </div>

                {/* Project Counter */}
                <div className="flex items-center justify-between pt-8 border-t border-primary/20">
                  <div className="flex space-x-2">
                    {SITE.projects.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentProjectIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-200 ${
                          index === currentProjectIndex
                            ? 'bg-primary scale-125'
                            : 'bg-primary/30 hover:bg-primary/50'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-text-muted">
                    {currentProjectIndex + 1} of {SITE.projects.length}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>
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
