'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Sparkles } from 'lucide-react';

const benefits = [
    { emoji: '🤝', title: 'Networking', desc: 'Connect with 500+ students, alumni, and industry professionals.' },
    { emoji: '💡', title: 'Skill Development', desc: 'Free access to workshops, bootcamps, and learning resources.' },
    { emoji: '🎯', title: 'Event Access', desc: 'Priority registration for hackathons, seminars, and SYNERGY.' },
    { emoji: '🚀', title: 'Project Opportunities', desc: 'Work on real projects with experienced mentors and peers.' },
    { emoji: '🎓', title: 'Placement Support', desc: 'Resume reviews, mock interviews, and company referrals.' },
    { emoji: '🏆', title: 'Recognition', desc: 'Certificate of membership and performance recognition.' },
];

const fields = ['Name', 'College Email', 'Branch', 'Year', 'Phone'];
const years = ['First Year', 'Second Year', 'Third Year', 'Final Year'];
const branches = ['Computer Science', 'Information Technology', 'Electronics', 'Mechanical', 'Other'];

export default function JoinPage() {
    const [form, setForm] = useState({ name: '', email: '', branch: '', year: '', phone: '', skills: '', why: '' });
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
                    <span className="badge" style={{ marginBottom: '20px', display: 'inline-flex' }}><Sparkles size={12} /> Join ABIT</span>
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                    style={{ fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)', fontSize: 'clamp(36px, 6vw, 68px)', fontWeight: 800, color: 'white', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: '20px' }}
                >
                    Become Part of{' '}
                    <span className="gradient-text">ABIT</span>
                </motion.h1>
                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ color: 'rgba(255,255,255,0.55)', fontSize: 'clamp(16px, 2vw, 18px)', lineHeight: 1.8, maxWidth: '560px', margin: '0 auto' }}>
                    Join a community of passionate technologists and get access to exclusive events, workshops, and opportunities.
                </motion.p>
            </section>

            {/* Benefits */}
            <section style={{ padding: '0 24px 80px' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <h2 style={{ fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)', fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: 700, color: 'white', letterSpacing: '-0.02em', textAlign: 'center', marginBottom: '40px' }}>Why Join ABIT?</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '80px' }} className="benefits-grid">
                        {benefits.map(({ emoji, title, desc }, i) => (
                            <motion.div
                                key={title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.06 }}
                                style={{ padding: '24px', borderRadius: '18px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
                            >
                                <div style={{ fontSize: '28px', marginBottom: '12px' }}>{emoji}</div>
                                <h3 style={{ fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)', fontSize: '16px', fontWeight: 700, color: 'white', marginBottom: '6px' }}>{title}</h3>
                                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', lineHeight: 1.6 }}>{desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Form */}
                    <div style={{ maxWidth: '680px', margin: '0 auto' }}>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            style={{
                                padding: '48px',
                                borderRadius: '28px',
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(255,255,255,0.08)',
                                position: 'relative',
                                overflow: 'hidden',
                            }}
                        >
                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, #FF6A00, #F59E0B, transparent)' }} />
                            {submitted ? (
                                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '40px 0' }}>
                                    <div style={{ marginBottom: '20px' }}><CheckCircle size={64} color="#10B981" /></div>
                                    <h3 style={{ fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)', fontSize: '28px', fontWeight: 700, color: 'white', marginBottom: '12px' }}>Application Submitted!</h3>
                                    <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '16px', lineHeight: 1.7 }}>Welcome to the ABIT family! We&apos;ll reach out within 3–5 business days with next steps.</p>
                                </motion.div>
                            ) : (
                                <>
                                    <h2 style={{ fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)', fontSize: '26px', fontWeight: 700, color: 'white', letterSpacing: '-0.02em', marginBottom: '32px' }}>Application Form</h2>
                                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-grid">
                                            {[{ key: 'name', label: 'Full Name', placeholder: 'Arjun Sharma', type: 'text' }, { key: 'email', label: 'College Email', placeholder: 'you@gmail.com', type: 'email' }, { key: 'phone', label: 'Phone', placeholder: '+91 XXXXX XXXXX', type: 'tel' }].map(({ key, label, placeholder, type }) => (
                                                <div key={key}>
                                                    <label style={{ display: 'block', color: 'rgba(255,255,255,0.6)', fontSize: '13px', fontWeight: 600, marginBottom: '8px', letterSpacing: '0.02em' }}>{label}</label>
                                                    <input
                                                        type={type}
                                                        placeholder={placeholder}
                                                        value={(form as Record<string, string>)[key]}
                                                        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                                                        required
                                                        style={{
                                                            width: '100%', padding: '12px 16px', borderRadius: '12px',
                                                            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                                                            color: 'white', fontSize: '14px', outline: 'none', fontFamily: 'inherit',
                                                            transition: 'border-color 0.2s ease', boxSizing: 'border-box',
                                                        }}
                                                        onFocus={(e) => { e.target.style.borderColor = 'rgba(255, 255, 255,0.5)'; }}
                                                        onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                                                    />
                                                </div>
                                            ))}
                                            <div>
                                                <label style={{ display: 'block', color: 'rgba(255,255,255,0.6)', fontSize: '13px', fontWeight: 600, marginBottom: '8px' }}>Year</label>
                                                <select value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} required style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: 'rgba(15,23,42,0.9)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: '14px', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }}>
                                                    <option value="">Select Year</option>
                                                    {years.map((y) => <option key={y} value={y}>{y}</option>)}
                                                </select>
                                            </div>
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', color: 'rgba(255,255,255,0.6)', fontSize: '13px', fontWeight: 600, marginBottom: '8px' }}>Branch</label>
                                            <select value={form.branch} onChange={(e) => setForm({ ...form, branch: e.target.value })} required style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: 'rgba(15,23,42,0.9)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: '14px', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }}>
                                                <option value="">Select Branch</option>
                                                {branches.map((b) => <option key={b} value={b}>{b}</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', color: 'rgba(255,255,255,0.6)', fontSize: '13px', fontWeight: 600, marginBottom: '8px' }}>Skills (comma-separated)</label>
                                            <input type="text" placeholder="React, Python, Machine Learning, UI/UX..." value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: '14px', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }} onFocus={(e) => { e.target.style.borderColor = 'rgba(255, 255, 255,0.5)'; }} onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; }} />
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', color: 'rgba(255,255,255,0.6)', fontSize: '13px', fontWeight: 600, marginBottom: '8px' }}>Why do you want to join ABIT?</label>
                                            <textarea value={form.why} onChange={(e) => setForm({ ...form, why: e.target.value })} rows={4} placeholder="Tell us about your interests and goals..." style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: '14px', outline: 'none', fontFamily: 'inherit', resize: 'vertical', boxSizing: 'border-box' }} onFocus={(e) => { e.target.style.borderColor = 'rgba(255, 255, 255,0.5)'; }} onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; }} />
                                        </div>
                                        <motion.button
                                            type="submit"
                                            disabled={loading}
                                            whileHover={{ scale: loading ? 1 : 1.02 }}
                                            whileTap={{ scale: loading ? 1 : 0.98 }}
                                            className="btn-primary"
                                            style={{ width: '100%', justifyContent: 'center', fontSize: '16px', padding: '16px', opacity: loading ? 0.7 : 1 }}
                                        >
                                            {loading ? 'Submitting...' : 'Submit Application'} {!loading && <ArrowRight size={16} />}
                                        </motion.button>
                                    </form>
                                </>
                            )}
                        </motion.div>
                    </div>
                </div>
            </section>

            <style jsx global>{`
        @media (max-width: 768px) { .benefits-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 480px) { .benefits-grid { grid-template-columns: 1fr !important; } .form-grid { grid-template-columns: 1fr !important; } }
      `}</style>
        </div>
    );
}
