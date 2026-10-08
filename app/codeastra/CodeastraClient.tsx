'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { AlarmClock, X } from 'lucide-react';
import SmokeIntro from './components/SmokeIntro';
import CodeastraHero from './components/CodeastraHero';
import CodeastraFooter from './components/CodeastraFooter';
import BreachTransition from './components/BreachTransition';
import ThemeProvider from './components/ThemeProvider';
import {
  Marquee,
  EventSection,
  DomainsSection,
  ProblemStatementsSection,
  JourneySection,
  TrialsSection,
  ConvergenceSection,
  PrizesSection,
  ExperienceSection,
  RegisterSection,
  FaqSection,
  ResourcesSection,
  GridsStyle,
} from './components/CodeastraSections';

function DeadlineBanner() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  return (
    <motion.div
      role="status"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'fixed', left: 16, right: 16, bottom: 16, zIndex: 1500,
        margin: '0 auto', maxWidth: 560,
        display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 12,
        background: 'var(--cb-bg-raised)', color: 'var(--cb-text)',
        border: '1px solid var(--cb-border-strong)', borderLeft: '3px solid var(--cb-accent)',
        padding: '12px 14px', boxShadow: '0 18px 44px rgba(0,0,0,0.45)',
      }}
    >
      <AlarmClock size={18} style={{ flexShrink: 0, color: 'var(--cb-accent)' }} aria-hidden="true" />
      <div style={{ flex: '1 1 200px', minWidth: 0 }}>
        <p style={{ margin: 0, fontFamily: 'var(--font-utility)', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--cb-text-dim)' }}>
          Registration deadline
        </p>
        <p style={{ margin: '3px 0 0', fontSize: 13.5, lineHeight: 1.5 }}>
          Submit your team details, PPT &amp; all by <strong>9th October, 11:59 PM</strong>.
        </p>
      </div>
      <Link href="/codeastra/register" style={{ textDecoration: 'none', background: 'var(--cb-accent)', color: 'var(--cb-accent-text)', fontWeight: 800, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '9px 12px', whiteSpace: 'nowrap' }}>
        Register
      </Link>
      <button type="button" onClick={() => setVisible(false)} aria-label="Dismiss deadline banner" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 0, color: 'var(--cb-text-dim)', cursor: 'pointer', padding: 4 }}>
        <X size={16} />
      </button>
    </motion.div>
  );
}

export default function CodeastraClient() {
  // Intro plays on every load / refresh by design.
  const [introDone, setIntroDone] = useState(false);
  // Breach state: flipped when the lime square floods the viewport.
  const [breached, setBreached] = useState(false);
  // Strike state: flipped the instant the saber tip makes contact (sharper jolt).
  const [struck, setStruck] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  const handleDone = () => {
    setIntroDone(true);
  };

  // Anchor smooth-scroll for this page.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) {
          window.scrollTo({
            top: el.getBoundingClientRect().top + window.scrollY - 72,
            behavior: 'smooth',
          });
        }
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return (
    <ThemeProvider>
    <div
      style={{
        backgroundColor: 'var(--cb-bg)',
        color: 'var(--cb-text)',
        fontFamily: 'var(--font-inter-tight, "Inter Tight", sans-serif)',
        minHeight: '100vh',
        overflowX: 'hidden',
      }}
    >
      {!introDone && <SmokeIntro onDone={handleDone} />}
      {introDone && <DeadlineBanner />}
      {/* Global floating pill navbar (Codeastra variant) replaces CodeastraNav */}

      <BreachTransition
        heroRef={heroRef}
        onImpact={(triggered) => setBreached(triggered)}
        onComplete={(triggered) => setBreached(triggered)}
        onStrike={(triggered) => setStruck(triggered)}
      />

      <motion.main
        animate={
          breached || struck
            ? struck
              ? { x: [0, -9, 7, -4, 0], y: [0, 7, -5, 2, 0] }
              : { x: [0, -5, 5, -3, 3, 0], y: [0, 5, -5, 3, -3, 0] }
            : {}
        }
        transition={{ duration: struck ? 0.32 : 0.4 }}
      >
        <div id="hero" ref={heroRef} style={{ position: 'relative', zIndex: 2 }}>
          <motion.div
            animate={{
              y: breached ? -80 : 0,
              filter: breached ? 'blur(8px)' : 'blur(0px)',
              opacity: breached ? 0.3 : 1,
            }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <CodeastraHero ready={introDone} />
          </motion.div>
        </div>

        <div style={{ position: 'relative', zIndex: 10 }}>
          <Marquee />
        </div>

        <div id="about" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div
            initial={{ y: 200, opacity: 0 }}
            animate={breached ? { y: 0, opacity: 1 } : { y: 200, opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <EventSection />
          </motion.div>
        </div>

        <DomainsSection />
        <ProblemStatementsSection />
        <JourneySection />
        <TrialsSection />
        <ConvergenceSection />
        <PrizesSection />
        <ExperienceSection />
        <RegisterSection />
        <FaqSection />
        <ResourcesSection />
      </motion.main>
      <CodeastraFooter />
      <GridsStyle />
    </div>
    </ThemeProvider>
  );
}
