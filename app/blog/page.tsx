'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Clock, User } from 'lucide-react';

const posts = [
    { slug: 'getting-started-react', title: 'Getting Started with React Hooks', excerpt: 'A beginner-friendly guide to useState, useEffect, and custom hooks that will transform how you build React apps.', category: 'Tutorial', author: 'Mihir Shah', date: 'Mar 1, 2024', readTime: '8 min', emoji: '⚛️', color: '#61DAFB' },
    { slug: 'ai-ml-career-path', title: 'AI/ML Career Path for Students in 2024', excerpt: 'Everything you need to know to start your AI journey — from Python basics to landing your first ML internship.', category: 'Career', author: 'Tanvi Desai', date: 'Feb 20, 2024', readTime: '12 min', emoji: '🤖', color: '#10B981' },
    { slug: 'synergy-2024-recap', title: 'SYNERGY 2024 — The Full Recap', excerpt: 'Everything that happened at ABIT\'s biggest event yet: the winners, highlights, and moments that made SYNERGY 2024 unforgettable.', category: 'Event Recap', author: 'Pooja Rane', date: 'Feb 10, 2024', readTime: '6 min', emoji: '⚡', color: '#F59E0B' },
    { slug: 'open-source-guide', title: 'How to Start Contributing to Open Source', excerpt: 'Your step-by-step guide to making your first open source contribution — from finding projects to getting your PR merged.', category: 'Tutorial', author: 'Aditya Patil', date: 'Jan 28, 2024', readTime: '10 min', emoji: '🌐', color: '#8B5CF6' },
    { slug: 'hackathon-tips', title: '10 Tips to Win Your Next Hackathon', excerpt: 'Battle-tested advice from ABIT hackathon winners on how to choose your idea, build fast, and present effectively.', category: 'Tips', author: 'Arjun Sharma', date: 'Jan 15, 2024', readTime: '7 min', emoji: '🏆', color: '#EF4444' },
    { slug: 'nextjs-fullstack', title: 'Building a Full-Stack App with Next.js 14', excerpt: 'A practical tutorial on using Next.js App Router, Server Actions, and Prisma to build a production-ready full-stack app.', category: 'Tutorial', author: 'Kavya Joshi', date: 'Jan 5, 2024', readTime: '15 min', emoji: '▲', color: '#FFFFFF' },
];

export default function BlogPage() {
    const [featured, ...rest] = posts;
    return (
        <div style={{ background: 'var(--navy)', minHeight: '100vh', paddingTop: '100px' }}>
            <section style={{ padding: '80px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '400px', background: 'radial-gradient(ellipse, rgba(255, 106, 0, 0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <span className="badge" style={{ marginBottom: '20px', display: 'inline-flex' }}>✍️ Blog</span>
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                    style={{ fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)', fontSize: 'clamp(36px, 6vw, 68px)', fontWeight: 800, color: 'white', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: '20px' }}
                >
                    Resources &{' '}
                    <span className="gradient-text">Insights</span>
                </motion.h1>
                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ color: 'rgba(255,255,255,0.55)', fontSize: 'clamp(16px, 2vw, 18px)', lineHeight: 1.8, maxWidth: '560px', margin: '0 auto' }}>
                    Technical tutorials, event recaps, career advice, and insights from the ABIT community.
                </motion.p>
            </section>

            <section style={{ padding: '0 24px 100px' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    {/* Featured post */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -4 }}
                        style={{
                            padding: '48px', borderRadius: '24px', marginBottom: '40px', cursor: 'pointer',
                            background: `linear-gradient(135deg, ${featured.color}14, rgba(15,23,42,0.9))`,
                            border: `1px solid ${featured.color}25`,
                            display: 'flex', gap: '40px', alignItems: 'center', flexWrap: 'wrap',
                            position: 'relative', overflow: 'hidden', transition: 'all 0.3s ease',
                        }}
                    >
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, transparent, ${featured.color}, transparent)` }} />
                        <div style={{ fontSize: 'clamp(60px, 8vw, 96px)', flexShrink: 0 }}>{featured.emoji}</div>
                        <div style={{ flex: 1, minWidth: '240px' }}>
                            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
                                <span style={{ padding: '4px 12px', borderRadius: '999px', background: `${featured.color}20`, border: `1px solid ${featured.color}35`, color: featured.color, fontSize: '12px', fontWeight: 600 }}>{featured.category}</span>
                                <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px' }}>Featured</span>
                            </div>
                            <h2 style={{ fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)', fontSize: 'clamp(20px, 3vw, 32px)', fontWeight: 700, color: 'white', letterSpacing: '-0.02em', marginBottom: '12px', lineHeight: 1.2 }}>{featured.title}</h2>
                            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '15px', lineHeight: 1.7, marginBottom: '20px', maxWidth: '500px' }}>{featured.excerpt}</p>
                            <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,0.45)', fontSize: '13px' }}>
                                    <User size={13} color="#A3A3A3" />{featured.author}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,0.45)', fontSize: '13px' }}>
                                    <Clock size={13} color="#A3A3A3" />{featured.readTime} read
                                </div>
                                <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px' }}>{featured.date}</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Rest of posts */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }} className="blog-grid">
                        {rest.map((post, i) => (
                            <motion.div
                                key={post.slug}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{ delay: i * 0.08 }}
                                whileHover={{ y: -4, borderColor: `${post.color}30` }}
                                style={{
                                    padding: '28px', borderRadius: '20px', cursor: 'pointer',
                                    background: 'rgba(255,255,255,0.03)',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    display: 'flex', flexDirection: 'column', gap: '12px',
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                <div style={{ fontSize: '40px' }}>{post.emoji}</div>
                                <div style={{ display: 'inline-flex', width: 'fit-content' }}>
                                    <span style={{ padding: '4px 10px', borderRadius: '999px', background: `${post.color}15`, border: `1px solid ${post.color}25`, color: post.color, fontSize: '11px', fontWeight: 600 }}>{post.category}</span>
                                </div>
                                <h3 style={{ fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)', fontSize: '17px', fontWeight: 700, color: 'white', letterSpacing: '-0.02em', lineHeight: 1.3, flex: 1 }}>{post.title}</h3>
                                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{post.excerpt}</p>
                                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '12px', marginTop: '4px', flexWrap: 'wrap' }}>
                                    <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px' }}>{post.author}</span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'rgba(255,255,255,0.35)', fontSize: '12px' }}><Clock size={11} />{post.readTime}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <style jsx global>{`
        @media (max-width: 900px) { .blog-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 640px) { .blog-grid { grid-template-columns: 1fr !important; } }
      `}</style>
        </div>
    );
}
