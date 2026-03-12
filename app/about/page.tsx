'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Target, Eye, BookOpen, Award } from 'lucide-react';
import StatsCounter from '../components/StatsCounter';

const stats = [
    { value: 8, suffix: '+', label: 'Years Active', icon: '📅' },
    { value: 500, suffix: '+', label: 'Members', icon: '👥' },
    { value: 50, suffix: '+', label: 'Events', icon: '🎯' },
    { value: 20, suffix: '+', label: 'Industry Partners', icon: '🤝' },
];

const timeline = [
    { year: '2016', title: 'ABIT Founded', description: 'A group of passionate IT students at RGIT founded ABIT to bridge the gap between classroom learning and industry-ready skills.' },
    { year: '2018', title: 'First SYNERGY', description: 'Launched SYNERGY, our flagship annual tech fest, with over 200 participants and 10 events. A milestone that defined ABIT\'s identity.' },
    { year: '2020', title: 'Going Digital', description: 'During the pandemic, ABIT pivoted fully online — hosting virtual hackathons, webinars, and workshops that reached students across Mumbai.' },
    { year: '2022', title: 'Community Surge', description: 'Post-pandemic, ABIT bounced back stronger with record memberships and industry partnerships. SYNERGY 2022 saw 350+ participants.' },
    { year: '2023', title: 'Industry Collaborations', description: 'Partnered with 15+ companies for exclusive workshops, mentorship programs, and placement drives for ABIT members.' },
    { year: '2024', title: 'SYNERGY 2024', description: 'Our biggest event yet — 500+ participants, ₹1L+ prize pool, 20+ events, and keynotes from Google, Microsoft, and leading startups.' },
];

