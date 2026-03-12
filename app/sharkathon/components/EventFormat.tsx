'use client';

import { motion } from 'framer-motion';
import { Target, Users, Presentation, Award } from 'lucide-react';

const phases = [
    {
        icon: Users,
        title: 'Elimination Round',
        description: '20 teams shortlisted through online registrations will be invited to present an overview of their idea/project through presentations to the panel. The time limit for the first pitch will be 5 minutes maximum.',
        duration: 'Stage 1'
    },
    {
        icon: Presentation,
        title: 'Final Round',
        description: 'Out of the 20 teams, 5 teams will be selected for the final round. Teams will pitch in detail in a 10-minute timeframe, where judges will ask detailed questions based on point schema.',
        duration: 'Stage 2'
    },
    {
        icon: Target,
        title: 'Requirement',
        description: 'Prepare a presentation for overview of the project/idea in the elimination round. Prepare an assessment/report of the project/idea.',
        duration: 'Deliverables'
    },
    {
        icon: Award,
        title: 'Investment & Awards',
        description: 'Top 3 ideas will receive cash prize, vouchers, and guaranteed 1 month technical internship opportunity.',
        duration: 'Results'
    }
];

export default function EventFormat() {
    return (
        <section style={{
            padding: '100px 24px',
            background: '#030101',
            position: 'relative',
        }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                    <h2 style={{
                        fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)',
                        fontSize: 'clamp(32px, 5vw, 48px)',
                        fontWeight: 800,
                        color: 'white',
                    }}>
                        Event Format
                    </h2>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {phases.map((phase, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            style={{
                                background: 'rgba(255,255,255,0.02)',
                                border: '1px solid rgba(255, 255, 255, 0.05)',
                                borderRadius: '16px',
                                padding: '32px',
                                display: 'flex',
                                gap: '24px',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                        >
                            <div style={{
                                width: '64px',
                                height: '64px',
                                flexShrink: 0,
                                borderRadius: '16px',
                                background: 'rgba(255, 0, 0, 0.1)',
                                color: '#FF6A00',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <phase.icon size={32} />
                            </div>
                            
                            <div>
                                <span style={{
                                    display: 'inline-block',
                                    fontSize: '12px',
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                    color: '#FF6A00',
                                    marginBottom: '8px'
                                }}>
                                    {phase.duration}
                                </span>
                                <h3 style={{
                                    color: 'white',
                                    fontSize: '22px',
                                    fontWeight: 600,
                                    marginBottom: '12px',
                                    fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)'
                                }}>
                                    {phase.title}
                                </h3>
                                <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
                                    {phase.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
