'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  Users,
  BookOpen,
  Ticket,
  Hammer,
  Briefcase,
  Award,
  Send,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';

const benefits = [
  { icon: Users, title: 'Networking', desc: 'Connect with 500+ students, alumni, and industry professionals.' },
  { icon: BookOpen, title: 'Skill Development', desc: 'Free access to workshops, bootcamps, and learning resources.' },
  { icon: Ticket, title: 'Event Access', desc: 'Priority registration for hackathons, seminars, and SYNERGY.' },
  { icon: Hammer, title: 'Project Opportunities', desc: 'Work on real projects with experienced mentors and peers.' },
  { icon: Briefcase, title: 'Placement Support', desc: 'Resume reviews, mock interviews, and company referrals.' },
  { icon: Award, title: 'Recognition', desc: 'Certificate of membership and performance recognition.' },
];

const steps = [
  { n: '01', t: 'Apply', b: 'Fill the form below with your details and interests. Takes two minutes.' },
  { n: '02', t: 'Meet us', b: 'A short interaction with the core team so we know where you fit best.' },
  { n: '03', t: 'Build with us', b: 'Join project groups, event crews, and the SYNERGY engine room.' },
];

const years = ['First Year', 'Second Year', 'Third Year', 'Final Year'];
const branches = ['Information Technology', 'Computer Science', 'Electronics', 'Mechanical', 'Other'];
const interests = ['Technical', 'Design', 'Events', 'Media', 'Not sure yet'];

type Status = 'idle' | 'loading' | 'success' | 'error';

