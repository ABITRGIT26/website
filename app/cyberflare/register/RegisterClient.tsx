'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, Check, ChevronDown, ShieldCheck, MessageCircle } from 'lucide-react';

const ease = [0.22, 1, 0.36, 1] as const;
const BLUE = '#2f7bff';
const INK = '#020409';
const PAPER = '#F4F1E8';

const WHATSAPP_GROUP_URL = 'https://chat.whatsapp.com/CcWF8UVv0QL0DRKIgEQwis';

const REGISTRATION_CLOSED = true;

function StepBar({ current, total }: { current: number; total: number }) {
  const labels = ['Contact', 'Academic', 'Review'];
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 40, position: 'relative', padding: '0 4px' }}>
      <div style={{ position: 'absolute', top: 14, left: 0, right: 0, height: 2, background: 'rgba(244,241,232,0.14)', zIndex: 1 }} />
      <div style={{ position: 'absolute', top: 14, left: 0, height: 2, background: BLUE, zIndex: 1, width: `${((current - 1) / (total - 1)) * 100}%`, transition: 'width 0.3s ease' }} />
      {labels.map((l, i) => (
        <div key={l} style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <div style={{
            width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: current >= i + 1 ? BLUE : 'rgba(244,241,232,0.04)',
            border: '1px solid rgba(244,241,232,0.2)', fontWeight: 700, fontSize: 12,
            color: current >= i + 1 ? '#fff' : 'rgba(244,241,232,0.4)',
          }}>
            {current > i + 1 ? <Check size={14} /> : i + 1}
          </div>
          <span className="step-label-text" style={{ fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: current >= i + 1 ? PAPER : 'rgba(244,241,232,0.4)', fontWeight: 600 }}>
            {l}
          </span>
        </div>
      ))}
    </div>
  );
}

const label: React.CSSProperties = {
  display: 'block', fontFamily: 'var(--font-utility)', fontSize: 11,
  letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 6, fontWeight: 600,
  color: 'rgba(244,241,232,0.7)',
};
const inp: React.CSSProperties = {
  width: '100%', background: 'rgba(244,241,232,0.04)', border: '1px solid rgba(244,241,232,0.2)',
  color: PAPER, fontFamily: 'var(--font-utility)', fontSize: 14,
  padding: '13px 16px', outline: 'none', boxSizing: 'border-box',
};
function FieldSelect({
  name, value, onChange, required, children,
}: {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div style={{ position: 'relative' }}>
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        style={{ ...inp, appearance: 'none', WebkitAppearance: 'none', MozAppearance: 'none', paddingRight: 42, cursor: 'pointer' }}
      >
        {children}
      </select>
      <ChevronDown size={16} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'rgba(244,241,232,0.4)' }} />
    </div>
  );
}

