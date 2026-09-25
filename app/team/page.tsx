'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ChevronDown, ArrowRight, ArrowUpRight, Search } from 'lucide-react';
import TeamCard from '../components/TeamCard';
import MentorCard from '../components/MentorCard';
import { mentors, core2627, core2526, core2425, core2324 } from '../data/team';

/* ── Shared editorial primitives (same language as HomeClient) ── */

function SectionHead({
  no,
  label,
  hint,
  dark = false,
}: {
  no: string;
  label: string;
  hint?: string;
  dark?: boolean;
}) {
  return (
    <div style={{ marginBottom: 40 }}>
      <p className="mono-meta" style={{ color: dark ? 'rgba(244,241,232,0.6)' : 'var(--muted)', marginBottom: 14 }}>
        <span aria-hidden="true" style={{ display: 'inline-block', width: 8, height: 8, background: 'var(--accent)', marginRight: 10, verticalAlign: 1 }} />
        {no} / {label}
      </p>
      <div
        aria-hidden="true"
        style={{
          display: 'flex', alignItems: 'center',
          borderTop: `1px solid ${dark ? 'rgba(244,241,232,0.2)' : 'var(--border)'}`,
          position: 'relative',
        }}
      >
        <span style={{ position: 'absolute', left: 0, top: -1, width: 96, height: 2, background: 'var(--blue)' }} />
      </div>
      {hint ? (
        <p style={{ marginTop: 16, fontSize: 14, color: dark ? 'rgba(244,241,232,0.6)' : 'var(--muted)', maxWidth: 680, lineHeight: 1.7 }}>{hint}</p>
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

function matches(m: { name: string; role: string }, q: string) {
  const s = q.trim().toLowerCase();
  if (!s) return true;
  return m.name.toLowerCase().includes(s) || m.role.toLowerCase().includes(s);
}

/* Present committee renders archive-style TeamCards in hierarchy rows:
   President spotlight → GS + MD (large) → Treasurer + VP → twin Jt.GSs → SME. */

export default function TeamPage() {
  // Past format: present open, archives collapsed. Preserved.
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    core_25_26: false,
    core_24_25: false,
    core_23_24: false,
  });
  const [query, setQuery] = useState('');
  const searching = query.trim().length > 0;

  const toggle = (id: string) => setOpenSections((p) => ({ ...p, [id]: !p[id] }));

  // Hierarchy rows: President → GS + MD → Treasurer + VP → twin Jt.GSs → SME.
  const treePresident = useMemo(
    () => core2627.find((m) => m.role === 'President' && matches(m, query)),
    [query]
  );
  const treeVp = useMemo(
    () => core2627.find((m) => m.role === 'Vice President' && matches(m, query)),
    [query]
  );
  const treeGs = useMemo(
    () => core2627.find((m) => m.role === 'General Secretary' && matches(m, query)),
    [query]
  );
  const treeJt = useMemo(
    () => core2627.filter((m) => m.role === 'Joint General Secretary' && matches(m, query)),
    [query]
  );
  const treeMd = useMemo(
    () => core2627.find((m) => m.role === 'Managing Director' && matches(m, query)),
    [query]
  );
  const treeTreasurer = useMemo(
    () => core2627.find((m) => m.role === 'Treasurer' && matches(m, query)),
    [query]
  );
  const treeSme = useMemo(
    () => core2627.find((m) => m.role === 'Social Media Executive' && matches(m, query)),
    [query]
  );
  const presentMatches = useMemo(() => core2627.filter((m) => matches(m, query)), [query]);
  const past2526 = useMemo(() => core2526.filter((m) => matches(m, query)), [query]);
  const past2425 = useMemo(() => core2425.filter((m) => matches(m, query)), [query]);
  const past2324 = useMemo(() => core2324.filter((m) => matches(m, query)), [query]);

  const archives = [
    {
      id: 'core_25_26', no: '03', year: '2025–2026', title: 'Core 2025–2026',
      note: 'The previous committee  leadership · execution · excellence.',
      members: past2526, full: core2526,
    },
    {
      id: 'core_24_25', no: '04', year: '2024–2025', title: 'Core 2024–2025',
      note: 'The team that scaled SYNERGY and shipped CodeAstra\'s first edition.',
      members: past2425, full: core2425,
    },
    {
      id: 'core_23_24', no: '05', year: '2023–2024', title: 'Core 2023–2024',
      note: 'The foundation committee  systems, culture and first momentum.',
      members: past2324, full: core2324,
    },
  ];

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--text)' }}>
      {/* ═══ PAGE HEAD · light mentors first, then core ═══ */}
      <section aria-labelledby="team-title" style={{ position: 'relative', overflow: 'hidden', paddingTop: 132, paddingBottom: 32, background: 'var(--bg)' }}>
        <div aria-hidden="true" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'var(--blue)' }} />

        <div className="container-editorial" style={{ position: 'relative' }}>
          {/* eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginBottom: 20, flexWrap: 'wrap' }}
          >
            <p className="mono-meta" style={{ margin: 0, display: 'inline-flex', alignItems: 'center', color: 'var(--muted)' }}>
              <span aria-hidden="true" style={{ display: 'inline-block', width: 8, height: 8, background: 'var(--accent)', marginRight: 10 }} />
              Synergy 2027 · ABIT · The Team. Leadership · Execution · Excellence
            </p>
            <span className="mono-meta hero-fig-label" style={{ color: 'var(--muted)' }}>
              {String(mentors.length).padStart(2, '0')} mentors · {String(core2627.length).padStart(2, '0')} present core
            </span>
          </motion.div>

          <h1 id="team-title" className="display-l" style={{ maxWidth: 900, margin: 0 }}>
            <motion.span
              initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: 'block' }}
            >
              Behind
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: 'block' }}
            >
              the build<span style={{ color: 'var(--accent)' }}>.</span>
            </motion.span>
          </h1>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.24 }} style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap', marginTop: 20 }}>
            <p className="editorial-serif" style={{ fontSize: 'clamp(17px, 1.8vw, 21px)', lineHeight: 1.6, color: 'var(--muted)', maxWidth: 620, margin: 0 }}>
              Mentors first, then the core the people guiding ABIT and the eight running it right now.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link href="#mentors" className="btn-editorial">
                Mentors <ArrowRight size={15} aria-hidden="true" />
              </Link>
              <Link href="#present" className="btn-ghost">
                Present committee <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ INDEX + SEARCH · sticky editorial toolbar ═══ */}
      <div style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg)', position: 'sticky', top: 104, zIndex: 50 }}>
        <div className="container-editorial" style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap', paddingTop: 14, paddingBottom: 14 }}>
          <nav aria-label="Team sections" style={{ display: 'flex', gap: 20, flexWrap: 'wrap', fontFamily: 'var(--font-utility)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            <a href="#mentors" style={{ color: 'var(--text)', textDecoration: 'none' }}><span style={{ color: 'var(--muted)' }}>01 </span>Mentors</a>
            <a href="#present" style={{ color: 'var(--text)', textDecoration: 'none' }}><span style={{ color: 'var(--muted)' }}>02 </span>Present</a>
            <a href="#archive-2526" style={{ color: 'var(--text)', textDecoration: 'none' }}><span style={{ color: 'var(--muted)' }}>03 </span>2025–26</a>
            <a href="#archive-2425" style={{ color: 'var(--text)', textDecoration: 'none' }}><span style={{ color: 'var(--muted)' }}>04 </span>2024–25</a>
            <a href="#archive-2324" style={{ color: 'var(--text)', textDecoration: 'none' }}><span style={{ color: 'var(--muted)' }}>05 </span>2023–24</a>
          </nav>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid var(--border)', paddingBottom: 6, minWidth: 220 }}>
            <Search size={14} aria-hidden="true" style={{ color: 'var(--muted)' }} />
            <label htmlFor="team-search" className="mono-meta" style={{ color: 'var(--muted)' }}>Search</label>
            <input
              id="team-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Name or role…"
              style={{ border: 0, outline: 0, background: 'transparent', fontSize: 14, color: 'var(--text)', width: '100%' }}
            />
          </div>
        </div>
      </div>

      {/* ═══ 01 / MENTORS ═══ */}
      <section id="mentors" aria-labelledby="mentors-title" className="section-pad" style={{ background: 'var(--bg)', scrollMarginTop: 160 }}>
        <div className="container-editorial">
          <SectionHead no="01" label="Mentors" hint="Experienced professionals guiding students toward excellence and innovation." />
          <Reveal>
            <h2 id="mentors-title" className="display-l" style={{ marginBottom: 36 }}>Guided<br />right.</h2>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }} className="mentors-grid-page">
            {mentors.map((m, i) => (
              <MentorCard key={m.name} mentor={m} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 02 / PRESENT COMMITTEE · hierarchy card rows ═══ */}
      <section id="present" aria-labelledby="present-title" className="section-pad rule-top" style={{ background: 'var(--surface)', scrollMarginTop: 160 }}>
        <div className="container-editorial">
          <SectionHead no="02" label="Core 2026–2027 · Present Committee" hint="Leadership · Execution · Excellence  the eight people running ABIT right now." />
          <Reveal>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap', marginBottom: 36 }}>
              <h2 id="present-title" className="display-l">Present<br />committee.</h2>
              <p className="mono-meta" style={{ color: 'var(--blue)' }}>{String(core2627.length).padStart(2, '0')} members · 01 president</p>
            </div>
          </Reveal>

          {presentMatches.length === 0 ? (
            <p style={{ color: 'var(--muted)', fontSize: 15 }}>No matches in the present committee for “{query}”.</p>
          ) : searching ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }} className="team-grid-page">
              {presentMatches.map((m, i) => (
                <TeamCard key={m.name} member={m} index={i} />
              ))}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              {treePresident && <TeamCard member={treePresident} index={0} isHighlighted />}
              <div className="hrow hrow-narrow">
                {treeGs && <TeamCard member={treeGs} index={1} />}
                {treeMd && <TeamCard member={treeMd} index={2} />}
              </div>
              <div className="hrow hrow-narrow">
                {treeTreasurer && <TeamCard member={treeTreasurer} index={3} />}
                {treeVp && <TeamCard member={treeVp} index={4} />}
              </div>
              <div className="hrow hrow-narrow">
                {treeJt.map((m, i) => (
                  <TeamCard key={m.name} member={m} index={5 + i} />
                ))}
              </div>
              <div className="hrow hrow-single">
                {treeSme && <TeamCard member={treeSme} index={7} />}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ═══ 03–05 / ARCHIVE  past format preserved (collapsible) ═══ */}
      {archives.map(({ id, no, year, title, note, members, full }) => {
        const isOpen = searching ? true : (openSections[id] ?? false);
        const anchor = id === 'core_25_26' ? 'archive-2526' : id === 'core_24_25' ? 'archive-2425' : 'archive-2324';
        return (
          <section key={id} id={anchor} aria-labelledby={`${id}-title`} className="section-pad rule-top" style={{ background: 'var(--bg)', scrollMarginTop: 160 }}>
            <div className="container-editorial">
              <SectionHead no={no} label={`Archive · ${year}`} hint={note} />
              <button
                type="button"
                onClick={() => toggle(id)}
                aria-expanded={isOpen}
                aria-controls={`${id}-panel`}
                style={{
                  width: '100%', background: 'transparent', border: 0, cursor: 'pointer', textAlign: 'left',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20, padding: '8px 0 28px',
                }}
              >
                <span>
                  <span id={`${id}-title`} style={{ display: 'block', fontSize: 'clamp(30px, 4.4vw, 58px)', textTransform: 'uppercase', lineHeight: 0.95 }}>{title}.</span>
                  <span className="mono-meta" style={{ display: 'block', marginTop: 12, color: 'var(--muted)' }}>
                    {searching ? `${String(members.length).padStart(2, '0')} match${members.length === 1 ? '' : 'es'}` : `${String(full.length).padStart(2, '0')} members`} · {isOpen ? 'Collapse' : 'Expand'}
                  </span>
                </span>
                <span style={{ width: 48, height: 48, border: '1px solid var(--text)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, background: isOpen ? 'var(--text)' : 'transparent', color: isOpen ? 'var(--accent)' : 'var(--text)', transition: 'background 200ms ease' }}>
                  <ChevronDown size={20} style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 250ms ease' }} />
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`${id}-panel`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    style={{ overflow: 'hidden' }}
                  >
                    {members.length === 0 ? (
                      <p style={{ color: 'var(--muted)', fontSize: 15, paddingBottom: 8 }}>No matches in {year} for “{query}”.</p>
                    ) : (
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, paddingBottom: 8 }} className="team-grid-page">
                        {members.map((m, i) => (
                          <TeamCard key={m.name} member={m} index={i} />
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </section>
        );
      })}

      {/* ═══ 06 / LEADERSHIP LINE ═══ */}
      <section aria-labelledby="line-title" className="section-pad rule-top" style={{ background: 'var(--surface)' }}>
        <div className="container-editorial">
          <SectionHead no="06" label="The Leadership Line" hint="Four committees. One continuous thread  each core hands the line to the next." />
          <Reveal>
            <h2 id="line-title" className="display-l" style={{ marginBottom: 40 }}>One line,<br />handed over.</h2>
          </Reveal>
          <ol style={{ listStyle: 'none', margin: 0, padding: 0, position: 'relative' }}>
            <span aria-hidden="true" style={{ position: 'absolute', left: 11, top: 8, bottom: 8, width: 2, background: 'var(--blue)' }} />
            {[
              { n: '01', year: '2023–2024', count: core2324.length, text: 'Foundation  systems, culture and first momentum.', names: core2324.map((m) => m.name).join(' · ') },
              { n: '02', year: '2024–2025', count: core2425.length, text: 'Scale  bigger SYNERGY, sharper execution.', names: core2425.map((m) => m.name).join(' · ') },
              { n: '03', year: '2025–2026', count: core2526.length, text: 'Momentum  leadership · execution · excellence.', names: core2526.map((m) => m.name).join(' · ') },
              { n: '04', year: '2026–2027', count: core2627.length, text: 'Present  the new committee carrying the line.', names: core2627.map((m) => m.name).join(' · ') },
            ].map((j, i, arr) => (
              <Reveal key={j.n} delay={Math.min(i * 0.05, 0.15)}>
                <li style={{ position: 'relative', display: 'grid', gridTemplateColumns: '64px 1fr', gap: 20, padding: '22px 0', borderTop: i === 0 ? '1px solid var(--border)' : 'none', borderBottom: '1px solid var(--border)' }}>
                  <span aria-hidden="true" style={{ width: 24, height: 24, border: '1px solid var(--text)', background: i === arr.length - 1 ? 'var(--accent)' : 'var(--bg)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-utility)', fontSize: 11, fontWeight: 700, zIndex: 1 }}>
                    {j.n}
                  </span>
                  <div style={{ display: 'grid', gridTemplateColumns: 'minmax(220px, 320px) 1fr', gap: 16 }} className="event-detail-grid">
                    <h3 style={{ fontSize: 20, textTransform: 'uppercase' }}>
                      <span style={{ color: 'var(--muted)', fontFamily: 'var(--font-utility)', fontSize: 11, display: 'block', letterSpacing: '0.12em', marginBottom: 6 }}>{j.year} · {String(j.count).padStart(2, '0')} members</span>
                      {j.text}
                    </h3>
                    <p style={{ fontFamily: 'var(--font-utility)', fontSize: 12, letterSpacing: '0.04em', lineHeight: 2, color: 'var(--muted)', textTransform: 'uppercase' }}>{j.names}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ═══ 07 / JOIN · finale ═══ */}
      <section aria-labelledby="join-title" className="section-dark section-pad" style={{ position: 'relative' }}>
        <div aria-hidden="true" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'var(--blue)' }} />
        <div className="container-editorial">
          <SectionHead no="07" label="Join the team" dark />
          <Reveal>
            <h2 id="join-title" className="display-l" style={{ maxWidth: 1000 }}>
              Want to be next<span style={{ color: 'var(--accent)' }}>?</span>
            </h2>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 48, marginTop: 36 }} className="about-grid">
            <Reveal>
              <p className="editorial-serif" style={{ fontSize: 'clamp(20px, 2.4vw, 28px)', lineHeight: 1.45, maxWidth: 560 }}>
                Recruitment opens every semester. Build with us  and hand the line over, stronger.
              </p>
              <ul style={{ listStyle: 'none', margin: '28px 0 0', padding: 0, display: 'grid', gap: 0, borderTop: '1px solid rgba(244,241,232,0.18)' }}>
                {['Learn by building real things.', 'Lead events people remember.', 'Join a line of leaders since 2023.'].map((t) => (
                  <li key={t} style={{ display: 'flex', gap: 16, alignItems: 'baseline', padding: '14px 0', borderBottom: '1px solid rgba(244,241,232,0.18)', fontSize: 16, color: 'var(--paper)' }}>
                    <span aria-hidden="true" style={{ color: 'var(--accent)' }}>→</span> {t}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.1}>
              <div style={{ border: '1px solid rgba(244,241,232,0.25)', padding: 32 }}>
                <p className="mono-meta" style={{ marginBottom: 14 }}>Recruitment</p>
                <p style={{ fontSize: 22, fontWeight: 800, textTransform: 'uppercase' }}>Cross the line.</p>
                <p style={{ marginTop: 12, color: 'rgba(244,241,232,0.7)', fontSize: 14.5, lineHeight: 1.75 }}>
                  Applications open every semester. Tell us what you want to build  technical, design, events or media.
                </p>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 24 }}>
                  <Link href="/join" className="btn-editorial btn-on-dark">
                    Apply now <ArrowRight size={15} aria-hidden="true" />
                  </Link>
                  <Link href="/contact" className="btn-ghost btn-ghost-on-dark">
                    Contact <ArrowUpRight size={15} aria-hidden="true" />
                  </Link>
                </div>
                <p style={{ marginTop: 20, fontFamily: 'var(--font-utility)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(244,241,232,0.5)', lineHeight: 2 }}>
                  ABIT · RGIT, Andheri West
                </p>
              </div>
            </Reveal>
          </div>
          <Reveal>
            <div aria-label="Team journey" style={{ marginTop: 64, borderTop: '1px solid rgba(244,241,232,0.18)', paddingTop: 24, display: 'flex', flexWrap: 'wrap', gap: '10px 20px', fontFamily: 'var(--font-utility)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(244,241,232,0.6)' }}>
              <span>Discover</span><span aria-hidden="true">→</span>
              <span>Build</span><span aria-hidden="true">→</span>
              <span>Lead</span><span aria-hidden="true">→</span>
              <span>Hand over</span><span aria-hidden="true">→</span>
              <span style={{ color: 'var(--paper)' }}>Go Beyond.</span>
            </div>
          </Reveal>
        </div>
      </section>

      <style jsx global>{`
        .team-grid-page { grid-template-columns: repeat(3, 1fr); }
        .mentors-grid-page { grid-template-columns: repeat(3, 1fr); }
        .hero-fig-label { display: block; }
        @media (min-width: 900px) {
          .hero-fig-label { display: inline; }
        }
        @media (max-width: 1024px) {
          .team-grid-page, .mentors-grid-page { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .team-grid-page, .mentors-grid-page { grid-template-columns: 1fr !important; }
        }

        /* ── Hierarchy rows · GS block runs large, narrows down the line ── */
        .hrow { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        .hrow-narrow { width: 100%; max-width: 840px; margin: 0 auto; }
        .hrow-single { width: 100%; max-width: 400px; margin: 0 auto; grid-template-columns: 1fr; }
        @media (max-width: 768px) {
          .hrow { grid-template-columns: 1fr; }
          .hrow-narrow { max-width: 480px; }
        }

        /* ── President spotlight · never overflow the viewport ── */
        .president-card { min-width: 0; max-width: 100%; }
        .president-card > div { min-width: 0; }
        @media (max-width: 820px) {
          .president-card { grid-template-columns: 1fr !important; }
          .president-photo-wrap { min-height: 300px !important; }
          .president-copy { padding: 24px 20px !important; }
          .president-name { font-size: clamp(26px, 8vw, 34px) !important; }
          .president-count { margin-left: 0 !important; }
        }
      `}</style>
    </div>
  );
}
