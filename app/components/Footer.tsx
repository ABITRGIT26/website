'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Twitter, Linkedin, Github, Instagram, Zap, Mail, MapPin } from 'lucide-react';

const footerLinks = {
    Organization: [
        { href: '/about', label: 'About ABIT' },
        { href: '/team', label: 'Team' },
        { href: '/events', label: 'Events' },
        // { href: '/gallery', label: 'Gallery' },
    ],
    Community: [
        // { href: '/projects', label: 'Projects' },
        // { href: '/blog', label: 'Blog' },
        { href: '/join', label: 'Join ABIT' },
        { href: '/sponsors', label: 'Sponsors' },
    ],
    Connect: [
        { href: '/contact', label: 'Contact Us' },
        { href: 'https://linkedin.com', label: 'LinkedIn', external: true },
        { href: 'https://github.com', label: 'GitHub', external: true },
        { href: 'https://instagram.com', label: 'Instagram', external: true },
    ],
};

const socials = [
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
];

export default function Footer() {
    const pathname = usePathname();

    if (pathname?.startsWith('/sharkathon')) return null;

    return (
        <footer style={{
            background: 'linear-gradient(180deg, var(--navy) 0%, #080D1A 100%)',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            padding: '80px 24px 32px',
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                {/* Top grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr 1fr 1fr',
                    gap: '48px',
                    marginBottom: '64px',
                }} className="footer-grid">

                    {/* Brand */}
                    <div>
                        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <img src="/logo.png" alt="ABIT Logo" style={{ height: '40px', width: 'auto' }} />
                            </div>
                            <span style={{
                                fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)',
                                fontWeight: 700,
                                fontSize: '22px',
                                color: 'white',
                                letterSpacing: '-0.03em',
                            }}>ABIT</span>
                        </Link>
                        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', lineHeight: 1.7, maxWidth: '280px', marginBottom: '24px' }}>
                            Association of Budding Information Technocrats — empowering the next generation of technologists at RGIT.
                        </p>
                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '24px' }}>
                            {socials.map(({ icon: Icon, href, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    style={{
                                        width: 38,
                                        height: 38,
                                        borderRadius: '10px',
                                        background: 'rgba(255,255,255,0.05)',
                                        border: '1px solid rgba(255,255,255,0.08)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'rgba(255,255,255,0.6)',
                                        transition: 'all 0.2s ease',
                                        textDecoration: 'none',
                                    }}
                                    onMouseEnter={(e) => {
                                        (e.currentTarget as HTMLElement).style.background = 'rgba(255, 106, 0, 0.2)';
                                        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255, 106, 0, 0.4)';
                                        (e.currentTarget as HTMLElement).style.color = '#FF6A00';
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)';
                                        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
                                        (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.6)';
                                    }}
                                >
                                    <Icon size={16} />
                                </a>
                            ))}
                        </div>
                        {/* Contact info */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'rgba(255,255,255,0.5)', fontSize: '13px' }}>
                                <Mail size={14} color="#A3A3A3" />
                                <span>abit@rgit.ac.in</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'rgba(255,255,255,0.5)', fontSize: '13px' }}>
                                <MapPin size={14} color="#A3A3A3" />
                                <span>RGIT, Versova, Mumbai</span>
                            </div>
                        </div>
                    </div>

                    {/* Link columns */}
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title}>
                            <h4 style={{
                                fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)',
                                fontSize: '13px',
                                fontWeight: 600,
                                letterSpacing: '0.08em',
                                textTransform: 'uppercase',
                                color: 'rgba(255,255,255,0.3)',
                                marginBottom: '20px',
                            }}>{title}</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {links.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        target={(link as { external?: boolean }).external ? '_blank' : undefined}
                                        rel={(link as { external?: boolean }).external ? 'noopener noreferrer' : undefined}
                                        style={{
                                            color: 'rgba(255,255,255,0.55)',
                                            fontSize: '14px',
                                            textDecoration: 'none',
                                            transition: 'color 0.2s ease',
                                        }}
                                        onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#FF6A00'; }}
                                        onMouseLeave={(e) => { (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.55)'; }}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom bar */}
                <div style={{
                    borderTop: '1px solid rgba(255,255,255,0.06)',
                    paddingTop: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '16px',
                }}>
                    <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px' }}>
                        © 2026 ABIT — Association of Budding Information Technocrats. All rights reserved.
                    </p>
                    <div style={{ display: 'flex', gap: '24px' }}>
                        {['Privacy Policy', 'Terms of Use'].map((item) => (
                            <span key={item} style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px', cursor: 'pointer' }}>
                                {item}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

        </footer>
    );
}
