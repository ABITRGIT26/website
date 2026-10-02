'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, Check, ChevronDown, Download, FileText, MessageCircle } from 'lucide-react';
import ThemeProvider from '../components/ThemeProvider';
import { problemStatements, psById, psDomainLabel, type ProblemStatement, type PSDomainKey } from '../data/problemStatements';
import { codeastraResources, CODEASTRA_WHATSAPP_URL } from '../data/resources';

const ease = [0.22, 1, 0.36, 1] as const;

/* ── Going Beyond intro ── */
function BeyondIntro({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<'flood' | 'message' | 'lift'>('flood');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('message'), 600);
    const t2 = setTimeout(() => setPhase('lift'), 3200);
    const t3 = setTimeout(() => onDone(), 4000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onDone]);

  return (
    <motion.div
      aria-hidden="true"
      style={{ position: 'fixed', inset: 0, zIndex: 9999, overflow: 'hidden', cursor: 'pointer', background: 'var(--cb-accent)' }}
      onClick={onDone}
    >
      <motion.div
        initial={{ scale: 0, borderRadius: '50%' }}
        animate={{ scale: phase === 'flood' ? 80 : 80, borderRadius: '0%' }}
        transition={{ duration: 0.8, ease }}
        style={{
          position: 'absolute', left: '50%', top: '50%',
          width: 100, height: 100, marginLeft: -50, marginTop: -50,
          background: 'var(--cb-accent)', transformOrigin: 'center center',
        }}
      />
      <AnimatePresence>
        {phase === 'message' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.5, ease }}
            style={{
              position: 'absolute', inset: 0,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              textAlign: 'center', padding: '0 24px',
            }}
          >
            <p style={{ fontFamily: 'var(--font-utility)', fontSize: 13, fontWeight: 500, letterSpacing: '0.42em', textTransform: 'uppercase', color: 'var(--cb-accent-text)', margin: '0 0 18px' }}>
              You are now
            </p>
            <p style={{ fontFamily: 'var(--font-display)', fontWeight: 900, textTransform: 'uppercase', lineHeight: 0.9, letterSpacing: '-0.02em', fontSize: 'clamp(3rem, 11vw, 9rem)', color: 'var(--cb-accent-text)', margin: 0 }}>
              Going<br />Beyond.
            </p>
            <p style={{ marginTop: 22, display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-utility)', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--cb-accent-text)' }}>
               Codeastra
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      {phase === 'lift' && (
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: '-100%' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          style={{ position: 'absolute', inset: 0, background: 'var(--cb-accent)' }}
        />
      )}
    </motion.div>
  );
}

