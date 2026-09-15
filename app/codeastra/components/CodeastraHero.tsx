'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { BackgroundPixelStars } from '@/components/ui/background-pixel-stars';

const ease = [0.22, 1, 0.36, 1] as const;

export default function CodeastraHero({ ready }: { ready: boolean }) {
  const anim = (delay: number) => ({
    initial: { opacity: 0, y: 34, filter: 'blur(6px)' },
    animate: ready ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {},
    transition: { duration: 0.9, delay, ease },
  });

  return (
    <section
      id="top"
      style={{
        position: 'relative',
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        overflow: 'hidden',
        background: 'var(--cb-bg)',
        color: 'var(--cb-text)',
      }}
    >
      {/* ── backdrop: stars + beam + rings ── */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <BackgroundPixelStars className="absolute inset-0 h-full w-full" />
        {/* centre beam */}
        <div
          style={{
            position: 'absolute', top: 0, bottom: '18%', left: '50%', width: 2,
            transform: 'translateX(-50%)',
            background: 'linear-gradient(to bottom, var(--cb-text-muted), var(--cb-text-dim) 60%, transparent)',
            opacity: 0.22,
          }}
        />
        {/* orbital rings — kept high and compact so they never touch the metadata */}
        <svg viewBox="0 0 400 400" style={{ position: 'absolute', top: '-150px', right: '-70px', width: 300, height: 300, opacity: 0.22 }}>
          <circle cx="200" cy="200" r="150" fill="none" stroke="var(--cb-border-strong)" strokeWidth="1" />
          <circle cx="200" cy="200" r="118" fill="none" stroke="var(--cb-border)" strokeWidth="1" strokeDasharray="2 7" />
          <circle cx="200" cy="200" r="86" fill="none" stroke="var(--cb-border-strong)" strokeWidth="1" />
          <circle cx="318" cy="200" r="4" fill="var(--cb-accent)" />
        </svg>
      </div>

      {/* ── GO BEYOND motif — sunk low so the headline owns the upper field ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', zIndex: 1, top: '62%', left: 0, right: 0,
          overflow: 'hidden', pointerEvents: 'none', userSelect: 'none', opacity: 0.7,
        }}
      >
        <p
          className="codeastra-motif"
          style={{
            margin: 0, width: 'max-content', whiteSpace: 'nowrap',
            fontWeight: 900, textTransform: 'uppercase', lineHeight: 1,
            fontSize: 'clamp(4rem, 9vw, 10rem)', letterSpacing: '-0.02em',
            color: 'transparent', WebkitTextStroke: '1px var(--cb-border)',
          }}
        >
          Go beyond  Go beyond  Go beyond  Go beyond &nbsp;
        </p>
      </div>
      {/* ── secondary anchor: outlined 24H ── */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ duration: 1.4, delay: 0.5, ease }}
        style={{
          position: 'absolute', zIndex: 1, right: '-2.5vw', top: '28%',
          fontWeight: 900, textTransform: 'uppercase', lineHeight: 0.8,
          fontSize: 'clamp(7rem, 17vw, 19rem)', letterSpacing: '-0.03em',
          color: 'transparent', WebkitTextStroke: '1.5px var(--cb-border-strong)',
          userSelect: 'none', pointerEvents: 'none', whiteSpace: 'nowrap', opacity: 0.9,
        }}
      >
        24H
      </motion.div>
      {/* vertical edge label */}
      <motion.p
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.8 }}
        className="codeastra-hero-edge"
        style={{
          position: 'absolute', zIndex: 2, right: 14, top: '50%', transform: 'translateY(-50%)',
          writingMode: 'vertical-rl', fontFamily: 'var(--font-utility)', fontSize: 9,
          letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--cb-text-dim)', margin: 0,
        }}
      >
        24-hour offline hackathon  Synergy 2027
      </motion.p>

      <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: 1400, margin: '0 auto', padding: '118px 24px 0' }}>
        {/* ── meta row ── */}
        <motion.div
          {...anim(0.05)}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap', marginBottom: 16 }}
        >
          <p style={{ fontFamily: 'var(--font-utility)', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--cb-text-muted)', margin: 0, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span aria-hidden="true" style={{ display: 'inline-block', width: 44, height: 1, background: 'var(--cb-accent)' }} />
            Synergy 2027 · 24-hour offline hackathon
          </p>
        </motion.div>

        {/* ── LEVEL 1: brand anchor ── */}
        <motion.p
          {...anim(0.12)}
          style={{
            margin: 0, fontWeight: 900, textTransform: 'uppercase',
            letterSpacing: '-0.02em', fontSize: 'clamp(1.9rem, 4.6vw, 4rem)', lineHeight: 1,
            display: 'flex', alignItems: 'center', gap: 12,
          }}
        >
          Codeastra 2.0
          <span aria-hidden="true" style={{ width: 10, height: 10, background: 'var(--cb-accent)', display: 'inline-block', flexShrink: 0 }} />
        </motion.p>
      </div>

      {/* ── LEVEL 2: BEYOND — unobstructed, dominant ── */}
      <motion.div
        initial={{ opacity: 0, filter: 'blur(10px)' }}
        animate={ready ? { opacity: 1, filter: 'blur(0px)' } : {}}
        transition={{ duration: 1.1, delay: 0.2, ease }}
        style={{ position: 'relative', zIndex: 2, marginTop: 'clamp(4px, 1vh, 14px)' }}
      >
        <div className="beyond-drift">
          <h1
            aria-label="Beyond"
            style={{
              margin: 0, marginLeft: '-1.5vw', width: 'max-content', maxWidth: 'none',
              fontWeight: 900, textTransform: 'uppercase', lineHeight: 0.8,
              letterSpacing: '-0.035em', fontSize: 'clamp(5.5rem, 19vw, 21rem)',
              color: 'var(--cb-text)', whiteSpace: 'nowrap', userSelect: 'none',
            }}
          >
            Beyond
          </h1>
        </div>
      </motion.div>

      <div style={{ position: 'relative', zIndex: 3, width: '100%', maxWidth: 1400, margin: '0 auto', padding: '0 24px' }}>
        <div className="codeastra-hero-lower" style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '0 24px', alignItems: 'start', borderTop: '1px solid var(--cb-border-strong)', paddingTop: 28 }}>
          <motion.div
            initial={{ opacity: 0, x: 48, filter: 'blur(6px)' }}
            animate={ready ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.9, delay: 0.45, ease }}
            className="codeastra-hero-ground"
            style={{ gridColumn: '2 / span 6', marginTop: 'clamp(-72px, -5vw, -24px)' }}
          >
            <p
              style={{
                margin: 0, display: 'inline-block', background: 'var(--cb-bg)',
                padding: '0.12em 0.3em 0.12em 0.22em',
                fontWeight: 900, textTransform: 'uppercase', lineHeight: 0.95,
                letterSpacing: '-0.02em', fontSize: 'clamp(2.6rem, 6.4vw, 6rem)',
                borderLeft: '2px solid var(--cb-accent)',
              }}
            >
              The code<span style={{ color: 'var(--cb-accent)' }}>.</span>
            </p>
          </motion.div>

          <motion.div {...anim(0.55)} className="codeastra-hero-rail" style={{ gridColumn: '8 / span 5', borderLeft: '1px solid var(--cb-border-strong)', paddingLeft: 32, paddingTop: 14, marginTop: 'clamp(-44px, -2.8vw, -10px)', maxWidth: 440 }}>
            <p style={{ margin: '2px 0 0', fontSize: 'clamp(0.98rem, 1.6vw, 1.15rem)', lineHeight: 1.7, color: 'var(--cb-text-muted)', maxWidth: 380 }}>
              Build real solutions. Adapt when the challenge changes.
              Collaborate beyond your domain and prove it with a live demo.
            </p>
            <div style={{ marginTop: 28 }}>
              <Link
                href="/codeastra/register"
                style={{
                  textDecoration: 'none', background: 'var(--cb-accent)', color: 'var(--cb-accent-text)',
                  fontWeight: 800, fontSize: 14, letterSpacing: '0.08em', textTransform: 'uppercase',
                  padding: '17px 30px', display: 'inline-flex', alignItems: 'center', gap: 10,
                }}
              >
                Go Beyond <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.dl
          {...anim(0.65)}
          className="codeastra-hero-meta"
          style={{
            margin: '48px 0 0', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
            borderTop: '1px solid var(--cb-border-strong)',
          }}
        >
          {[
            ['Date', '1st week of October 2027'],
            ['Venue', 'RGIT, Andheri West, Mumbai'],
            ['Format', '24 hours · Offline · 8 phases'],
            ['Prize pool', '₹2,00,000 total'],
          ].map(([k, v], i) => (
            <div
              key={k}
              style={{
                padding: '18px 18px 18px 0',
                borderLeft: i === 0 ? 'none' : '1px solid var(--cb-border)',
                paddingLeft: i === 0 ? 0 : 18,
              }}
            >
              <dt style={{ fontFamily: 'var(--font-utility)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--cb-accent)', marginBottom: 6 }}>{k}</dt>
              <dd style={{ margin: 0, fontWeight: 700, fontSize: 14 }}>{v}</dd>
            </div>
          ))}
        </motion.dl>

        <motion.div
          {...anim(0.75)}
          style={{
            borderTop: '1px solid var(--cb-border-strong)',
            display: 'flex', alignItems: 'center',
            fontFamily: 'var(--font-utility)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase',
            padding: '13px 0 28px', overflow: 'hidden',
          }}
          className="codeastra-hero-progress"
        >
          <span style={{ color: 'var(--cb-text-dim)' }}>Code</span>
          <span aria-hidden="true" style={{ flex: 1, height: 1, background: 'var(--cb-border)', margin: '0 14px', minWidth: 24 }} />
          <span style={{ color: 'var(--cb-accent)', fontWeight: 700 }}>Beyond</span>
          <span aria-hidden="true" style={{ flex: 1, height: 1, background: 'var(--cb-border)', margin: '0 14px', minWidth: 24 }} />
          <span style={{ color: 'var(--cb-text-muted)' }}>Real-world solutions</span>
          <span className="codeastra-hero-scroll" aria-hidden="true" style={{ marginLeft: 28, color: 'var(--cb-text-dim)', letterSpacing: '0.2em' }}>Scroll ↓</span>
        </motion.div>
      </div>

      <style jsx global>{`
        @keyframes beyond-drift {
          from { transform: translateX(0); }
          to { transform: translateX(-1.6%); }
        }
        .beyond-drift { animation: beyond-drift 26s ease-in-out infinite alternate; will-change: transform; }
        @keyframes motif-drift {
          from { transform: translateX(0); }
          to { transform: translateX(-25%); }
        }
        .codeastra-motif { animation: motif-drift 55s linear infinite; will-change: transform; }
        @media (max-width: 1024px) {
          .codeastra-hero-meta { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 900px) {
          .codeastra-hero-ground { grid-column: 1 / span 12 !important; margin-top: -14px !important; }
          .codeastra-hero-rail { grid-column: 1 / span 12 !important; margin-top: 26px !important; border-left: none !important; padding-left: 0 !important; }
          .codeastra-hero-edge { display: none !important; }
        }
        @media (max-width: 560px) {
          .codeastra-hero-meta { grid-template-columns: 1fr !important; }
          .codeastra-hero-scroll { display: none !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .beyond-drift, .codeastra-motif { animation: none; }
        }
      `}</style>
    </section>
  );
}
