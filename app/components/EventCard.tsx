'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, MapPin, ArrowRight, Trophy, Cpu, Users, BookOpen } from 'lucide-react';
import type { Event } from '../data/events';

const categoryConfig = {
    hackathon: { icon: Trophy, color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.1)', label: 'Hackathon' },
    workshop: { icon: BookOpen, color: '#10B981', bg: 'rgba(16, 185, 129, 0.1)', label: 'Workshop' },
    seminar: { icon: Users, color: '#8B5CF6', bg: 'rgba(139, 92, 246, 0.1)', label: 'Seminar' },
    competition: { icon: Cpu, color: '#EF4444', bg: 'rgba(239, 68, 68, 0.1)', label: 'Competition' },
    flagship: { icon: Trophy, color: '#A3A3A3', bg: 'rgba(163, 163, 163, 0.1)', label: 'Flagship' },
};

interface EventCardProps {
    event: Event;
    index?: number;
}

export default function EventCard({ event, index = 0 }: EventCardProps) {
    const cat = categoryConfig[event.category];
    const Icon = cat.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ y: -4, borderColor: '#FF6A00', boxShadow: '0 10px 30px rgba(255, 106, 0, 0.15)' }}
            style={{
                background: '#111111',
                border: '1px solid rgba(255, 106, 0, 0.2)',
                borderRadius: '20px',
                overflow: 'hidden',
                transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                cursor: 'pointer',
            }}
            onHoverStart={(e) => {
                (e.target as HTMLElement).closest?.('[data-event-card]')?.setAttribute('data-hover', 'true');
            }}
        >
            {/* Image area */}
            <div style={{
                height: '200px',
                background: 'linear-gradient(135deg, #1E293B, #0F172A)',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                {/* Category badge */}
                <div style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    borderRadius: '999px',
                    background: cat.bg,
                    border: `1px solid ${cat.color}33`,
                    fontSize: '12px',
                    fontWeight: 600,
                    color: cat.color,
                    letterSpacing: '0.04em',
                }}>
                    <Icon size={12} />
                    {cat.label}
                </div>
                {event.upcoming && (
                    <div style={{
                        position: 'absolute',
                        top: '16px',
                        right: '16px',
                        background: 'rgba(255, 255, 255, 0.9)',
                        color: 'white',
                        fontSize: '11px',
                        fontWeight: 700,
                        padding: '5px 10px',
                        borderRadius: '999px',
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                    }}>
                        Upcoming
                    </div>
                )}
                {/* Gradient overlay icon */}
                <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '24px',
                    background: 'rgba(255, 106, 0, 0.12)',
                    border: '1px solid rgba(255, 106, 0, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Icon size={36} color="#FF6A00" />
                </div>
                {/* Grid */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: 'linear-gradient(rgba(255, 255, 255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255,0.04) 1px, transparent 1px)',
                    backgroundSize: '30px 30px',
                    pointerEvents: 'none',
                }} />
            </div>

            {/* Content */}
            <div style={{ padding: '24px' }}>
                <h3 style={{
                    fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)',
                    fontSize: '18px',
                    fontWeight: 700,
                    color: 'white',
                    marginBottom: '8px',
                    letterSpacing: '-0.02em',
                }}>
                    {event.title}
                </h3>
                <p style={{
                    color: 'rgba(255,255,255,0.55)',
                    fontSize: '14px',
                    lineHeight: 1.6,
                    marginBottom: '16px',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                }}>
                    {event.description}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.45)', fontSize: '13px' }}>
                        <Calendar size={13} color="#FF6A00" />
                        {event.date}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.45)', fontSize: '13px' }}>
                        <MapPin size={13} color="#FF6A00" />
                        {event.location}
                    </div>
                </div>
                <Link href={`/events/${event.slug}`} style={{ textDecoration: 'none' }}>
                    <motion.div
                        whileHover={{ x: 4 }}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            color: '#FF6A00',
                            fontSize: '14px',
                            fontWeight: 600,
                        }}
                    >
                        View Details <ArrowRight size={14} />
                    </motion.div>
                </Link>
            </div>
        </motion.div>
    );
}
