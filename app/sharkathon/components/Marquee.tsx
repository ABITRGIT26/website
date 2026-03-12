'use client';

import { motion } from 'framer-motion';

export default function Marquee() {
    return (
        <div style={{
            background: '#FF0000',
            padding: '20px 0',
            overflow: 'hidden',
            display: 'flex',
            whiteSpace: 'nowrap',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            transform: 'rotate(-2deg) scale(1.05)',
            boxShadow: '0 10px 30px rgba(255, 0, 0, 0.2)',
            zIndex: 10,
            position: 'relative'
        }}>
            <motion.div
                animate={{ x: [0, -1035] }}
                transition={{ repeat: Infinity, ease: 'linear', duration: 15 }}
                style={{
                    display: 'flex',
                    gap: '40px',
                    fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)',
                    fontSize: 'clamp(24px, 4vw, 36px)',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    color: 'white',
                    letterSpacing: '0.05em'
                }}
            >
                {/* Repeat enough times to cover screen and animation distance */}
                {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
                        <span>DREAM BIG</span>
                        <span style={{ color: '#110505' }}>•</span>
                        <span>PITCH INNOVATE</span>
                        <span style={{ color: '#110505' }}>•</span>
                        <span>DOMINATE</span>
                        <span style={{ color: '#110505' }}>•</span>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
