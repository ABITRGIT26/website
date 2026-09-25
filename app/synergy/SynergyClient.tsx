'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Lock, Unlock, CalendarDays, MapPin, FileText } from 'lucide-react';
import StatsCounter from '../components/StatsCounter';
import { synergyMeta, phases } from '../data/synergy';

export default function SynergyClient() {

  const phase1 = phases.find((p) => p.status === 'unlocked');
  const phase2 = phases.find((p) => p.status === 'locked');

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--text)', minHeight: '100vh' }}>
      {/* ═══ Hero · animated poster ═══ */}
      <section aria-labelledby="synergy-title" className="synergy-hero" style={{ position: 'relative', overflow: 'hidden', background: '#000', color: '#F2EBD9', minHeight: '100svh', display: 'flex', flexDirection: 'column' }}>
        {/* animated poster backdrop (desktop) · hidden on mobile, replaced by a fluid HTML wordmark */}
        <video
          aria-hidden="true"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="synergy-hero-video"
          ref={(v) => { if (v && window.matchMedia('(prefers-reduced-motion: reduce)').matches) v.pause(); }}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        >
          <source src="/synergy-anim.mp4" type="video/mp4" />
        </video>
        {/* light veils: legibility top + grounding bottom */}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, transparent 28%, transparent 62%, rgba(0,0,0,0.88) 100%)' }} />
        <h1 id="synergy-title" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)', whiteSpace: 'nowrap', margin: 0 }}>
          Synergy Phase 1
        </h1>

        {/* ── poster copy, settled low over the dark field ── */}
        <div className="synergy-hero-inner" style={{ position: 'relative', zIndex: 2, maxWidth: 1280, margin: '0 auto', padding: '10px 0 0', width: '100%', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          {/* ── copy + actions ── */}
          <div className="synergy-hero-copy" style={{ position: 'relative', zIndex: 3, textAlign: 'center', padding: '6px 24px 0', maxWidth: 720, margin: '0 auto' }}>
            {/* mobile-only wordmark · the poster title is baked into the video and crops on narrow screens */}
            <div aria-hidden="true" className="synergy-hero-wordmark">
              <p className="synergy-hero-eyebrow">ABIT flagship · Phase 1</p>
              <p className="synergy-hero-title">Synergy</p>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.45 }}
              className="synergy-hero-desc"
              style={{ color: 'rgba(242,235,217,0.72)', fontSize: 'clamp(15px, 1.8vw, 18px)', lineHeight: 1.8, margin: '0 auto 26px' }}
            >
              {synergyMeta.description}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.55 }}
              className="synergy-hero-actions"
              style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 30 }}
            >
              <a
                href="/Synergybrochure2026.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-editorial btn-on-dark"
                style={{ textDecoration: 'none' }}
              >
                <FileText size={15} /> Brochure
              </a>
              <Link href="/contact" className="btn-ghost btn-ghost-on-dark">
                Get Involved <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </motion.div>
            <div className="synergy-hero-meta" style={{ display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap', fontFamily: 'var(--font-utility)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(242,235,217,0.6)', paddingBottom: 'max(56px, env(safe-area-inset-bottom))' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><CalendarDays size={13} /> Sept 2026 – May 2027</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><MapPin size={13} /> {synergyMeta.venue}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section style={{ padding: '0 24px 90px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <StatsCounter stats={synergyMeta.stats} />
        </div>
      </section>

      {/* ── Phase 1: unlocked ── */}
      {phase1 && (
        <section style={{ padding: '0 24px 90px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <p className="mono-meta" style={{ marginBottom: 14 }}>
              <span aria-hidden="true" style={{ display: 'inline-block', width: 8, height: 8, background: 'var(--accent)', marginRight: 10, verticalAlign: 1 }} />
              Phase {phase1.no}
            </p>
            <div style={{ border: '1px solid var(--border)', padding: 'clamp(28px, 4vw, 48px)', position: 'relative', background: 'var(--bg)' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'var(--blue)' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 20, flexWrap: 'wrap', marginBottom: 12 }}>
                <h2 style={{ fontSize: 'clamp(26px, 4vw, 44px)', fontWeight: 900, letterSpacing: '-0.02em', textTransform: 'uppercase', margin: 0 }}>
                  {phase1.title}
                </h2>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--accent)', color: '#F4F1E8', fontFamily: 'var(--font-utility)', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '9px 18px' }}>
                  <Unlock size={13} /> Unlocked
                </span>
              </div>
              <p style={{ fontFamily: 'var(--font-utility)', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', margin: '0 0 12px', fontWeight: 700 }}>
                {phase1.range} · {synergyMeta.venue}
              </p>
              <p style={{ color: 'var(--muted)', fontSize: 15, lineHeight: 1.75, maxWidth: 680, margin: '0 0 36px' }}>
                {phase1.note}
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }} className="phase-grid">
                {phase1.events.map((ev) => (
                  <div key={ev.title} style={{ border: '1px solid var(--border)', padding: 24, background: 'var(--bg)' }}>
                    <h3 style={{ fontSize: 17, fontWeight: 800, textTransform: 'uppercase', margin: '0 0 8px', letterSpacing: '-0.01em' }}>{ev.title}</h3>
                    <p style={{ fontFamily: 'var(--font-utility)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)', margin: '0 0 10px', fontWeight: 700 }}>
                      {ev.date} · {ev.venue}
                    </p>
                    <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: 'var(--muted)' }}>{ev.blurb}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Phase 2: locked ── */}
      {phase2 && (
        <section style={{ padding: '0 24px 100px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <p className="mono-meta" style={{ marginBottom: 14 }}>
              <span aria-hidden="true" style={{ display: 'inline-block', width: 8, height: 8, background: 'var(--muted)', marginRight: 10, verticalAlign: 1 }} />
              Phase {phase2.no}
            </p>
            <div style={{ background: 'var(--ink)', color: 'var(--paper)', border: '1px solid var(--ink)', padding: 'clamp(40px, 6vw, 72px) clamp(28px, 5vw, 56px)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
              <div style={{ width: 64, height: 64, border: '1px solid rgba(244,241,232,0.3)', borderRadius: 999, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
                <Lock size={24} color="rgba(244,241,232,0.8)" />
              </div>
              <h2 style={{ fontSize: 'clamp(26px, 4vw, 44px)', fontWeight: 900, letterSpacing: '-0.02em', textTransform: 'uppercase', margin: '0 0 12px' }}>
                Phase 2 · Locked
              </h2>
              <p style={{ fontFamily: 'var(--font-utility)', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', margin: '0 0 16px', fontWeight: 700 }}>
                {phase2.range}
              </p>
              <p style={{ color: 'rgba(244,241,232,0.6)', fontSize: 15, lineHeight: 1.75, maxWidth: 520, margin: '0 auto 32px' }}>
                {phase2.note}
              </p>
              <div aria-hidden="true" style={{ display: 'grid', gap: 10, maxWidth: 560, margin: '0 auto 36px', filter: 'blur(3px)', opacity: 0.5, userSelect: 'none' }}>
                {[92, 100, 84].map((w, i) => (
                  <div key={i} style={{ height: 44, border: '1px solid rgba(244,241,232,0.25)', width: `${w}%`, margin: '0 auto' }} />
                ))}
              </div>
              <p style={{ fontFamily: 'var(--font-utility)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(244,241,232,0.55)', margin: '0 0 24px' }}>
                Reveals January 2027
              </p>
              <Link
                href="/contact"
                style={{
                  textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 10,
                  background: 'var(--paper)', color: 'var(--ink)', fontWeight: 800, fontSize: 13,
                  letterSpacing: '0.08em', textTransform: 'uppercase', padding: '15px 28px',
                }}
              >
                Notify Me <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </section>
      )}

      <style jsx global>{`
        @media (max-width: 900px) { .phase-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 600px) { .phase-grid { grid-template-columns: 1fr !important; } }
        .synergy-hero-wordmark { display: none; }
        .synergy-hero-eyebrow {
          font-family: var(--font-utility); font-size: 11px; letter-spacing: 0.22em;
          text-transform: uppercase; color: rgba(242,235,217,0.6); margin: 0 0 10px;
        }
        .synergy-hero-title {
          font-family: var(--font-editorial); font-style: italic; font-weight: 400;
          font-size: clamp(52px, 17.5vw, 120px); line-height: 1; margin: 0 0 18px;
          color: #F2EBD9; white-space: nowrap;
        }
        @media (max-width: 640px) {
          .synergy-hero {
            background: radial-gradient(ellipse 90% 45% at 50% 28%, rgba(64, 96, 190, 0.28), transparent 70%), #000 !important;
          }
          .synergy-hero-video { display: none; }
          .synergy-hero-wordmark { display: block; }
          .synergy-hero-inner { justify-content: center !important; padding-top: 110px !important; }
          .synergy-hero-copy { padding-left: 20px !important; padding-right: 20px !important; }
          .synergy-hero-desc { font-size: 15px !important; line-height: 1.7 !important; margin-bottom: 22px !important; }
          .synergy-hero-actions { flex-direction: column !important; align-items: stretch !important; gap: 10px !important; max-width: 300px; margin: 0 auto 24px !important; }
          .synergy-hero-actions > * { width: 100%; justify-content: center; min-height: 48px; }
          .synergy-hero-meta { flex-direction: column !important; gap: 10px !important; align-items: center !important; text-align: center; padding-bottom: max(40px, env(safe-area-inset-bottom)) !important; }
        }
      `}</style>
    </div>
  );
}