/* ── Step indicator ── */
function StepBar({ current, total }: { current: number; total: number }) {
  const labels = ['Info', 'Resources', 'Problem', 'Team', 'Idea', 'Final'];
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 40, position: 'relative', padding: '0 4px' }}>
      <div style={{ position: 'absolute', top: 14, left: 0, right: 0, height: 2, background: 'var(--cb-border)', zIndex: 1 }} />
      <div style={{ position: 'absolute', top: 14, left: 0, height: 2, background: 'var(--cb-accent)', zIndex: 1, width: `${((current - 1) / (total - 1)) * 100}%`, transition: 'width 0.3s ease' }} />
      {labels.map((l, i) => (
        <div key={l} style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <div style={{
            width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: current > i + 1 ? 'var(--cb-accent)' : current === i + 1 ? 'var(--cb-accent)' : 'var(--cb-card-bg)',
            border: '1px solid var(--cb-card-border)', fontWeight: 700, fontSize: 12,
            color: current >= i + 1 ? 'var(--cb-accent-text)' : 'var(--cb-text-dim)',
          }}>
            {current > i + 1 ? <Check size={14} /> : i + 1}
          </div>
          <span className="step-label-text" style={{ fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: current >= i + 1 ? 'var(--cb-text)' : 'var(--cb-text-dim)', fontWeight: 600 }}>
            {l}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ── Shared field styles ── */
const label: React.CSSProperties = {
  display: 'block', fontFamily: 'var(--font-utility)', fontSize: 11,
  letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 6, fontWeight: 600,
};
const inp: React.CSSProperties = {
  width: '100%', background: 'var(--cb-card-bg)', border: '1px solid var(--cb-card-border)',
  color: 'var(--cb-text)', fontFamily: 'var(--font-utility)', fontSize: 14,
  padding: '13px 16px', outline: 'none', boxSizing: 'border-box',
};
const ta: React.CSSProperties = { ...inp, resize: 'vertical', minHeight: 90 };

/* ── Themed select: same field box as inputs, custom chevron ── */
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
      <ChevronDown
        size={16}
        style={{
          position: 'absolute', right: 14, top: '50%',
          transform: 'translateY(-50%)', pointerEvents: 'none',
          color: 'var(--cb-text-dim)',
        }}
      />
    </div>
  );
}

/* ── Problem statement picker ── */
const DOMAIN_TABS: { key: PSDomainKey; short: string }[] = [
  { key: 'web', short: 'Web & Product' },
  { key: 'ai', short: 'AI & ML' },
  { key: 'cloud', short: 'Cloud & Systems' },
  { key: 'cyber', short: 'Cyber & Blockchain' },
];

function ProblemPicker({
  value,
  onChange,
  onClearError,
}: {
  value: string;
  onChange: (ps: ProblemStatement) => void;
  onClearError: () => void;
}) {
  const [domain, setDomain] = useState<PSDomainKey>(() => (value && psById[value]?.domain) || 'web');
  const selected = value ? psById[value] : undefined;
  const list = problemStatements.filter((ps) => ps.domain === domain);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.25rem, 3vw, 1.6rem)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.01em', margin: '0 0 8px' }}>
          Pick your problem statement for online round
        </h2>
        <p style={{ color: 'var(--cb-text-muted)', fontSize: 13.5, lineHeight: 1.7, margin: 0, maxWidth: 520 }}>
          Choose a domain, then select the statement your team will build at CodeAstra.
        </p>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {DOMAIN_TABS.map((t) => {
          const active = t.key === domain;
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => setDomain(t.key)}
              className="ps-tab"
              style={{
                background: active ? 'var(--cb-accent)' : 'var(--cb-card-bg)',
                color: active ? 'var(--cb-accent-text)' : 'var(--cb-text-muted)',
                border: `1px solid ${active ? 'var(--cb-accent)' : 'var(--cb-card-border)'}`,
                padding: '9px 14px',
                fontFamily: 'var(--font-utility)',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                cursor: 'pointer',
              }}
            >
              {t.short}
            </button>
          );
        })}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }} className="ps-grid">
        {list.map((ps, i) => {
          const isSel = ps.id === value;
          return (
            <button
              key={ps.id}
              type="button"
              aria-pressed={isSel}
              onClick={() => { onChange(ps); onClearError(); }}
              className="ps-card"
              style={{
                position: 'relative',
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                padding: 18,
                background: isSel ? 'var(--cb-card-bg)' : 'transparent',
                border: `1px solid ${isSel ? 'var(--cb-accent)' : 'var(--cb-card-border)'}`,
                color: 'var(--cb-text)',
                cursor: 'pointer',
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: 'var(--font-utility)', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 700, color: isSel ? 'var(--cb-accent)' : 'var(--cb-text-dim)' }}>
                PS {String(i + 1).padStart(2, '0')}
                {isSel && (
                  <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 20, height: 20, background: 'var(--cb-accent)', color: 'var(--cb-accent-text)' }}>
                    <Check size={12} />
                  </span>
                )}
              </span>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 15, lineHeight: 1.35, textTransform: 'uppercase', letterSpacing: '-0.01em' }}>
                {ps.title}
              </span>
              <span style={{ fontFamily: 'var(--font-utility)', fontSize: 12.5, lineHeight: 1.65, color: 'var(--cb-text-muted)' }}>
                {ps.brief}
              </span>
            </button>
          );
        })}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 10, border: '1px solid var(--cb-card-border)', background: 'var(--cb-card-bg)', padding: '13px 16px' }}>
        <Check size={14} color={selected ? 'var(--cb-accent)' : 'var(--cb-text-dim)'} />
        <span style={{ fontFamily: 'var(--font-utility)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700, color: selected ? 'var(--cb-text)' : 'var(--cb-text-dim)' }}>
          {selected ? selected.title : 'No problem statement selected yet'}
        </span>
        {selected && (
          <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-utility)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--cb-text-muted)' }}>
            {psDomainLabel[selected.domain]}
          </span>
        )}
      </div>
    </div>
  );
}

