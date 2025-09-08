import React from 'react';
import { motion } from 'framer-motion';
import { Code, Layers, Wrench } from 'lucide-react';
import { Section } from './Section';
import { SectionHeading } from './ui/SectionHeading';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Badge } from './ui/Badge';
import { Tilt } from './ui/Tilt';
import { AnimatedBackground } from './ui/AnimatedBackground';
import { SITE } from '../data/site';

const Skills: React.FC = () => {
  const skillCategories = [
    {
      title: 'Languages',
      icon: Code,
      skills: SITE.skills.languages,
      description: 'Programming languages I work with',
    },
    {
      title: 'Frameworks',
      icon: Layers,
      skills: SITE.skills.frameworks,
      description: 'Frameworks and libraries I use',
    },
    {
      title: 'APIs & Tools',
      icon: Wrench,
      skills: SITE.skills.apisTools,
      description: 'Tools and services I integrate',
    },
  ];

  return (
    <Section id="skills" className="bg-background/50 relative">
      {/* Animated Background (skills variant) */}
      <AnimatedBackground variant="skills" />
      
      <div className="relative z-10">
        <SectionHeading
          overline="Skills"
          title="Technologies I Work With"
          subtitle="A comprehensive toolkit for building modern applications"
          centered
        />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skillCategories.map((category, categoryIndex) => {
          const IconComponent = category.icon;
          
          return (
            <Tilt key={category.title} className="h-full">
              <Card className="h-full bg-glow">
                <CardHeader className="text-center">
                  <motion.div
                    className="mx-auto mb-4 w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center"
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.6, 
                      delay: categoryIndex * 0.2,
                      type: 'spring',
                      stiffness: 200
                    }}
                  >
                    <IconComponent className="h-6 w-6 text-primary" />
                  </motion.div>
                  
                  <CardTitle className="text-xl mb-2">
                    {category.title}
                  </CardTitle>
                  
                  <p className="text-text-muted text-sm">
                    {category.description}
                  </p>
                </CardHeader>
                
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ 
                          duration: 0.3, 
                          delay: categoryIndex * 0.2 + skillIndex * 0.05
                        }}
                      >
                        <Badge variant="secondary" className="hover:bg-primary/20 hover:text-primary hover:border-primary/30 transition-all duration-200">
                          {skill}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Tilt>
          );
        })}
      </div>

      {/* Stats section */}
      <motion.div
        className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        {[
          { label: 'Languages', value: SITE.skills.languages.length },
          { label: 'Frameworks', value: SITE.skills.frameworks.length },
          { label: 'Tools', value: SITE.skills.apisTools.length },
          { label: 'Projects', value: SITE.projects.length },
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
