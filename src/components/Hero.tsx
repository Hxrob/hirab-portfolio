import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { Section } from './Section';
import { Button } from './ui/Button';
import { Magnetic } from './ui/Magnetic';
import { SITE } from '../data/site';
import TextType from './ui/TextType';
import DarkVeil from './ui/DarkVeil';


const Hero: React.FC = () => {
  const handleScrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <Section id="intro" className="relative min-h-screen flex items-center overflow-hidden">
      
      <div className="absolute inset-0">
        <DarkVeil speed={1.7}/>
      </div>

      <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center w-full">
        {/* Left content */}
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Name and role */}
          <div className="space-y-4">
            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {SITE.name}
            </motion.h1>
            
            <motion.div
              className="text-xl md:text-2xl text-text-muted"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <TextType 
                text={SITE.intro.headline} 
                className="text-gradient font-semibold"
                pauseDuration={3000}
                typingSpeed={100}
                deletingSpeed={50}
                loop={true}
                showCursor={true}
                cursorCharacter="|"
                cursorClassName="text-primary"
              />
            </motion.div>
          </div>

          {/* Description */}
          <motion.p
            className="text-lg text-text-muted max-w-xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {SITE.intro.subtext}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <Magnetic>
              <Button
                variant="primary"
                size="lg"
                onClick={() => handleScrollToSection(SITE.intro.ctaPrimary.href)}
                className="group"
              >
                {SITE.intro.ctaPrimary.label}
                <ArrowDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
              </Button>
            </Magnetic>
            
            <Button
              variant="secondary"
              size="lg"
              onClick={() => handleScrollToSection(SITE.intro.ctaSecondary.href)}
            >
              {SITE.intro.ctaSecondary.label}
            </Button>
          </motion.div>

          {/* Social links */}
          <motion.div
            className="flex gap-6 pt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            {SITE.socials.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-primary transition-colors duration-200"
                whileHover={{ scale: 1.1, y: -2 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.3 + index * 0.1 }}
              >
                {social.label === 'GitHub' && <Github className="h-6 w-6" />}
                {social.label === 'LinkedIn' && <Linkedin className="h-6 w-6" />}
                {social.label === 'Email' && <Mail className="h-6 w-6" />}
                <span className="sr-only">{social.label}</span>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.5 }}
      >
        <motion.div
          className="text-text-muted cursor-pointer"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          onClick={() => handleScrollToSection('#skills')}
        >
          <ArrowDown className="h-6 w-6 mx-auto" />
          <span className="text-sm mt-2 block">Scroll down</span>
        </motion.div>
      </motion.div>
    </Section>
  );
};

export { Hero };