/* ── Resources + confirmations step ── */
function CheckRow({ checked, onToggle, children }: { checked: boolean; onToggle: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={onToggle}
      style={{
        width: '100%', display: 'flex', alignItems: 'flex-start', gap: 12, textAlign: 'left',
        background: checked ? 'var(--cb-card-bg)' : 'transparent',
        border: `1px solid ${checked ? 'var(--cb-accent)' : 'var(--cb-card-border)'}`,
        padding: '14px 16px', cursor: 'pointer', color: 'var(--cb-text)',
        transition: 'border-color 160ms ease, background 160ms ease',
      }}
    >
      <span
        style={{
          width: 22, height: 22, flexShrink: 0, marginTop: 1,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          border: `1px solid ${checked ? 'var(--cb-accent)' : 'var(--cb-border-strong)'}`,
          background: checked ? 'var(--cb-accent)' : 'transparent',
          color: 'var(--cb-accent-text)',
        }}
      >
        {checked && <Check size={14} />}
      </span>
      <span style={{ fontFamily: 'var(--font-utility)', fontSize: 13, lineHeight: 1.6 }}>{children}</span>
    </button>
  );
}

function ResourcesStep({
  readRules, joinedWa, onReadRules, onJoinedWa,
}: {
  readRules: boolean;
  joinedWa: boolean;
  onReadRules: () => void;
  onJoinedWa: () => void;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.25rem, 3vw, 1.6rem)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.01em', margin: '0 0 8px' }}>
          Read up. Then lock in.
        </h2>
        <p style={{ color: 'var(--cb-text-muted)', fontSize: 13.5, lineHeight: 1.7, margin: 0, maxWidth: 520 }}>
          Download the rulebook, problem statements and the PPT template — everything you need before you build.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {codeastraResources.map((r) => (
          <div key={r.href} style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap', border: '1px solid var(--cb-card-border)', background: 'var(--cb-card-bg)', padding: '14px 16px' }}>
            <span style={{ width: 40, height: 40, flexShrink: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--cb-card-border)', color: 'var(--cb-accent)' }}>
              <FileText size={18} />
            </span>
            <span style={{ flex: 1, minWidth: 170 }}>
              <span style={{ display: 'block', fontFamily: 'var(--font-display)', fontWeight: 800, textTransform: 'uppercase', fontSize: 13.5, letterSpacing: '0.01em' }}>{r.label}</span>
              <span style={{ display: 'block', fontFamily: 'var(--font-utility)', fontSize: 12, lineHeight: 1.6, color: 'var(--cb-text-muted)', marginTop: 3 }}>{r.description}</span>
            </span>
            <a href={r.href} download className="res-download" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, border: '1px solid var(--cb-border-strong)', color: 'var(--cb-text)', fontWeight: 800, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '11px 14px', whiteSpace: 'nowrap' }}>
              <Download size={13} /> {r.kind}
            </a>
          </div>
        ))}
      </div>

      <a
        href={CODEASTRA_WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, background: 'var(--cb-accent)', color: 'var(--cb-accent-text)', fontWeight: 800, fontSize: 13, letterSpacing: '0.06em', textTransform: 'uppercase', padding: 15, textAlign: 'center' }}
      >
        <MessageCircle size={16} /> Join the CodeAstra WhatsApp group
      </a>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <CheckRow checked={readRules} onToggle={onReadRules}>
          I have read all of the above rulebooks and terms &amp; conditions.
        </CheckRow>
        <CheckRow checked={joinedWa} onToggle={onJoinedWa}>
          I have joined the CodeAstra WhatsApp group.
        </CheckRow>
      </div>
    </div>
  );
}