export default function AboutPage() {
    return (
        <div style={{ background: 'var(--navy)', minHeight: '100vh', paddingTop: '100px' }}>
            {/* Hero */}
            <section style={{ padding: '80px 24px', position: 'relative', overflow: 'hidden' }}>
                <div style={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    width: '600px', height: '400px',
                    background: 'radial-gradient(ellipse, rgba(255, 106, 0, 0.1) 0%, transparent 70%)',
                    pointerEvents: 'none',
                }} />
                <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <span className="badge" style={{ marginBottom: '20px', display: 'inline-flex' }}>Our Story</span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
                        style={{
                            fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)',
                            fontSize: 'clamp(36px, 6vw, 68px)', fontWeight: 800, color: 'white',
                            letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: '24px',
                        }}
                    >
                        About{' '}
                        <span className="gradient-text">
                            ABIT
                        </span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
                        style={{ color: 'rgba(255,255,255,0.55)', fontSize: 'clamp(16px, 2vw, 18px)', lineHeight: 1.8, maxWidth: '680px', margin: '0 auto' }}
                    >
                        Association of Budding Information Technocrats — empowering students to become industry-ready technologists through hands-on learning, community, and innovation.
                    </motion.p>
                </div>
            </section>

            {/* Stats */}
            <section style={{ padding: '20px 24px 80px' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <StatsCounter stats={stats} />
                </div>
            </section>

            {/* Mission & Vision */}
            <section style={{ padding: '80px 24px', background: 'rgba(255,255,255,0.015)' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }} className="mv-grid">
                        {[
                            {
                                icon: Target, color: '#FFFFFF', title: 'Our Mission',
                                text: 'To create an inclusive, innovation-driven community that empowers RGIT students with technical skills, industry exposure, and a collaborative mindset — preparing them for exceptional careers in technology.',
                            },
                            {
                                icon: Eye, color: '#10B981', title: 'Our Vision',
                                text: 'To be the most impactful student technology community in Mumbai, recognized for producing industry leaders, innovative thinkers, and responsible technologists who shape the future.',
                            },
                        ].map(({ icon: Icon, color, title, text }, i) => (
                            <motion.div
                                key={title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15 }}
                                style={{
                                    padding: '40px',
                                    borderRadius: '24px',
                                    background: 'rgba(255,255,255,0.03)',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    position: 'relative',
                                    overflow: 'hidden',
                                }}
                            >
                                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />
                                <div style={{ width: 60, height: 60, borderRadius: '16px', background: `${color}15`, border: `1px solid ${color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                                    <Icon size={28} color={color} />
                                </div>
                                <h2 style={{ fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)', fontSize: '26px', fontWeight: 700, color: 'white', marginBottom: '16px', letterSpacing: '-0.02em' }}>{title}</h2>
                                <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '16px', lineHeight: 1.8 }}>{text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* What ABIT Does */}
            <section style={{ padding: '80px 24px' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                        <span className="badge" style={{ marginBottom: '16px', display: 'inline-flex' }}><BookOpen size={12} /> What We Do</span>
                        <h2 style={{ fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)', fontSize: 'clamp(26px, 4vw, 44px)', fontWeight: 700, color: 'white', letterSpacing: '-0.02em' }}>
                            How ABIT Shapes Careers
                        </h2>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }} className="what-grid">
                        {[
                            { emoji: '🏆', title: 'Hackathons & Competitions', desc: 'Annual hackathons and competitive coding events that challenge students to build real solutions under pressure.' },
                            { emoji: '💡', title: 'Technical Workshops', desc: 'Hands-on workshops on cutting-edge topics: web dev, AI/ML, blockchain, cloud, DevOps, and more.' },
                            { emoji: '🎙️', title: 'Industry Seminars', desc: 'Talks and panels with engineers, founders, and leaders from top tech companies and startups.' },
                            { emoji: '🚀', title: 'Project Building', desc: 'Collaborative projects that let students apply skills to build real products with mentorship.' },
                            { emoji: '🤝', title: 'Networking', desc: 'Events and communities that connect ABIT members with alumni, professionals, and fellow students.' },
                            { emoji: '🎓', title: 'Placement Support', desc: 'Interview prep, resume reviews, and connections to companies actively hiring RGIT talent.' },
                        ].map(({ emoji, title, desc }, i) => (
                            <motion.div
                                key={title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{ delay: i * 0.08 }}
                                whileHover={{ y: -4, borderColor: 'rgba(255, 255, 255, 0.25)' }}
                                style={{ padding: '28px', borderRadius: '20px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', transition: 'all 0.3s ease' }}
                            >
                                <div style={{ fontSize: '32px', marginBottom: '16px' }}>{emoji}</div>
                                <h3 style={{ fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)', fontSize: '18px', fontWeight: 700, color: 'white', marginBottom: '10px', letterSpacing: '-0.02em' }}>{title}</h3>
                                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', lineHeight: 1.7 }}>{desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section style={{ padding: '80px 24px', background: 'rgba(255,255,255,0.015)' }}>
                <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '64px' }}>
                        <span className="badge" style={{ marginBottom: '16px', display: 'inline-flex' }}><Award size={12} /> History</span>
                        <h2 style={{ fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)', fontSize: 'clamp(26px, 4vw, 44px)', fontWeight: 700, color: 'white', letterSpacing: '-0.02em' }}>
                            Our Journey
                        </h2>
                    </div>
                    <div style={{ position: 'relative' }}>
                        {/* Line */}
                        <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '1px', background: 'linear-gradient(180deg, transparent, rgba(255, 255, 255,0.4), rgba(255, 255, 255,0.4), transparent)', transform: 'translateX(-50%)' }} className="timeline-line" />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
                            {timeline.map((item, i) => (
                                <motion.div
                                    key={item.year}
                                    initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: '-80px' }}
                                    transition={{ duration: 0.5 }}
                                    style={{
                                        display: 'flex',
                                        justifyContent: i % 2 === 0 ? 'flex-start' : 'flex-end',
                                        position: 'relative',
                                    }}
                                    className="timeline-item"
                                >
                                    {/* Center dot */}
                                    <div style={{ position: 'absolute', left: '50%', top: '20px', transform: 'translate(-50%, -50%)', width: 14, height: 14, borderRadius: '50%', background: 'var(--gradient-text)', border: '3px solid var(--navy)', zIndex: 1 }} className="timeline-dot" />
                                    <div style={{
                                        width: '45%',
                                        padding: '24px',
                                        borderRadius: '18px',
                                        background: 'rgba(255,255,255,0.03)',
                                        border: '1px solid rgba(255,255,255,0.08)',
                                    }} className="timeline-content">
                                        <div style={{ background: 'var(--gradient-text)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)', fontWeight: 800, fontSize: '20px', marginBottom: '6px' }}>{item.year}</div>
                                        <h3 style={{ fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)', fontSize: '17px', fontWeight: 700, color: 'white', marginBottom: '8px', letterSpacing: '-0.01em' }}>{item.title}</h3>
                                        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', lineHeight: 1.7 }}>{item.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section style={{ padding: '80px 24px', textAlign: 'center' }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 style={{ fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)', fontSize: 'clamp(26px, 4vw, 44px)', fontWeight: 700, color: 'white', letterSpacing: '-0.02em', marginBottom: '16px' }}>
                        Be part of our story
                    </h2>
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '16px', marginBottom: '32px' }}>Join ABIT and write the next chapter.</p>
                    <Link href="/join" style={{ textDecoration: 'none' }}>
                        <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }} className="btn-primary" style={{ fontSize: '16px', padding: '16px 32px' }}>
                            Join ABIT <ArrowRight size={16} />
                        </motion.button>
                    </Link>
                </motion.div>
            </section>

            <style jsx global>{`
        @media (max-width: 768px) {
          .mv-grid { grid-template-columns: 1fr !important; }
          .what-grid { grid-template-columns: 1fr 1fr !important; }
          .timeline-line { display: none; }
          .timeline-dot { display: none; }
          .timeline-item { justify-content: flex-start !important; }
          .timeline-content { width: 100% !important; }
        }
        @media (max-width: 480px) {
          .what-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
        </div>
    );
}
