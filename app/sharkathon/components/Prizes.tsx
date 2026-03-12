'use client';

import { motion } from 'framer-motion';
import { Trophy, Star, Award } from 'lucide-react';

export default function Prizes() {
    return (
        <section style={{
            padding: '100px 24px',
            background: 'linear-gradient(180deg, #030101 0%, #110505 100%)',
            position: 'relative'
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                    <h2 style={{
                        fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)',
                        fontSize: 'clamp(32px, 5vw, 48px)',
                        fontWeight: 800,
                        color: 'white',
                        marginBottom: '16px'
                    }}>
                        Prize Pool
                    </h2>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '18px' }}>
                        Massive rewards await the most innovative startup concepts.
                    </p>
                </div>

                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '40px',
                    alignItems: 'flex-end',
                    marginTop: '40px'
                }}>
                    {/* 2nd Place */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        style={{
                            flex: '1 1 300px',
                            maxWidth: '350px',
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '24px',
                            padding: '40px 32px',
                            textAlign: 'center',
                            position: 'relative',
                            order: 1
                        }}
                    >
                        <div style={{ color: '#C0C0C0', marginBottom: '20px' }}>
                            <Star size={40} style={{ margin: '0 auto' }} />
                        </div>
                        <h3 style={{ color: 'white', fontSize: '24px', fontFamily: 'var(--font-space-grotesk)', marginBottom: '8px' }}>Runner Up</h3>
                        <div style={{ fontSize: '36px', fontWeight: 800, color: '#FF6A00', marginBottom: '20px' }}>₹12,000</div>
                        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>Cash + 12k worth vouchers <br/>+ Technical Internship <br/>+ Goodies</p>
                    </motion.div>

                    {/* 1st Place */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        style={{
                            flex: '1 1 320px',
                            maxWidth: '400px',
                            background: 'linear-gradient(135deg, rgba(255, 0, 0, 0.2) 0%, rgba(255, 106, 0, 0.3) 100%)',
                            border: '1px solid rgba(255, 0, 0, 0.4)',
                            boxShadow: '0 20px 50px rgba(255, 0, 0, 0.2)',
                            borderRadius: '24px',
                            padding: '56px 40px',
                            textAlign: 'center',
                            position: 'relative',
                            zIndex: 10,
                            order: 2,
                            transform: 'translateY(-20px)'
                        }}
                    >
                        <div style={{ color: '#FFD700', marginBottom: '20px' }}>
                            <Trophy size={60} style={{ margin: '0 auto' }} />
                        </div>
                        <h3 style={{ color: 'white', fontSize: '28px', fontFamily: 'var(--font-space-grotesk)', marginBottom: '8px' }}>Grand Winners</h3>
                        <div style={{ fontSize: '48px', fontWeight: 800, color: 'white', marginBottom: '20px' }}>₹15,000</div>
                        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px' }}>Cash + 15k worth vouchers <br/>+ Technical Internship <br/>+ Goodies</p>
                    </motion.div>

                    {/* 3rd Place */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        style={{
                            flex: '1 1 300px',
                            maxWidth: '350px',
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '24px',
                            padding: '40px 32px',
                            textAlign: 'center',
                            position: 'relative',
                            order: 3
                        }}
                    >
                        <div style={{ color: '#CD7F32', marginBottom: '20px' }}>
                            <Award size={40} style={{ margin: '0 auto' }} />
                        </div>
                        <h3 style={{ color: 'white', fontSize: '24px', fontFamily: 'var(--font-space-grotesk)', marginBottom: '8px' }}>2nd Runner Up</h3>
                        <div style={{ fontSize: '36px', fontWeight: 800, color: '#FF6A00', marginBottom: '20px' }}>₹8,000</div>
                        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>Cash + 8k worth vouchers <br/>+ Technical Internship <br/>+ Goodies</p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