function SubmitSuccess({ regId, email }: { regId: string; email: string }) {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, overflow: 'auto', background: BLUE, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '72px 24px' }}>
      <div style={{ textAlign: 'center', maxWidth: 560 }}>
        <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.3, ease }}>
          <svg viewBox="0 0 52 52" style={{ width: 64, height: 64, margin: '0 auto' }}>
            <motion.circle cx="26" cy="26" r="23" fill="none" stroke="#fff" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.5, ease }} />
            <motion.path d="M15 27 L22 34 L37 19" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4, delay: 0.9, ease }} />
          </svg>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.2, ease }}
          style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)', fontWeight: 900, textTransform: 'uppercase', lineHeight: 0.95, color: '#fff', margin: '28px 0 20px' }}
        >
          See you at the flag
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 1.5, ease }}
          style={{ color: '#fff', fontSize: 15, lineHeight: 1.75, opacity: 0.9, marginBottom: 8 }}
        >
          You&apos;re locked in for CYBERFLARE 3.0. Join the WhatsApp group below for
          the platform link and briefing before 1 Oct, 9:00 AM — updates will also
          go to <span style={{ fontWeight: 700 }}>{email || 'your inbox'}</span>.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 1.7, ease }}
          style={{ color: '#fff', fontSize: 13, opacity: 0.75, marginBottom: 32 }}
        >
          Your registration ID is <span style={{ fontWeight: 700, opacity: 1 }}>{regId}</span>. Think. Hack. Capture the Flag.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 2.0, ease }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <Link href="/cyberflare" style={{ textDecoration: 'none', background: '#fff', color: BLUE, fontWeight: 800, fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '15px 20px', width: 'min(340px, 100%)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxSizing: 'border-box', whiteSpace: 'nowrap' }}>
            ← Back to Cyberflare
          </Link>
          <a
            href={WHATSAPP_GROUP_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none', background: 'transparent', border: '1px solid #fff', color: '#fff', fontWeight: 800, fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '15px 20px', width: 'min(340px, 100%)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxSizing: 'border-box', whiteSpace: 'nowrap' }}
          >
            <MessageCircle size={15} /> Join the WhatsApp group
          </a>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', fontFamily: 'var(--font-utility)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#fff' }}>
            <a href="tel:+919930683537" style={{ color: '#fff' }}>Swara · 99306 83537</a>
            <span aria-hidden="true">·</span>
            <a href="tel:+918779476766" style={{ color: '#fff' }}>Faizan · 87794 76766</a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function RegisterForm() {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [f, setF] = useState({
    email: '', fullName: '', phone: '',
    experience: 'Beginner', course: '', department: '', year: '1st Year',
    regId: '',
  });

  const set = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setF((p) => ({ ...p, [name]: value }));
  };

  const next = (e: React.MouseEvent<HTMLButtonElement>) => {
    const form = e.currentTarget.closest('form');
    if (form && !form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setStep((s) => Math.min(s + 1, 3));
  };
  const prev = () => setStep((s) => Math.max(1, s - 1));

  const step3ArrivedAt = useRef(0);
  useEffect(() => {
    if (step === 3) step3ArrivedAt.current = Date.now();
  }, [step]);

  const formKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key !== 'Enter') return;
    const t = e.target as HTMLElement;
    if (t.tagName !== 'INPUT') return;
    e.preventDefault();
    if (step >= 3) return;
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setStep((s) => Math.min(s + 1, 3));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step !== 3) {
      setStep((s) => Math.min(s + 1, 3));
      return;
    }
    if (status === 'loading') return;
    if (Date.now() - step3ArrivedAt.current < 1500) return;
    setStatus('loading');
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let id = '';
    for (let i = 0; i < 4; i++) id += chars.charAt(Math.floor(Math.random() * chars.length));
    const regId = `CYBER-ABIT-${id}`;
    const payload = { ...f, regId };
    setF((p) => ({ ...p, regId }));
    try {
      const res = await fetch('/api/cyberflare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Submission failed');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return <SubmitSuccess regId={f.regId} email={f.email} />;
  }

  return (
    <form onSubmit={submit} onKeyDown={formKeyDown} style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      <StepBar current={step} total={3} />

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3, ease }} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <label style={label}>Email *</label>
              <input name="email" value={f.email} onChange={set} required type="email" placeholder="you@college.edu" style={inp} />
            </div>
            <div>
              <label style={label}>Full name — as it should appear on your certificate *</label>
              <input name="fullName" value={f.fullName} onChange={set} required type="text" placeholder="Your full name" style={inp} />
            </div>
            <div>
              <label style={label}>Mobile number *</label>
              <input name="phone" value={f.phone} onChange={set} required type="tel" inputMode="tel" placeholder="+91 98765 43210" style={inp} />
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3, ease }} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <label style={label}>CTF experience level *</label>
              <FieldSelect name="experience" value={f.experience} onChange={set} required>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </FieldSelect>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="reg-grid">
              <div>
                <label style={label}>Course / Degree *</label>
                <input name="course" value={f.course} onChange={set} required type="text" placeholder="e.g. B.E. / B.Tech" style={inp} />
              </div>
              <div>
                <label style={label}>Department / Branch *</label>
                <input name="department" value={f.department} onChange={set} required type="text" placeholder="e.g. Information Technology" style={inp} />
              </div>
            </div>
            <div>
              <label style={label}>Year of study *</label>
              <FieldSelect name="year" value={f.year} onChange={set} required>
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
                <option value="5th Year">5th Year</option>
                <option value="Other">Other</option>
              </FieldSelect>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3, ease }} style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            <p style={{ fontFamily: 'var(--font-utility)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(244,241,232,0.45)', margin: '0 0 16px' }}>
              Check your details — name will be printed on your certificate exactly as entered
            </p>
            <div style={{ borderTop: '1px solid rgba(244,241,232,0.16)' }}>
              {[
                ['Email', f.email],
                ['Full name (certificate)', f.fullName],
                ['Mobile number', f.phone],
                ['CTF experience level', f.experience],
                ['Course / Degree', f.course],
                ['Department / Branch', f.department],
                ['Year of study', f.year],
              ].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', gap: 20, padding: '14px 4px', borderBottom: '1px solid rgba(244,241,232,0.16)' }}>
                  <span style={{ fontFamily: 'var(--font-utility)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(244,241,232,0.45)' }}>{k}</span>
                  <span style={{ fontSize: 14, fontWeight: 600, textAlign: 'right', wordBreak: 'break-word' }}>{v || '—'}</span>
                </div>
              ))}
            </div>
            {status === 'loading' && <p style={{ color: BLUE, fontSize: 13, textAlign: 'center', padding: '12px 0' }}>Submitting...</p>}
            {status === 'error' && <p style={{ color: '#ff7b7b', fontSize: 13, textAlign: 'center' }}>Something went wrong. Please try again.</p>}
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
        {step > 1 && (
          <button type="button" onClick={prev} style={{ flex: 1, background: 'rgba(244,241,232,0.05)', color: PAPER, border: '1px solid rgba(244,241,232,0.2)', padding: 15, fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            <ArrowLeft size={14} /> Previous
          </button>
        )}
        {step < 3 ? (
          <button type="button" onClick={next} style={{ flex: 2, background: BLUE, color: '#fff', border: 0, padding: 15, fontSize: 13, fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Next step <ArrowRight size={14} />
          </button>
        ) : (
          <button type="submit" disabled={status === 'loading'} style={{ flex: 2, background: BLUE, color: '#fff', border: 0, padding: 15, fontSize: 13, fontWeight: 800, cursor: status === 'loading' ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, textTransform: 'uppercase', letterSpacing: '0.06em', opacity: status === 'loading' ? 0.7 : 1 }}>
            {status === 'loading' ? 'Submitting...' : 'Submit registration'} <ArrowRight size={14} />
          </button>
        )}
      </div>
    </form>
  );
}

function RegistrationClosed() {
  return (
    <div style={{ border: '1px solid rgba(244,241,232,0.16)', background: 'rgba(244,241,232,0.03)', padding: '56px 28px', textAlign: 'center' }}>
      <div style={{ width: 64, height: 64, border: `1px solid ${BLUE}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
        <ShieldCheck size={30} color={BLUE} />
      </div>
      <h2 style={{ fontSize: 'clamp(1.6rem, 4.5vw, 2.4rem)', fontWeight: 900, textTransform: 'uppercase', lineHeight: 1, margin: '0 0 14px' }}>
        Registration closed
      </h2>
      <p style={{ color: 'rgba(244,241,232,0.6)', fontSize: 15, lineHeight: 1.75, maxWidth: 460, margin: '0 auto 28px' }}>
        Entries for CYBERFLARE 3.0 are now closed. Registered players will receive the
        platform link and briefing via email before 1 Oct, 9:00 AM.
      </p>
      <Link href="/cyberflare" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, background: PAPER, color: INK, fontWeight: 800, fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '15px 28px' }}>
        ← Back to Cyberflare
      </Link>
    </div>
  );
}

export default function RegisterClient() {
  return (
    <div className="cf-reg" style={{ minHeight: '100vh', background: INK, color: PAPER, fontFamily: 'var(--font-inter-tight, "Inter Tight", sans-serif)' }}>
      <header style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(2,4,9,0.92)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(244,241,232,0.14)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/cyberflare" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
            <ShieldCheck size={18} color={BLUE} />
            <span style={{ fontWeight: 900, fontSize: 17, letterSpacing: '0.02em', color: PAPER, textTransform: 'uppercase' }}>Cyberflare 3.0</span>
            <span aria-hidden="true" style={{ width: 7, height: 7, background: BLUE, display: 'inline-block' }} />
          </Link>
          <Link href="/cyberflare" style={{ fontFamily: 'var(--font-utility)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(244,241,232,0.6)', textDecoration: 'none' }}>
            ← Back
          </Link>
        </div>
      </header>

      <main style={{ maxWidth: 720, margin: '0 auto', padding: '64px 24px 96px' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
          <p style={{ fontFamily: 'var(--font-utility)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(244,241,232,0.45)', marginBottom: 14 }}>
            {REGISTRATION_CLOSED ? 'Registration · Closed' : 'Registration · Free · Online'}
          </p>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, textTransform: 'uppercase', lineHeight: 0.95, margin: '0 0 10px' }}>
            Capture the flag<span style={{ color: BLUE }}>.</span>
          </h1>
          <p style={{ color: 'rgba(244,241,232,0.6)', fontSize: 15, lineHeight: 1.7, maxWidth: 520, marginBottom: 44 }}>
            24-hour online CTF · 1 Oct 9 AM – 2 Oct 9 AM · Top 3 win goodies + internship opportunities + certificates.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1, ease }}>
          {REGISTRATION_CLOSED ? <RegistrationClosed /> : <RegisterForm />}
        </motion.div>
      </main>

      <footer style={{ background: '#05070f', borderTop: '1px solid rgba(244,241,232,0.14)' }}>
        <div style={{ height: 2, background: BLUE }} />
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10, fontFamily: 'var(--font-utility)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(244,241,232,0.5)' }}>
          <span>© 2026 ABIT · Cyberflare 3.0</span>
          <Link href="/cyberflare" style={{ color: 'rgba(244,241,232,0.5)', textDecoration: 'none' }}>← Back to Cyberflare</Link>
        </div>
      </footer>

      <style jsx global>{`
        .cf-reg { color-scheme: dark; }
        .cf-reg select option { background-color: #020409; color: #F4F1E8; }
        @media (max-width: 560px) {
          .reg-grid { grid-template-columns: 1fr !important; }
          .step-label-text { display: none !important; }
        }
      `}</style>
    </div>
  );
}
