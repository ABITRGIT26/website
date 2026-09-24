'use client';

import Link from 'next/link';
import { ArrowRight, Trophy, Timer, MapPin } from 'lucide-react';
import { useTheme } from './ThemeProvider';

const ASSURANCES = [
  { icon: Trophy, label: '₹1,15,000 prize pool' },
  { icon: Timer, label: '24 hours · Offline' },
  { icon: MapPin, label: 'RGIT · Mumbai' },
];

const COLS = [
  { t: 'Hackathon', ls: [{ h: '#event', l: 'The event' }, { h: '#domains', l: 'Domains' }, { h: '#statements', l: 'Problem statements' }, { h: '#journey', l: 'Journey' }, { h: '#prizes', l: 'Prizes' }] },
  { t: 'ABIT', ls: [{ h: '/', l: 'Home' }, { h: '/events', l: 'All events' }, { h: '/team', l: 'Team' }, { h: '/contact', l: 'Contact' }] },
];

export default function CodeastraFooter() {
  const { theme, toggle } = useTheme();

  return (
    <footer style={{ borderTop: '1px solid var(--cb-border)' }}>
      {/* Assurance strip */}
      <div style={{ background: 'var(--cb-bg)', color: 'var(--cb-text)' }}>
        <div
          style={{
            maxWidth: 1400, margin: '0 auto', display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
          }}
          className="cb-foot-assure"
        >
          {ASSURANCES.map((a, i) => (
            <div
              key={a.label}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18,
                padding: '56px 24px',
                borderLeft: i === 0 ? 'none' : '1px solid var(--cb-border)',
              }}
            >
              <a.icon size={34} strokeWidth={1.5} color="var(--cb-accent)" />
              <p style={{ margin: 0, fontFamily: 'var(--font-utility)', fontSize: 13, letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 600, textAlign: 'center' }}>
                {a.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Solid blue block */}
      <div style={{ background: '#0047AB', color: '#F4F1E8' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '72px 24px 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: 48 }} className="cb-foot-grid">
            <div>
              <p style={{ fontFamily: 'var(--font-instrument, Georgia, serif)', fontSize: 'clamp(2.6rem, 5vw, 4.4rem)', lineHeight: 1.02, margin: '0 0 20px' }}>
                Go beyond<br />the code.
              </p>
              <p style={{ fontSize: 15, lineHeight: 1.7, maxWidth: 380, margin: '0 0 28px', color: 'rgba(244,241,232,0.78)' }}>
                There is always a line between an idea and reality. Codeastra invites you to cross it.
              </p>
              <Link
                href="/codeastra/register"
                style={{
                  textDecoration: 'none', background: '#F4F1E8', color: '#0047AB',
                  fontWeight: 800, fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase',
                  padding: '15px 28px', display: 'inline-flex', alignItems: 'center', gap: 10,
                }}
              >
                Go Beyond <ArrowRight size={15} />
              </Link>
            </div>

            {COLS.map((c) => (
              <nav key={c.t} aria-label={`Footer ${c.t}`}>
                <h3 style={{ fontFamily: 'var(--font-utility)', fontSize: 13, letterSpacing: '0.22em', textTransform: 'uppercase', margin: '0 0 26px', fontWeight: 700 }}>{c.t}</h3>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 20 }}>
                  {c.ls.map((l) => (
                    <li key={l.h + l.l}>
                      <Link
                        href={l.h}
                        className="cb-foot-blue-link"
                        style={{
                          color: 'rgba(244,241,232,0.82)', textDecoration: 'none',
                          fontFamily: 'var(--font-utility)', fontSize: 13, letterSpacing: '0.18em', textTransform: 'uppercase',
                        }}
                      >
                        {l.l}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          {/* Bottom row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, padding: '56px 0 28px', fontFamily: 'var(--font-utility)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(244,241,232,0.7)' }}>
            <span>© 2026 ABIT · Association of Budding Information Technocrats</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <Link href="/" className="cb-foot-blue-link" style={{ color: 'rgba(244,241,232,0.7)', textDecoration: 'none' }}>← Back to Synergy 2027</Link>
              <button
                type="button"
                onClick={toggle}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(244,241,232,0.5)',
                  borderRadius: 999,
                  color: '#F4F1E8',
                  fontFamily: 'var(--font-utility)',
                  fontSize: 10,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  padding: '8px 16px',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <span aria-hidden="true" style={{ fontSize: 13 }}>{theme === 'dark' ? '☀' : '☾'}</span>
                {theme === 'dark' ? 'Light' : 'Dark'}
              </button>
            </div>
          </div>
        </div>

        {/* Giant cropped wordmark */}
        <div aria-hidden="true" style={{ overflow: 'hidden' }}>
          <p style={{
            margin: 0, whiteSpace: 'nowrap', textAlign: 'center',
            fontWeight: 900, textTransform: 'uppercase', lineHeight: 0.78,
            letterSpacing: '-0.02em', fontSize: '19.5vw',
            color: '#0B0B0A', marginBottom: '-0.14em', userSelect: 'none',
          }}>
            Go Beyond
          </p>
        </div>
      </div>

      <style jsx global>{`
        .cb-foot-blue-link { transition: color 0.2s ease; }
        .cb-foot-blue-link:hover { color: #FFFFFF !important; }
        @media (max-width: 860px) {
          .cb-foot-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .cb-foot-assure { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
