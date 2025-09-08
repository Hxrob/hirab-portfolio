import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import LogoWhite from '../assets/Hirab-Logo-White.png';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('intro');
  const [isScrolled, setIsScrolled] = useState(false);

  const leftNavItems = [
    { label: 'Home', href: '#intro' },
    { label: 'Skills', href: '#skills' },
  ];

  const rightNavItems = [
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  const allNavItems = [...leftNavItems, ...rightNavItems];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);

      // Update active section based on scroll position
      const sections = allNavItems.map(item => item.href.substring(1));
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsOpen(false);
  };


  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-background/80 backdrop-blur-md border-b border-white/10'
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2 text-text-muted hover:text-text transition-colors duration-200"
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.button>

            {/* Desktop - Centered Navigation Layout */}
            <div className="hidden md:flex items-center justify-center flex-1">
              <div className="flex items-center gap-12">
                {/* Left Navigation Items */}
                <div className="flex items-center space-x-8">
                  {leftNavItems.map((item, index) => (
                    <motion.button
                      key={item.label}
                      onClick={() => handleScrollToSection(item.href)}
                      className={`relative text-sm font-medium transition-colors duration-200 ${
                        activeSection === item.href.substring(1)
                          ? 'text-primary'
                          : 'text-text-muted hover:text-text'
                      }`}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    >
                      {item.label}
                      {activeSection === item.href.substring(1) && (
                        <motion.div
                          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                          layoutId="activeSection"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </motion.button>
                  ))}
                </div>

                {/* Logo - Center */}
                <motion.button
                  className="flex items-center justify-center mx-8"
                  onClick={() => handleScrollToSection('#intro')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {/* Your Logo Image */}
                  <div className="relative w-12 h-12 md:w-14 md:h-14">
                    <img
                      src={LogoWhite}
                      alt="Hirab Abdourazak Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </motion.button>

                {/* Right Navigation Items */}
                <div className="flex items-center space-x-8">
                  {rightNavItems.map((item, index) => (
                    <motion.button
                      key={item.label}
                      onClick={() => handleScrollToSection(item.href)}
                      className={`relative text-sm font-medium transition-colors duration-200 ${
                        activeSection === item.href.substring(1)
                          ? 'text-primary'
                          : 'text-text-muted hover:text-text'
                      }`}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                    >
                      {item.label}
                      {activeSection === item.href.substring(1) && (
                        <motion.div
                          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                          layoutId="activeSection"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile spacer to balance the hamburger menu */}
            <div className="md:hidden w-10 h-10"></div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              className="absolute top-20 left-4 right-4 bg-surface border border-white/10 rounded-2xl p-6 shadow-xl"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <nav className="space-y-4">
                {allNavItems.map((item, index) => (
                  <motion.button
                    key={item.label}
                    onClick={() => handleScrollToSection(item.href)}
                    className={`block w-full text-left px-4 py-3 rounded-xl transition-all duration-200 ${
                      activeSection === item.href.substring(1)
                        ? 'text-primary bg-primary/10'
                        : 'text-text hover:text-primary hover:bg-white/5'
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export { Navbar };
