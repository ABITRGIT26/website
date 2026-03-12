'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
    {
        question: 'Who can participate in Sharkathon?',
        answer: 'Sharkathon is open to all university students across India. You can participate solo or in a team of up to 4 members.'
    },
    {
        question: 'Do I need a fully working product to pitch?',
        answer: 'Not necessarily, but having a working prototype (MVP) significantly increases your chances of winning and securing investment.'
    },
    {
        question: 'Is there a registration fee?',
        answer: 'No, registration for Sharkathon 2026 is completely free.'
    },
    {
        question: 'Will hardware startups be considered?',
        answer: 'Absolutely. We welcome both software and hardware innovation across all tracks.'
    },
    {
        question: 'How does the funding work?',
        answer: 'Top teams will get the opportunity to pitch directly to our VC partners. Funding offers are made at the discretion of the investors based on your pitch and business model.'
    }
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section style={{
            padding: '100px 24px',
            background: 'linear-gradient(180deg, #030101 0%, #110505 100%)',
        }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                    <h2 style={{
                        fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)',
                        fontSize: 'clamp(32px, 5vw, 48px)',
                        fontWeight: 800,
                        color: 'white',
                    }}>
                        Frequently Asked Questions
                    </h2>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {faqs.map((faq, i) => (
                        <div
                            key={i}
                            style={{
                                background: 'rgba(255,255,255,0.02)',
                                border: `1px solid ${openIndex === i ? 'rgba(255, 0, 0, 0.3)' : 'rgba(255,255,255,0.05)'}`,
                                borderRadius: '16px',
                                overflow: 'hidden',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                style={{
                                    width: '100%',
                                    padding: '24px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    background: 'none',
                                    border: 'none',
                                    color: 'white',
                                    fontSize: '18px',
                                    fontWeight: 600,
                                    fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)',
                                    cursor: 'pointer',
                                    textAlign: 'left'
                                }}
                            >
                                {faq.question}
                                <motion.div
                                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                                    transition={{ duration: 0.2 }}
                                    style={{ color: '#FF6A00' }}
                                >
                                    <ChevronDown size={20} />
                                </motion.div>
                            </button>

                            <AnimatePresence>
                                {openIndex === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <div style={{
                                            padding: '0 24px 24px',
                                            color: 'rgba(255,255,255,0.6)',
                                            lineHeight: 1.6
                                        }}>
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
