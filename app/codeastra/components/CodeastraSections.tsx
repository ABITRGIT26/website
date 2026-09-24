'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Code2, BrainCircuit, Cloud, ShieldCheck, Hammer, Shuffle,
  Users, Presentation, Trophy, Music4, HeartHandshake, Wrench, ArrowRight, ArrowUpRight,
} from 'lucide-react';
import { useState } from 'react';
import { problemStatements, psDomains, psDomainLabel, type PSDomainKey } from '../data/problemStatements';

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

function Head({ label, title, hint }: { label: string; title: React.ReactNode; hint?: string }) {
  return (
    <Reveal>
      <p style={{ fontFamily: 'var(--font-utility)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--cb-text-muted)', marginBottom: 16 }}>
        {label}
      </p>
      <h2 style={{ fontSize: 'clamp(2rem, 5.4vw, 4.2rem)', lineHeight: 0.95, textTransform: 'uppercase', margin: 0, maxWidth: 900 }}>{title}</h2>
      {hint ? <p style={{ marginTop: 18, color: 'var(--cb-text-muted)', fontSize: 16, lineHeight: 1.7, maxWidth: 680 }}>{hint}</p> : null}
      <div aria-hidden="true" style={{ marginTop: 28, borderTop: '1px solid var(--cb-card-border)', position: 'relative' }}>
        <span style={{ position: 'absolute', left: 0, top: -1, width: 96, height: 2, background: 'var(--cb-accent-deep)' }} />
      </div>
    </Reveal>
  );
}

const wrap: React.CSSProperties = { maxWidth: 1400, margin: '0 auto', padding: '96px 24px' };

const cardStyle: React.CSSProperties = {
  border: '1px solid var(--cb-card-border)',
  padding: 30,
  background: 'var(--cb-card-bg)',
};

export function Marquee() {
  const unit = [
    'Online Selection', 'Launch', 'Build', 'Title Sponsor Round',
    'Trial & Reward', 'Convergence', 'Final Build', 'Final Launch',
    'Go Beyond the Code',
  ];
  return (
    <div aria-hidden="true" style={{
      background: '#35AFFF',
      padding: '20px 0',
      overflow: 'hidden',
      display: 'flex',
      whiteSpace: 'nowrap',
      borderTop: '1px solid rgba(255,255,255,0.25)',
      borderBottom: '1px solid rgba(255,255,255,0.25)',
      transform: 'rotate(-2deg) scale(1.05)',
      boxShadow: '0 10px 30px rgba(53,175,255,0.25)',
      zIndex: 10,
      position: 'relative',
    }}>
      <div className="codeastra-marquee" style={{ display: 'flex', width: 'max-content' }}>
        {[0, 1].map((half) => (
          <div key={half} style={{ display: 'flex', alignItems: 'center', gap: '40px', paddingRight: '40px' }}>
            {unit.map((t) => (
              <span key={t} style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
                <span style={{
                  fontFamily: 'var(--font-display, "Inter Tight", sans-serif)',
                  fontSize: 'clamp(24px, 4vw, 36px)',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  color: 'white',
                  letterSpacing: '0.05em',
                  whiteSpace: 'nowrap',
                }}>
                  {t}
                </span>
                <span aria-hidden="true" style={{ color: '#00204D' }}>•</span>
              </span>
            ))}
          </div>
        ))}
      </div>
      <style jsx global>{`
        @keyframes codeastra-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .codeastra-marquee { animation: codeastra-marquee 22s linear infinite; }
        @media (prefers-reduced-motion: reduce) { .codeastra-marquee { animation: none; } }
      `}</style>
    </div>
  );
}

