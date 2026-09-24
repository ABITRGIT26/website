'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowDown,
  ArrowRight,
  Code2,
  Hammer,
  Trophy,
  Users,
  CalendarDays,
  MapPin,
  Lock,
  Unlock,
} from 'lucide-react';
import StatsCounter from './components/StatsCounter';
import EventCard from './components/EventCard';
import TeamCard from './components/TeamCard';
import { upcomingEvents } from './data/events';
import { core2627 } from './data/team';
import { phases } from './data/synergy';

/* ── Shared editorial primitives ───────────────────────────── */

function SectionHead({
  no,
  label,
  hint,
  dark = false,
  id,
}: {
  no: string;
  label: string;
  hint?: string;
  dark?: boolean;
  id?: string;
}) {
  return (
    <div id={id} style={{ marginBottom: 40 }}>
      <p
        className="mono-meta"
        style={{ color: dark ? 'rgba(244,241,232,0.6)' : 'var(--muted)', marginBottom: 14 }}
      >
        <span aria-hidden="true" style={{ display: 'inline-block', width: 8, height: 8, background: 'var(--accent)', marginRight: 10, verticalAlign: 1 }} />
        {no} / {label}
      </p>
      <div
        aria-hidden="true"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 0,
          borderTop: `1px solid ${dark ? 'rgba(244,241,232,0.2)' : 'var(--border)'}`,
          position: 'relative',
        }}
      >
        <span style={{ position: 'absolute', left: 0, top: -1, width: 96, height: 2, background: 'var(--blue)' }} />
      </div>
      {hint ? (
        <p style={{ marginTop: 16, fontSize: 14, color: dark ? 'rgba(244,241,232,0.6)' : 'var(--muted)', maxWidth: 640, lineHeight: 1.7 }}>{hint}</p>
      ) : null}
    </div>
  );
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-64px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

const stats = [
  { value: 10, suffix: '+', label: 'Years Active', icon: '10' },
  { value: 500, suffix: '+', label: 'Members', icon: '500' },
  { value: 50, suffix: '+', label: 'Events Run', icon: '50' },
  { value: 20, suffix: '+', label: 'Industry Partners', icon: '20' },
];

const pillars = [
  { icon: Code2, t: 'Learn', b: 'Workshops and bootcamps on web, AI/ML, cloud and more taught hands-on, in RGIT labs.' },
  { icon: Hammer, t: 'Build', b: 'Hack nights, project groups and mentorship that turn coursework into working software.' },
  // CODEASTRA hidden for main ABIT launch — original: 'Flagships like SYNERGY, Sharkathon and Codeastra stages with real stakes and juries.'
  { icon: Trophy, t: 'Compete', b: 'Flagships like SYNERGY and Sharkathon stages with real stakes and juries.' },
  { icon: Users, t: 'Belong', b: 'A department-wide community of builders, designers, organizers and storytellers.' },
];

