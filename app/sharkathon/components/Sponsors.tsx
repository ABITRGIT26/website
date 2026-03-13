'use client';

import { motion } from 'framer-motion';

const sponsors = {
    // platinum: [
    //     { name: 'Coming Soon', logo: '' }
    // ],
    // gold: [
    //     { name: 'Coming Soon', logo: '' }
    // ],
    // partners: [
    //     { name: 'Incubation Partner', logo: '' },
    //     { name: 'Cloud Partner', logo: '' }
    // ],
    media: [
        { name: 'SN FYI', logo: '/snfyi.png', role: 'Media Publicity Marketing Partner' }
    ]
};

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

                <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
                    {/* Media Partner Section */}
                    <div>
                        <h3 style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '32px', fontWeight: 600 }}>Media Publicity Marketing Partner</h3>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            {sponsors.media.map((sponsor, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5 }}
                                    style={{
                                        background: 'rgba(255,255,255,0.02)',
                                        border: '1px solid rgba(255,255,255,0.05)',
                                        borderRadius: '16px',
                                        padding: '32px 48px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: '16px',
                                        maxWidth: '300px'
                                    }}
                                >
                                    <img src={sponsor.logo} alt={sponsor.name} style={{ height: '60px', width: 'auto' }} />
                                    <span style={{ color: 'white', fontWeight: 600, fontSize: '18px' }}>{sponsor.name}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
