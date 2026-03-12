'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface Stat {
    value: number;
    suffix: string;
    label: string;
    icon: string;
}

interface StatCounterProps {
    stats: Stat[];
}

function Counter({ value, suffix }: { value: number; suffix: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: '-100px' });

    useEffect(() => {
        if (!inView) return;
        let start = 0;
        const duration = 2000;
        const step = 16;
        const increment = value / (duration / step);
        const timer = setInterval(() => {
            start += increment;
            if (start >= value) {
                setCount(value);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, step);
        return () => clearInterval(timer);
    }, [inView, value]);

    return (
        <span ref={ref} style={{ fontVariantNumeric: 'tabular-nums' }}>
            {count.toLocaleString()}{suffix}
        </span>
    );
}

export default function StatsCounter({ stats }: StatCounterProps) {
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${Math.min(stats.length, 4)}, 1fr)`,
            gap: '24px',
        }} className="stats-grid">
            {stats.map((stat, i) => (
                <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ delay: i * 0.1, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                    style={{
                        textAlign: 'center',
                        padding: '32px 24px',
                        borderRadius: '20px',
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.07)',
                        backdropFilter: 'blur(10px)',
                        position: 'relative',
                        overflow: 'hidden',
                    }}
                    whileHover={{ scale: 1.02, borderColor: 'rgba(255, 255, 255, 0.3)' }}
                >
                    {/* Glow */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.08) 0%, transparent 70%)',
                        pointerEvents: 'none',
                    }} />
                    <div style={{ fontSize: '32px', marginBottom: '12px' }}>{stat.icon}</div>
                    <div style={{
                        fontSize: 'clamp(36px, 5vw, 52px)',
                        fontWeight: 800,
                        fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)',
                        background: 'linear-gradient(135deg, #FFFFFF, #A3A3A3)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        letterSpacing: '-0.03em',
                        lineHeight: 1,
                        marginBottom: '8px',
                    }}>
                        <Counter value={stat.value} suffix={stat.suffix} />
                    </div>
                    <div style={{
                        color: 'rgba(255,255,255,0.5)',
                        fontSize: '14px',
                        fontWeight: 500,
                        letterSpacing: '0.02em',
                    }}>
                        {stat.label}
                    </div>
                </motion.div>
            ))}
            <style jsx global>{`
        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
        </div>
    );
}
