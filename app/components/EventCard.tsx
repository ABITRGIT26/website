'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, MapPin, ArrowRight, Trophy, Cpu, Users, BookOpen } from 'lucide-react';
import type { Event } from '../data/events';

const categoryConfig = {
  hackathon: { icon: Trophy, label: 'Hackathon' },
  workshop: { icon: BookOpen, label: 'Workshop' },
  seminar: { icon: Users, label: 'Seminar' },
  competition: { icon: Cpu, label: 'Competition' },
  flagship: { icon: Trophy, label: 'Flagship' },
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
      whileHover={{ y: -4, borderColor: 'var(--blue)' }}
      style={{
        background: 'var(--bg)',
        border: '1px solid var(--border)',
        borderRadius: 0,
        overflow: 'hidden',
        transition: 'border-color 0.3s ease',
        cursor: 'pointer',
      }}
    >
      {/* Category strip */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 20px',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontFamily: 'var(--font-utility)',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--muted)',
          }}
        >
          <Icon size={13} aria-hidden="true" />
          {cat.label}
        </div>
        {event.upcoming && (
          <span
            style={{
              fontFamily: 'var(--font-utility)',
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
            }}
          >
            Upcoming
          </span>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '20px' }}>
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 22,
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            color: 'var(--text)',
            marginBottom: 8,
          }}
        >
          {event.title}
        </h3>
        <p
          style={{
            color: 'var(--muted)',
            fontSize: 14,
            lineHeight: 1.6,
            marginBottom: 16,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {event.description}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--muted)', fontSize: 13 }}>
            <Calendar size={13} aria-hidden="true" />
            {event.date}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--muted)', fontSize: 13 }}>
            <MapPin size={13} aria-hidden="true" />
            {event.location}
          </div>
        </div>
        {event.highlights && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 18 }}>
            {event.highlights.map((h) => (
              <span
                key={h}
                style={{
                  fontFamily: 'var(--font-utility)',
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--muted)',
                  border: '1px solid var(--border)',
                  padding: '4px 8px',
                }}
              >
                {h}
              </span>
            ))}
          </div>
        )}
        <Link
          href={event.href ?? `/events/${event.slug}`}
          style={{ textDecoration: 'none' }}
        >
          <motion.div
            whileHover={{ x: 4 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontWeight: 700,
              fontSize: 12,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--text)',
            }}
          >
            View Details <ArrowRight size={14} aria-hidden="true" />
          </motion.div>
        </Link>
      </div>
    </motion.div>
  );
}
