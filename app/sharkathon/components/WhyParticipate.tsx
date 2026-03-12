'use client';

import { motion } from 'framer-motion';
import { Lightbulb, TrendingUp, Users, ShieldCheck } from 'lucide-react';

const reasons = [
    {
        icon: Lightbulb,
        title: 'Mentorship',
        description: 'Get one-on-one guidance from seasoned entrepreneurs and industry experts.'
    },
    {
        icon: TrendingUp,
        title: 'Funding Opportunities',
        description: 'Stand a chance to secure exclusive seed funding from top VC firms.'
    },
    {
        icon: Users,
        title: 'Networking',
        description: 'Connect with like-minded innovators, potential co-founders, and investors.'
    },
    {
        icon: ShieldCheck,
        title: 'Validation',
        description: 'Test your ideas in front of a real audience and get instant market feedback.'
    }
];

export default function WhyParticipate() {
    return (
        <section style={{
            padding: '100px 24px',
            background: 'linear-gradient(180deg, #110505 0%, #030101 100%)',
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                    <h2 style={{
                        fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)',
                        fontSize: 'clamp(32px, 5vw, 48px)',
                        fontWeight: 800,
                        color: 'white',
                    }}>
                        Why Participate?
                    </h2>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '30px'
                }}>
                    {reasons.map((r, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            style={{
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(255, 0, 0, 0.1)',
                                borderRadius: '20px',
                                padding: '32px',
                                textAlign: 'center'
                            }}
                        >
                            <div style={{
                                width: '60px',
                                height: '60px',
                                borderRadius: '15px',
                                background: 'linear-gradient(135deg, rgba(255, 106, 0, 0.2), rgba(255, 0, 0, 0.2))',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 24px',
                                color: '#FF6A00'
                            }}>
                                <r.icon size={28} />
                            </div>
                            <h3 style={{ color: 'white', fontSize: '20px', fontWeight: 600, marginBottom: '12px', fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)' }}>
                                {r.title}
                            </h3>
                            <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
                                {r.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
