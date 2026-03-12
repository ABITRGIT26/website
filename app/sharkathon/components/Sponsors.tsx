'use client';

import { motion } from 'framer-motion';

const sponsorsList = [
    { name: 'Platinum Sponsor', level: 'Platinum' },
    { name: 'Gold Sponsor', level: 'Gold' },
    { name: 'Incubation Partner', level: 'Partner' },
    { name: 'Cloud Partner', level: 'Partner' }
];

export default function Sponsors() {
    return (
        <section style={{
            padding: '100px 24px',
            background: 'linear-gradient(180deg, #110505 0%, #030101 100%)',
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
                <h2 style={{
                    fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)',
                    fontSize: 'clamp(32px, 5vw, 48px)',
                    fontWeight: 800,
                    color: 'white',
                    marginBottom: '16px'
                }}>
                    Our Sponsors
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '18px', marginBottom: '60px' }}>
                    Backed by industry leaders who believe in student innovation.
                </p>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '24px'
                }}>
                    {sponsorsList.map((sponsor, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            style={{
                                background: 'rgba(255,255,255,0.02)',
                                border: '1px solid rgba(255,255,255,0.05)',
                                borderRadius: '16px',
                                padding: '40px 24px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <div style={{
                                width: '120px',
                                height: '120px',
                                borderRadius: '50%',
                                background: 'rgba(255,255,255,0.05)',
                                marginBottom: '24px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'rgba(255,255,255,0.2)'
                            }}>
                                Logo Here
                            </div>
                            <h3 style={{ color: 'white', fontWeight: 600, fontSize: '18px', marginBottom: '4px' }}>{sponsor.name}</h3>
                            <p style={{ color: '#FF6A00', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>{sponsor.level}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
