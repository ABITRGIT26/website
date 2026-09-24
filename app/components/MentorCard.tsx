'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import type { Mentor } from '../data/team';

interface MentorCardProps {
  mentor: Mentor;
  index?: number;
}

/**
 * Editorial mentor card  same past format (photo + name + role + quote),
 * restyled to SYNERGY 2027: paper surface, 1px border, serif quote,
 * numbered mono-meta + cobalt rule.
 */
export default function MentorCard({ mentor, index = 0 }: MentorCardProps) {
  const num = String(index + 1).padStart(2, '0');
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="mentor-card"
      style={{
        background: 'var(--bg)',
        border: '1px solid var(--border)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <span aria-hidden="true" style={{ position: 'absolute', top: 0, left: 0, width: 64, height: 2, background: 'var(--blue)' }} />
      <div style={{ position: 'relative', aspectRatio: '1 / 1', background: 'var(--surface)', overflow: 'hidden', borderBottom: '1px solid var(--border)' }}>
        {mentor.image ? (
          <Image
            src={mentor.image}
            alt={mentor.name}
            fill
            sizes="(max-width: 768px) 100vw, 360px"
            style={{ objectFit: 'cover', objectPosition: 'center top' }}
            loading="lazy"
          />
        ) : null}
        <span aria-hidden="true" style={{ position: 'absolute', top: 12, left: 12, fontFamily: 'var(--font-utility)', fontSize: 10, letterSpacing: '0.14em', background: 'rgba(16,16,16,0.78)', color: 'var(--paper)', padding: '5px 9px' }}>
          {num} / Mentor
        </span>
      </div>
      <div style={{ padding: '24px 24px 22px', display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
        <h3 style={{ fontSize: 20, textTransform: 'uppercase', lineHeight: 1.05 }}>{mentor.name}</h3>
        <p style={{ display: 'inline-flex', alignSelf: 'flex-start', border: '1px solid var(--border)', padding: '5px 10px', fontFamily: 'var(--font-utility)', fontSize: 10.5, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--blue)' }}>
          {mentor.role}
        </p>
        <p className="editorial-serif" style={{ fontSize: 17, fontStyle: 'italic', lineHeight: 1.55, color: 'var(--muted)' }}>
          “{mentor.quote}”
        </p>
        <span aria-hidden="true" style={{ marginTop: 'auto', paddingTop: 16, display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-utility)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', borderTop: '1px solid var(--border)' }}>
          <span style={{ display: 'inline-block', width: 32, height: 1, background: 'var(--blue)' }} /> Guidance · ABIT
        </span>
      </div>
      <style jsx>{`
        .mentor-card { transition: border-color 200ms ease, transform 200ms ease; }
        .mentor-card:hover { border-color: var(--text); transform: translateY(-2px); }
        .mentor-card img { filter: grayscale(0.35) contrast(1.03); transition: filter 400ms ease, transform 600ms cubic-bezier(0.22,1,0.36,1); }
        .mentor-card:hover img { filter: grayscale(0); transform: scale(1.02); }
      `}</style>
    </motion.article>
  );
}
