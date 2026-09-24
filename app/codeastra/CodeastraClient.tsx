'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
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
  GridsStyle,
} from './components/CodeastraSections';

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
      </motion.main>
      <CodeastraFooter />
      <GridsStyle />
    </div>
    </ThemeProvider>
  );
}
