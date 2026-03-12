'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Rocket } from 'lucide-react';

const sharkathonLinks = [
    { href: '#about', label: 'About' },
    { href: '#format', label: 'Format' },
    { href: '#prizes', label: 'Prizes' },
    { href: '#judges', label: 'Judges' },
];

export default function SharkathonNavbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        setMobileOpen(false);
        const element = document.querySelector(id);
        if (element) {
            window.scrollTo({
                top: element.getBoundingClientRect().top + window.scrollY - 100,
                behavior: 'smooth'
            });
        }
    };

    return (
        <>
            <motion.nav
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                style={{
                    position: 'fixed',
                    top: '20px',
                    left: 0,
                    right: 0,
                    zIndex: 1000,
                    padding: '0 24px',
                    pointerEvents: 'none',
                }}
            >
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    pointerEvents: 'auto',
                    padding: '12px 24px',
                    borderRadius: '20px',
                    background: scrolled
                        ? 'rgba(10, 2, 2, 0.95)'
                        : 'rgba(10, 2, 2, 0.6)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 0, 0, 0.15)',
                    boxShadow: scrolled ? '0 10px 40px rgba(0,0,0,0.5)' : 'none',
                    transition: 'all 0.3s ease',
                }}>
                    <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Image src="/logo.png" alt="ABIT Logo" width={32} height={32} style={{ height: '32px', width: 'auto' }} />
                        </div>
                        <span style={{
                            fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)',
                            fontWeight: 700,
                            fontSize: '18px',
                            color: 'white',
                            letterSpacing: '-0.02em',
                        }}>
                            | Sharkathon
                        </span>
                    </Link>

                    <div className="hidden md:flex align-center gap-8">
                        {sharkathonLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                onClick={(e) => scrollToSection(e, link.href)}
                                className="nav-link"
                                style={{
                                    fontFamily: 'var(--font-inter, Inter, sans-serif)',
                                    fontSize: '14px',
                                    fontWeight: 500,
                                    color: 'rgba(255,255,255,0.7)',
                                    textDecoration: 'none',
                                    transition: 'color 0.2s',
                                }}
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <a href="#register" onClick={(e) => scrollToSection(e, '#register')} style={{ textDecoration: 'none' }} className="nav-cta hidden sm:inline-flex">
                            <span style={{
                                background: 'linear-gradient(135deg, #FF6A00, #FF0000)',
                                color: 'white',
                                padding: '9px 20px',
                                borderRadius: '10px',
                                fontSize: '14px',
                                fontWeight: 600,
                                fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                transition: 'all 0.2s ease',
                                boxShadow: '0 4px 15px rgba(255, 0, 0, 0.3)',
                            }}>
                                <Rocket size={14} /> Register
                            </span>
                        </a>

                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="mobile-menu-btn"
                            style={{
                                display: 'none',
                                background: 'rgba(255,0,0,0.1)',
                                border: '1px solid rgba(255,0,0,0.2)',
                                borderRadius: '10px',
                                padding: '8px',
                                color: 'white',
                                cursor: 'pointer',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            aria-label="Toggle menu"
                        >
                            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        style={{
                            position: 'fixed',
                            top: '84px',
                            left: '16px',
                            right: '16px',
                            zIndex: 999,
                            background: 'rgba(10, 2, 2, 0.98)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255,0,0,0.15)',
                            borderRadius: '20px',
                            padding: '24px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '16px',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                        }}
                    >
                        {sharkathonLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                onClick={(e) => scrollToSection(e, link.href)}
                                style={{
                                    fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)',
                                    fontSize: '16px',
                                    fontWeight: 600,
                                    color: 'white',
                                    padding: '12px 16px',
                                    borderRadius: '12px',
                                    background: 'rgba(255,255,255,0.03)',
                                    textDecoration: 'none',
                                }}
                            >
                                {link.label}
                            </a>
                        ))}
                        <a
                            href="#register"
                            onClick={(e) => scrollToSection(e, '#register')}
                            style={{
                                fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)',
                                fontSize: '16px',
                                fontWeight: 600,
                                color: '#FF6A00',
                                padding: '12px 16px',
                                borderRadius: '12px',
                                background: 'rgba(255,0,0,0.1)',
                                textDecoration: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                            }}
                        >
                            <Rocket size={16} /> Register Now
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>
            <style jsx global>{`
                @media (max-width: 768px) {
                    .nav-link { display: none !important; }
                    .mobile-menu-btn { display: flex !important; }
                }
            `}</style>
        </>
    );
}
