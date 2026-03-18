'use client';

import { motion } from 'framer-motion';

const scheduleItem = [
    { date: '1st March 2026', title: 'Applications Open', description: 'Start forming teams and submit your initial startup ideas.' },
    { date: '21st March 2026', title: 'Registration Closes', description: 'Final deadline to submit your applications and pitch decks.' },
    { date: '22nd March 2026', title: 'Shortlist Announcement', description: 'Top ideas are selected to pitch in person at the RGIT campus.' },
    { date: '25th March 2026', title: 'Sharkathon Event', description: 'Pitch your ideas and compete for the final prize.' }
];

export default function Timeline() {
    return (
        <section style={{
            padding: '100px 24px',
            background: '#110505',
            position: 'relative'
        }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                    <h2 style={{
                        fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)',
                        fontSize: 'clamp(32px, 5vw, 48px)',
                        fontWeight: 800,
                        color: 'white',
                    }}>
                        Timeline
                    </h2>
                </div>

                <div style={{ position: 'relative' }}>
                    {/* Vertical line */}
                    <div style={{
                        position: 'absolute',
                        left: '0',
                        top: '0',
                        bottom: '0',
                        width: '2px',
                        background: 'linear-gradient(to bottom, rgba(255, 106, 0, 0), rgba(255, 106, 0, 0.5), rgba(255, 106, 0, 0))',
                        transform: 'translateX(15px)'
                    }} />

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
                        {scheduleItem.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                style={{
                                    display: 'flex',
                                    gap: '32px',
                                    position: 'relative'
                                }}
                            >
                                {/* Circle node */}
                                <div style={{
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '50%',
                                    background: '#110505',
                                    border: '2px solid #FF6A00',
                                    flexShrink: 0,
                                    zIndex: 10,
                                    boxShadow: '0 0 15px rgba(255, 106, 0, 0.4)'
                                }} />

                                <div>
                                    <h4 style={{
                                        color: '#FF6A00',
                                        fontSize: '14px',
                                        fontWeight: 700,
                                        letterSpacing: '0.05em',
                                        textTransform: 'uppercase',
                                        marginBottom: '8px'
                                    }}>
                                        {item.date}
                                    </h4>
                                    <h3 style={{
                                        color: 'white',
                                        fontSize: '22px',
                                        fontWeight: 600,
                                        marginBottom: '12px',
                                        fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)'
                                    }}>
                                        {item.title}
                                    </h3>
                                    <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
                                        {item.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
