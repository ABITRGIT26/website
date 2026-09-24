'use client';

import { motion } from 'framer-motion';
import { Linkedin, Github, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import type { TeamMember } from '../data/team';

interface TeamCardProps {
  member: TeamMember;
  index?: number;
  isHighlighted?: boolean;
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function PlaceholderFace({ name, large = false }: { name: string; large?: boolean }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'var(--surface)',
        backgroundImage:
          'linear-gradient(rgba(16,16,16,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(16,16,16,0.06) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 900,
          fontSize: large ? 'clamp(72px, 9vw, 128px)' : 56,
          letterSpacing: '-0.03em',
          lineHeight: 1,
          color: 'transparent',
          WebkitTextStroke: '1.5px var(--muted)',
        }}
      >
        {initials(name)}
      </span>
      <span
        style={{
          position: 'absolute', bottom: 12, right: 12,
          fontFamily: 'var(--font-utility)', fontSize: 9.5, letterSpacing: '0.14em',
          textTransform: 'uppercase', color: 'var(--muted)',
          border: '1px solid var(--border)', background: 'var(--bg)', padding: '4px 8px',
        }}
      >
        Photo soon
      </span>
    </div>
  );
}
export default function TeamCard({ member, index = 0, isHighlighted = false }: TeamCardProps) {
  const num = String(index + 1).padStart(2, '0');

  if (isHighlighted) {
    return (
      <motion.article
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="president-card"
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(280px, 380px) 1fr',
          border: '1px solid var(--text)',
          background: 'var(--bg)',
          position: 'relative',
        }}
      >
        {/* cobalt threshold line */}
        <span aria-hidden="true" style={{ position: 'absolute', top: -1, left: -1, right: -1, height: 2, background: 'var(--blue)' }} />
        <div style={{ position: 'relative', minHeight: 380, background: 'var(--surface)', overflow: 'hidden' }}>
          {member.image ? (
            <Image
              src={member.image}
              alt={member.name}
              fill
              sizes="(max-width: 768px) 100vw, 380px"
              style={{ objectFit: 'cover' }}
              className="president-photo"
              priority={false}
            />
          ) : (
            <PlaceholderFace name={member.name} large />
          )}
          <span
            aria-hidden="true"
            style={{
              position: 'absolute', left: 16, bottom: 14,
              fontFamily: 'var(--font-utility)', fontSize: 10, letterSpacing: '0.14em',
              textTransform: 'uppercase', color: '#fff',
              background: 'rgba(16,16,16,0.72)', padding: '6px 10px',
            }}
          >
            01 / {member.role}  Present committee
          </span>
        </div>
        <div style={{ padding: 'clamp(24px, 4vw, 48px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <p className="mono-meta" style={{ marginBottom: 14 }}>
            <span aria-hidden="true" style={{ display: 'inline-block', width: 8, height: 8, background: 'var(--accent)', marginRight: 10, verticalAlign: 1 }} />
            Present committee · Leadership
          </p>
          <h3 style={{ fontSize: 'clamp(28px, 3.4vw, 44px)', textTransform: 'uppercase', lineHeight: 0.95, marginBottom: 8 }}>
            {member.name}
          </h3>
          <p style={{ fontFamily: 'var(--font-utility)', fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--blue)', fontWeight: 700, marginBottom: 16 }}>
            {member.role}
          </p>
          {member.bio && (
            <p className="editorial-serif" style={{ fontSize: 'clamp(18px, 2vw, 22px)', fontStyle: 'italic', lineHeight: 1.5, color: 'var(--text)', maxWidth: 480 }}>
              “{member.bio}”
            </p>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 24 }}>
            {member.linkedin && member.linkedin !== '#' && (
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} on LinkedIn`}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontWeight: 700, fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text)', textDecoration: 'none' }}>
                <span style={{ width: 34, height: 34, border: '1px solid var(--border)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Linkedin size={15} strokeWidth={1.75} />
                </span>
                LinkedIn <ArrowUpRight size={14} />
              </a>
            )}
            {member.github && member.github !== '#' && (
              <a href={member.github} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} on GitHub`}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontWeight: 700, fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text)', textDecoration: 'none' }}>
                <span style={{ width: 34, height: 34, border: '1px solid var(--border)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Github size={15} strokeWidth={1.75} />
                </span>
                GitHub <ArrowUpRight size={14} />
              </a>
            )}
            <span aria-hidden="true" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginLeft: 'auto', color: 'var(--muted)', fontFamily: 'var(--font-utility)', fontSize: 11, letterSpacing: '0.12em' }}>
              <span style={{ display: 'inline-block', width: 56, height: 1, background: 'var(--blue)' }} /> 01
            </span>
          </div>
        </div>
        <style jsx>{`
          @media (max-width: 820px) {
            .president-card { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </motion.article>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: Math.min(index * 0.05, 0.3), duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="member-card"
      style={{
        background: 'var(--bg)',
        border: '1px solid var(--border)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* portrait  image-led, grayscale → colour */}
      <div style={{ position: 'relative', aspectRatio: '1 / 1', background: 'var(--surface)', overflow: 'hidden', borderBottom: '1px solid var(--border)' }}>
        {member.image ? (
          <Image
            src={member.image}
            alt={`${member.name}  ${member.role}`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 280px"
            style={{ objectFit: 'cover' }}
            loading="lazy"
          />
        ) : (
          <PlaceholderFace name={member.name} />
        )}
        {/* index + lime waypoint on hover */}
        <span
          aria-hidden="true"
          style={{
            position: 'absolute', top: 12, left: 12,
            fontFamily: 'var(--font-utility)', fontSize: 10, letterSpacing: '0.14em',
            background: 'rgba(16,16,16,0.78)', color: 'var(--paper)', padding: '5px 9px',
          }}
        >
          {num}
        </span>
        <span className="waypoint" aria-hidden="true" style={{ position: 'absolute', top: 12, right: 12, width: 8, height: 8, background: 'var(--accent)', opacity: 0, transform: 'scale(0.6)', transition: 'opacity 200ms ease, transform 200ms ease' }} />
      </div>

      <div style={{ padding: '20px 18px 18px', display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
        <h3 style={{ fontSize: 17, textTransform: 'uppercase', lineHeight: 1.1, letterSpacing: '-0.01em' }}>
          {member.name}
        </h3>
        <p style={{ fontFamily: 'var(--font-utility)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--blue)', fontWeight: 700 }}>
          {member.role}
        </p>
        {member.bio && (
          <p style={{ color: 'var(--muted)', fontSize: 13, lineHeight: 1.65, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {member.bio}
          </p>
        )}
        <div style={{ marginTop: 'auto', paddingTop: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border)' }}>
          <span className="dir" aria-hidden="true" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-utility)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)' }}>
            <span className="rule" style={{ display: 'inline-block', width: 28, height: 1, background: 'var(--blue)', transition: 'width 300ms ease' }} /> Profile
          </span>
          <span style={{ display: 'inline-flex', gap: 8 }}>
            {member.linkedin && member.linkedin !== '#' && (
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} on LinkedIn`}
                style={{ width: 30, height: 30, border: '1px solid var(--border)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)', textDecoration: 'none' }}>
                <Linkedin size={13} strokeWidth={1.75} />
              </a>
            )}
            {member.github && member.github !== '#' && (
              <a href={member.github} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} on GitHub`}
                style={{ width: 30, height: 30, border: '1px solid var(--border)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)', textDecoration: 'none' }}>
                <Github size={13} strokeWidth={1.75} />
              </a>
            )}
            {(!member.linkedin || member.linkedin === '#') && (!member.github || member.github === '#') && (
              <span aria-hidden="true" style={{ fontFamily: 'var(--font-utility)', fontSize: 10, letterSpacing: '0.12em', color: 'var(--border)' }}>ABIT</span>
            )}
          </span>
        </div>
      </div>

      <style jsx>{`
        .member-card { transition: border-color 200ms ease, transform 200ms ease; }
        .member-card:hover { border-color: var(--text); transform: translateY(-2px); }
        .member-card img { filter: grayscale(1) contrast(1.04); transition: filter 400ms ease, transform 600ms cubic-bezier(0.22,1,0.36,1); }
        .member-card:hover img { filter: grayscale(0); transform: scale(1.03); }
        .member-card:hover .waypoint { opacity: 1; transform: scale(1); }
        .member-card:hover .dir .rule { width: 48px; }
        @media (prefers-reduced-motion: reduce) {
          .member-card img { transition: none; }
        }
      `}</style>
    </motion.article>
  );
}
