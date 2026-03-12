'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';
import { projects } from '../data/projects';

type Category = 'all' | 'web' | 'mobile' | 'ai' | 'iot';

export default function ProjectsPage() {
    const [filter, setFilter] = useState<Category>('all');
    const filtered = filter === 'all' ? projects : projects.filter((p) => p.category === filter);

    const cats: { value: Category; label: string; emoji: string }[] = [
        { value: 'all', label: 'All', emoji: '🌐' },
        { value: 'web', label: 'Web', emoji: '💻' },
        { value: 'mobile', label: 'Mobile', emoji: '📱' },
        { value: 'ai', label: 'AI / ML', emoji: '🤖' },
        { value: 'iot', label: 'IoT', emoji: '🔌' },
    ];

    return (
        <div style={{ background: 'var(--navy)', minHeight: '100vh', paddingTop: '100px' }}>
            {/* Hero */}
            <section style={{ padding: '80px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '400px', background: 'radial-gradient(ellipse, rgba(255, 106, 0, 0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <span className="badge" style={{ marginBottom: '20px', display: 'inline-flex' }}>🚀 Innovation</span>
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                    style={{ fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)', fontSize: 'clamp(36px, 6vw, 68px)', fontWeight: 800, color: 'white', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: '20px' }}
                >
                    Student{' '}
                    <span className="gradient-text">Projects</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                    style={{ color: 'rgba(255,255,255,0.55)', fontSize: 'clamp(16px, 2vw, 18px)', lineHeight: 1.8, maxWidth: '580px', margin: '0 auto' }}
                >
                    Real projects solving real-world problems — built by ABIT students using cutting-edge technologies.
                </motion.p>
            </section>

            {/* Filter + Grid */}
            <section style={{ padding: '0 24px 100px' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '40px', flexWrap: 'wrap' }}>
                        {cats.map(({ value, label, emoji }) => (
                            <button
                                key={value}
                                onClick={() => setFilter(value)}
                                style={{
                                    padding: '8px 20px',
                                    borderRadius: '999px',
                                    border: '1px solid',
                                    borderColor: filter === value ? '#FF6A00' : 'rgba(255,255,255,0.1)',
                                    background: filter === value ? 'rgba(255, 106, 0, 0.12)' : 'transparent',
                                    color: filter === value ? '#FF6A00' : 'rgba(255,255,255,0.5)',
                                    fontWeight: 600,
                                    fontSize: '14px',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)',
                                }}
                            >
                                {emoji} {label}
                            </button>
                        ))}
                    </div>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={filter}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}
                            className="proj-grid"
                        >
                            {filtered.map((p, i) => (
                                <ProjectCard key={p.title} project={p} index={i} />
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </section>

            <style jsx global>{`
        @media (max-width: 900px) { .proj-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 640px) { .proj-grid { grid-template-columns: 1fr !important; } }
      `}</style>
        </div>
    );
}
