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
        <div style={{ background: 'var(--navy)', minHeight: '100vh', paddingTop: '100px' }}>
            <section style={{ padding: '80px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '400px', background: 'radial-gradient(ellipse, rgba(255, 106, 0, 0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <span className="badge" style={{ marginBottom: '20px', display: 'inline-flex' }}>✉️ Contact</span>
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                    style={{ fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)', fontSize: 'clamp(36px, 6vw, 68px)', fontWeight: 800, color: 'white', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: '20px' }}
                >
                    Get in{' '}
                    <span className="gradient-text">Touch</span>
                </motion.h1>
                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ color: 'rgba(255,255,255,0.55)', fontSize: 'clamp(16px, 2vw, 18px)', lineHeight: 1.8, maxWidth: '520px', margin: '0 auto' }}>
                    Have a question, sponsorship inquiry, or just want to connect? We&apos;d love to hear from you.
                </motion.p>
            </section>

            <section style={{ padding: '0 24px 100px' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px', alignItems: 'start' }} className="contact-grid">
                        {/* Form */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            style={{ padding: '48px', borderRadius: '28px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', position: 'relative', overflow: 'hidden' }}
                        >
                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, #FF6A00, #F59E0B, transparent)' }} />
                            {submitted ? (
                                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '40px 0' }}>
                                    <CheckCircle size={64} color="#10B981" style={{ marginBottom: '20px' }} />
                                    <h3 style={{ fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)', fontSize: '26px', fontWeight: 700, color: 'white', marginBottom: '12px' }}>Message Sent!</h3>
                                    <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '16px', lineHeight: 1.7 }}>Thanks for reaching out. We&apos;ll get back to you within 24–48 hours.</p>
                                </motion.div>
                            ) : (
                                <>
                                    <h2 style={{ fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)', fontSize: '24px', fontWeight: 700, color: 'white', letterSpacing: '-0.02em', marginBottom: '28px' }}>Send a Message</h2>
                                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-row">
                                            {[{ key: 'name', label: 'Name', placeholder: 'Your Name', type: 'text' }, { key: 'email', label: 'Email', placeholder: 'you@example.com', type: 'email' }].map(({ key, label, placeholder, type }) => (
                                                <div key={key}>
                                                    <label style={{ display: 'block', color: 'rgba(255,255,255,0.6)', fontSize: '13px', fontWeight: 600, marginBottom: '8px' }}>{label}</label>
                                                    <input type={type} placeholder={placeholder} value={(form as Record<string, string>)[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} required style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: '14px', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }} onFocus={(e) => { e.target.style.borderColor = 'rgba(255, 255, 255,0.5)'; }} onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; }} />
                                                </div>
                                            ))}
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', color: 'rgba(255,255,255,0.6)', fontSize: '13px', fontWeight: 600, marginBottom: '8px' }}>Subject</label>
                                            <input type="text" placeholder="What's this about?" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} required style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: '14px', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }} onFocus={(e) => { e.target.style.borderColor = 'rgba(255, 255, 255,0.5)'; }} onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; }} />
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', color: 'rgba(255,255,255,0.6)', fontSize: '13px', fontWeight: 600, marginBottom: '8px' }}>Message</label>
                                            <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={5} placeholder="Write your message..." required style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: '14px', outline: 'none', fontFamily: 'inherit', resize: 'vertical', boxSizing: 'border-box' }} onFocus={(e) => { e.target.style.borderColor = 'rgba(255, 255, 255,0.5)'; }} onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; }} />
                                        </div>
                                        <motion.button
                                            type="submit"
                                            disabled={loading}
                                            whileHover={{ scale: loading ? 1 : 1.02 }}
                                            whileTap={{ scale: loading ? 1 : 0.98 }}
                                            className="btn-primary"
                                            style={{ justifyContent: 'center', fontSize: '15px', opacity: loading ? 0.7 : 1 }}
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
                            style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
                        >
                            {/* Contact info */}
                            <div style={{ padding: '28px', borderRadius: '20px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                                <h3 style={{ fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)', fontSize: '18px', fontWeight: 700, color: 'white', marginBottom: '20px' }}>Contact Info</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    {[
                                        { icon: Mail, text: 'abit@rgit.ac.in', label: 'Email' },
                                        { icon: Phone, text: '+91 98765 43210', label: 'Phone' },
                                        { icon: MapPin, text: 'RGIT, Versova, Andheri West, Mumbai — 400053', label: 'Address' },
                                    ].map(({ icon: Icon, text, label }) => (
                                        <div key={label} style={{ display: 'flex', gap: '12px' }}>
                                            <div style={{ width: 38, height: 38, borderRadius: '10px', background: 'rgba(255, 255, 255,0.12)', border: '1px solid rgba(255, 255, 255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                <Icon size={16} color="#A3A3A3" />
                                            </div>
                                            <div>
                                                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '3px' }}>{label}</div>
                                                <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px' }}>{text}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Socials */}
                            <div style={{ padding: '28px', borderRadius: '20px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                                <h3 style={{ fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)', fontSize: '18px', fontWeight: 700, color: 'white', marginBottom: '20px' }}>Follow Us</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    {socials.map(({ icon: Icon, href, label, handle }) => (
                                        <a
                                            key={label}
                                            href={href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                display: 'flex', gap: '12px', alignItems: 'center', textDecoration: 'none',
                                                padding: '12px', borderRadius: '12px', background: 'rgba(255,255,255,0.03)',
                                                border: '1px solid rgba(255,255,255,0.06)', transition: 'all 0.2s ease',
                                            }}
                                            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255, 255, 255,0.3)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255, 255, 255,0.06)'; }}
                                            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)'; }}
                                        >
                                            <Icon size={16} color="#A3A3A3" />
                                            <div>
                                                <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: 600 }}>{label}</div>
                                                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px' }}>{handle}</div>
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
