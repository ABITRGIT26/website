'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Filter, ArrowRight, Lock, Unlock } from 'lucide-react';
import EventCard from '../components/EventCard';
import { events, upcomingEvents } from '../data/events';
import { phases } from '../data/synergy';

type FilterType = 'all' | 'upcoming';

export default function EventsPage() {
  const [filter, setFilter] = useState<FilterType>('all');

  const filtered = filter === 'all' ? events : upcomingEvents;

  const gamingEvents = events.filter((e) =>
    ['campus-cup-season-2', 'box-cricket-predators', 'bgmi-lan'].includes(e.slug)
  );

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingTop: 100 }}>
      {/* Hero */}
      <section style={{ padding: '80px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="mono-meta" style={{ marginBottom: 20, display: 'inline-flex' }}>Events</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(36px, 6vw, 68px)',
            fontWeight: 800,
            color: 'var(--text)',
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            marginBottom: 20,
          }}
        >
          ABIT Events
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ color: 'var(--muted)', fontSize: 'clamp(16px, 2vw, 18px)', lineHeight: 1.8, maxWidth: 580, margin: '0 auto' }}
        >
          From workshops to hackathons, ABIT events are where learning meets real-world impact.
        </motion.p>
      </section>

      {/* ── Flagship: SYNERGY ── */}
      <section style={{ padding: '0 24px 80px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              padding: 'clamp(32px, 5vw, 56px)',
              background: 'var(--ink)',
              color: 'var(--paper)',
              border: '1px solid var(--ink)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'var(--blue)' }} />
            <div style={{ display: 'flex', gap: 48, alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 260 }}>
                <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 12 }}>
                  SYNERGY
                </h2>
                <p style={{ color: 'rgba(244,241,232,0.66)', fontSize: 16, lineHeight: 1.8, marginBottom: 28, maxWidth: 480 }}>
                  ABIT&apos;s annual flagship technology festival two phases across the academic year.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 28 }} className="syn-grid">
                  {phases.map((p) => (
                    <div key={p.id} style={{ border: '1px solid rgba(244,241,232,0.2)', padding: '16px 18px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-utility)', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: p.status === 'unlocked' ? 'var(--accent)' : 'rgba(244,241,232,0.5)', marginBottom: 8 }}>
                        {p.status === 'unlocked' ? <Unlock size={12} /> : <Lock size={12} />}
                        {p.status === 'unlocked' ? 'Phase 1 · Unlocked' : 'Phase 2 · Locked'}
                      </div>
                      <div style={{ fontSize: 13, color: 'rgba(244,241,232,0.75)', lineHeight: 1.6 }}>{p.range}</div>
                    </div>
                  ))}
                </div>
                <Link href="/synergy" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 10, background: 'var(--paper)', color: 'var(--ink)', fontWeight: 800, fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '15px 28px' }}>
                  Enter Synergy <ArrowRight size={15} />
                </Link>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, minWidth: 240 }}>
                {['Hackathons', 'Workshops', 'Contests', 'Panel Talks', 'Project Expo', 'Community'].map((ev) => (
                  <div
                    key={ev}
                    style={{
                      padding: '12px 16px',
                      border: '1px solid rgba(244,241,232,0.2)',
                      color: 'rgba(244,241,232,0.6)',
                      fontFamily: 'var(--font-utility)',
                      fontSize: 12,
                      letterSpacing: '0.04em',
                    }}
                  >
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
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {/* Filter tabs */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 40, flexWrap: 'wrap', alignItems: 'center' }}>
            <Filter size={16} aria-hidden="true" style={{ color: 'var(--muted)' }} />
            {(['all', 'upcoming'] as FilterType[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: '8px 20px',
                  border: '1px solid',
                  borderColor: filter === f ? 'var(--text)' : 'var(--border)',
                  borderRadius: 0,
                  background: filter === f ? 'var(--text)' : 'transparent',
                  color: filter === f ? 'var(--paper)' : 'var(--muted)',
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textTransform: 'capitalize',
                  fontFamily: 'var(--font-utility)',
                  letterSpacing: '0.04em',
                }}
              >
                {f} ({(f === 'all' ? events : upcomingEvents).length})
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
              style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}
              className="events-page-grid"
            >
              {filtered.map((ev, i) => (
                <EventCard key={ev.slug} event={ev} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── Gaming ── */}
      <section style={{ padding: '0 24px 100px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="mono-meta" style={{ color: 'var(--muted)', marginBottom: 12 }}>
              <span aria-hidden="true" style={{ display: 'inline-block', width: 8, height: 8, background: 'var(--accent)', marginRight: 10, verticalAlign: 1 }} />
              Gaming
            </p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, letterSpacing: '-0.03em', textTransform: 'uppercase', margin: '0 0 12px' }}>
              Gaming Arena<span style={{ color: 'var(--accent)' }}>.</span>
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: 15, lineHeight: 1.7, maxWidth: 560, margin: '0 0 32px' }}>
              Esports and turf battles under SYNERGY Phase 1 squads, crowds and high-energy finals.
            </p>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }} className="events-page-grid">
            {gamingEvents.map((ev, i) => (
              <EventCard key={ev.slug} event={ev} index={i} />
            ))}
          </div>
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
