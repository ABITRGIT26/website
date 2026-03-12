'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, GraduationCap } from 'lucide-react';
import TeamCard from '../components/TeamCard';
import MentorCard from '../components/MentorCard';
import { mentors, core2526, core2425, core2324, technicalTeam, designTeam, eventsTeam } from '../data/team';

const sections = [
    { id: 'core_2526', title: 'Core 2025–2026', subtitle: 'Leadership · Execution · Excellence\nPresent Committee', members: core2526, defaultOpen: true },
    { id: 'core_2425', title: 'Core 2024–2025', subtitle: 'Past Teams', members: core2425, defaultOpen: false },
    { id: 'core_2324', title: 'Core 2023–2024', subtitle: 'Past Teams', members: core2324, defaultOpen: false },
    // { id: 'technical', title: 'Technical Team', subtitle: 'Building tools, platforms, and solutions', members: technicalTeam, defaultOpen: true },
    // { id: 'design', title: 'Design Team', subtitle: 'Crafting ABIT\'s visual identity', members: designTeam, defaultOpen: true },
    //  { id: 'events', title: 'Events Team', subtitle: 'Orchestrating unforgettable experiences', members: eventsTeam, defaultOpen: true },
];

export default function TeamPage() {
    const [openSections, setOpenSections] = useState<Record<string, boolean>>(
        sections.reduce((acc, section) => ({ ...acc, [section.id]: section.defaultOpen }), {})
    );

    const toggleSection = (id: string) => {
        setOpenSections(prev => ({ ...prev, [id]: !prev[id] }));
    };
    return (
        <div style={{ background: 'var(--navy)', minHeight: '100vh', paddingTop: '100px' }}>
            {/* Hero */}
            <section style={{ padding: '80px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '400px', background: 'radial-gradient(ellipse, rgba(255, 106, 0, 0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                    <span className="badge" style={{ marginBottom: '20px', display: 'inline-flex' }}>👥 The Team</span>
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
                    style={{ fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)', fontSize: 'clamp(36px, 6vw, 68px)', fontWeight: 800, color: 'white', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: '20px' }}
                >
                    The{' '}
                    <span className="gradient-text">People</span>
                    {' '}Behind ABIT
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
                    style={{ color: 'rgba(255,255,255,0.55)', fontSize: 'clamp(16px, 2vw, 18px)', lineHeight: 1.8, maxWidth: '580px', margin: '0 auto' }}
                >
                    Dedicated students who spend their time building a community and empowering their peers.
                </motion.p>
            </section>

            {/* Mentors Section */}
            <section style={{ padding: '60px 24px', background: 'transparent' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <span className="badge" style={{ marginBottom: '12px', display: 'inline-flex' }}>
                                <GraduationCap size={14} />
                                Leadership
                            </span>
                            <h2 style={{ fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, color: 'white', letterSpacing: '-0.02em', marginBottom: '8px' }}>Our Mentors</h2>
                            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '15px' }}>Experienced professionals guiding students toward excellence and innovation</p>
                        </motion.div>
                        
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            style={{ display: 'flex', gap: '32px' }}
                        >
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '28px', fontWeight: 700, color: '#FF6A00', fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)' }}>
                                    {mentors.length.toString().padStart(2, '0')}
                                </div>
                                <div style={{ fontSize: '10px', fontWeight: 600, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Mentors</div>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '28px', fontWeight: 700, color: '#FF6A00', fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)' }}>
                                    20+
                                </div>
                                <div style={{ fontSize: '10px', fontWeight: 600, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Years Exp</div>
                            </div>
                        </motion.div>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }} className="mentors-grid">
                        {mentors.map((m, i) => (
                            <MentorCard key={m.name} mentor={m} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Teams */}
            {sections.map(({ id, title, subtitle, members }, si) => {
                const isOpen = openSections[id];
                return (
                    <section key={id} style={{ padding: '40px 24px', background: si % 2 === 1 ? 'rgba(255,255,255,0.015)' : 'transparent' }}>
                        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                style={{
                                    marginBottom: isOpen ? '40px' : '0px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                    padding: '12px 0'
                                }}
                                onClick={() => toggleSection(id)}
                            >
                                <div>
                                    <h2 style={{ fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)', fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 700, color: 'white', letterSpacing: '-0.02em', marginBottom: '8px' }}>{title}</h2>
                                    <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '15px', whiteSpace: 'pre-line' }}>{subtitle}</p>
                                </div>
                                <div style={{ color: 'rgba(255,255,255,0.5)' }}>
                                    {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                                </div>
                            </motion.div>

                            <AnimatePresence initial={false}>
                                {isOpen && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                        style={{ overflow: 'hidden' }}
                                    >
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', paddingBottom: '20px' }} className="team-grid">
                                            {members.map((m, i) => (
                                                <TeamCard key={m.name} member={m} index={i} />
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </section>
                );
            })}

            {/* Join CTA */}
            <section style={{ padding: '80px 24px', textAlign: 'center' }}>
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                    <h2 style={{ fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)', fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 700, color: 'white', letterSpacing: '-0.02em', marginBottom: '12px' }}>
                        Want to join the team?
                    </h2>
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '16px', marginBottom: '32px', maxWidth: '400px', margin: '0 auto 32px' }}>
                        Recruitment opens every semester. Build with us.
                    </p>
                    <a href="/join" style={{ textDecoration: 'none' }}>
                        <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }} className="btn-primary" style={{ fontSize: '15px' }}>
                            Apply Now
                        </motion.button>
                    </a>
                </motion.div>
            </section>

            <style jsx global>{`
        @media (max-width: 1024px) { 
            .team-grid { grid-template-columns: repeat(3, 1fr) !important; } 
            .mentors-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 768px) { 
            .team-grid { grid-template-columns: repeat(2, 1fr) !important; } 
            .mentors-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) { 
            .team-grid { grid-template-columns: 1fr 1fr !important; } 
        }
      `}</style>
        </div>
    );
}
