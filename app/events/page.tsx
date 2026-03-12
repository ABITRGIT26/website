'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter } from 'lucide-react';
import EventCard from '../components/EventCard';
import { events, upcomingEvents, pastEvents } from '../data/events';

type FilterType = 'all' | 'upcoming' | 'past';

export default function EventsPage() {
    const [filter, setFilter] = useState<FilterType>('all');

    const filtered = filter === 'all' ? events : filter === 'upcoming' ? upcomingEvents : pastEvents;

    return (
        <div style={{ background: 'var(--navy)', minHeight: '100vh', paddingTop: '100px' }}>
            {/* Hero */}
            <section style={{ padding: '80px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '400px', background: 'radial-gradient(ellipse, rgba(255, 106, 0, 0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                    <span className="badge" style={{ marginBottom: '20px', display: 'inline-flex' }}>📅 Events</span>
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
                    style={{ fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)', fontSize: 'clamp(36px, 6vw, 68px)', fontWeight: 800, color: 'white', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: '20px' }}
                >
                    ABIT{' '}
                    <span className="gradient-text">Events</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
                    style={{ color: 'rgba(255,255,255,0.55)', fontSize: 'clamp(16px, 2vw, 18px)', lineHeight: 1.8, maxWidth: '580px', margin: '0 auto' }}
                >
                    From workshops to hackathons, ABIT events are where learning meets real-world impact.
                </motion.p>
            </section>

            {/* SYNERGY Highlight */}
            <section style={{ padding: '0 24px 80px' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        style={{
                            padding: '48px',
                            borderRadius: '28px',
                            background: 'linear-gradient(135deg, rgba(255, 255, 255,0.12) 0%, rgba(15,23,42,0.8) 100%)',
                            border: '1px solid rgba(255, 255, 255,0.2)',
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                    >
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, #FF6A00, #F59E0B, transparent)' }} />
                        <div style={{ display: 'flex', gap: '48px', alignItems: 'center', flexWrap: 'wrap' }}>
                            <div style={{ flex: 1, minWidth: '260px' }}>
                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 14px', borderRadius: '999px', background: 'rgba(255, 106, 0, 0.15)', border: '1px solid rgba(255, 106, 0, 0.3)', color: '#FF6A00', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '16px' }}>
                                    ⚡ Flagship Event
                                </span>
                                <h2 style={{ fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, color: 'white', letterSpacing: '-0.03em', marginBottom: '12px' }}>SYNERGY 2024</h2>
                                <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '16px', lineHeight: 1.8, marginBottom: '28px', maxWidth: '480px' }}>
                                    ABIT&apos;s annual flagship technology festival. Three days of hackathons, keynotes, competitions, and community. The event that defines ABIT.
                                </p>
                                <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', marginBottom: '28px' }}>
                                    {[{ val: '500+', label: 'Participants' }, { val: '₹1L+', label: 'Prize Pool' }, { val: '20+', label: 'Events' }, { val: '15+', label: 'Speakers' }].map(({ val, label }) => (
                                        <div key={label}>
                                            <div style={{ fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)', fontSize: '28px', fontWeight: 800, color: 'white', letterSpacing: '-0.02em' }}>{val}</div>
                                            <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '13px' }}>{label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', minWidth: '240px' }}>
                                {['Hackathon', 'Coding Contest', 'AI Workshop', 'Panel Talks', 'Project Expo', 'Networking'].map((ev) => (
                                    <div key={ev} style={{ padding: '12px 16px', borderRadius: '12px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.6)', fontSize: '13px', fontWeight: 500 }}>
                                        {ev}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Events Grid */}
            <section style={{ padding: '0 24px 100px' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    {/* Filter tabs */}
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '40px', flexWrap: 'wrap', alignItems: 'center' }}>
                        <Filter size={16} color="rgba(255,255,255,0.4)" />
                        {(['all', 'upcoming', 'past'] as FilterType[]).map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                style={{
                                    padding: '8px 20px',
                                    borderRadius: '999px',
                                    border: '1px solid',
                                    borderColor: filter === f ? '#FF6A00' : 'rgba(255,255,255,0.1)',
                                    background: filter === f ? 'rgba(255, 106, 0, 0.12)' : 'transparent',
                                    color: filter === f ? '#FF6A00' : 'rgba(255,255,255,0.5)',
                                    fontWeight: 600,
                                    fontSize: '14px',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    textTransform: 'capitalize',
                                    fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)',
                                }}
                            >
                                {f} ({(f === 'all' ? events : f === 'upcoming' ? upcomingEvents : pastEvents).length})
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
                            className="events-page-grid"
                        >
                            {filtered.map((ev, i) => (
                                <EventCard key={ev.slug} event={ev} index={i} />
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </section>

            <style jsx global>{`
        @media (max-width: 900px) {
          .events-page-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 640px) {
          .events-page-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
        </div>
    );
}
