'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';

const gallery = [
    { id: 1, alt: 'Synergy 2024 Opening Ceremony', category: 'synergy', emoji: '🎪', color: '#FFFFFF', desc: 'SYNERGY 2024 — Main Stage Opening' },
    { id: 2, alt: 'Hackathon Team Huddle', category: 'hackathon', emoji: '💻', color: '#10B981', desc: 'Teams collaborating during the 24hr Hackathon' },
    { id: 3, alt: 'Workshop Session', category: 'workshops', emoji: '📚', color: '#8B5CF6', desc: 'Full Stack Web Dev Workshop — Session 1' },
    { id: 4, alt: 'Award Ceremony', category: 'synergy', emoji: '🏆', color: '#F59E0B', desc: 'Prize distribution at SYNERGY 2024' },
    { id: 5, alt: 'AI Workshop', category: 'workshops', emoji: '🤖', color: '#EF4444', desc: 'AI & ML Bootcamp — Neural Networks Lab' },
    { id: 6, alt: 'Networking Session', category: 'networking', emoji: '🤝', color: '#06B6D4', desc: 'Student-Industry Networking Night' },
    { id: 7, alt: 'Panel Discussion', category: 'synergy', emoji: '🎙️', color: '#FFFFFF', desc: 'Tech Leaders Panel — SYNERGY 2024' },
    { id: 8, alt: 'Team Building Activity', category: 'networking', emoji: '👥', color: '#10B981', desc: 'ABIT Team Building Workshop' },
    { id: 9, alt: 'Project Expo', category: 'hackathon', emoji: '🚀', color: '#8B5CF6', desc: 'Student Project Exhibition 2024' },
];

const categories = ['all', 'synergy', 'hackathon', 'workshops', 'networking'];

export default function GalleryPage() {
    const [filter, setFilter] = useState('all');
    const [lightbox, setLightbox] = useState<typeof gallery[0] | null>(null);

    const filtered = filter === 'all' ? gallery : gallery.filter((g) => g.category === filter);

    return (
        <div style={{ background: 'var(--navy)', minHeight: '100vh', paddingTop: '100px' }}>
            <section style={{ padding: '80px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '400px', background: 'radial-gradient(ellipse, rgba(255, 106, 0, 0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <span className="badge" style={{ marginBottom: '20px', display: 'inline-flex' }}>📸 Gallery</span>
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                    style={{ fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)', fontSize: 'clamp(36px, 6vw, 68px)', fontWeight: 800, color: 'white', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: '20px' }}
                >
                    Moments &{' '}
                    <span className="gradient-text">Memories</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                    style={{ color: 'rgba(255,255,255,0.55)', fontSize: 'clamp(16px, 2vw, 18px)', lineHeight: 1.8, maxWidth: '500px', margin: '0 auto' }}
                >
                    A visual journey through ABIT&apos;s events, workshops, and community moments.
                </motion.p>
            </section>

            <section style={{ padding: '0 24px 100px' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    {/* Filter */}
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '40px', flexWrap: 'wrap' }}>
                        {categories.map((c) => (
                            <button
                                key={c}
                                onClick={() => setFilter(c)}
                                style={{
                                    padding: '8px 20px', borderRadius: '999px', border: '1px solid',
                                    borderColor: filter === c ? '#FF6A00' : 'rgba(255,255,255,0.1)',
                                    background: filter === c ? 'rgba(255, 106, 0, 0.12)' : 'transparent',
                                    color: filter === c ? '#FF6A00' : 'rgba(255,255,255,0.5)',
                                    fontWeight: 600, fontSize: '14px', cursor: 'pointer', transition: 'all 0.2s ease',
                                    textTransform: 'capitalize', fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)',
                                }}
                            >
                                {c}
                            </button>
                        ))}
                    </div>

                    {/* Masonry Grid */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={filter}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(3, 1fr)',
                                gap: '16px',
                            }}
                            className="gallery-grid"
                        >
                            {filtered.map((item, i) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.06 }}
                                    onClick={() => setLightbox(item)}
                                    whileHover={{ scale: 1.02 }}
                                    style={{
                                        borderRadius: '16px',
                                        overflow: 'hidden',
                                        cursor: 'zoom-in',
                                        position: 'relative',
                                        height: i % 5 === 0 ? '300px' : '220px',
                                        background: `linear-gradient(135deg, ${item.color}20, ${item.color}08)`,
                                        border: `1px solid ${item.color}25`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexDirection: 'column',
                                        gap: '12px',
                                        transition: 'all 0.3s ease',
                                    }}
                                >
                                    <div style={{ fontSize: 'clamp(40px, 5vw, 64px)' }}>{item.emoji}</div>
                                    <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', fontWeight: 500, textAlign: 'center', padding: '0 16px' }}>{item.desc}</div>
                                    <div style={{ position: 'absolute', top: '12px', right: '12px', opacity: 0, transition: 'opacity 0.2s' }} className="zoom-icon">
                                        <ZoomIn size={18} color="rgba(255,255,255,0.7)" />
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </section>

            {/* Lightbox */}
            <AnimatePresence>
                {lightbox && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setLightbox(null)}
                        style={{
                            position: 'fixed', inset: 0, zIndex: 9999,
                            background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(20px)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            padding: '24px',
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.85 }} animate={{ scale: 1 }} exit={{ scale: 0.85 }}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                borderRadius: '24px', overflow: 'hidden', maxWidth: '700px', width: '100%',
                                background: `linear-gradient(135deg, ${lightbox.color}20, rgba(15,23,42,0.98))`,
                                border: `1px solid ${lightbox.color}30`,
                                display: 'flex', flexDirection: 'column', alignItems: 'center',
                                justifyContent: 'center', minHeight: '400px', gap: '20px', padding: '60px',
                            }}
                        >
                            <button
                                onClick={() => setLightbox(null)}
                                style={{ position: 'absolute', top: '70px', right: '30px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '10px', padding: '8px', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            >
                                <X size={18} />
                            </button>
                            <div style={{ fontSize: '80px' }}>{lightbox.emoji}</div>
                            <p style={{ color: 'white', fontSize: '18px', fontWeight: 600, textAlign: 'center', fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)' }}>{lightbox.desc}</p>
                            <span style={{ padding: '6px 14px', borderRadius: '999px', background: `${lightbox.color}20`, border: `1px solid ${lightbox.color}40`, color: lightbox.color, fontSize: '12px', fontWeight: 600, textTransform: 'capitalize' }}>{lightbox.category}</span>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx global>{`
        @media (max-width: 768px) { .gallery-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 480px) { .gallery-grid { grid-template-columns: 1fr !important; } }
      `}</style>
        </div>
    );
}
