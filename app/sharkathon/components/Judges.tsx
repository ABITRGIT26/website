'use client';

import { motion } from 'framer-motion';

const judges = [
    {
        name: 'Coming Soon',
        role: 'Venture Capitalist',
        company: 'Top Tier VC',
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80'
    },
    {
        name: 'Coming Soon',
        role: 'Tech Lead / Founder',
        company: 'Unicorn Startup',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80'
    },
    {
        name: 'Coming Soon',
        role: 'Angel Investor',
        company: 'Angel Network',
        image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=80'
    }
];

export default function Judges() {
    return (
        <section style={{
            padding: '100px 24px',
            background: '#030101',
            position: 'relative'
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                    <h2 style={{
                        fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)',
                        fontSize: 'clamp(32px, 5vw, 48px)',
                        fontWeight: 800,
                        color: 'white',
                        marginBottom: '16px'
                    }}>
                        Meet the Panel
                    </h2>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '18px' }}>
                        Pitch to industry leaders who can turn your vision into reality.
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                    gap: '40px'
                }}>
                    {judges.map((judge, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            style={{
                                background: 'rgba(255,255,255,0.02)',
                                border: '1px solid rgba(255,255,255,0.05)',
                                borderRadius: '20px',
                                overflow: 'hidden',
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            <div style={{ width: '100%', height: '300px', position: 'relative' }}>
                                <img 
                                    src={judge.image} 
                                    alt={judge.name} 
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(50%) contrast(1.2)' }}
                                />
                                <div style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    height: '50%',
                                    background: 'linear-gradient(to top, rgba(3, 1, 1, 1), transparent)'
                                }} />
                            </div>
                            <div style={{ padding: '24px', textAlign: 'center', flex: 1 }}>
                                <h3 style={{
                                    color: 'white',
                                    fontSize: '22px',
                                    fontWeight: 700,
                                    marginBottom: '8px',
                                    fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)'
                                }}>
                                    {judge.name}
                                </h3>
                                <p style={{ color: '#FF6A00', fontWeight: 600, fontSize: '15px', marginBottom: '4px' }}>
                                    {judge.role}
                                </p>
                                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>
                                    {judge.company}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