/* ── Submit success animation + message ── */
function SubmitSuccess({ teamId, email }: { teamId: string; email: string }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999, overflow: 'hidden',
      background: 'var(--cb-accent)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '72px 24px',
    }}>
      <div style={{ textAlign: 'center', maxWidth: 560 }}>
        {/* Tick */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3, ease }}
        >
          <svg viewBox="0 0 52 52" style={{ width: 64, height: 64, margin: '0 auto' }}>
            <motion.circle
              cx="26" cy="26" r="23"
              fill="none" stroke="var(--cb-accent-text)" strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 0.5, ease }}
            />
            <motion.path
              d="M15 27 L22 34 L37 19"
              fill="none" stroke="var(--cb-accent-text)" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.4, delay: 0.9, ease }}
            />
          </svg>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2, ease }}
          style={{
            fontSize: 'clamp(1.8rem, 5vw, 3rem)', fontWeight: 900,
            textTransform: 'uppercase', lineHeight: 0.95,
            color: 'var(--cb-accent-text)', margin: '28px 0 20px',
          }}
        >
          Congrats on taking the leap
        </motion.h1>

        {/* Body */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.5, ease }}
          style={{ color: 'var(--cb-accent-text)', fontSize: 15, lineHeight: 1.75, opacity: 0.85, marginBottom: 8 }}
        >
          You have taken the first step toward going beyond the code. If your team is selected for the stage beyond the online round, you will receive an email at{' '}
          <span style={{ fontWeight: 700, opacity: 1 }}>{email || 'your registered address'}</span>.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.7, ease }}
          style={{ color: 'var(--cb-accent-text)', fontSize: 13, opacity: 0.65, marginBottom: 32 }}
        >
          Your team ID is <span style={{ fontWeight: 700, opacity: 1 }}>{teamId}</span>. Until then keep building.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 2.0, ease }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}
        >
          <Link href="/codeastra" style={{
            textDecoration: 'none', background: 'var(--cb-accent-text)',
            color: 'var(--cb-accent)', fontWeight: 800, fontSize: 13,
            letterSpacing: '0.08em', textTransform: 'uppercase',
            padding: '15px 20px', width: 'min(340px, 100%)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            boxSizing: 'border-box', whiteSpace: 'nowrap',
          }}>
            ← Back to Codeastra
          </Link>
          <a
            href={CODEASTRA_WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: 'none', background: 'transparent',
              border: '1px solid var(--cb-accent-text)',
              color: 'var(--cb-accent-text)', fontWeight: 800, fontSize: 13,
              letterSpacing: '0.08em', textTransform: 'uppercase',
              padding: '15px 20px', width: 'min(340px, 100%)',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              boxSizing: 'border-box', whiteSpace: 'nowrap',
            }}
          >
            <MessageCircle size={15} /> Join the WhatsApp group for updates
          </a>
        </motion.div>
      </div>
    </div>
  );
}

