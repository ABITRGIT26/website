'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, MapPin, ArrowLeft, Users, Trophy, ArrowRight } from 'lucide-react';
import type { Event } from '../../data/events';

const categoryColors: Record<string, string> = {
    hackathon: '#F59E0B', workshop: '#10B981', seminar: '#8B5CF6', competition: '#EF4444', flagship: '#FFFFFF',
};

export default function EventDetailClient({ event }: { event: Event }) {
    const color = categoryColors[event.category] || '#FFFFFF';
    return (
        <div style={{ background: 'var(--navy)', minHeight: '100vh', paddingTop: '100px' }}>
            {/* Hero */}
            <section style={{ padding: '80px 24px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '700px', height: '500px', background: `radial-gradient(ellipse, ${color}18 0%, transparent 70%)`, pointerEvents: 'none' }} />
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} style={{ marginBottom: '40px' }}>
                        <Link href="/events" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.5)', fontSize: '14px', textDecoration: 'none', fontWeight: 500, padding: '8px 16px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)' }}>
                            <ArrowLeft size={14} /> Back to Events
                        </Link>
                    </motion.div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }} className="event-detail-grid">
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
                                <span style={{ padding: '5px 12px', borderRadius: '999px', background: `${color}18`, border: `1px solid ${color}30`, color, fontSize: '12px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{event.category}</span>
                                {event.upcoming && <span style={{ padding: '5px 12px', borderRadius: '999px', background: 'rgba(255, 106, 0, 0.15)', border: '1px solid rgba(255, 106, 0, 0.3)', color: '#FF6A00', fontSize: '12px', fontWeight: 700 }}>Upcoming</span>}
                            </div>
                            <h1 style={{ fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)', fontSize: 'clamp(32px, 5vw, 60px)', fontWeight: 800, color: 'white', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: '16px' }}>{event.title}</h1>
                            <p style={{ color: `${color}`, fontSize: '18px', fontWeight: 600, marginBottom: '24px' }}>{event.tagline}</p>
                            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '16px', lineHeight: 1.8, marginBottom: '32px' }}>{event.description}</p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '36px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'rgba(255,255,255,0.6)', fontSize: '15px' }}>
                                    <Calendar size={16} color={color} />{event.date}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'rgba(255,255,255,0.6)', fontSize: '15px' }}>
                                    <MapPin size={16} color={color} />{event.location}
                                </div>
                            </div>
                            {event.registrationLink && event.upcoming && (
                                <a href={event.registrationLink} style={{ textDecoration: 'none' }}>
                                    <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }} className="btn-primary" style={{ fontSize: '16px', padding: '16px 32px' }}>
                                        Register Now <ArrowRight size={16} />
                                    </motion.button>
                                </a>
                            )}
                        </motion.div>

                        {/* Highlights visual */}
                        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.15 }}>
                            <div style={{ padding: '40px', borderRadius: '28px', background: `linear-gradient(135deg, ${color}12, rgba(15,23,42,0.9))`, border: `1px solid ${color}25`, display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                {event.highlights && (
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                        {event.highlights.map((h) => (
                                            <div key={h} style={{ padding: '20px', borderRadius: '16px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', textAlign: 'center' }}>
                                                <div style={{ fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)', fontSize: '22px', fontWeight: 800, color: 'white', marginBottom: '4px' }}>{h.split(' ')[0]}</div>
                                                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px' }}>{h.split(' ').slice(1).join(' ')}</div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Speakers */}
            {event.speakers && (
                <section style={{ padding: '60px 24px' }}>
                    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                        <h2 style={{ fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)', fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: 700, color: 'white', letterSpacing: '-0.02em', marginBottom: '36px' }}>Speakers & Mentors</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }} className="speakers-grid">
                            {event.speakers.map((s, i) => (
                                <motion.div
                                    key={s.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.08 }}
                                    style={{ padding: '24px', borderRadius: '18px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', display: 'flex', gap: '14px', alignItems: 'center' }}
                                >
                                    <div style={{ width: 52, height: 52, borderRadius: '50%', background: `${color}20`, border: `2px solid ${color}35`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)', fontWeight: 800, fontSize: '18px', color, flexShrink: 0 }}>
                                        {s.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 700, color: 'white', fontSize: '15px', marginBottom: '2px' }}>{s.name}</div>
                                        <div style={{ color, fontSize: '13px', fontWeight: 600, marginBottom: '2px' }}>{s.role}</div>
                                        <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px' }}>{s.company}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <section style={{ padding: '40px 24px 80px', textAlign: 'center' }}>
                <Link href="/events" style={{ textDecoration: 'none' }}>
                    <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }} className="btn-secondary">
                        <ArrowLeft size={15} /> View All Events
                    </motion.button>
                </Link>
            </section>

            <style jsx global>{`
        @media (max-width: 900px) { .event-detail-grid { grid-template-columns: 1fr !important; } .speakers-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 480px) { .speakers-grid { grid-template-columns: 1fr !important; } }
      `}</style>
        </div>
    );
}
