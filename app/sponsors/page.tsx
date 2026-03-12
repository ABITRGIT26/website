'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';

const tiers = [
    {
        name: 'Bronze',
        price: '₹25,000',
        color: '#CD7F32',
        benefits: ['Logo on event materials', 'Social media mention', 'Stall at SYNERGY', '2 event passes'],
    },
    {
        name: 'Silver',
        price: '₹50,000',
        color: '#94A3B8',
        popular: true,
        benefits: ['All Bronze benefits', 'Banner at events', 'Workshop slot', 'Resume access', '5 event passes'],
    },
    {
        name: 'Gold',
        price: '₹1,00,000',
        color: '#F59E0B',
        benefits: ['All Silver benefits', 'Keynote slot', 'Branding on website', 'Hiring drive', '10 event passes', 'Year-round presence'],
    },
];

const pastSponsors = [
    { name: 'TechCorp', desc: 'Software Solutions' },
    { name: 'InnovateLabs', desc: 'Research & Dev' },
    { name: 'DevStudio', desc: 'Product Design' },
    { name: 'CloudBase', desc: 'Cloud Infrastructure' },
    { name: 'FutureTech', desc: 'AI & Automation' },
    { name: 'StartupHub', desc: 'Incubation' },
];

export default function SponsorsPage() {
    return (
        <div style={{ background: 'var(--navy)', minHeight: '100vh', paddingTop: '100px' }}>
            <section style={{ padding: '80px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '400px', background: 'radial-gradient(ellipse, rgba(255, 106, 0, 0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <span className="badge" style={{ marginBottom: '20px', display: 'inline-flex' }}>🤝 Sponsors</span>
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                    style={{ fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)', fontSize: 'clamp(36px, 6vw, 68px)', fontWeight: 800, color: 'white', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: '20px' }}
                >
                    Partner with{' '}
                    <span className="gradient-text">ABIT</span>
                </motion.h1>
                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ color: 'rgba(255,255,255,0.55)', fontSize: 'clamp(16px, 2vw, 18px)', lineHeight: 1.8, maxWidth: '600px', margin: '0 auto' }}>
                    Reach 500+ passionate RGIT students and connect your brand with the next generation of tech talent.
                </motion.p>
            </section>

            {/* Why sponsor */}
            <section style={{ padding: '20px 24px 80px' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '80px' }} className="why-grid">
                        {[
                            { emoji: '👥', title: '500+ Students', desc: 'Directly reach a concentrated pool of engineering talent.' },
                            { emoji: '🏆', title: 'Brand Visibility', desc: 'Premium placement across all ABIT event materials and digital channels.' },
                            { emoji: '🎯', title: 'Talent Pipeline', desc: 'Early access to high-potential students for internships and placements.' },
                            { emoji: '🌐', title: 'Social Reach', desc: '10,000+ combined social media reach across ABIT\'s platforms.' },
                        ].map(({ emoji, title, desc }, i) => (
                            <motion.div
                                key={title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                                style={{ padding: '24px', borderRadius: '18px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', textAlign: 'center' }}
                            >
                                <div style={{ fontSize: '36px', marginBottom: '12px' }}>{emoji}</div>
                                <h3 style={{ fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)', fontSize: '16px', fontWeight: 700, color: 'white', marginBottom: '8px' }}>{title}</h3>
                                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', lineHeight: 1.6 }}>{desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Tiers */}
                    <h2 style={{ fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)', fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 700, color: 'white', letterSpacing: '-0.02em', textAlign: 'center', marginBottom: '40px' }}>Sponsorship Tiers</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '80px' }} className="tiers-grid">
                        {tiers.map(({ name, price, color, benefits, popular }, i) => (
                            <motion.div
                                key={name}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                style={{
                                    padding: '36px', borderRadius: '24px',
                                    background: popular ? `linear-gradient(135deg, rgba(255, 255, 255,0.12) 0%, rgba(15,23,42,0.9))` : 'rgba(255,255,255,0.03)',
                                    border: `1px solid ${popular ? 'rgba(255, 255, 255,0.3)' : 'rgba(255,255,255,0.08)'}`,
                                    position: 'relative',
                                    transform: popular ? 'scale(1.03)' : 'scale(1)',
                                }}
                            >
                                {popular && (
                                    <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', background: 'var(--gradient-text)', color: 'white', fontSize: '12px', fontWeight: 700, padding: '6px 16px', borderRadius: '999px', letterSpacing: '0.06em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Most Popular</div>
                                )}
                                <div style={{ width: 52, height: 52, borderRadius: '16px', background: `${color}20`, border: `1px solid ${color}35`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', marginBottom: '20px' }}>🏅</div>
                                <h3 style={{ fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)', fontSize: '24px', fontWeight: 700, color, marginBottom: '4px' }}>{name}</h3>
                                <div style={{ fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)', fontSize: '32px', fontWeight: 800, color: 'white', marginBottom: '24px', letterSpacing: '-0.02em' }}>{price}</div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
                                    {benefits.map((b) => (
                                        <div key={b} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                                            <Check size={16} color={color} style={{ flexShrink: 0, marginTop: '1px' }} />
                                            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>{b}</span>
                                        </div>
                                    ))}
                                </div>
                                <a href="/contact" style={{ textDecoration: 'none', display: 'block' }}>
                                    <motion.button
                                        whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}
                                        style={{
                                            width: '100%', padding: '13px', borderRadius: '12px', border: `1px solid ${popular ? 'rgba(255,255,255,0)' : `${color}40`}`,
                                            background: popular ? 'var(--gradient-primary)' : `${color}15`,
                                            color: 'white', fontWeight: 600, fontSize: '14px', cursor: 'pointer',
                                            fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)',
                                            transition: 'all 0.2s ease',
                                        }}
                                    >
                                        Contact Us <ArrowRight size={14} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '4px' }} />
                                    </motion.button>
                                </a>
                            </motion.div>
                        ))}
                    </div>

                    {/* Past sponsors */}
                    <h2 style={{ fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)', fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: 700, color: 'white', letterSpacing: '-0.02em', textAlign: 'center', marginBottom: '32px' }}>Past Sponsors & Partners</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }} className="past-grid">
                        {pastSponsors.map(({ name, desc }, i) => (
                            <motion.div
                                key={name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.06 }}
                                style={{ padding: '20px 24px', borderRadius: '16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', display: 'flex', flexDirection: 'column', gap: '4px' }}
                            >
                                <div style={{ fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)', fontWeight: 700, fontSize: '18px', color: 'rgba(255,255,255,0.8)' }}>{name}</div>
                                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px' }}>{desc}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <style jsx global>{`
        @media (max-width: 900px) { .why-grid { grid-template-columns: 1fr 1fr !important; } .tiers-grid { grid-template-columns: 1fr !important; } .past-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 480px) { .past-grid { grid-template-columns: 1fr !important; } .why-grid { grid-template-columns: 1fr 1fr !important; } }
      `}</style>
        </div>
    );
}
