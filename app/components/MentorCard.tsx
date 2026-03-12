'use client';

import { motion } from 'framer-motion';
import { Quote, User } from 'lucide-react';
import Image from 'next/image';
import type { Mentor } from '../data/team';

interface MentorCardProps {
    mentor: Mentor;
    index?: number;
}

export default function MentorCard({ mentor, index = 0 }: MentorCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ y: -6, borderColor: '#FF6A00', boxShadow: '0 10px 30px rgba(255, 106, 0, 0.15)' }}
            style={{
                background: '#111111',
                border: '1px solid rgba(255, 106, 0, 0.2)',
                borderRadius: '20px',
                padding: '32px 28px',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                transition: 'all 0.3s ease',
            }}
        >
            {/* Top-left accent glow */}
            <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '150px',
                    height: '150px',
                    background: 'radial-gradient(circle at 0 0, rgba(255, 106, 0, 0.15) 0%, transparent 70%)',
                    pointerEvents: 'none',
                }}
            />

            {/* Top accent line */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: '28px',
                width: '60px',
                height: '2px',
                background: '#FF6A00',
                borderRadius: '0 0 2px 2px',
            }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{
                    width: 72,
                    height: 72,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, rgba(255,106,0,0.2), rgba(255,106,0,0.05))',
                    border: '2px solid rgba(255,106,0,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    flexShrink: 0,
                    overflow: 'hidden',
                }}>
                    {mentor.image ? (
                        <Image
                            src={mentor.image}
                            alt={mentor.name}
                            fill
                            style={{ objectFit: 'cover' }}
                            sizes="72px"
                        />
                    ) : (
                        <User size={32} color="#FF6A00" />
                    )}
                </div>
                
                <div>
                    <h3 style={{
                        fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)',
                        fontSize: '18px',
                        fontWeight: 700,
                        color: 'white',
                        letterSpacing: '-0.01em',
                        marginBottom: '6px',
                    }}>
                        {mentor.name}
                    </h3>
                    <div style={{
                        display: 'inline-flex',
                        background: 'rgba(255,106,0,0.1)',
                        border: '1px solid rgba(255,106,0,0.2)',
                        padding: '4px 12px',
                        borderRadius: '100px',
                        color: '#F97316',
                        fontSize: '11px',
                        fontWeight: 700,
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase',
                    }}>
                        {mentor.role}
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
                <Quote size={20} color="rgba(255,106,0,0.4)" style={{ flexShrink: 0, marginTop: '2px', transform: 'scaleX(-1)' }} />
                <p style={{
                    fontFamily: 'var(--font-playfair, Playfair Display, serif)',
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: '15px',
                    lineHeight: 1.6,
                    fontStyle: 'italic',
                }}>
                    &ldquo;{mentor.quote}&rdquo;
                </p>
            </div>
        </motion.div>
    );
}
