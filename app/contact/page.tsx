'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Twitter, Linkedin, Github, Instagram, CheckCircle } from 'lucide-react';

const socials = [
  { icon: Twitter, href: '#', label: 'Twitter / X', handle: '@abit_rgit' },
  { icon: Linkedin, href: '#', label: 'LinkedIn', handle: 'ABIT RGIT' },
  { icon: Github, href: '#', label: 'GitHub', handle: 'abit-rgit' },
  { icon: Instagram, href: '#', label: 'Instagram', handle: '@abit.rgit' },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingTop: 100 }}>
      <section style={{ padding: '80px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="mono-meta" style={{ marginBottom: 20, display: 'inline-flex' }}>Contact</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 6vw, 68px)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 20 }}
        >
          Get in Touch
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ color: 'var(--muted)', fontSize: 'clamp(16px, 2vw, 18px)', lineHeight: 1.8, maxWidth: 520, margin: '0 auto' }}>
          Have a question, sponsorship inquiry, or just want to connect? We&apos;d love to hear from you.
        </motion.p>
      </section>

      <section style={{ padding: '0 24px 100px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 40, alignItems: 'start' }} className="contact-grid">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ padding: 48, border: '1px solid var(--border)', position: 'relative', overflow: 'hidden', background: 'var(--bg)' }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'var(--blue)' }} />
              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '40px 0' }}>
                  <CheckCircle size={64} color="var(--blue)" style={{ marginBottom: 20 }} />
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800, color: 'var(--text)', marginBottom: 12 }}>Message Sent!</h3>
                  <p style={{ color: 'var(--muted)', fontSize: 16, lineHeight: 1.7 }}>Thanks for reaching out. We&apos;ll get back to you within 24–48 hours.</p>
                </motion.div>
              ) : (
                <>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: 28 }}>Send a Message</h2>
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="form-row">
                      {[{ key: 'name', label: 'Name', placeholder: 'Your Name', type: 'text' }, { key: 'email', label: 'Email', placeholder: 'you@example.com', type: 'email' }].map(({ key, label, placeholder, type }) => (
                        <div key={key} className="field-minimal">
                          <label>{label}</label>
                          <input type={type} placeholder={placeholder} value={(form as Record<string, string>)[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} required />
                        </div>
                      ))}
                    </div>
                    <div className="field-minimal">
                      <label>Subject</label>
                      <input type="text" placeholder="What's this about?" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} required />
                    </div>
                    <div className="field-minimal">
                      <label>Message</label>
                      <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={5} placeholder="Write your message..." required />
                    </div>
                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={{ scale: loading ? 1 : 1.02 }}
                      whileTap={{ scale: loading ? 1 : 0.98 }}
                      className="btn-editorial"
                      style={{ justifyContent: 'center', opacity: loading ? 0.7 : 1 }}
                    >
                      {loading ? 'Sending...' : 'Send Message'} {!loading && <Send size={15} />}
                    </motion.button>
                  </form>
                </>
              )}
            </motion.div>

            {/* Info sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
            >
              {/* Contact info */}
              <div style={{ padding: 28, border: '1px solid var(--border)', background: 'var(--bg)' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 800, color: 'var(--text)', marginBottom: 20 }}>Contact Info</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {[
                    { icon: Mail, text: 'abitrgit.it@gmail.com', label: 'Email' },
                    { icon: Phone, text: '+91 98765 43210', label: 'Phone' },
                    { icon: MapPin, text: 'RGIT, Versova, Andheri West, Mumbai  400053', label: 'Address' },
                  ].map(({ icon: Icon, text, label }) => (
                    <div key={label} style={{ display: 'flex', gap: 12 }}>
                      <div style={{ width: 38, height: 38, background: 'var(--surface)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Icon size={16} color="var(--muted)" />
                      </div>
                      <div>
                        <div style={{ fontFamily: 'var(--font-utility)', color: 'var(--muted)', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 3 }}>{label}</div>
                        <div style={{ color: 'var(--text)', fontSize: 13 }}>{text}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Socials */}
              <div style={{ padding: 28, border: '1px solid var(--border)', background: 'var(--bg)' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 800, color: 'var(--text)', marginBottom: 20 }}>Follow Us</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {socials.map(({ icon: Icon, href, label, handle }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex', gap: 12, alignItems: 'center', textDecoration: 'none',
                        padding: 12, border: '1px solid var(--border)', background: 'var(--bg)', transition: 'border-color 0.2s ease',
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--blue)'; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; }}
                    >
                      <Icon size={16} color="var(--muted)" />
                      <div>
                        <div style={{ color: 'var(--text)', fontSize: 13, fontWeight: 600 }}>{label}</div>
                        <div style={{ color: 'var(--muted)', fontSize: 12 }}>{handle}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @media (max-width: 768px) { .contact-grid { grid-template-columns: 1fr !important; } .form-row { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
