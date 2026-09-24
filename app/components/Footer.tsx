'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const cols = [
  {
    title: 'Explore',
    links: [
      { href: '/about', label: 'About ABIT' },
      { href: '/events', label: 'All Events' },
      { href: '/synergy', label: 'Synergy' },
      { href: '/team', label: 'Team' },
    ],
  },
  {
    title: 'Organisation',
    links: [
      { href: '/sponsors', label: 'Sponsors' },
      { href: '/contact', label: 'Contact Us' },
      { href: '/join', label: 'Join ABIT' },
    ],
  },
  {
    title: 'Flagships',
    links: [
      // CODEASTRA hidden for main ABIT launch — { href: '/codeastra', label: 'Codeastra' },
      { href: '/sharkathon', label: 'Sharkathon' },
      { href: '/synergy', label: 'Synergy' },
    ],
  },
];

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith('/sharkathon')) return null;
  if (pathname?.startsWith('/codeastra')) return null;

  return (
    <footer
      style={{
        background: 'var(--ink)',
        color: 'var(--paper)',
        borderTop: '1px solid var(--ink)',
      }}
    >
      {/* cobalt thread */}
      <div aria-hidden="true" style={{ height: 2, background: 'var(--blue)' }} />
      <div className="container-editorial" style={{ paddingTop: 64, paddingBottom: 28 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 16,
            fontFamily: 'var(--font-utility)',
            fontSize: 11,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--paper-dim)',
            marginBottom: 40,
          }}
        >
          <span>ABIT · IT Department · RGIT Mumbai</span>
          <span>Workshops · Hackathons · Synergy</span>
          <span>RGIT · Andheri West · Mumbai</span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 1fr 1fr 1fr',
            gap: 40,
            marginBottom: 56,
          }}
          className="footer-grid"
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 18 }}>
              <span style={{ fontWeight: 900, fontSize: 26, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
                ABIT
              </span>
              <span aria-hidden="true" style={{ width: 9, height: 9, background: 'var(--accent)', display: 'inline-block' }} />
            </div>
            <p style={{ color: 'var(--paper-dim)', fontSize: 15, lineHeight: 1.7, maxWidth: 340, marginBottom: 20 }}>
              Association of Budding Information Technocrats the official IT department committee of RGIT Mumbai.
            </p>
            <p
              style={{
                fontFamily: 'var(--font-utility)',
                fontSize: 11,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--paper-dim)',
                lineHeight: 2,
              }}
            >
              Learn · Build · Compete
              <br />
              Est. 2016
              <br />
              RGIT, Andheri West, Mumbai
            </p>
          </div>

          {cols.map((c) => (
            <nav key={c.title} aria-label={c.title}>
              <h3
                style={{
                  fontFamily: 'var(--font-utility)',
                  fontSize: 11,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--paper-dim)',
                  marginBottom: 18,
                }}
              >
                {c.title}
              </h3>
              <ul style={{ listStyle: 'none', display: 'grid', gap: 10, padding: 0, margin: 0 }}>
                {c.links.map((l) => (
                  <li key={l.href + l.label}>
                    <Link
                      href={l.href}
                      style={{ color: 'var(--paper)', textDecoration: 'none', fontSize: 14 }}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div
          style={{
            borderTop: '1px solid rgba(244,241,232,0.16)',
            paddingTop: 24,
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 12,
            fontFamily: 'var(--font-utility)',
            fontSize: 11,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--paper-dim)',
          }}
        >
          <span>© 2026 ABIT · Association of Budding Information Technocrats</span>
          <span>Where you are → What&apos;s next</span>
        </div>
      </div>
    </footer>
  );
}