export function EventSection() {
  return (
    <section id="event" style={{ background: 'var(--cb-bg)', color: 'var(--cb-text)' }}>
      <div style={wrap}>
        <Head label="What is Codeastra?" title={<>Not a hackathon.<br />A pressure test<span style={{ color: 'var(--cb-accent)' }}>.</span></>} hint="CodeAstra is a 24-hour offline hackathon under Synergy 2027, bringing together students and young developers to build innovative, real-world technology solutions. Unlike a traditional hackathon, CodeAstra goes beyond the code  challenging participants not only to build, but also to adapt, collaborate and solve under pressure." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginTop: 48 }} className="codeastra-grid-4">
          {[
            { icon: Hammer, k: 'Build', v: 'Turn ideas into functional, real-world solutions.' },
            { icon: Shuffle, k: 'Adapt', v: 'Respond to unexpected challenges through the Chakravyūh.' },
            { icon: Users, k: 'Collaborate', v: "Connect with teams from other domains through Convergence." },
            { icon: Presentation, k: 'Prove', v: 'Demonstrate the final product through a live, working demo.' },
          ].map((c, i) => (
            <Reveal key={c.k} delay={i * 0.07}>
              <div style={cardStyle}>
                <c.icon size={26} color="var(--cb-accent)" />
                <p style={{ fontFamily: 'var(--font-utility)', fontSize: 11, letterSpacing: '0.16em', color: 'var(--cb-text-dim)', margin: '18px 0 8px' }}>0{i + 1}</p>
                <h3 style={{ fontSize: 26, textTransform: 'uppercase', margin: '0 0 10px' }}>{c.k}</h3>
                <p style={{ color: 'var(--cb-text-muted)', lineHeight: 1.65, fontSize: 15, margin: 0 }}>{c.v}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function DomainsSection() {
  const domains = [
    { icon: Code2, n: '01', t: 'Web & Product Development', b: 'Build functional digital products, platforms and web applications that solve real-world problems.' },
    { icon: BrainCircuit, n: '02', t: 'AI & ML', b: 'Create intelligent solutions using artificial intelligence, machine learning, generative AI, computer vision, NLP and intelligent automation.' },
    { icon: Cloud, n: '03', t: 'Cloud Computing & Distributed Systems', b: 'Design scalable systems across cloud platforms, distributed architectures, microservices, load balancing, databases and resilient infrastructure.' },
    { icon: ShieldCheck, n: '04', t: 'Cybersecurity & Digital Trust', b: 'Build secure systems and explore cybersecurity, privacy, digital identity, threat detection and trusted digital infrastructure.' },
  ];
  return (
    <section id="domains" style={{ background: 'var(--cb-bg-alt)', color: 'var(--cb-text)', borderTop: '1px solid var(--cb-border)' }}>
      <div style={wrap}>
        <Head label="The four domains" title={<>Pick your arena<span style={{ color: 'var(--cb-accent)' }}>.</span></>} hint="Every team competes inside one domain  then gets forced outside it. That is the point." />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 48 }} className="codeastra-grid-2">
          {domains.map((d, i) => (
            <Reveal key={d.n} delay={(i % 2) * 0.08}>
              <div style={{ ...cardStyle, display: 'flex', gap: 22, alignItems: 'flex-start' }}>
                <div style={{ border: '1px solid var(--cb-border-strong)', padding: 14, flexShrink: 0 }}>
                  <d.icon size={26} color="var(--cb-accent)" />
                </div>
                <div>
                  <p style={{ fontFamily: 'var(--font-utility)', fontSize: 11, letterSpacing: '0.16em', color: 'var(--cb-text-dim)', margin: '0 0 8px' }}>Domain {d.n}</p>
                  <h3 style={{ fontSize: 'clamp(1.3rem, 2.4vw, 1.8rem)', textTransform: 'uppercase', margin: '0 0 10px' }}>{d.t}</h3>
                  <p style={{ color: 'var(--cb-text-muted)', lineHeight: 1.65, fontSize: 15, margin: 0 }}>{d.b}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProblemStatementsSection() {
  const [active, setActive] = useState<PSDomainKey | 'all'>('all');
  const list = active === 'all' ? problemStatements : problemStatements.filter((ps) => ps.domain === active);
  return (
    <section id="statements" style={{ background: 'var(--cb-bg)', color: 'var(--cb-text)', borderTop: '1px solid var(--cb-border)' }}>
      <div style={wrap}>
        <Head
          label="Temporary problem statements"
          title={<>Pick your problem<span style={{ color: 'var(--cb-accent)' }}>.</span></>}
          hint="Twelve starting points across the four domains. Browse them here, then lock one in on the registration form. Final statements drop at launch."
        />
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 40 }}>
          {psDomains.map((d) => (
            <button
              key={d.key}
              type="button"
              onClick={() => setActive(d.key)}
              style={{
                padding: '10px 18px',
                border: '1px solid',
                borderColor: active === d.key ? 'var(--cb-accent)' : 'var(--cb-card-border)',
                background: active === d.key ? 'var(--cb-accent)' : 'transparent',
                color: active === d.key ? 'var(--cb-accent-text)' : 'var(--cb-text-muted)',
                fontFamily: 'var(--font-utility)',
                fontSize: 12,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                cursor: 'pointer',
              }}
            >
              {d.label}
            </button>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 28 }} className="codeastra-grid-2">
          {list.map((ps, i) => (
            <Reveal key={ps.id} delay={(i % 2) * 0.07}>
              <div style={cardStyle}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 14 }}>
                  <span style={{ fontFamily: 'var(--font-utility)', fontSize: 11, letterSpacing: '0.16em', color: 'var(--cb-accent)', textTransform: 'uppercase' }}>
                    {ps.id.replace('-', ' ').toUpperCase()}
                  </span>
                  <span style={{ fontFamily: 'var(--font-utility)', fontSize: 10, letterSpacing: '0.1em', color: 'var(--cb-text-dim)', textTransform: 'uppercase', textAlign: 'right' }}>
                    {psDomainLabel[ps.domain]}
                  </span>
                </div>
                <h3 style={{ fontSize: 'clamp(1.15rem, 2.2vw, 1.5rem)', textTransform: 'uppercase', margin: '0 0 10px', lineHeight: 1.15 }}>{ps.title}</h3>
                <p style={{ color: 'var(--cb-text-muted)', lineHeight: 1.65, fontSize: 15, margin: 0 }}>{ps.brief}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function JourneySection() {
  const journey = [
    { n: '01', t: 'Online Selection', s: 'Registration → Idea Submission → Screening → Shortlisting' },
    { n: '02', t: 'Launch (0 HR)', s: 'Check-in → Opening → Briefing → Problem Reveal' },
    { n: '03', t: 'Build', s: 'Ideation → Development → Testing → Mentorship' },
    { n: '04', t: 'Title Sponsor Round', s: 'Challenge → Brand Integration → Innovation → Showcase' },
    { n: '05', t: 'Trial & Reward', s: 'Challenge → Adapt → Perform → Earn' },
    { n: '06', t: 'Convergence', s: 'Collaborate → Integrate → Demonstrate (₹15,000 Prize)' },
    { n: '07', t: 'Final Build', s: 'Refine → Test → Deploy → Submit' },
    { n: '08', t: 'Final Launch (24 HR)', s: 'Live Demo → Jury Q&A → Evaluation → Results' },
  ];
  return (
    <section id="journey" style={{ background: 'var(--cb-bg)', color: 'var(--cb-text)', borderTop: '1px solid var(--cb-border)' }}>
      <div style={wrap}>
        <Head label="The Codeastra journey" title={<>8 phases. 24 hours.<br />No hiding<span style={{ color: 'var(--cb-accent)' }}>.</span></>} hint="From the first idea submission to the final live demo  every phase is designed to push teams further, faster, and beyond what they thought possible in 24 hours." />
        <ol style={{ listStyle: 'none', padding: 0, margin: '48px 0 0', display: 'grid', gap: 0, borderTop: '1px solid var(--cb-card-border)' }}>
          {journey.map((j) => (
            <Reveal key={j.n}>
              <li style={{ display: 'grid', gridTemplateColumns: '90px 1fr 1.4fr', gap: 20, padding: '22px 0', borderBottom: '1px solid var(--cb-border)', alignItems: 'baseline' }} className="codeastra-journey-row">
                <span style={{ fontFamily: 'var(--font-utility)', fontSize: 13, color: 'var(--cb-accent)', letterSpacing: '0.12em' }}>PH  {j.n}</span>
                <span style={{ fontWeight: 800, textTransform: 'uppercase', fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}>{j.t}</span>
                <span style={{ fontFamily: 'var(--font-utility)', fontSize: 12, letterSpacing: '0.06em', color: 'var(--cb-text-muted)', lineHeight: 1.8 }}>{j.s}</span>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function TrialsSection() {
  return (
    <section id="trials" style={{ background: 'var(--cb-bg-alt)', color: 'var(--cb-text)', borderTop: '1px solid var(--cb-border)' }}>
      <div style={wrap}>
        <Head label="Chakravyūh · Title sponsor · Trial & reward" title={<>The twists<span style={{ color: 'var(--cb-accent)' }}>.</span></>} hint="Three moments where the plan breaks on purpose. The teams that adapt, win." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 48 }} className="codeastra-grid-3">
          {[
            { t: 'Title Sponsor Round', b: 'A dedicated challenge inspired by the Title Sponsor\u2019s brand, values, products or identity. Revealed during the hackathon: understand → innovate → build → present. Special recognition for the winning team.' },
            { t: 'Trial & Reward', b: '4 domains → 4 trials → 4 rewards. A domain-specific challenge lands mid-build with a limited clock. The best team in each domain earns a strategic advantage for the final stage.' },
            { t: 'Chakravyūh', b: 'The unexpected turn. Requirements shift, constraints tighten, and roadmaps get tested. This is the Adapt pillar  resolve under pressure instead of rehearsing perfection.' },
          ].map((c, i) => (
            <Reveal key={c.t} delay={i * 0.07}>
              <div style={{ ...cardStyle, minHeight: 300 }}>
                <p style={{ fontFamily: 'var(--font-utility)', fontSize: 11, letterSpacing: '0.16em', color: 'var(--cb-accent)', margin: '0 0 12px' }}>Twist 0{i + 1}</p>
                <h3 style={{ fontSize: '1.5rem', textTransform: 'uppercase', margin: '0 0 12px' }}>{c.t}</h3>
                <p style={{ color: 'var(--cb-text-muted)', lineHeight: 1.7, fontSize: 15, margin: 0 }}>{c.b}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ConvergenceSection() {
  return (
    <section id="convergence" style={{ background: 'var(--cb-accent)', color: 'var(--cb-accent-text)' }}>
      <div style={{ ...wrap, padding: '88px 24px' }}>
        <Reveal>
          <p style={{ fontFamily: 'var(--font-utility)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 16 }}>
            Convergence
          </p>
          <h2 style={{ fontSize: 'clamp(2.2rem, 6vw, 4.6rem)', lineHeight: 0.92, textTransform: 'uppercase', margin: 0, maxWidth: 1000 }}>
            Two teams. Two solutions. One integrated outcome.
          </h2>
          <p style={{ marginTop: 18, fontSize: 17, lineHeight: 1.65, maxWidth: 700 }}>
            Teams are paired  preferably across domains  to integrate a meaningful component
            of each other&apos;s solution. Collaborate → integrate → adapt → demonstrate. Judged on
            quality of integration, technical execution, innovation and value created.
          </p>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginTop: 40 }} className="codeastra-grid-3">
          {[
            { t: '₹15,000', b: 'Convergence prize shared by the winning integrated teams.' },
            { t: 'Cross-domain', b: 'Forced collaboration outside your comfort stack.' },
            { t: 'Live proof', b: 'Both integrations demoed, not slideware.' },
          ].map((c, i) => (
            <Reveal key={c.t} delay={i * 0.07}>
              <div style={{ border: '1px solid var(--cb-accent-text)', padding: 28, background: 'transparent' }}>
                <h3 style={{ fontSize: '1.9rem', textTransform: 'uppercase', margin: '0 0 8px' }}>{c.t}</h3>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6 }}>{c.b}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PrizesSection() {
  const tiers = [
    { p: '🥇 1st Place', a: '₹50,000', d: 'Overall winner best across all five judging criteria.' },
    { p: '🥈 2nd Place', a: '₹30,000', d: 'Runner-up strongest end-to-end build and demo.' },
    { p: '🥉 3rd Place', a: '₹20,000', d: 'Second runner-up standout execution or innovation.' },
    { p: '🏆 Convergence', a: '₹15,000', d: 'Best cross-domain integration shared by winning teams.' },
  ];
  const criteria = [
    { k: 'Technical Execution', w: 25 }, { k: 'Problem Understanding', w: 20 },
    { k: 'Innovation', w: 20 }, { k: 'Functionality & Reliability', w: 20 },
    { k: 'Impact & Scalability', w: 15 },
  ];
  return (
    <section id="prizes" style={{ background: 'var(--cb-bg)', color: 'var(--cb-text)' }}>
      <div style={wrap}>
        <Head label="Judging & winning" title={<>₹1,15,000 on the table<span style={{ color: 'var(--cb-accent)' }}>.</span></>} hint="₹1,00,000 main prize pool (₹50,000 + ₹30,000 + ₹20,000) + ₹15,000 Convergence prize. Live demo in front of the jury no pre-recorded walkthroughs." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginTop: 48 }} className="codeastra-grid-4">
          {tiers.map((t, i) => (
            <Reveal key={t.p} delay={i * 0.07}>
              <div style={{ ...cardStyle, borderColor: i === 0 ? 'var(--cb-accent)' : 'var(--cb-card-border)' }}>
                <p style={{ fontFamily: 'var(--font-utility)', fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--cb-text-dim)', margin: '0 0 10px' }}>{t.p}</p>
                <h3 style={{ fontSize: '2.4rem', margin: '0 0 10px', color: i === 0 ? 'var(--cb-accent)' : 'var(--cb-text)' }}>{t.a}</h3>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.65, color: 'var(--cb-text-muted)' }}>{t.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div style={{ marginTop: 40, border: '1px solid var(--cb-card-border)', padding: 30 }}>
            <p style={{ fontFamily: 'var(--font-utility)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--cb-text-dim)', margin: '0 0 20px' }}>How you are scored</p>
            <div style={{ display: 'grid', gap: 14 }}>
              {criteria.map((c) => (
                <div key={c.k} style={{ display: 'grid', gridTemplateColumns: '220px 1fr 52px', gap: 16, alignItems: 'center' }} className="codeastra-crit-row">
                  <span style={{ fontWeight: 700, fontSize: 14, textTransform: 'uppercase' }}>{c.k}</span>
                  <span aria-hidden="true" style={{ height: 8, background: 'var(--cb-border)', position: 'relative', display: 'block' }}>
                    <span style={{ position: 'absolute', inset: 0, width: `${c.w * 4}%`, background: 'var(--cb-accent)', display: 'block' }} />
                  </span>
                  <span style={{ fontFamily: 'var(--font-utility)', fontSize: 12, color: 'var(--cb-text-muted)', textAlign: 'right' }}>{c.w}%</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function ExperienceSection() {
  const items = [
    { icon: Users, t: 'Mentorship', b: 'Access to mentors and technical guidance throughout the hackathon.' },
    { icon: Wrench, t: 'Technical support', b: 'Resources and assistance to help teams overcome technical roadblocks.' },
    { icon: Music4, t: 'Music & jamming', b: 'An evening session to step away from the screens, recharge and connect.' },
    { icon: HeartHandshake, t: 'Community', b: 'Interact with participants, mentors, judges and industry professionals across domains.' },
    { icon: Presentation, t: 'Live demonstration', b: 'Bring your solution to life and present it directly to the jury at the end of the 24 hours.' },
    { icon: Trophy, t: 'Beyond the code', b: 'Build together. Learn together. Go beyond the code.' },
  ];
  return (
    <section id="experience" style={{ background: 'var(--cb-bg-alt)', color: 'var(--cb-text)', borderTop: '1px solid var(--cb-border)' }}>
      <div style={wrap}>
        <Head label="The experience" title={<>More than a coding session<span style={{ color: 'var(--cb-accent)' }}>.</span></>} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 48 }} className="codeastra-grid-3">
          {items.map((c, i) => (
            <Reveal key={c.t} delay={(i % 3) * 0.07}>
              <div style={{ ...cardStyle, height: '100%', boxSizing: 'border-box' }}>
                <c.icon size={24} color="var(--cb-accent)" />
                <h3 style={{ fontSize: '1.25rem', textTransform: 'uppercase', margin: '16px 0 8px' }}>{c.t}</h3>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.65, color: 'var(--cb-text-muted)' }}>{c.b}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function RegisterSection() {
  return (
    <section id="register" style={{ background: 'var(--cb-bg)', color: 'var(--cb-text)', borderTop: '1px solid var(--cb-border)' }}>
      <div style={{ ...wrap, textAlign: 'center' }}>
        <Reveal>
          <p style={{ fontFamily: 'var(--font-utility)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--cb-text-dim)', marginBottom: 20 }}>Join Codeastra</p>
          <h2 style={{ fontSize: 'clamp(2.4rem, 7vw, 5.5rem)', lineHeight: 0.92, textTransform: 'uppercase', margin: 0 }}>
            Ready to go<br />beyond the code<span style={{ color: 'var(--cb-accent)' }}>?</span>
          </h2>
          <p style={{ margin: '22px auto 0', maxWidth: 620, fontSize: 17, lineHeight: 1.7, color: 'var(--cb-text-muted)' }}>
            Bring your idea. Build your solution. Adapt when the challenge changes.
            Collaborate beyond your domain. And prove what you can build in 24 hours.
          </p>
          <div style={{ marginTop: 34, display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/codeastra/register" style={{ textDecoration: 'none', background: 'var(--cb-text)', color: 'var(--cb-bg)', fontWeight: 800, fontSize: 14, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '17px 30px', display: 'inline-flex', alignItems: 'center', gap: 10 }}>
              Go Beyond <ArrowRight size={16} />
            </Link>
            <a href="/contact" style={{ textDecoration: 'none', border: '1px solid var(--cb-border-strong)', color: 'var(--cb-text)', fontWeight: 700, fontSize: 14, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '17px 30px', display: 'inline-flex', alignItems: 'center', gap: 10 }}>
              Contact the team <ArrowUpRight size={16} />
            </a>
          </div>
          <p style={{ marginTop: 26, fontFamily: 'var(--font-utility)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--cb-text-dim)' }}>
            ₹1,15,000 total pool · RGIT, Andheri West, Mumbai · 1st week of October
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export function FaqSection() {
  const faqs = [
    { q: 'Who can participate?', a: 'Students and young developers. Teams qualify through online selection: registration → idea submission → screening → shortlisting.' },
    { q: 'Where and when is it?', a: 'RGIT, Andheri West, Mumbai  1st week of October, under SYNERGY 2027. The hackathon itself is a 24-hour offline sprint.' },
    { q: 'What are the domains?', a: 'Web & Product Development, AI & ML, Cloud Computing & Distributed Systems, and Cybersecurity & Digital Trust.' },
    { q: 'What is Convergence?', a: 'You are paired with another team preferably from a different domain and must integrate part of each other’s solution. A dedicated ₹15,000 prize rewards the best integration.' },
    { q: 'How are we judged?', a: 'Live demo + jury Q&A. Technical Execution (25%), Problem Understanding (20%), Innovation (20%), Functionality & Reliability (20%), Impact & Scalability (15%).' },
    { q: 'What should we bring?', a: 'Your team, your machines, and a working mindset. Mentorship, technical support and the chaos  we provide those.' },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" style={{ background: 'var(--cb-bg-alt)', color: 'var(--cb-text)', borderTop: '1px solid var(--cb-border)' }}>
      <div style={wrap}>
        <Head label="FAQ" title={<>Questions<span style={{ color: 'var(--cb-accent)' }}>?</span></>} />
        <div style={{ marginTop: 40, borderTop: '1px solid var(--cb-card-border)' }}>
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} style={{ borderBottom: '1px solid var(--cb-border)' }}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  style={{ width: '100%', background: 'transparent', border: 0, color: 'var(--cb-text)', textAlign: 'left', padding: '20px 4px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', gap: 20, alignItems: 'center', fontWeight: 800, textTransform: 'uppercase', fontSize: 'clamp(0.95rem, 2vw, 1.15rem)' }}
                >
                  <span>{f.q}</span>
                  <span aria-hidden="true" style={{ color: 'var(--cb-accent)', fontSize: 22, lineHeight: 1 }}>{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen && <p style={{ margin: '0 0 22px', color: 'var(--cb-text-muted)', lineHeight: 1.7, fontSize: 15, maxWidth: 760 }}>{f.a}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function GridsStyle() {
  return (
    <style jsx global>{`
      @media (max-width: 1024px) {
        .codeastra-grid-4 { grid-template-columns: 1fr 1fr !important; }
        .codeastra-grid-3 { grid-template-columns: 1fr 1fr !important; }
      }
      @media (max-width: 720px) {
        .codeastra-grid-4, .codeastra-grid-3, .codeastra-grid-2 { grid-template-columns: 1fr !important; }
        .codeastra-journey-row { grid-template-columns: 1fr !important; gap: 6px !important; }
        .codeastra-crit-row { grid-template-columns: 1fr 60px !important; }
        .codeastra-crit-row > span:nth-child(2) { display: none !important; }
      }
    `}</style>
  );
}