/* ── Main form ── */
function RegisterForm() {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [gateError, setGateError] = useState(false);
  const [readRules, setReadRules] = useState(false);
  const [joinedWa, setJoinedWa] = useState(false);
  const [psError, setPsError] = useState(false);
  const [teamSize, setTeamSize] = useState(3);
  const [f, setF] = useState({
    teamName: '', teamSize: '3', domain: '', psId: '', email: '', phone: '',
    collegeName: '', engYear: 'TE',
    teamLead: '', member2: '', member3: '', member4: '', resumeFolder: '',
    ideaTitle: '', ideaProblem: '', ideaApproach: '', ideaTech: '', pitchDeck: '',
    referral: '', additionalInfo: '', extraNote: '', teamId: '',
  });

  const set = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setF((p) => ({ ...p, [name]: value }));
    if (name === 'teamSize') setTeamSize(parseInt(value));
  };

  const pickPs = (ps: ProblemStatement) => {
    setF((p) => ({ ...p, psId: ps.id, domain: ps.domain }));
    setPsError(false);
  };

  const toggleReadRules = () => {
    setReadRules((v) => !v);
    setGateError(false);
  };
  const toggleJoinedWa = () => {
    setJoinedWa((v) => !v);
    setGateError(false);
  };

  const next = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Validate only the currently visible step's fields before advancing
    const form = e.currentTarget.closest('form');
    if (step === 2 && (!readRules || !joinedWa)) {
      setGateError(true);
      return;
    }
    if (step === 3 && !f.psId) {
      setPsError(true);
      return;
    }
    if (form && !form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setStep((s) => Math.min(s + 1, 6));
  };
  const prev = () => setStep((s) => Math.max(1, s - 1));

  // Timestamp of when the user arrived on step 6. Used to swallow ghost
  // submits (double-tap bleed onto the freshly mounted Submit button,
  // mobile keyboard "Go", Enter key-repeat) that fire before the user
  // could possibly have answered Q1/Q2.
  const step6ArrivedAt = useRef(0);
  useEffect(() => {
    if (step === 6) step6ArrivedAt.current = Date.now();
  }, [step]);

  // Kill implicit Enter-submission from text inputs. Textareas keep newline
  // behavior, selects keep dropdown behavior, buttons keep native clicks.
  const formKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key !== 'Enter') return;
    const t = e.target as HTMLElement;
    if (t.tagName !== 'INPUT') return;
    e.preventDefault();
    if (step >= 6) return; // step 6: only an explicit Submit click may submit
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setStep((s) => Math.min(s + 1, 6));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Only submit from the final step. Enter key on earlier steps
    // triggers implicit form submission, advance instead of submitting.
    if (step !== 6) {
      setStep((s) => Math.min(s + 1, 6));
      return;
    }
    if (status === 'loading') return;
    // Ignore submits in the first 1.5s on step 6: no one can have read and
    // answered Q1/Q2 that fast, so it must be a ghost/accidental submit.
    if (Date.now() - step6ArrivedAt.current < 1500) return;
    setStatus('loading');
    // Generate team ID on submit
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let id = '';
    for (let i = 0; i < 4; i++) id += chars.charAt(Math.floor(Math.random() * chars.length));
    const teamId = `CODE-ABIT-${id}`;
    const payload = { ...f, teamId };
    setF((p) => ({ ...p, teamId }));
    try {
      const res = await fetch('/api/codeastra', {
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
    return <SubmitSuccess teamId={f.teamId} email={f.email} />;
  }

  return (
    <form onSubmit={submit} onKeyDown={formKeyDown} style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      <StepBar current={step} total={6} />

      <AnimatePresence mode="wait">
        {/* Step 1: Basic Info */}
        {step === 1 && (
          <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3, ease }} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="reg-grid">
              <div>
                <label style={label}>Team name</label>
                <input name="teamName" value={f.teamName} onChange={set} required type="text" placeholder="Your team name" style={inp} />
              </div>
              <div>
                <label style={label}>Team size</label>
                <FieldSelect name="teamSize" value={f.teamSize} onChange={set}>
                  <option value="3">3 members</option>
                  <option value="4">4 members</option>
                </FieldSelect>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="reg-grid">
              <div>
                <label style={label}>Email</label>
                <input name="email" value={f.email} onChange={set} required type="email" placeholder="team@college.edu" style={inp} />
              </div>
              <div>
                <label style={label}>Phone</label>
                <input name="phone" value={f.phone} onChange={set} required type="tel" placeholder="+91 98765 43210" style={inp} />
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 2: Resources + confirmations */}
        {step === 2 && (
          <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3, ease }} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <ResourcesStep
              readRules={readRules}
              joinedWa={joinedWa}
              onReadRules={toggleReadRules}
              onJoinedWa={toggleJoinedWa}
            />
            {gateError && (
              <p style={{ margin: 0, color: '#DC2626', fontSize: 13 }}>Please confirm both checkboxes to continue.</p>
            )}
          </motion.div>
        )}

        {/* Step 3: Problem statement */}
        {step === 3 && (
          <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3, ease }} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <ProblemPicker value={f.psId} onChange={pickPs} onClearError={() => setPsError(false)} />
            {psError && (
              <p style={{ margin: 0, color: '#DC2626', fontSize: 13 }}>Pick a problem statement to continue.</p>
            )}
          </motion.div>
        )}

        {/* Step 4: Team Details */}
        {step === 4 && (
          <motion.div key="s4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3, ease }} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="reg-grid">
              <div>
                <label style={label}>College / University</label>
                <input name="collegeName" value={f.collegeName} onChange={set} required type="text" placeholder="RGIT, Mumbai" style={inp} />
              </div>
              <div>
                <label style={label}>Year</label>
                <FieldSelect name="engYear" value={f.engYear} onChange={set}>
                  <option value="FE">First Year</option>
                  <option value="SE">Second Year</option>
                  <option value="TE">Third Year</option>
                  <option value="BE">Fourth Year</option>
                </FieldSelect>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="reg-grid">
              <div>
                <label style={label}>Team lead name</label>
                <input name="teamLead" value={f.teamLead} onChange={set} required type="text" placeholder="Member 1 (Lead)" style={inp} />
              </div>
              <div>
                <label style={label}>Member 2</label>
                <input name="member2" value={f.member2} onChange={set} required type="text" placeholder="Member 2" style={inp} />
              </div>
            </div>
            {teamSize >= 3 && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="reg-grid">
                <div>
                  <label style={label}>Member 3</label>
                  <input name="member3" value={f.member3} onChange={set} required type="text" placeholder="Member 3" style={inp} />
                </div>
                {teamSize >= 4 && (
                  <div>
                    <label style={label}>Member 4</label>
                    <input name="member4" value={f.member4} onChange={set} required type="text" placeholder="Member 4" style={inp} />
                  </div>
                )}
              </div>
            )}
            <div>
              <label style={label}>Resume folder link</label>
              <input name="resumeFolder" value={f.resumeFolder} onChange={set} required type="url" inputMode="url" placeholder="https://drive.google.com/drive/folders/... (resumes of all members)" style={inp} />
              <p style={{ margin: '8px 0 0', fontFamily: 'var(--font-utility)', fontSize: 12, lineHeight: 1.6, color: 'var(--cb-text-dim)' }}>
                Paste a Google Drive folder link containing the CV/resume of every team member (one PDF each). <span style={{ color: 'var(--cb-accent)', fontWeight: 700 }}>This will be used for internship opportunities</span> — add all team members’ CVs to one folder and provide a link that anyone with access can view (“Anyone with the link can view”). Resumes are required for selection.
              </p>
            </div>
          </motion.div>
        )}

        {/* Step 5: Project Idea */}
        {step === 5 && (
          <motion.div key="s5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3, ease }} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <label style={label}>Project title</label>
              <input name="ideaTitle" value={f.ideaTitle} onChange={set} required type="text" placeholder="What will you build?" style={inp} />
            </div>
            <div>
              <label style={label}>What problem does this solve?</label>
              <textarea name="ideaProblem" value={f.ideaProblem} onChange={set} required rows={3} placeholder="Describe the core problem..." style={ta} />
            </div>
            <div>
              <label style={label}>How will you approach it?</label>
              <textarea name="ideaApproach" value={f.ideaApproach} onChange={set} required rows={3} placeholder="Your solution approach..." style={ta} />
            </div>
            <div>
              <label style={label}>Tech stack / tools</label>
              <input name="ideaTech" value={f.ideaTech} onChange={set} required type="text" placeholder="e.g. Next.js, Python, TensorFlow" style={inp} />
            </div>
            <div>
              <label style={label}>Presentation link</label>
              <input name="pitchDeck" value={f.pitchDeck} onChange={set} required type="url" inputMode="url" placeholder="https://drive.google.com/... (shareable Drive link to your PPT/slides)" style={inp} />
              <p style={{ margin: '8px 0 0', fontFamily: 'var(--font-utility)', fontSize: 12, lineHeight: 1.6, color: 'var(--cb-text-dim)' }}>
                Paste a Google Drive link to your presentation or pitch deck. Make sure link sharing is on (“Anyone with the link can view”).
              </p>
            </div>
          </motion.div>
        )}

        {/* Step 6: Final questions */}
        {step === 6 && (
          <motion.div key="s6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3, ease }} style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {/* Q1 */}
            <div style={{ borderBottom: '1px solid var(--cb-card-border)', padding: '24px 0' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 10 }}>
                <span style={{ fontFamily: 'var(--font-utility)', fontSize: 11, color: 'var(--cb-accent)', fontWeight: 700, letterSpacing: '0.06em' }}>Q1</span>
                <label style={{ ...label, marginBottom: 0 }}>How did you hear about us?</label>
              </div>
              <FieldSelect name="referral" value={f.referral} onChange={set} required>
                <option value="">Select</option>
                <option value="instagram">Instagram</option>
                <option value="linkedin">LinkedIn</option>
                <option value="whatsapp">WhatsApp / Community</option>
                <option value="college">College / Faculty</option>
                <option value="friends">Friends / Referral</option>
                <option value="other">Other</option>
              </FieldSelect>
            </div>

            {/* Q2 */}
            <div style={{ borderBottom: '1px solid var(--cb-card-border)', padding: '24px 0' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 10 }}>
                <span style={{ fontFamily: 'var(--font-utility)', fontSize: 11, color: 'var(--cb-accent)', fontWeight: 700, letterSpacing: '0.06em' }}>Q2</span>
                <label style={{ ...label, marginBottom: 0 }}>What excites you most about this hackathon?</label>
              </div>
              <textarea name="additionalInfo" value={f.additionalInfo} onChange={set} required rows={3} placeholder="Tell us what drives you..." style={ta} />
            </div>

            {/* Q3 */}
            <div style={{ padding: '24px 0' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 10 }}>
                <span style={{ fontFamily: 'var(--font-utility)', fontSize: 11, color: 'var(--cb-accent)', fontWeight: 700, letterSpacing: '0.06em' }}>Q3</span>
                <label style={{ ...label, marginBottom: 0 }}>Anything else you want us to know? <span style={{ color: 'var(--cb-text-dim)' }}>(optional)</span></label>
              </div>
              <textarea name="extraNote" value={f.extraNote} onChange={set} rows={2} placeholder="Optional note..." style={ta} />
            </div>

            {status === 'loading' && (
              <p style={{ color: 'var(--cb-accent)', fontSize: 13, textAlign: 'center', padding: '12px 0' }}>Submitting...</p>
            )}
            {status === 'error' && (
              <p style={{ color: '#DC2626', fontSize: 13, textAlign: 'center' }}>Something went wrong. Please try again.</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
        {step > 1 && (
          <button type="button" onClick={prev} style={{ flex: 1, background: 'var(--cb-card-bg)', color: 'var(--cb-text)', border: '1px solid var(--cb-card-border)', padding: 15, fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            <ArrowLeft size={14} /> Previous
          </button>
        )}
        {step < 6 ? (
          <button type="button" onClick={next} style={{ flex: 2, background: 'var(--cb-accent)', color: 'var(--cb-accent-text)', border: 0, padding: 15, fontSize: 13, fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Next Step <ArrowRight size={14} />
          </button>
        ) : (
          <button type="submit" disabled={status === 'loading'} style={{ flex: 2, background: 'var(--cb-accent)', color: 'var(--cb-accent-text)', border: 0, padding: 15, fontSize: 13, fontWeight: 800, cursor: status === 'loading' ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, textTransform: 'uppercase', letterSpacing: '0.06em', opacity: status === 'loading' ? 0.7 : 1 }}>
            {status === 'loading' ? 'Submitting...' : 'Submit Application'} <ArrowRight size={14} />
          </button>
        )}
      </div>
    </form>
  );
}

/* ── Page shell ── */
export default function RegisterClient() {
  const [introDone, setIntroDone] = useState(false);
  const onDone = useCallback(() => setIntroDone(true), []);

  return (
    <ThemeProvider>
      {!introDone && <BeyondIntro onDone={onDone} />}
      <div className="cb-reg" style={{ minHeight: '100vh', background: 'var(--cb-bg)', color: 'var(--cb-text)', fontFamily: 'var(--font-inter-tight, "Inter Tight", sans-serif)' }}>
        {/* Sticky nav */}
        <header style={{ position: 'sticky', top: 0, zIndex: 100, background: 'var(--cb-nav-bg-solid)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', borderBottom: '1px solid var(--cb-border)' }}>
          <div style={{ maxWidth: 1400, margin: '0 auto', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Link href="/codeastra" style={{ textDecoration: 'none', display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span style={{ fontWeight: 900, fontSize: 17, letterSpacing: '0.02em', color: 'var(--cb-text)', textTransform: 'uppercase', fontFamily: 'var(--font-display)' }}>Codeastra</span>
              <span aria-hidden="true" style={{ width: 7, height: 7, background: 'var(--cb-accent)', display: 'inline-block' }} />
            </Link>
            <Link href="/codeastra" style={{ fontFamily: 'var(--font-utility)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--cb-text-muted)', textDecoration: 'none' }}>
              ← Back
            </Link>
          </div>
        </header>

        <main style={{ maxWidth: 720, margin: '0 auto', padding: '64px 24px 96px' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: introDone ? 0 : 4.2, ease }}>
            <p style={{ fontFamily: 'var(--font-utility)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--cb-text-dim)', marginBottom: 14 }}>
              Registration
            </p>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, textTransform: 'uppercase', lineHeight: 0.95, margin: '0 0 10px' }}>
              Go Beyond<span style={{ color: 'var(--cb-accent)' }}>.</span>
            </h1>
            <p style={{ color: 'var(--cb-text-muted)', fontSize: 15, lineHeight: 1.7, maxWidth: 520, marginBottom: 44 }}>
              Teams are shortlisted through online selection. Fill in your details and describe your idea.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: introDone ? 0.1 : 4.3, ease }}>
            <RegisterForm />
          </motion.div>
        </main>

        <footer style={{ background: 'var(--cb-bg-raised)', borderTop: '1px solid var(--cb-border)' }}>
          <div style={{ height: 2, background: 'var(--cb-accent)' }} />
          <div style={{ maxWidth: 1400, margin: '0 auto', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10, fontFamily: 'var(--font-utility)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--cb-text-muted)' }}>
            <span>© 2026 ABIT · Codeastra</span>
            <Link href="/codeastra" style={{ color: 'var(--cb-text-muted)', textDecoration: 'none' }}>← Back to Codeastra</Link>
          </div>
        </footer>
      </div>

      <style jsx global>{`
        /* Native select popup follows the page theme instead of OS default */
        .cb-reg { color-scheme: light; }
        html[data-theme="dark"] .cb-reg { color-scheme: dark; }
        html[data-theme="dark"] .cb-reg select option {
          background-color: #0B0B0A;
          color: #F4F1E8;
        }
        html[data-theme="light"] .cb-reg select option {
          background-color: #F4F1E8;
          color: #101010;
        }
        .ps-card { transition: border-color 160ms ease, background 160ms ease, transform 160ms ease; }
        .ps-card:hover { border-color: var(--cb-accent) !important; transform: translateY(-2px); }
        .ps-card[aria-pressed="true"] { box-shadow: inset 0 0 0 1px var(--cb-accent); }
        .ps-tab:hover { border-color: var(--cb-accent) !important; color: var(--cb-text) !important; }
        @media (max-width: 560px) {
          .reg-grid { grid-template-columns: 1fr !important; }
          .ps-grid { grid-template-columns: 1fr !important; }
          .res-download { width: 100%; }
          .step-label-text { display: none !important; }
        }
      `}</style>
    </ThemeProvider>
  );
}
