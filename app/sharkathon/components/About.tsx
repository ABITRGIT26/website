'use client';

import { motion } from 'framer-motion';

export default function About() {
    return (
        <section style={{
            padding: '100px 24px',
            background: '#030811',
            position: 'relative'
        }}>
            <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span style={{ 
                        display: 'inline-block', 
                        color: '#00B4DB', 
                        fontWeight: 600, 
                        letterSpacing: '0.1em', 
                        textTransform: 'uppercase', 
                        marginBottom: '16px' 
                    }}>
                        The Origin
                    </span>
                    <h2 style={{
                        fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)',
                        fontSize: 'clamp(32px, 5vw, 48px)',
                        fontWeight: 800,
                        color: 'white',
                        marginBottom: '32px',
                        lineHeight: 1.2
                    }}>
                        What is Sharkathon?
                    </h2>
                    <p style={{
                        color: 'rgba(255,255,255,0.7)',
                        fontSize: '18px',
                        lineHeight: 1.8,
                        marginBottom: '24px'
                    }}>
                        Shark-A-Thon is a high-stakes startup pitch competition where bold thinkers present their ideas to a panel of industry experts and investors. Inspired by the spirit of Dream Big, this stage is where imagination meets opportunity.
                    </p>
                    <p style={{
                        color: 'rgba(255,255,255,0.7)',
                        fontSize: '18px',
                        lineHeight: 1.8
                    }}>
                        Pitch your vision, challenge the sharks, and prove your idea deserves to become the next big success. Because every groundbreaking venture begins the same way: "with someone daring to dream bigger".
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
