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
    <div
      style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(stats.length, 4)}, 1fr)`, gap: 0, border: '1px solid var(--border)' }}
      className="stats-grid"
    >
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
            borderLeft: i === 0 ? 'none' : '1px solid var(--border)',
            background: 'var(--bg)',
          }}
        >
          <div
            style={{
              fontSize: 'clamp(36px, 5vw, 52px)',
              fontWeight: 800,
              fontFamily: 'var(--font-display)',
              color: 'var(--text)',
              letterSpacing: '-0.03em',
              lineHeight: 1,
              marginBottom: 8,
            }}
          >
            <Counter value={stat.value} suffix={stat.suffix} />
          </div>
          <div
            style={{
              fontFamily: 'var(--font-utility)',
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
            }}
          >
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
