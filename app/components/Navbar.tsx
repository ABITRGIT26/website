'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

const mainLinks = [
  { n: '01', href: '/about', label: 'About' },
  { n: '02', href: '/events', label: 'Events' },
  { n: '03', href: '/synergy', label: 'Synergy' },
  { n: '04', href: '/team', label: 'Team' },
  { n: '05', href: '/sponsors', label: 'Sponsors' },
];

const orgLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About ABIT' },
  { href: '/events', label: 'All Events' },
  { href: '/synergy', label: 'Synergy' },
  { href: '/team', label: 'Team' },
  { href: '/sponsors', label: 'Sponsors' },
  { href: '/contact', label: 'Contact' },
  { href: '/join', label: 'Join ABIT' },
];

const codeastraLinks = [
  { href: '#event', label: 'Event' },
  { href: '#domains', label: 'Domains' },
  { href: '#journey', label: 'Journey' },
  { href: '#trials', label: 'Trials' },
  { href: '#convergence', label: 'Convergence' },
  { href: '#prizes', label: 'Prizes' },
  { href: '#faq', label: 'FAQ' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  if (pathname?.startsWith('/sharkathon')) return null;
  // Register flow keeps its own minimal header.
  if (pathname?.startsWith('/codeastra/register')) return null;

  // Floating pill replaces CodeastraNav on the Codeastra page.
  const isCodeastra = pathname === '/codeastra';

  const T = isCodeastra
    ? {
        pillBg: scrolled || open ? 'var(--cb-nav-bg-solid)' : 'var(--cb-nav-bg)',
        border: 'var(--cb-border)',
        text: 'var(--cb-text)',
        muted: 'var(--cb-text-muted)',
        accent: 'var(--cb-accent)',
        ctaBg: 'var(--cb-accent)',
        ctaText: 'var(--cb-accent-text)',
        panelBg: 'var(--cb-bg)',
        shadow: '0 12px 32px rgba(0,0,0,0.35)',
      }
    : {
        pillBg: scrolled || open ? 'rgba(244,241,232,0.95)' : 'rgba(244,241,232,0.8)',
        border: 'var(--border)',
        text: 'var(--text)',
        muted: 'var(--muted)',
        accent: 'var(--accent)',
        ctaBg: 'var(--accent)',
        ctaText: '#F4F1E8',
        panelBg: 'var(--bg)',
        shadow: '0 8px 24px rgba(16,16,16,0.10)',
      };

  return (
    <>
      <div style={{ position: 'fixed', left: 0, right: 0, top: 12, zIndex: 1000, padding: '0 12px', pointerEvents: 'none' }}>
        <div
          className="site-pill"
          style={{
            pointerEvents: 'auto',
            margin: '0 auto',
            width: 'fit-content',
            maxWidth: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: 22,
            borderRadius: 999,
            border: `1px solid ${T.border}`,
            background: T.pillBg,
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            boxShadow: T.shadow,
            padding: '6px 6px 6px 18px',
          }}
        >
          <Link
            href={isCodeastra ? '/codeastra' : '/'}
            style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}
            aria-label={isCodeastra ? 'ABIT Codeastra' : 'ABIT home'}
          >
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                background: 'transparent',
                borderRadius: 999,
                padding: '5px 12px',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                alt="ABIT"
                className="site-pill-logo"
                style={{ height: 20, width: 'auto', display: 'block', filter: 'brightness(0)' }}
              />
            </span>
          </Link>

          <nav aria-label="Primary" className="site-pill-links" style={{ alignItems: 'center' }}>
            <ul style={{ display: 'flex', alignItems: 'center', gap: 26, margin: 0, padding: 0, listStyle: 'none' }}>
              {isCodeastra
                ? codeastraLinks.map((l) => (
                    <li key={l.href}>
                      {/* Same-page anchors: smooth-scrolled by CodeastraClient's handler */}
                      <a
                        href={l.href}
                        className="nav-ed-link"
                        style={{
                          textDecoration: 'none',
                          fontFamily: 'var(--font-display)',
                          fontWeight: 600,
                          fontSize: 11,
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          color: T.text,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {l.label}
                      </a>
                    </li>
                  ))
                : mainLinks.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="nav-ed-link"
                        style={{
                          textDecoration: 'none',
                          fontFamily: 'var(--font-display)',
                          fontWeight: 600,
                          fontSize: 11,
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          color: T.text,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
            </ul>
          </nav>

          {/* CODEASTRA hidden for main ABIT launch
          {!isCodeastra && (
            <Link
              href="/codeastra"
              className="site-pill-event"
              style={{
                textDecoration: 'none',
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 11,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: T.accent,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                whiteSpace: 'nowrap',
              }}
            >
              <motion.span
                aria-hidden="true"
                animate={{ opacity: [1, 0.2, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                style={{ display: 'inline-block', width: 6, height: 6, background: T.accent }}
              />
              Codeastra
            </Link>
          )}
          */}
          <Link
            href={isCodeastra ? '/codeastra/register' : '/join'}
            className="site-pill-cta"
            style={{
              textDecoration: 'none',
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 11,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: T.ctaText,
              background: T.ctaBg,
              borderRadius: 999,
              padding: '8px 18px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              whiteSpace: 'nowrap',
            }}
          >
            {isCodeastra ? 'Go Beyond' : 'Join Us'}
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="site-burger"
            style={{
              flexShrink: 0,
              width: 40,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 999,
              background: 'transparent',
              border: `1px solid ${T.border}`,
              cursor: 'pointer',
              color: T.accent,
            }}
          >
            <svg aria-hidden="true" width={20} height={20} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.nav
              id="site-menu"
              aria-label="Mobile"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              style={{
                pointerEvents: 'auto',
                margin: '8px auto 0',
                width: 'fit-content',
                maxWidth: '100%',
                minWidth: 'min(420px, 100%)',
                background: T.panelBg,
                border: `1px solid ${T.border}`,
                borderRadius: 20,
                boxShadow: T.shadow,
                padding: 8,
              }}
            >
              {isCodeastra ? (
                <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                  {codeastraLinks.map((l) => (
                    <li key={l.href}>
                      <a
                        href={l.href}
                        onClick={() => setOpen(false)}
                        style={{
                          textDecoration: 'none',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '12px 16px',
                          borderRadius: 12,
                          color: T.text,
                          fontFamily: 'var(--font-display)',
                          fontWeight: 800,
                          textTransform: 'uppercase',
                          letterSpacing: '0.01em',
                          fontSize: 16,
                        }}
                      >
                        {l.label}
                        <span aria-hidden="true" style={{ color: T.accent }}>→</span>
                      </a>
                    </li>
                  ))}
                  <li style={{ padding: 8 }}>
                    <Link
                      href="/codeastra/register"
                      style={{
                        textDecoration: 'none',
                        display: 'flex',
                        justifyContent: 'center',
                        borderRadius: 999,
                        background: T.ctaBg,
                        color: T.ctaText,
                        fontFamily: 'var(--font-display)',
                        fontWeight: 800,
                        fontSize: 13,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        padding: '13px 20px',
                      }}
                    >
                      Go Beyond
                    </Link>
                  </li>
                </ul>
              ) : (
                <>
                  <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                    {mainLinks.map((l) => (
                      <li key={l.href}>
                        <Link
                          href={l.href}
                          style={{
                            textDecoration: 'none',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '12px 16px',
                            borderRadius: 12,
                            color: T.text,
                            fontFamily: 'var(--font-display)',
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            letterSpacing: '0.01em',
                            fontSize: 16,
                          }}
                        >
                          <span>
                            <span style={{ fontFamily: 'var(--font-utility)', fontSize: 11, color: T.muted, marginRight: 12 }}>
                              {l.n}
                            </span>
                            {l.label}
                          </span>
                          <span aria-hidden="true" style={{ color: T.accent }}>→</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: 8, paddingTop: 0 }}>
                    {/* CODEASTRA hidden for main ABIT launch
                    <Link
                      href="/codeastra"
                      style={{
                        textDecoration: 'none',
                        display: 'flex',
                        justifyContent: 'center',
                        borderRadius: 999,
                        background: T.ctaBg,
                        color: T.ctaText,
                        fontFamily: 'var(--font-display)',
                        fontWeight: 800,
                        fontSize: 13,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        padding: '13px 20px',
                      }}
                    >
                      Codeastra
                    </Link>
                    */}
                    <Link
                      href="/join"
                      style={{
                        textDecoration: 'none',
                        display: 'flex',
                        justifyContent: 'center',
                        borderRadius: 999,
                        background: 'transparent',
                        border: `1px solid ${T.text}`,
                        color: T.text,
                        fontFamily: 'var(--font-display)',
                        fontWeight: 800,
                        fontSize: 13,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        padding: '13px 20px',
                      }}
                    >
                      Join ABIT
                    </Link>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, padding: 8 }}>
                    {orgLinks.map((l) => (
                      <Link
                        key={l.href}
                        href={l.href}
                        style={{
                          textDecoration: 'none',
                          border: `1px solid ${T.border}`,
                          borderRadius: 999,
                          padding: '9px 16px',
                          fontFamily: 'var(--font-utility)',
                          fontSize: 12,
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          color: T.text,
                        }}
                      >
                        {l.label}
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>

      <style jsx global>{`
        .site-pill-links { display: flex; }
        .site-burger { display: none; }
        @media (max-width: 900px) {
          .site-pill-links { display: none !important; }
          .site-pill-cta { display: none !important; }
          .site-pill-event { display: none !important; }
          .site-burger { display: inline-flex !important; }
          .site-pill { width: 100% !important; max-width: 100% !important; justify-content: space-between !important; padding: 8px 10px 8px 22px !important; }
          .site-pill-logo { height: 22px !important; }
        }
        @media (max-width: 560px) {
          .site-pill { gap: 12px !important; padding: 8px 8px 8px 18px !important; }
          .site-pill-logo { height: 22px !important; }
          .site-burger { width: 40px !important; height: 40px !important; }
        }
      `}</style>
    </>
  );
}