function SectionHead({ no, label, hint }: { no: string; label: string; hint?: string }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <p className="mono-meta" style={{ color: 'var(--muted)', marginBottom: 14 }}>
        <span aria-hidden="true" style={{ display: 'inline-block', width: 8, height: 8, background: 'var(--accent)', marginRight: 10, verticalAlign: 1 }} />
        {no} / {label}
      </p>
      <div aria-hidden="true" style={{ display: 'flex', alignItems: 'center', borderTop: '1px solid var(--border)', position: 'relative' }}>
        <span style={{ position: 'absolute', left: 0, top: -1, width: 96, height: 2, background: 'var(--blue)' }} />
      </div>
      {hint ? (
        <p style={{ marginTop: 16, fontSize: 14, color: 'var(--muted)', maxWidth: 680, lineHeight: 1.7 }}>{hint}</p>
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

export default function JoinPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    branch: '',
    year: '',
    phone: '',
    interest: '',
    skills: '',
    why: '',
  });
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'loading') return;
    setStatus('loading');
    setError('');
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'join-abit',
          ...form,
          submittedAt: new Date().toISOString(),
        }),
      });
      if (!res.ok) throw new Error('Submission failed. Please try again.');
      setStatus('success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--text)' }}>
      {/* ═══ PAGE HEAD · light ═══ */}
      <section aria-labelledby="join-title" style={{ position: 'relative', overflow: 'hidden', paddingTop: 132, paddingBottom: 32 }}>
        <div aria-hidden="true" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'var(--blue)' }} />
        <div className="container-editorial" style={{ position: 'relative' }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginBottom: 20, flexWrap: 'wrap' }}
          >
            <p className="mono-meta" style={{ margin: 0, display: 'inline-flex', alignItems: 'center', color: 'var(--muted)' }}>
              <span aria-hidden="true" style={{ display: 'inline-block', width: 8, height: 8, background: 'var(--accent)', marginRight: 10 }} />
              Join ABIT. Recruitment opens every semester
            </p>
            <span className="mono-meta" style={{ color: 'var(--muted)' }}>RGIT · IT Department</span>
          </motion.div>

          <h1 id="join-title" className="display-l" style={{ maxWidth: 900, margin: 0 }}>
            <motion.span initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }} style={{ display: 'block' }}>
              Cross
            </motion.span>
            <motion.span initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.16, ease: [0.22, 1, 0.36, 1] }} style={{ display: 'block' }}>
              the line<span style={{ color: 'var(--accent)' }}>.</span>
            </motion.span>
          </h1>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.24 }} style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap', marginTop: 20 }}>
            <p className="editorial-serif" style={{ fontSize: 'clamp(17px, 1.8vw, 21px)', lineHeight: 1.6, color: 'var(--muted)', maxWidth: 620, margin: 0 }}>
              Learn by building real things, lead events people remember, and join a line of leaders running since 2016.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href="#apply" className="btn-editorial">
                Apply now <ArrowRight size={15} aria-hidden="true" />
              </a>
              <Link href="/team" className="btn-ghost">
                Meet the team <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ 01 / WHY JOIN ═══ */}
      <section aria-labelledby="why-title" className="section-pad rule-top" style={{ background: 'var(--bg)' }}>
        <div className="container-editorial">
          <SectionHead no="01" label="Why join" hint="Six things membership actually gets you. No filler." />
          <Reveal>
            <h2 id="why-title" className="display-l" style={{ marginBottom: 36 }}>Why<br />join.</h2>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }} className="benefits-grid">
            {benefits.map(({ icon: Icon, title, desc }, i) => (
              <motion.article
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: Math.min(i * 0.05, 0.3), duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="ed-card"
                style={{ position: 'relative' }}
              >
                <span aria-hidden="true" style={{ position: 'absolute', top: 16, right: 16, fontFamily: 'var(--font-utility)', fontSize: 10, letterSpacing: '0.14em', color: 'var(--muted)' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span aria-hidden="true" style={{ width: 40, height: 40, border: '1px solid var(--border)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
                  <Icon size={17} strokeWidth={1.75} style={{ color: 'var(--blue)' }} />
                </span>
                <h3 style={{ fontSize: 17, textTransform: 'uppercase', lineHeight: 1.1, marginBottom: 8 }}>{title}</h3>
                <p style={{ color: 'var(--muted)', fontSize: 13.5, lineHeight: 1.65 }}>{desc}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 02 / APPLY ═══ */}
      <section id="apply" aria-labelledby="apply-title" className="section-pad rule-top" style={{ background: 'var(--surface)', scrollMarginTop: 120 }}>
        <div className="container-editorial">
          <SectionHead no="02" label="Application" hint="Takes two minutes. We read every single one." />
          <Reveal>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap', marginBottom: 36 }}>
              <h2 id="apply-title" className="display-l">Apply<br />now.</h2>
              <p className="mono-meta" style={{ color: 'var(--blue)' }}>Open · All years · All branches</p>
            </div>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 28, alignItems: 'start' }} className="apply-grid">
            {/* Form panel */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ padding: 'clamp(24px, 4vw, 44px)', border: '1px solid var(--text)', position: 'relative', background: 'var(--bg)' }}
            >
              <span aria-hidden="true" style={{ position: 'absolute', top: -1, left: -1, right: -1, height: 2, background: 'var(--blue)' }} />
              {status === 'success' ? (
                <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '48px 0' }}>
                  <CheckCircle size={56} strokeWidth={1.5} style={{ color: 'var(--blue)', marginBottom: 20 }} />
                  <h3 style={{ fontSize: 26, textTransform: 'uppercase', marginBottom: 12 }}>Application received.</h3>
                  <p style={{ color: 'var(--muted)', fontSize: 15, lineHeight: 1.7, maxWidth: 420, margin: '0 auto' }}>
                    Welcome to the pipeline. We will reach out within 3-5 business days with next steps.
                  </p>
                  <p className="mono-meta" style={{ marginTop: 24, color: 'var(--blue)' }}>ABIT · RGIT Mumbai</p>
                </motion.div>
              ) : (
                <>
                  <h3 style={{ fontSize: 22, textTransform: 'uppercase', marginBottom: 28 }}>Application form</h3>
                  {status === 'error' && (
                    <div role="alert" style={{ display: 'flex', gap: 12, alignItems: 'flex-start', border: '1px solid #9B1C1C', background: 'rgba(155,28,28,0.06)', padding: '14px 16px', marginBottom: 24 }}>
                      <AlertCircle size={17} style={{ color: '#9B1C1C', flexShrink: 0, marginTop: 1 }} />
                      <p style={{ color: '#9B1C1C', fontSize: 13.5, lineHeight: 1.6, margin: 0 }}>{error}</p>
                    </div>
                  )}
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }} className="form-row">
                      {[
                        { key: 'name', label: 'Full name', placeholder: 'Arjun Sharma', type: 'text' },
                        { key: 'email', label: 'College email', placeholder: 'you@gmail.com', type: 'email' },
                        { key: 'phone', label: 'Phone', placeholder: '+91 XXXXX XXXXX', type: 'tel' },
                      ].map(({ key, label, placeholder, type }) => (
                        <div key={key} className="field-minimal">
                          <label htmlFor={`join-${key}`}>{label}</label>
                          <input
                            id={`join-${key}`}
                            type={type}
                            placeholder={placeholder}
                            value={(form as Record<string, string>)[key]}
                            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                            required
                          />
                        </div>
                      ))}
                      <div className="field-minimal">
                        <label htmlFor="join-year">Year</label>
                        <select id="join-year" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} required>
                          <option value="">Select year</option>
                          {years.map((y) => <option key={y} value={y}>{y}</option>)}
                        </select>
                      </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }} className="form-row">
                      <div className="field-minimal">
                        <label htmlFor="join-branch">Branch</label>
                        <select id="join-branch" value={form.branch} onChange={(e) => setForm({ ...form, branch: e.target.value })} required>
                          <option value="">Select branch</option>
                          {branches.map((b) => <option key={b} value={b}>{b}</option>)}
                        </select>
                      </div>
                      <div className="field-minimal">
                        <label htmlFor="join-interest">Area of interest</label>
                        <select id="join-interest" value={form.interest} onChange={(e) => setForm({ ...form, interest: e.target.value })} required>
                          <option value="">Select interest</option>
                          {interests.map((t) => <option key={t} value={t}>{t}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="field-minimal">
                      <label htmlFor="join-skills">Skills <span style={{ textTransform: 'none', letterSpacing: 0 }}>(optional, comma-separated)</span></label>
                      <input id="join-skills" type="text" placeholder="React, Python, Machine Learning, UI/UX..." value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} />
                    </div>
                    <div className="field-minimal">
                      <label htmlFor="join-why">Why do you want to join ABIT?</label>
                      <textarea id="join-why" value={form.why} onChange={(e) => setForm({ ...form, why: e.target.value })} rows={4} placeholder="Tell us about your interests and goals..." />
                    </div>
                    <motion.button
                      type="submit"
                      disabled={status === 'loading'}
                      whileHover={{ scale: status === 'loading' ? 1 : 1.01 }}
                      whileTap={{ scale: status === 'loading' ? 1 : 0.99 }}
                      className="btn-editorial"
                      style={{ justifyContent: 'center', opacity: status === 'loading' ? 0.7 : 1 }}
                    >
                      {status === 'loading' ? 'Submitting...' : 'Submit application'} {status !== 'loading' && <Send size={15} />}
                    </motion.button>
                  </form>
                </>
              )}
            </motion.div>

            {/* Sidebar: what happens next + questions */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.12, duration: 0.6 }}
              style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
            >
              <div style={{ padding: 28, border: '1px solid var(--border)', background: 'var(--bg)' }}>
                <p className="mono-meta" style={{ marginBottom: 18, color: 'var(--muted)' }}>What happens next</p>
                <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column' }}>
                  {steps.map((s, i) => (
                    <li key={s.n} style={{ display: 'grid', gridTemplateColumns: '44px 1fr', gap: 14, padding: '16px 0', borderTop: i === 0 ? '1px solid var(--border)' : 'none', borderBottom: '1px solid var(--border)' }}>
                      <span aria-hidden="true" style={{ width: 32, height: 32, border: '1px solid var(--text)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-utility)', fontSize: 11, fontWeight: 700 }}>
                        {s.n}
                      </span>
                      <div>
                        <div style={{ fontWeight: 800, fontSize: 15, textTransform: 'uppercase', marginBottom: 4 }}>{s.t}</div>
                        <div style={{ color: 'var(--muted)', fontSize: 13, lineHeight: 1.65 }}>{s.b}</div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
              <div style={{ padding: 28, border: '1px solid var(--border)', background: 'var(--bg)' }}>
                <p className="mono-meta" style={{ marginBottom: 12, color: 'var(--muted)' }}>Questions?</p>
                <p style={{ fontSize: 18, fontWeight: 800, textTransform: 'uppercase', marginBottom: 8 }}>Talk to us.</p>
                <p style={{ color: 'var(--muted)', fontSize: 13.5, lineHeight: 1.65, marginBottom: 18 }}>
                  Unsure which track fits you? Reach out and a core member will help.
                </p>
                <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text)', textDecoration: 'none' }}>
                  Contact <ArrowUpRight size={14} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @media (max-width: 900px) {
          .benefits-grid { grid-template-columns: 1fr 1fr !important; }
          .apply-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .benefits-grid { grid-template-columns: 1fr !important; }
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
