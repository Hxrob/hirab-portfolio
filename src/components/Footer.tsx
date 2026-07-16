import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
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
    <footer className="border-t border-white/10 bg-surface/30">
      <div className="section-container py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 mb-10">
          {/* Brand */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img
              src="/Hirab-Name-Logo-White.webp"
              alt={SITE.name}
              className="h-10 w-auto"
              width={4782}
              height={1134}
              loading="lazy"
              decoding="async"
            />
            <p className="font-mono text-[11px] text-text-muted leading-relaxed">
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
            <h4 className="hud-label text-primary">// Index</h4>
            <nav className="flex flex-col space-y-2.5">
              {[
                { label: 'Home', href: '#intro', num: '01' },
                { label: 'Skills', href: '#skills', num: '02' },
                { label: 'Projects', href: '#projects', num: '03' },
                { label: 'Contact', href: '#contact', num: '04' },
              ].map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleScrollToSection(link.href)}
                  className="group flex items-baseline gap-2 text-left font-mono text-xs uppercase tracking-[0.16em] text-text-muted hover:text-primary transition-colors duration-200"
                >
                  <span className="text-[9px] text-white/25 group-hover:text-primary/60 transition-colors">
                    {link.num}
                  </span>
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
            <h4 className="hud-label text-primary">// Contact</h4>
            <div className="space-y-2.5">
              <a
                href={`mailto:${SITE.contact.email}`}
                className="font-mono text-xs text-text-muted hover:text-primary transition-colors duration-200 block break-all"
              >
                {SITE.contact.email}
              </a>
              <p className="font-mono text-xs text-text-muted uppercase tracking-[0.12em]">
                {SITE.contact.location}
              </p>
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
            <h4 className="hud-label text-primary">// Connect</h4>
            <div className="flex gap-3">
              {SITE.socials.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 border border-white/10 flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/50 transition-colors duration-200"
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
          className="pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
            ©{currentYear} Hirab Abdourazak // Made with lots of coffee
          </p>

          <button
            onClick={handleScrollToTop}
            className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted hover:text-primary transition-colors duration-200 flex items-center gap-2 group"
          >
            [ Back to top
            <motion.span
              className="inline-block text-primary"
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ↑
            </motion.span>
            ]
          </button>
        </motion.div>
      </div>
    </footer>
  );
};

export { Footer };
