import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, Github, Linkedin } from 'lucide-react';
import { Section } from './Section';
import { SectionHeading } from './ui/SectionHeading';
import { Button } from './ui/Button';
import { Magnetic } from './ui/Magnetic';
import { Corners } from './ui/Corners';
import { SITE } from '../data/site';

const inputClasses =
  'w-full px-4 py-3 bg-background/80 border border-white/10 font-mono text-sm text-text placeholder:text-text-muted/50 focus:outline-none focus:border-primary/60 transition-colors duration-200';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if FORMSPREE_ID is available
    const formspreeId = import.meta.env.VITE_FORMSPREE_ID;

    if (formspreeId) {
      // Submit to Formspree
      const form = e.target as HTMLFormElement;
      form.action = `https://formspree.io/f/${formspreeId}`;
      form.method = 'POST';
      form.submit();
    } else {
      // Fallback to mailto
      const subject = encodeURIComponent(`Contact from ${formData.name}`);
      const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
      window.location.href = `mailto:${SITE.contact.email}?subject=${subject}&body=${body}`;
    }
  };

  const handleEmailClick = () => {
    window.location.href = `mailto:${SITE.contact.email}`;
  };

  return (
    <Section id="contact" className="relative deferred-section">
      <div className="relative z-10">
        <SectionHeading
          index="04"
          overline="Transmission"
          title="Let's Work Together"
          subtitle={SITE.contact.blurb}
        />

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Contact info */}
          <motion.div
            className="space-y-10"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-mono text-sm text-text-muted leading-relaxed border-l border-white/15 pl-4 max-w-md">
              Free to chat about technology and development, passion projects, and new opportunities!
            </p>

            <div className="border border-white/10 divide-y divide-white/10">
              {/* Email */}
              <button
                type="button"
                className="group flex items-center gap-4 w-full text-left px-5 py-4 hover:bg-white/[0.03] transition-colors duration-200"
                onClick={handleEmailClick}
              >
                <span className="flex-shrink-0 w-10 h-10 border border-white/10 flex items-center justify-center group-hover:border-primary/50 transition-colors">
                  <Mail className="h-4 w-4 text-primary" />
                </span>
                <span className="min-w-0">
                  <span className="hud-label block mb-1">CH.01 // Email</span>
                  <span className="font-mono text-sm text-text group-hover:text-primary transition-colors truncate block">
                    {SITE.contact.email}
                  </span>
                </span>
              </button>

              {/* Location */}
              <div className="flex items-center gap-4 px-5 py-4">
                <span className="flex-shrink-0 w-10 h-10 border border-white/10 flex items-center justify-center">
                  <MapPin className="h-4 w-4 text-primary" />
                </span>
                <span>
                  <span className="hud-label block mb-1">CH.02 // Location</span>
                  <span className="font-mono text-sm text-text">{SITE.contact.location}</span>
                </span>
              </div>
            </div>

            {/* Social links */}
            <div>
              <div className="hud-label mb-4">// Connect</div>
              <div className="flex gap-3">
                {SITE.socials.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-11 h-11 border border-white/10 flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/50 transition-colors duration-200"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.08 }}
                  >
                    {social.label === 'GitHub' && <Github className="h-4 w-4" />}
                    {social.label === 'LinkedIn' && <Linkedin className="h-4 w-4" />}
                    {social.label === 'Email' && <Mail className="h-4 w-4" />}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="relative border border-white/10 bg-surface/40">
              <Corners />
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                <span className="hud-label text-primary">// Send a Message</span>
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary animate-blink" />
                  <span className="hud-label">Uplink Ready</span>
                </span>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                <div>
                  <label htmlFor="name" className="hud-label block mb-2">
                    Field.01 — Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className={inputClasses}
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="hud-label block mb-2">
                    Field.02 — Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className={inputClasses}
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="hud-label block mb-2">
                    Field.03 — Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className={`${inputClasses} resize-none`}
                    placeholder="Tell me about your project or just say hello..."
                  />
                </div>

                <Magnetic>
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full group"
                  >
                    Send Message
                    <Send className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Magnetic>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
};

export { Contact };
