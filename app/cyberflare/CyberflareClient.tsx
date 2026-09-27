'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ShieldCheck,
  Flag,
  Trophy,
  Briefcase,
  Gift,
  Award,
  CalendarDays,
  MapPin,
  Clock,
  Phone,
  ArrowRight,
  ArrowUpRight,
  Zap,
  Lock,
  Globe,
  BadgeCheck,
} from 'lucide-react';

const ease = [0.22, 1, 0.36, 1] as const;
const BLUE = '#2f7bff';
const INK = '#020409';
const PAPER = '#F4F1E8';

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-64px' }}
      transition={{ duration: 0.7, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

function SectionHead({ no, label, title, hint }: { no: string; label: string; title: React.ReactNode; hint?: string }) {
  return (
    <Reveal>
      <p className="mono-meta" style={{ color: 'rgba(244,241,232,0.6)', marginBottom: 14 }}>
        <span aria-hidden="true" style={{ display: 'inline-block', width: 8, height: 8, background: BLUE, marginRight: 10, verticalAlign: 1 }} />
        {no} / {label}
      </p>
      <h2 style={{ fontSize: 'clamp(2rem, 5.4vw, 4.2rem)', lineHeight: 0.95, textTransform: 'uppercase', margin: 0, maxWidth: 900, letterSpacing: '-0.02em' }}>
        {title}
      </h2>
      {hint ? <p style={{ marginTop: 18, color: 'rgba(244,241,232,0.65)', fontSize: 16, lineHeight: 1.7, maxWidth: 680 }}>{hint}</p> : null}
      <div aria-hidden="true" style={{ marginTop: 28, borderTop: '1px solid rgba(244,241,232,0.16)', position: 'relative' }}>
        <span style={{ position: 'absolute', left: 0, top: -1, width: 96, height: 2, background: BLUE }} />
      </div>
    </Reveal>
  );
}

const wrap: React.CSSProperties = { maxWidth: 1200, margin: '0 auto', padding: '96px 24px' };

const card: React.CSSProperties = {
  border: '1px solid rgba(244,241,232,0.16)',
  background: 'rgba(244,241,232,0.03)',
  padding: 28,
};

const metaBadge: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  fontFamily: 'var(--font-utility)',
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  border: '1px solid rgba(244,241,232,0.2)',
  padding: '8px 14px',
  color: 'rgba(244,241,232,0.8)',
  background: 'rgba(2,4,9,0.55)',
  backdropFilter: 'blur(8px)',
};

function Faq() {
  const faqs = [
    { q: 'Who can participate?', a: 'Any student who wants to test their cybersecurity skills. No prior CTF experience needed — the challenges span beginner to advanced levels.' },
    { q: 'Where and when is it?', a: 'Fully online. The 24-hour CTF runs 1st Oct, 9:00 AM – 2nd Oct, 9:00 AM. Prize distribution ceremony is on 9th Oct 2026.' },
    { q: 'How much does it cost?', a: 'Registration is FREE. Just register, join the briefing channel, and play.' },
    { q: 'What do winners get?', a: 'Top 3 winners receive goodies, internship opportunities with Hacktify Cybersecurity, plus certificates. All participants get certificates.' },
    { q: 'Solo or team?', a: 'Play solo or as a team (check the registration form for team options). Real-world cybersecurity challenges — competitive and skill-based.' },
    { q: 'Whom do I contact?', a: 'Swara Yerunkar (+91 99306 83537) or Faizan Shaikh (+91 87794 76766).' },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" style={{ background: '#05070f' }}>
      <div style={wrap}>
        <SectionHead no="07" label="FAQ" title={<>Questions<span style={{ color: BLUE }}>?</span></>} />
        <div style={{ marginTop: 40, borderTop: '1px solid rgba(244,241,232,0.16)' }}>
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} style={{ borderBottom: '1px solid rgba(244,241,232,0.16)' }}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  style={{ width: '100%', background: 'transparent', border: 0, color: PAPER, textAlign: 'left', padding: '20px 4px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', gap: 20, alignItems: 'center', fontWeight: 800, textTransform: 'uppercase', fontSize: 'clamp(0.95rem, 2vw, 1.15rem)' }}
                >
                  <span>{f.q}</span>
                  <span aria-hidden="true" style={{ color: BLUE, fontSize: 22, lineHeight: 1 }}>{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen && <p style={{ margin: '0 0 22px', color: 'rgba(244,241,232,0.65)', lineHeight: 1.7, fontSize: 15, maxWidth: 760 }}>{f.a}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function CyberflareClient() {
  return (
    <div style={{ background: INK, color: PAPER, fontFamily: 'var(--font-inter-tight, "Inter Tight", sans-serif)', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* ── Hero ── */}
      <section style={{ position: 'relative', overflow: 'hidden', minHeight: '100svh', display: 'flex', flexDirection: 'column', padding: '96px 24px 0' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/cyberflare-hero-desktop.png"
          alt="CYBERFLARE 3.0 — Capture The Flag! Think · Exploit · Capture"
          className="cf-hero-desktop"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/cyberflare-hero-mobile.png"
          alt="CYBERFLARE 3.0 — Capture The Flag! Think · Exploit · Capture"
          className="cf-hero-mobile"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
        />
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(2,4,9,0.55) 0%, rgba(2,4,9,0.05) 32%, transparent 55%, rgba(2,4,9,0.88) 100%)' }} />
        <h1 style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)', whiteSpace: 'nowrap', margin: 0 }}>
          CYBERFLARE 3.0 — Capture The Flag, ABIT × Hacktify Cybersecurity, RGIT Mumbai
        </h1>

        <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', position: 'relative', zIndex: 2, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: 28 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 18 }}>
            <span style={metaBadge}>
              <ShieldCheck size={13} color={BLUE} /> ABIT × Hacktify Cybersecurity
            </span>
            <span style={metaBadge}>
              <Zap size={13} color={BLUE} /> Free entry
            </span>
            <span style={metaBadge}>
              <Globe size={13} color={BLUE} /> 100% online
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32 }}
            style={{ margin: '0 0 20px', fontSize: 'clamp(15px, 2vw, 18px)', lineHeight: 1.7, color: 'rgba(244,241,232,0.82)', maxWidth: 640 }}
          >
            Arm yourself against digital threats. A 24-hour online CTF with real-world
            cybersecurity challenges — competitive, skill-based. Think. Hack. Capture the Flag.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.42 }}
            style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}
          >
            <Link href="/cyberflare/register" className="btn-editorial btn-on-dark" style={{ textDecoration: 'none' }}>
              Register now — free <ArrowRight size={15} aria-hidden="true" />
            </Link>
            <a href="#about" className="btn-ghost btn-ghost-on-dark" style={{ textDecoration: 'none' }}>
              How the CTF works
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'center', marginTop: 24, paddingTop: 14, borderTop: '1px solid rgba(196,208,232,0.18)', fontFamily: 'var(--font-utility)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(196,208,232,0.72)' }}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><CalendarDays size={12} /> 1 Oct 9 AM → 2 Oct 9 AM</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><MapPin size={12} /> Online · RGIT Mumbai</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><Trophy size={12} /> Prizes 9 Oct</span>
          </motion.div>
        </div>
      </section>

      {/* ── Marquee ── */}
      <div aria-hidden="true" style={{ background: BLUE, color: '#fff', padding: '14px 0', overflow: 'hidden', display: 'flex', whiteSpace: 'nowrap' }}>
        <div className="cf-marquee" style={{ display: 'inline-flex', gap: 0 }}>
          {Array.from({ length: 2 }).map((_, k) => (
            <span key={k} style={{ display: 'inline-flex', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', fontSize: 14 }}>
              {['Think', 'Hack', 'Capture the Flag', '24-Hour Online CTF', 'Free Entry', 'Internships', 'Top 3 Goodies'].map((t) => (
                <span key={`${k}-${t}`} style={{ padding: '0 22px', display: 'inline-flex', alignItems: 'center', gap: 22 }}>
                  {t} <span style={{ opacity: 0.6 }}>◆</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ── 01 About ── */}
      <section id="about">
        <div style={wrap}>
          <SectionHead
            no="01"
            label="The event"
            title={<>Arm yourself against digital threats<span style={{ color: BLUE }}>.</span></>}
            hint="CYBERFLARE 3.0 is ABIT × Hacktify Cybersecurity's flagship security event at RGIT — a Capture The Flag where you think, exploit, and capture. Real-world challenges, live leaderboard, 24 hours."
          />
          <div className="cf-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 40 }}>
            {[
              { icon: Flag, t: 'Capture the Flag', b: 'Jeopardy-style CTF: web, crypto, forensics, OSINT, reverse engineering & more. Flag every challenge, climb the board.' },
              { icon: Clock, t: '24 hours online', b: 'Starts 1st Oct, 9:00 AM and ends 2nd Oct, 9:00 AM. Play from anywhere — all you need is a laptop and the internet.' },
              { icon: Zap, t: 'Skill-based & competitive', b: 'Real-world cybersecurity challenges designed with Hacktify. Beginners can learn, veterans can fight for the top 3.' },
            ].map(({ icon: Icon, t, b }, i) => (
              <Reveal key={t} delay={i * 0.07}>
                <div style={{ ...card, height: '100%', boxSizing: 'border-box' }}>
                  <Icon size={24} color={BLUE} style={{ marginBottom: 16 }} />
                  <h3 style={{ fontSize: 17, fontWeight: 800, textTransform: 'uppercase', margin: '0 0 10px' }}>{t}</h3>
                  <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: 'rgba(244,241,232,0.65)' }}>{b}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div style={{ ...card, marginTop: 16, display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-utility)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(244,241,232,0.5)', marginBottom: 6 }}>CTF window</div>
                  <div style={{ fontWeight: 800, fontSize: 17 }}>1 Oct 9:00 AM → 2 Oct 9:00 AM</div>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-utility)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(244,241,232,0.5)', marginBottom: 6 }}>Venue</div>
                  <div style={{ fontWeight: 800, fontSize: 17 }}>Online</div>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-utility)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(244,241,232,0.5)', marginBottom: 6 }}>Entry</div>
                  <div style={{ fontWeight: 800, fontSize: 17 }}>FREE</div>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-utility)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(244,241,232,0.5)', marginBottom: 6 }}>Prize ceremony</div>
                  <div style={{ fontWeight: 800, fontSize: 17 }}>9 Oct 2026</div>
                </div>
              </div>
              <Link href="/cyberflare/register" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 10, background: PAPER, color: INK, fontWeight: 800, fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '15px 28px' }}>
                Grab your seat <ArrowRight size={15} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 02 Prizes ── */}
      <section id="prizes" style={{ background: '#05070f', borderTop: '1px solid rgba(244,241,232,0.1)' }}>
        <div style={wrap}>
          <SectionHead no="02" label="Prizes & opportunities" title={<>Top 3 take it all<span style={{ color: BLUE }}>.</span></>} hint="Goodies and internship opportunities for the top 3 winners — plus certificates for every player who fights through the 24 hours." />
          <div className="cf-grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginTop: 40 }}>
            {[
              { icon: Trophy, t: 'Top 3 winners', b: 'Podium finishers take home the prize pool spotlight at the 9 Oct ceremony.' },
              { icon: Briefcase, t: 'Internships', b: 'Internship opportunities with Hacktify Cybersecurity for standout hackers.' },
              { icon: Gift, t: 'Goodies', b: 'Exclusive Cyberflare swag and goodies for the top 3.' },
              { icon: Award, t: 'Certificates', b: 'Certificates for winners — and for every participant who competes.' },
            ].map(({ icon: Icon, t, b }, i) => (
              <Reveal key={t} delay={i * 0.07}>
                <div style={{ ...card, height: '100%', boxSizing: 'border-box', textAlign: 'left' }}>
                  <Icon size={24} color={BLUE} style={{ marginBottom: 16 }} />
                  <h3 style={{ fontSize: 16, fontWeight: 800, textTransform: 'uppercase', margin: '0 0 10px' }}>{t}</h3>
                  <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: 'rgba(244,241,232,0.65)' }}>{b}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 03 Schedule ── */}
      <section id="schedule">
        <div style={wrap}>
          <SectionHead no="03" label="Schedule" title={<>24 hours. Then glory<span style={{ color: BLUE }}>.</span></>} />
          <div style={{ marginTop: 40, borderTop: '1px solid rgba(244,241,232,0.16)' }}>
            {[
              { d: '1 Oct · 9:00 AM', t: 'CTF goes live', b: 'Opening briefing, platform access, challenges unlock. The 24-hour clock starts.', live: true },
              { d: '1–2 Oct · 24 hrs', t: 'Hack window', b: 'Solve jeopardy challenges across categories. Live leaderboard all day and night.' },
              { d: '2 Oct · 9:00 AM', t: 'Flags close', b: 'Submissions lock. Final standings freeze — top 3 decided on points + tie-break time.' },
              { d: '9 Oct 2026', t: 'Prize distribution ceremony', b: 'Winners felicitated on stage. Goodies, internship announcements & certificates.' },
            ].map((s, i) => (
              <Reveal key={s.t} delay={i * 0.05}>
                <div className="cf-schedule-row" style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 24, padding: '26px 4px', borderBottom: '1px solid rgba(244,241,232,0.16)', alignItems: 'baseline' }}>
                  <div style={{ fontFamily: 'var(--font-utility)', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: s.live ? BLUE : 'rgba(244,241,232,0.55)', fontWeight: 700 }}>
                    {s.live ? '● ' : ''}{s.d}
                  </div>
                  <div>
                    <h3 style={{ fontSize: 'clamp(1.1rem, 2.2vw, 1.5rem)', textTransform: 'uppercase', margin: '0 0 8px' }}>{s.t}</h3>
                    <p style={{ margin: 0, color: 'rgba(244,241,232,0.6)', lineHeight: 1.7, fontSize: 15, maxWidth: 720 }}>{s.b}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 04 How it works ── */}
      <section id="format" style={{ background: '#05070f', borderTop: '1px solid rgba(244,241,232,0.1)' }}>
        <div style={wrap}>
          <SectionHead no="04" label="How it works" title={<>Think. Exploit. Capture<span style={{ color: BLUE }}>.</span></>} hint="Are you ready to test your cybersecurity skills? Here's the playbook." />
          <div className="cf-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 40 }}>
            {[
              { n: '01', t: 'Register free', b: 'Fill the 2-minute form. Get the CTF platform link + briefing on email/WhatsApp before 1 Oct.' },
              { n: '02', t: 'Solve & submit flags', b: 'Pick challenges across web, crypto, forensics, OSINT & rev. Submit flags in the format given on-platform.' },
              { n: '03', t: 'Climb & win', b: 'Points per solve, tie-break on time. Top 3 on the final board win goodies + internships + certificates.' },
            ].map((s, i) => (
              <Reveal key={s.n} delay={i * 0.07}>
                <div style={card}>
                  <div style={{ fontFamily: 'var(--font-utility)', fontSize: 12, color: BLUE, fontWeight: 700, letterSpacing: '0.14em', marginBottom: 12 }}>{s.n}</div>
                  <h3 style={{ fontSize: 18, fontWeight: 800, textTransform: 'uppercase', margin: '0 0 10px' }}>{s.t}</h3>
                  <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: 'rgba(244,241,232,0.65)' }}>{s.b}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}>
            <div style={{ ...card, marginTop: 16, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <Lock size={18} color={BLUE} style={{ flexShrink: 0, marginTop: 2 }} />
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: 'rgba(244,241,232,0.65)' }}>
                Fair-play rules apply: no flag sharing, no attacking the platform itself, no automated brute-force that degrades the infra.
                Organisers&apos; decisions on scoring and tie-breaks are final. Full rulebook is shared on the briefing channel before kickoff.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 05 Organisers ── */}
      <section id="organisers">
        <div style={wrap}>
          <SectionHead no="05" label="Organised by" title={<>ABIT × Hacktify<span style={{ color: BLUE }}>.</span></>}           hint="Manjara Charitable Trust's Rajiv Gandhi Institute of Technology, Mumbai — Department of Information Technology." />
          <Reveal delay={0.05}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'clamp(20px, 4vw, 44px)', flexWrap: 'wrap', marginTop: 40, padding: 'clamp(28px, 4vw, 44px) 24px', border: '1px solid rgba(244,241,232,0.16)', background: 'rgba(244,241,232,0.02)' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="ABIT — Association of Budding Information Technocrats" style={{ height: 'clamp(72px, 10vw, 104px)', width: 'auto' }} />
              <span aria-hidden="true" style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 300, color: 'rgba(244,241,232,0.5)' }}>×</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/hacktify_dark_mode.png" alt="Hacktify Cybersecurity" style={{ height: 'clamp(48px, 7vw, 72px)', width: 'auto' }} />
            </div>
          </Reveal>
          <div className="cf-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 40 }}>
            <Reveal>
              <div style={{ ...card, height: '100%', boxSizing: 'border-box' }}>
                <BadgeCheck size={24} color={BLUE} style={{ marginBottom: 16 }} />
                <h3 style={{ fontSize: 17, fontWeight: 800, textTransform: 'uppercase', margin: '0 0 10px' }}>ABIT</h3>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: 'rgba(244,241,232,0.65)' }}>Association of Budding Information Technocrats — the official IT department committee of RGIT Mumbai.</p>
              </div>
            </Reveal>
            <Reveal delay={0.07}>
              <div style={{ ...card, height: '100%', boxSizing: 'border-box' }}>
                <ShieldCheck size={24} color={BLUE} style={{ marginBottom: 16 }} />
                <h3 style={{ fontSize: 17, fontWeight: 800, textTransform: 'uppercase', margin: '0 0 10px' }}>Hacktify Cybersecurity</h3>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: 'rgba(244,241,232,0.65)' }}>Cybersecurity training & assessment partner — challenge design, internship pipeline and expert evaluation.</p>
              </div>
            </Reveal>
            <Reveal delay={0.14}>
              <div style={{ ...card, height: '100%', boxSizing: 'border-box' }}>
                <MapPin size={24} color={BLUE} style={{ marginBottom: 16 }} />
                <h3 style={{ fontSize: 17, fontWeight: 800, textTransform: 'uppercase', margin: '0 0 10px' }}>RGIT Mumbai</h3>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: 'rgba(244,241,232,0.65)' }}>Rajiv Gandhi Institute of Technology, Versova, Andheri West. CTF is online; prize ceremony on 9 Oct.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 06 Event heads ── */}
      <section id="contact" style={{ background: '#05070f', borderTop: '1px solid rgba(244,241,232,0.1)' }}>
        <div style={wrap}>
          <SectionHead no="06" label="Event heads" title={<>Talk to a human<span style={{ color: BLUE }}>.</span></>} />
          <div className="cf-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 40 }}>
            {[
              { n: 'Swara Yerunkar', p: '+91 99306 83537', href: 'tel:+919930683537' },
              { n: 'Faizan Shaikh', p: '+91 87794 76766', href: 'tel:+918779476766' },
            ].map((c, i) => (
              <Reveal key={c.n} delay={i * 0.07}>
                <a href={c.href} style={{ ...card, display: 'flex', alignItems: 'center', gap: 18, textDecoration: 'none', color: 'inherit' }}>
                  <div style={{ width: 54, height: 54, borderRadius: '50%', background: 'rgba(47,123,255,0.14)', border: '2px solid rgba(47,123,255,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 20, color: BLUE, flexShrink: 0 }}>
                    {c.n.charAt(0)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 800, fontSize: 17 }}>{c.n}</div>
                    <div style={{ color: 'rgba(244,241,232,0.6)', fontSize: 14, display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                      <Phone size={13} color={BLUE} /> {c.p}
                    </div>
                  </div>
                  <ArrowUpRight size={18} color={BLUE} />
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Register (Codeastra-style) ── */}
      <section id="register" style={{ borderTop: '1px solid rgba(244,241,232,0.14)' }}>
        <div style={{ ...wrap, textAlign: 'center' }}>
          <Reveal>
            <p style={{ fontFamily: 'var(--font-utility)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(244,241,232,0.5)', marginBottom: 20 }}>Join Cyberflare 3.0</p>
            <h2 style={{ fontSize: 'clamp(2.4rem, 7vw, 5.5rem)', lineHeight: 0.92, textTransform: 'uppercase', margin: 0 }}>
              Ready to capture<br />the flag<span style={{ color: BLUE }}>?</span>
            </h2>
            <p style={{ margin: '22px auto 0', maxWidth: 620, fontSize: 17, lineHeight: 1.7, color: 'rgba(244,241,232,0.65)' }}>
              Think. Hack. Capture the Flag. Bring your curiosity, test your cybersecurity
              skills against real-world challenges — and prove it in 24 hours.
            </p>
            <div style={{ marginTop: 34, display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/cyberflare/register" style={{ textDecoration: 'none', background: PAPER, color: INK, fontWeight: 800, fontSize: 14, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '17px 30px', display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                Register now — free <ArrowRight size={16} />
              </Link>
              <Link href="/events" style={{ textDecoration: 'none', border: '1px solid rgba(244,241,232,0.3)', color: PAPER, fontWeight: 700, fontSize: 14, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '17px 30px', display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                All ABIT events <ArrowUpRight size={16} />
              </Link>
            </div>
            <p style={{ marginTop: 26, fontFamily: 'var(--font-utility)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(244,241,232,0.45)' }}>
              24-hr online CTF · 1–2 Oct · Free · Top 3 goodies + internships · Ceremony 9 Oct
            </p>
          </Reveal>
        </div>
      </section>

      <Faq />

      <style jsx global>{`
        .cf-hero-mobile { display: none; }
        .cf-hero-desktop { display: block; }
        @media (max-width: 640px) {
          .cf-hero-desktop { display: none; }
          .cf-hero-mobile { display: block; }
        }
        .cf-marquee { animation: cf-marquee 28s linear infinite; }
        @keyframes cf-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @media (max-width: 900px) {
          .cf-grid-3 { grid-template-columns: 1fr 1fr !important; }
          .cf-grid-4 { grid-template-columns: 1fr 1fr !important; }
          .cf-schedule-row { grid-template-columns: 1fr !important; gap: 8px !important; }
        }
        @media (max-width: 640px) {
          .cf-grid-3, .cf-grid-4, .cf-grid-2 { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
