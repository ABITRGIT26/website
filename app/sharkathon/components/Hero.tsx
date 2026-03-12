'use client';

import { motion } from 'framer-motion';
import { Rocket, Info } from 'lucide-react';

export default function SharkathonHero() {
    return (
        <section style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
            background: 'radial-gradient(ellipse at bottom, #110505 0%, #030101 100%)',
        }}>
            {/* Cinematic Red/Orange Effects */}
            <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                opacity: 0.15,
                backgroundImage: `radial-gradient(circle at 30% 50%, #FF0000 0%, transparent 50%), radial-gradient(circle at 70% 80%, #FF6A00 0%, transparent 50%)`,
                pointerEvents: 'none',
            }} />

            {/* Content */}
            <div style={{ 
                position: 'relative', 
                zIndex: 10, 
                textAlign: 'center', 
                maxWidth: '900px', 
                padding: '0 24px',
                marginTop: '80px' // offset for navbar
            }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                >
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: 'rgba(255, 0, 0, 0.1)',
                        border: '1px solid rgba(255, 0, 0, 0.2)',
                        padding: '8px 16px',
                        borderRadius: '100px',
                        color: '#FF6A00',
                        fontSize: '14px',
                        fontWeight: 600,
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase',
                        marginBottom: '32px',
                        fontFamily: 'var(--font-inter, Inter, sans-serif)',
                    }}>
                        <Rocket size={16} /> Idea to Pitch
                    </div>

                    <h1 style={{
                        fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)',
                        fontSize: 'clamp(50px, 8vw, 100px)',
                        fontWeight: 800,
                        color: 'white',
                        lineHeight: 1.1,
                        letterSpacing: '-0.04em',
                        marginBottom: '24px',
                        textTransform: 'uppercase'
                    }}>
                        Sharkathon 2026
                        <br />
                        <span style={{ 
                            background: 'linear-gradient(135deg, #FF6A00, #FF0000)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}>
                            Pitch. Innovate. Dominate.
                        </span>
                    </h1>

                    <p style={{
                        fontFamily: 'var(--font-playfair, Playfair Display, serif)',
                        fontSize: 'clamp(18px, 3vw, 24px)',
                        color: 'rgba(255,255,255,0.7)',
                        maxWidth: '700px',
                        margin: '0 auto 48px',
                        lineHeight: 1.5,
                        fontStyle: 'italic',
                    }}>
                        Pitch Your Startup Idea to Real Investors at India’s most exciting student startup competition.
                    </p>

                    <div style={{ 
                        display: 'flex', 
                        gap: '20px', 
                        justifyContent: 'center', 
                        flexWrap: 'wrap',
                        marginBottom: '60px'
                    }}>
                        <a href="#register" style={{ textDecoration: 'none' }}>
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(255, 0, 0, 0.3)' }}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    background: 'linear-gradient(135deg, #FF0000, #B30000)',
                                    color: 'white',
                                    border: 'none',
                                    padding: '16px 32px',
                                    borderRadius: '12px',
                                    fontSize: '16px',
                                    fontWeight: 700,
                                    fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                }}
                            >
                                <Rocket size={20} /> Register Now
                            </motion.button>
                        </a>
                        
                        <a href="#about" style={{ textDecoration: 'none' }}>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    background: 'rgba(255,255,255,0.05)',
                                    color: 'white',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    padding: '16px 32px',
                                    borderRadius: '12px',
                                    fontSize: '16px',
                                    fontWeight: 700,
                                    fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    backdropFilter: 'blur(10px)',
                                }}
                            >
                                <Info size={20} /> Learn More
                            </motion.button>
                        </a>
                    </div>

                    {/* Extras */}
                    <div style={{
                        display: 'flex',
                        gap: '40px',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        borderTop: '1px solid rgba(255,255,255,0.1)',
                        paddingTop: '32px',
                    }}>
                        <div>
                            <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Date</div>
                            <div style={{ fontSize: '20px', fontWeight: 700, fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)', color: 'white' }}>25th March</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Location</div>
                            <div style={{ fontSize: '20px', fontWeight: 700, fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)', color: 'white' }}>RGIT Mumbai</div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
