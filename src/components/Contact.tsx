import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, Github, Linkedin } from 'lucide-react';
import { Section } from './Section';
import { SectionHeading } from './ui/SectionHeading';
import { Card, CardContent, CardHeader } from './ui/Card';
import { Button } from './ui/Button';
import { Magnetic } from './ui/Magnetic';
import { AnimatedBackground } from './ui/AnimatedBackground';
import { SITE } from '../data/site';

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
    <Section id="contact" className="bg-background/50 relative">
      {/* Animated Background (contact variant) */}
      <AnimatedBackground variant="contact" />
      
      <div className="relative z-10">
        <SectionHeading
          overline="Contact"
          title="Let's Work Together"
          subtitle={SITE.contact.blurb}
          centered
        />

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Contact info */}
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div>
            <h3 className="text-2xl font-semibold text-text mb-6">Get in Touch</h3>
            <p className="text-text-muted text-lg mb-8 leading-relaxed">
              Free to chat about technology and development, passion projects, and new opportunities!
            </p>
          </div>

          <div className="space-y-6">
            {/* Email */}
            <motion.div
              className="flex items-center gap-4 group cursor-pointer"
              whileHover={{ x: 10 }}
              onClick={handleEmailClick}
            >
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-text font-medium">Email</div>
                <div className="text-text-muted group-hover:text-primary transition-colors">
                  {SITE.contact.email}
                </div>
              </div>
            </motion.div>

            {/* Location */}
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-text font-medium">Location</div>
                <div className="text-text-muted">{SITE.contact.location}</div>
              </div>
            </motion.div>
          </div>

          {/* Social links */}
          <div className="pt-8">
            <h4 className="text-lg font-medium text-text mb-4">Connect with me</h4>
            <div className="flex gap-4">
              {SITE.socials.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-surface border border-white/10 rounded-xl flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/30 hover:bg-primary/10 transition-all duration-200"
                  whileHover={{ scale: 1.1, y: -2 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                >
                  {social.label === 'GitHub' && <Github className="h-5 w-5" />}
                  {social.label === 'LinkedIn' && <Linkedin className="h-5 w-5" />}
                  {social.label === 'Email' && <Mail className="h-5 w-5" />}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Contact form */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className="bg-glow">
            <CardHeader>
              <h3 className="text-xl font-semibold text-text">Send a Message</h3>
              <p className="text-text-muted text-sm">
                Fill out the form below and I'll get back to you as soon as possible.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-text mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-background border border-white/10 rounded-xl text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/30 transition-colors"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-text mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-background border border-white/10 rounded-xl text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/30 transition-colors"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-text mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-background border border-white/10 rounded-xl text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/30 transition-colors resize-none"
                      placeholder="Tell me about your project or just say hello..."
                    />
                  </div>
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
            </CardContent>
          </Card>
        </motion.div>
      </div>
      </div>
    </Section>
  );
};

export { Contact };
