import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Github, Linkedin, Mail } from 'lucide-react';
import { SITE } from '../data/site';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="bg-surface/50 border-t border-white/10">
      <div className="section-container py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-bold text-text">{SITE.name}</h3>
            <p className="text-text-muted text-sm leading-relaxed">
              {SITE.role} based in {SITE.location}. Building the future one line of code at a time.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-sm font-semibold text-text uppercase tracking-wider">
              Quick Links
            </h4>
            <nav className="flex flex-col space-y-2">
              {[
                { label: 'Home', href: '#intro' },
                { label: 'Skills', href: '#skills' },
                { label: 'Projects', href: '#projects' },
                { label: 'Contact', href: '#contact' },
              ].map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleScrollToSection(link.href)}
                  className="text-text-muted hover:text-primary text-sm transition-colors duration-200 text-left"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-sm font-semibold text-text uppercase tracking-wider">
              Contact
            </h4>
            <div className="space-y-2">
              <a
                href={`mailto:${SITE.contact.email}`}
                className="text-text-muted hover:text-primary text-sm transition-colors duration-200 block"
              >
                {SITE.contact.email}
              </a>
              <p className="text-text-muted text-sm">{SITE.contact.location}</p>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-sm font-semibold text-text uppercase tracking-wider">
              Connect
            </h4>
            <div className="flex gap-3">
              {SITE.socials.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-background border border-white/10 rounded-lg flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/30 hover:bg-primary/10 transition-all duration-200"
                  whileHover={{ scale: 1.1, y: -2 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                >
                  {social.label === 'GitHub' && <Github className="h-4 w-4" />}
                  {social.label === 'LinkedIn' && <Linkedin className="h-4 w-4" />}
                  {social.label === 'Email' && <Mail className="h-4 w-4" />}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-text-muted text-sm flex items-center gap-1">
            © {currentYear} {SITE.name}. Made with{' '}
            <Heart className="h-4 w-4 text-red-500 fill-current" /> and lots of coffee.
          </p>
          
          <button
            onClick={handleScrollToTop}
            className="text-text-muted hover:text-primary text-sm transition-colors duration-200 flex items-center gap-1 group"
          >
            Back to top
            <motion.span
              className="inline-block"
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ↑
            </motion.span>
          </button>
        </motion.div>
      </div>
    </footer>
  );
};

export { Footer };
