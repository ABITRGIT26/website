'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Zap } from 'lucide-react';

const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/events', label: 'Events' },
    // { href: '/projects', label: 'Projects' },
    { href: '/team', label: 'Team' },
    // { href: '/gallery', label: 'Gallery' },
    // { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setMobileOpen(false);
    }, [pathname]);

    return (
        <>
            <motion.nav
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1000,
                    padding: '0 24px',
                    transition: 'all 0.3s ease',
                }}
            >
                <div
                    style={{
                        maxWidth: '1200px',
                        margin: '12px auto 0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px 24px',
                        borderRadius: '20px',
                        background: scrolled
                            ? 'rgba(17, 17, 17, 0.95)'
                            : 'rgba(17, 17, 17, 0.6)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255,255,255,0.06)',
                        boxShadow: scrolled ? '0 8px 40px rgba(0,0,0,0.4)' : 'none',
                        transition: 'all 0.3s ease',
                    }}
                >
                    {/* Logo */}
                    <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <img src="/logo.png" alt="ABIT Logo" style={{ height: '32px', width: 'auto' }} />
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }} className="desktop-nav">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    style={{
                                        padding: '8px 14px',
                                        borderRadius: '10px',
                                        fontSize: '14px',
                                        fontWeight: 500,
                                        color: isActive ? '#FF6A00' : 'rgba(255,255,255,0.7)',
                                        background: isActive ? 'rgba(255, 106, 0, 0.12)' : 'transparent',
                                        textDecoration: 'none',
                                        transition: 'all 0.2s ease',
                                        whiteSpace: 'nowrap',
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!isActive) {
                                            (e.target as HTMLElement).style.color = 'white';
                                            (e.target as HTMLElement).style.background = 'rgba(255,255,255,0.06)';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isActive) {
                                            (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.7)';
                                            (e.target as HTMLElement).style.background = 'transparent';
                                        }
                                    }}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                    </div>

                    {/* CTA */}
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <Link href="/join" style={{ textDecoration: 'none' }} className="nav-cta">
                            <span style={{
                                background: 'linear-gradient(135deg, #FF6A00, #C2410C)',
                                color: 'white',
                                padding: '9px 20px',
                                borderRadius: '10px',
                                fontSize: '14px',
                                fontWeight: 600,
                                fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)',
                                display: 'inline-block',
                                transition: 'all 0.2s ease',
                            }}>
                                Join ABIT
                            </span>
                        </Link>

                        {/* Mobile hamburger */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="mobile-menu-btn"
                            style={{
                                display: 'none',
                                background: 'rgba(255,255,255,0.06)',
                                border: '1px solid rgba(255,255,255,0.1)',
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

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        style={{
                            position: 'fixed',
                            top: '90px',
                            left: '16px',
                            right: '16px',
                            zIndex: 999,
                            background: 'rgba(17, 17, 17, 0.98)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            borderRadius: '20px',
                            padding: '16px',
                            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                        }}
                    >
                        {navLinks.map((link, i) => (
                            <motion.div
                                key={link.href}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                            >
                                <Link
                                    href={link.href}
                                    style={{
                                        display: 'block',
                                        padding: '12px 16px',
                                        borderRadius: '12px',
                                        color: pathname === link.href ? '#FF6A00' : 'rgba(255,255,255,0.8)',
                                        background: pathname === link.href ? 'rgba(255, 106, 0, 0.12)' : 'transparent',
                                        fontWeight: 500,
                                        fontSize: '15px',
                                        textDecoration: 'none',
                                        marginBottom: '4px',
                                    }}
                                >
                                    {link.label}
                                </Link>
                            </motion.div>
                        ))}
                        <div style={{ padding: '8px 16px 4px' }}>
                            <Link href="/join" style={{ textDecoration: 'none' }}>
                                <span style={{
                                    display: 'block',
                                    textAlign: 'center',
                                    background: 'linear-gradient(135deg, #FF6A00, #C2410C)',
                                    color: 'white',
                                    padding: '13px',
                                    borderRadius: '12px',
                                    fontWeight: 600,
                                    fontSize: '15px',
                                }}>
                                    Join ABIT
                                </span>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx global>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .nav-cta { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
        </>
    );
}