export default function HomeClient() {
  const phase1 = phases.find((p) => p.status === 'unlocked');
  const phase2 = phases.find((p) => p.status === 'locked');

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--text)', minHeight: '100vh' }}>
      {/* ── Hero: GO BEYOND night ridge ── */}
      <section style={{ position: 'relative', overflow: 'hidden', minHeight: '100svh', display: 'flex', flexDirection: 'column', background: '#020409', color: '#F4F1E8', padding: '96px 24px 0' }}>
        {/* animated backdrop: video on desktop, static portrait on mobile */}
        <video
          aria-hidden="true"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/hero-wide.png"
          className="hero-video"
          ref={(v) => { if (v && window.matchMedia('(prefers-reduced-motion: reduce)').matches) v.pause(); }}
          style={{
            position: 'absolute', inset: 0, zIndex: 0, width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center 46%',
          }}
        >
          <source src="/hero-anim.mp4" type="video/mp4" />
        </video>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero-mobile.png"
          alt=""
          aria-hidden="true"
          className="hero-photo-mobile"
          style={{
            position: 'absolute', inset: 0, zIndex: 0, width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center',
          }}
        />
        {/* whisper-light veils only: sky glow and silhouette stay luminous */}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(to bottom, rgba(2,4,9,0.16) 0%, rgba(2,4,9,0.03) 30%, transparent 50%), radial-gradient(ellipse 60% 40% at 50% 46%, rgba(2,4,9,0.08), transparent 70%)' }} />
        {/* ground the scene into the page below */}
        <div aria-hidden="true" style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 90, zIndex: 1, background: 'linear-gradient(to bottom, transparent, rgba(2,4,9,0.85))' }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', position: 'relative', zIndex: 2, paddingBottom: 40, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', gap: 0 }}>
          <div>
          {/* Eyebrow: live marker + figure label */}
          {/* Headline: GO BEYOND, glowing over the ridge */}
          {/* Headline lives in the backdrop image; keep a screen-reader heading only */}
          <h1 className="night-title" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)', whiteSpace: 'nowrap', margin: 0 }}>
            Go Beyond
          </h1>
          </div>

          {/* 3 CTAs · one control group, settled below the figure on the dark ridge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="hero-ctas"
            style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', position: 'relative', zIndex: 3, marginTop: 'auto', marginBottom: 'clamp(12px, 2vh, 20px)' }}
          >
            {/* CODEASTRA hidden for main ABIT launch
            <motion.span
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: 'inline-flex' }}
            >
              <Link href="/codeastra" className="btn-editorial btn-on-dark hero-cta hero-cta-primary">
                Codeastra · Register <span className="arr" aria-hidden="true" style={{ display: 'inline-flex' }}><ArrowRight size={14} /></span>
              </Link>
            </motion.span>
            */}
            <motion.span
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: 'inline-flex' }}
            >
              <Link href="/events" className="btn-ghost btn-ghost-on-dark hero-cta hero-cta-ghost">
                Explore Events <span className="arr" aria-hidden="true" style={{ display: 'inline-flex' }}><ArrowRight size={14} /></span>
              </Link>
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: 'inline-flex' }}
            >
              <Link href="/join" className="btn-ghost btn-ghost-on-dark hero-cta hero-cta-ghost">
                Join ABIT <span className="arr" aria-hidden="true" style={{ display: 'inline-flex' }}><ArrowRight size={14} /></span>
              </Link>
            </motion.span>
          </motion.div>

          {/* Meta strip pinned to the bottom of the viewport hero */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.62 }}
            className="hero-meta"
            style={{
              display: 'flex', gap: 28, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between',
              marginTop: 0, paddingTop: 12, paddingBottom: 6,
              borderTop: '1px solid rgba(196,208,232,0.18)', fontFamily: 'var(--font-utility)',
              fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(196,208,232,0.62)',
            }}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><CalendarDays size={12} /> Est. 2016 RGIT Mumbai</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><MapPin size={12} /> Versova, Andheri West, Mumbai</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              Scroll
              <motion.span animate={{ y: [0, 5, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }} style={{ display: 'inline-flex' }}>
                <ArrowDown size={12} />
              </motion.span>
            </span>
          </motion.div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section style={{ padding: '72px 24px 90px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <StatsCounter stats={stats} />
        </div>
      </section>

      {/* ── Flagship: SYNERGY ── */}
      <section style={{ padding: '0 24px 100px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Reveal>
            <div style={{ background: 'var(--ink)', color: 'var(--paper)', border: '1px solid var(--ink)', position: 'relative', overflow: 'hidden', padding: 'clamp(32px, 5vw, 56px)' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'var(--blue)' }} />
              <h2 style={{ fontSize: 'clamp(30px, 5vw, 56px)', fontWeight: 900, letterSpacing: '-0.03em', textTransform: 'uppercase', margin: '0 0 12px' }}>
                Synergy
              </h2>
              <p style={{ color: 'rgba(244,241,232,0.66)', fontSize: 16, lineHeight: 1.8, maxWidth: 560, margin: '0 0 32px' }}>
                ABIT&apos;s annual flagship technology festival two phases across the academic year.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 36 }} className="syn-grid">
                <div style={{ border: '1px solid rgba(244,241,232,0.2)', padding: 24 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--accent)', fontFamily: 'var(--font-utility)', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>
                    <Unlock size={13} /> Phase 1 · Unlocked
                  </div>
                  <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 6 }}>{phase1?.title}</div>
                  <div style={{ color: 'rgba(244,241,232,0.6)', fontSize: 13 }}>{phase1?.range}</div>
                </div>
                <div style={{ border: '1px solid rgba(244,241,232,0.2)', padding: 24 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(244,241,232,0.5)', fontFamily: 'var(--font-utility)', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>
                    <Lock size={13} /> Phase 2 · Locked
                  </div>
                  <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 6, color: 'rgba(244,241,232,0.5)' }}>Under wraps</div>
                  <div style={{ color: 'rgba(244,241,232,0.6)', fontSize: 13 }}>{phase2?.range}</div>
                </div>
              </div>
              <Link href="/synergy" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 10, background: 'var(--paper)', color: 'var(--ink)', fontWeight: 800, fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '15px 28px' }}>
                Enter Synergy <ArrowRight size={15} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Pillars ── */}
      <section style={{ padding: '0 24px 100px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Reveal>
            <SectionHead no="01" label="What we do" hint="Four tracks, one community everything ABIT runs ladders up to real skills." />
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }} className="pillars-grid">
            {pillars.map(({ icon: Icon, t, b }, i) => (
              <Reveal key={t} delay={i * 0.07}>
                <div style={{ border: '1px solid var(--border)', padding: 28, height: '100%', boxSizing: 'border-box', background: 'var(--bg)' }}>
                  <Icon size={24} color="var(--accent)" style={{ marginBottom: 16 }} />
                  <h3 style={{ fontSize: 17, fontWeight: 800, textTransform: 'uppercase', margin: '0 0 10px' }}>{t}</h3>
                  <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: 'var(--muted)' }}>{b}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Upcoming events ── */}
      <section style={{ padding: '0 24px 100px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Reveal>
            <SectionHead no="02" label="Upcoming" hint="Flagships on the horizon. Everything else lives on the events page." />
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }} className="events-page-grid">
            {upcomingEvents.slice(0, 3).map((ev, i) => (
              <EventCard key={ev.slug} event={ev} index={i} />
            ))}
          </div>
          <Reveal>
            <div style={{ marginTop: 32 }}>
              <Link href="/events" className="btn-editorial">
                All Events <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Core preview ── */}
      <section style={{ padding: '0 24px 100px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Reveal>
            <SectionHead no="03" label="The core" hint="The 2026–27 committee running the show." />
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }} className="core-grid">
            {core2627.slice(0, 4).map((m, i) => (
              <TeamCard key={m.name} member={m} index={i} />
            ))}
          </div>
          <Reveal>
            <div style={{ marginTop: 32 }}>
              <Link href="/team" className="btn-editorial">
                Meet the Team <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Sponsors strip ── */}
      <section style={{ borderTop: '1px solid var(--border)', background: 'var(--surface)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
          <div>
            <p className="mono-meta" style={{ marginBottom: 12 }}>Partners</p>
            <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 38px)', fontWeight: 900, letterSpacing: '-0.02em', textTransform: 'uppercase', margin: 0 }}>
              Backed by industry<span style={{ color: 'var(--accent)' }}>.</span>
            </h2>
          </div>
          <Link href="/sponsors" className="btn-editorial">
            Become a Sponsor <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <style jsx global>{`
        /* hero CTAs: one coherent control group, identical height */
        .btn-editorial.hero-cta, .btn-ghost.hero-cta { padding: 13px 22px !important; font-size: 13px !important; }
        .hero-cta { transition: transform 220ms ease, box-shadow 220ms ease, background 220ms ease, border-color 220ms ease; }
        .hero-cta .arr { transition: transform 220ms ease; }
        .hero-cta:hover .arr { transform: translateX(4px); }
        .hero-cta-primary { box-shadow: 0 10px 30px rgba(110, 150, 255, 0.3); }
        .hero-cta-primary:hover { transform: translateY(-2px); background: #fff; box-shadow: 0 14px 38px rgba(130, 165, 255, 0.42); }
        .hero-cta-ghost {
          background: rgba(35, 60, 130, 0.3);
          border-color: rgba(210, 222, 248, 0.35);
          -webkit-backdrop-filter: blur(14px);
          backdrop-filter: blur(14px);
          box-shadow: 0 8px 26px rgba(0, 0, 0, 0.3);
        }
        .hero-cta-ghost:hover {
          transform: translateY(-2px);
          border-color: rgba(230, 238, 255, 0.75);
          background: rgba(35, 60, 130, 0.45);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.45);
        }
        .hero-video { display: block; }
        .hero-photo-mobile { display: none; }
        @media (max-width: 640px) {
          .hero-video { display: none; }
          .hero-photo-mobile { display: block; }
          .hero-ctas { flex-direction: column; align-items: stretch; gap: 10px; max-width: 300px; margin-left: auto; margin-right: auto; }
          .btn-editorial.hero-cta, .btn-ghost.hero-cta { padding: 12px 18px !important; font-size: 12px !important; }
          .hero-ctas > span { display: flex !important; }
          .hero-ctas .hero-cta { width: 100%; justify-content: center; }
          .hero-meta { flex-direction: column; gap: 10; align-items: center; text-align: center; }
        }
        @media (max-width: 900px) {
          .pillars-grid { grid-template-columns: 1fr 1fr !important; }
          .core-grid { grid-template-columns: 1fr 1fr !important; }
          .syn-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 560px) {
          .pillars-grid { grid-template-columns: 1fr !important; }
          .core-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
