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
    <Section id="intro" className="relative min-h-[60vh] sm:min-h-screen flex items-center overflow-hidden">
      
      <div className="absolute inset-0">
        <DarkVeil speed={1.7}/>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
        {/* Left content */}
        <motion.div
          className="space-y-2 sm:space-y-8"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Name and role */}
          <div className="space-y-1 sm:space-y-4">
            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {SITE.name}
            </motion.h1>
            
            <motion.div
              className="text-base sm:text-lg md:text-2xl text-text-muted"
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
            className="text-base sm:text-lg text-text-muted max-w-xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {SITE.intro.subtext}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <Magnetic>
              <Button
                variant="primary"
                size="md"
                onClick={() => handleScrollToSection(SITE.intro.ctaPrimary.href)}
                className="group"
              >
                {SITE.intro.ctaPrimary.label}
                <ArrowDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
              </Button>
            </Magnetic>
            
            <Button
              variant="secondary"
              size="md"
              onClick={() => handleScrollToSection(SITE.intro.ctaSecondary.href)}
            >
              {SITE.intro.ctaSecondary.label}
            </Button>
          </motion.div>

          {/* Social links */}
          <motion.div
            className="flex justify-center sm:justify-start gap-6 pt-4 pb-4 sm:pt-8 sm:pb-0"
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

        {/* Right content - Hero Image */}
        <motion.div
          className="relative flex items-center justify-center lg:justify-end order-first lg:order-last mt-8 lg:mt-0"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="relative w-full max-w-[280px] sm:max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl">
            {/* Hero Image */}
            <motion.div
              className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src="/hero-image.JPEG"
                alt={`${SITE.name} - Software Engineer & ML Enthusiast`}
                className="w-full h-full object-cover"
              />
              {/* Subtle overlay for better text contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
            </motion.div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-xl" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary-hover/10 rounded-full blur-2xl" />
          </div>
        </motion.div>
        
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-4 sm:bottom-8 left-0 right-0 flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.5 }}
      >
        <motion.div
          className="text-text-muted cursor-pointer text-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          onClick={() => handleScrollToSection('#skills')}
        >
          <ArrowDown className="h-6 w-6 mx-auto" />
          <span className="text-sm mt-2 block text-center">Scroll down</span>
        </motion.div>
      </motion.div>
    </Section>
  );
};

export { Hero };
