'use client';

import { motion } from 'framer-motion';
import { Linkedin, Github, User } from 'lucide-react';
import Image from 'next/image';
import type { TeamMember } from '../data/team';

interface TeamCardProps {
    member: TeamMember;
    index?: number;
    isHighlighted?: boolean;
}

const teamColorMap: Record<string, string> = {
    core: '#FFFFFF',
    technical: '#10B981',
    design: '#8B5CF6',
    events: '#F59E0B',
    media: '#EF4444',
};

export default function TeamCard({ member, index = 0, isHighlighted = false }: TeamCardProps) {
    const color = teamColorMap[member.team] || '#FFFFFF';
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: index * 0.08, duration: 0.5 }}
            whileHover={{ y: -6, borderColor: '#FF6A00', boxShadow: '0 10px 30px rgba(255, 106, 0, 0.15)' }}
            style={{
                background: isHighlighted ? 'rgba(255, 106, 0, 0.05)' : '#111111',
                border: isHighlighted ? '2px solid #FF6A00' : '1px solid rgba(255, 106, 0, 0.2)',
                borderRadius: '24px',
                padding: isHighlighted ? '48px 32px' : '28px 24px',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'default',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px',
            }}
        >
            {/* Background glow on hover */}
            <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: `radial-gradient(ellipse at 50% 0%, ${color}12 0%, transparent 70%)`,
                    pointerEvents: 'none',
                }}
            />

            {/* Top accent line */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '60px',
                height: '2px',
                background: color,
                borderRadius: '0 0 2px 2px',
            }} />

            {/* Avatar */}
            <div style={{
                width: isHighlighted ? 120 : 80,
                height: isHighlighted ? 120 : 80,
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${color}30, ${color}10)`,
                border: `2px solid ${color}40`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                flexShrink: 0,
                overflow: 'hidden',
            }}>
                {member.image ? (
                    <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes={isHighlighted ? "120px" : "80px"}
                    />
                ) : (
                    <User size={isHighlighted ? 48 : 36} color={color} />
                )}
            </div>

            {/* Name */}
            <div>
                <h3 style={{
                    fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)',
                    fontSize: isHighlighted ? '24px' : '17px',
                    fontWeight: 800,
                    color: 'white',
                    letterSpacing: '-0.01em',
                    marginBottom: '4px',
                }}>
                    {member.name}
                </h3>
                <p style={{
                    color: color,
                    fontSize: isHighlighted ? '16px' : '13px',
                    fontWeight: 700,
                    letterSpacing: '0.02em',
                }}>
                    {member.role}
                </p>
            </div>

            {/* Bio */}
            {member.bio && (
                <p style={{
                    color: 'rgba(255,255,255,0.6)',
                    fontSize: isHighlighted ? '15px' : '13px',
                    lineHeight: 1.6,
                    textAlign: 'center',
                    maxWidth: isHighlighted ? '400px' : 'auto',
                }}>
                    {member.bio}
                </p>
            )}

            {/* Social links */}
            <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                {member.linkedin && (
                    <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        style={{
                            width: 34,
                            height: 34,
                            borderRadius: '8px',
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'rgba(255,255,255,0.5)',
                            transition: 'all 0.2s ease',
                            textDecoration: 'none',
                        }}
                        onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.color = '#A3A3A3';
                            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(163, 163, 163, 0.3)';
                            (e.currentTarget as HTMLElement).style.background = 'rgba(255, 255, 255, 0.12)';
                        }}
                        onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)';
                            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
                            (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)';
                        }}
                    >
                        <Linkedin size={15} />
                    </a>
                )}
                {member.github && (
                    <a
                        href={member.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                        style={{
                            width: 34,
                            height: 34,
                            borderRadius: '8px',
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'rgba(255,255,255,0.5)',
                            transition: 'all 0.2s ease',
                            textDecoration: 'none',
                        }}
                        onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.color = 'white';
                            (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)';
                        }}
                        onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)';
                            (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)';
                        }}
                    >
                        <Github size={15} />
                    </a>
                )}
            </div>
        </motion.div>
    );
}
