'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, ChevronDown, Sparkles, Users, Trophy, Cpu, Calendar } from 'lucide-react';
import dynamic from 'next/dynamic';
import StatsCounter from './components/StatsCounter';
import EventCard from './components/EventCard';
// import ProjectCard from './components/ProjectCard';
import MentorCard from './components/MentorCard';
import TeamCard from './components/TeamCard';
import { events } from './data/events';
// import { featuredProjects } from './data/projects';
import { mentors, core2526 } from './data/team';
import { SparklesText } from '../components/ui/sparkles-text';

const AnimatedBackground = dynamic(() => import('./components/AnimatedBackground'), { ssr: false });

const stats = [
    { value: 500, suffix: '+', label: 'Active Members', icon: '👥' },
    { value: 50, suffix: '+', label: 'Events Hosted', icon: '🎯' },
    { value: 30, suffix: '+', label: 'Workshops Done', icon: '💡' },
    { value: 80, suffix: '+', label: 'Projects Built', icon: '🚀' },
];

const testimonials = [
    {
        quote: 'ABIT shaped my entire technical career. The workshops and mentorship I received here gave me the confidence to land my dream internship at a top product company.',
        name: 'Aarav Joshi',
        role: 'SDE Intern @ Google',
        year: 'Final Year IT',
    },
    {
        quote: 'SYNERGY 2024 was the most amazing hackathon experience of my life. The energy, the mentors, and the problems we solved — it was absolutely life-changing.',
        name: 'Sia Kapoor',
        role: 'Hackathon Winner 2024',
        year: 'Third Year CS',
    },
    {
        quote: 'Being part of ABIT\'s technical team taught me more than any course ever could. Real projects, real deadlines, real impact.',
        name: 'Dev Malhotra',
        role: 'Technical Team Lead',
        year: 'Third Year IT',
    },
];

const sponsors = [
    { name: 'TechCorp', abbr: 'TC' },
    { name: 'InnovateLabs', abbr: 'IL' },
    { name: 'DevStudio', abbr: 'DS' },
    { name: 'CloudBase', abbr: 'CB' },
    { name: 'FutureTech', abbr: 'FT' },
];

export default function HomeClient() {
    const featuredEvents = events.slice(0, 3);

    return (
        <div style={{ background: 'var(--navy)', minHeight: '100vh' }}>
            {/* ─── HERO ─── */}
            <section style={{
                position: 'relative',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                padding: '120px 24px 80px',
            }}>
                <AnimatedBackground />

                {/* Radial glow */}
                <div style={{
                    position: 'absolute',
                    top: '30%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '600px',
                    height: '600px',
                    background: 'radial-gradient(circle, rgba(255, 106, 0, 0.12) 0%, transparent 70%)',
                    pointerEvents: 'none',
                }} />

                <div style={{ position: 'relative', textAlign: 'center', maxWidth: '900px', zIndex: 1 }}>
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        style={{ marginBottom: '28px' }}
                    >
                        <span className="badge">
                            <Sparkles size={12} />
                            Student Technology Community · RGIT
                        </span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        style={{
                            fontSize: 'clamp(40px, 7vw, 80px)',
                            fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)',
                            fontWeight: 800,
                            letterSpacing: '-0.03em',
                            lineHeight: 1.05,
                            marginBottom: '24px',
                            color: 'white',
                        }}
                    >
                        <SparklesText 
                            colors={{ first: "#FF6A00", second: "#F97316" }}
                            sparklesCount={12}
                            className="gradient-text m-0 p-0 text-[inherit] leading-[inherit] inline-block font-[inherit]"
                        >
                            DREAM BIG
                        </SparklesText>
                        <br />
                        Build the Future.
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        style={{
                            fontSize: 'clamp(16px, 2.5vw, 20px)',
                            color: 'rgba(255,255,255,0.55)',
                            lineHeight: 1.7,
                            maxWidth: '640px',
                            margin: '0 auto 40px',
                        }}
                    >
                        ABIT is a student-driven technology community at RGIT dedicated to innovation, collaboration, and building the future through workshops, hackathons, and real-world projects.
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}
                    >
                        <Link href="/sharkathon" style={{ textDecoration: 'none' }}>
                            <motion.button
                                whileHover={{ scale: 1.04, boxShadow: '0 8px 30px rgba(255, 106, 0, 0.4)' }}
                                whileTap={{ scale: 0.98 }}
                                className="btn-primary"
                            >
                                Sharkathon 2025 <ArrowRight size={16} />
                            </motion.button>
                        </Link>
                        <Link href="/join" style={{ textDecoration: 'none' }}>
                            <motion.button
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.98 }}
                                className="btn-secondary"
                            >
                                Join ABIT
                            </motion.button>
                        </Link>
                    </motion.div>

                    {/* Scroll indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 0.8 }}
                        style={{ marginTop: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}
                    >
                        <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Scroll</span>
                        <motion.div
                            animate={{ y: [0, 8, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            <ChevronDown size={20} color="rgba(255,255,255,0.3)" />
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ─── STATS ─── */}
            <section style={{ padding: '80px 24px', position: 'relative' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        style={{ textAlign: 'center', marginBottom: '48px' }}
                    >
                        <span className="badge" style={{ marginBottom: '16px', display: 'inline-flex' }}>
                            Our Impact
                        </span>
                        <h2 style={{
                            fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)',
                            fontSize: 'clamp(28px, 4vw, 44px)',
                            fontWeight: 700,
                            color: 'white',
                            letterSpacing: '-0.02em',
                        }}>
                            Building a generation of innovators
                        </h2>
                    </motion.div>
                    <StatsCounter stats={stats} />
                </div>
            </section>

            {/* ─── ABOUT PREVIEW ─── */}
            <section style={{ padding: '80px 24px' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '64px',
                        alignItems: 'center',
                    }} className="about-grid">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="badge" style={{ marginBottom: '20px', display: 'inline-flex' }}>
                                About ABIT
                            </span>
                            <h2 style={{
                                fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)',
                                fontSize: 'clamp(28px, 4vw, 44px)',
                                fontWeight: 700,
                                color: 'white',
                                letterSpacing: '-0.02em',
                                lineHeight: 1.15,
                                marginBottom: '20px',
                            }}>
                                Where passionate students become industry-ready professionals
                            </h2>
                            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '16px', lineHeight: 1.8, marginBottom: '16px' }}>
                                ABIT — Association of Budding Information Technocrats — is the premier student technology community at RGIT, Mumbai. We exist to bridge the gap between academic learning and real-world technology practice.
                            </p>
                            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '15px', lineHeight: 1.8, marginBottom: '32px' }}>
                                From hands-on workshops to the flagship SYNERGY tech fest, ABIT creates experiences that shape careers and build lifelong connections.
                            </p>
                            <Link href="/about" style={{ textDecoration: 'none' }}>
                                <motion.button
                                    whileHover={{ scale: 1.04 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="btn-primary"
                                >
                                    Learn More <ArrowRight size={16} />
                                </motion.button>
                            </Link>
                        </motion.div>

                        {/* Visual */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
                        >
                            {[
                                { icon: Users, title: 'Community First', desc: 'A network of 500+ students collaborating, learning, and growing together.', color: '#FFFFFF' },
                                { icon: Trophy, title: 'Industry Recognition', desc: 'Prize-winning teams, placement achievements, and startup success stories.', color: '#F59E0B' },
                                { icon: Cpu, title: 'Cutting-Edge Tech', desc: 'From AI/ML to blockchain — we explore technology at the frontier of innovation.', color: '#10B981' },
                            ].map(({ icon: Icon, title, desc, color }, i) => (
                                <motion.div
                                    key={title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.12 + 0.2 }}
                                    style={{
                                        display: 'flex',
                                        gap: '16px',
                                        alignItems: 'flex-start',
                                        padding: '20px',
                                        borderRadius: '16px',
                                        background: 'rgba(255,255,255,0.03)',
                                        border: '1px solid rgba(255,255,255,0.07)',
                                    }}
                                >
                                    <div style={{
                                        width: 44,
                                        height: 44,
                                        borderRadius: '12px',
                                        background: `${color}15`,
                                        border: `1px solid ${color}25`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0,
                                    }}>
                                        <Icon size={20} color={color} />
                                    </div>
                                    <div>
                                        <h3 style={{ fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)', fontSize: '16px', fontWeight: 700, color: 'white', marginBottom: '4px' }}>{title}</h3>
                                        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', lineHeight: 1.6 }}>{desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ─── MENTORS ─── */}
            <section style={{ padding: '80px 24px' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <span className="badge" style={{ marginBottom: '12px', display: 'inline-flex' }}>
                                Leadership
                            </span>
                            <h2 style={{ fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, color: 'white', letterSpacing: '-0.02em', marginBottom: '8px' }}>Our Mentors</h2>
                            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '15px' }}>Experienced professionals guiding students toward excellence and innovation</p>
                        </motion.div>
                        
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            style={{ display: 'flex', gap: '32px' }}
                        >
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '28px', fontWeight: 700, color: '#FF6A00', fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)' }}>
                                    {mentors.length.toString().padStart(2, '0')}
                                </div>
                                <div style={{ fontSize: '10px', fontWeight: 600, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Mentors</div>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '28px', fontWeight: 700, color: '#FF6A00', fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)' }}>
                                    20+
                                </div>
                                <div style={{ fontSize: '10px', fontWeight: 600, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Years Exp</div>
                            </div>
                        </motion.div>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }} className="mentors-grid">
                        {mentors.map((m, i) => (
                            <MentorCard key={m.name} mentor={m} index={i} />
                        ))}
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '40px' }}>
                        <Link href="/team" style={{ textDecoration: 'none' }}>
                            <motion.button
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.98 }}
                                className="btn-secondary"
                            >
                                Meet the Team <ArrowRight size={16} />
                            </motion.button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* ─── LEADERSHIP & CORE TEAM ─── */}
            <section style={{ padding: '80px 24px', background: 'rgba(255,255,255,0.015)' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                        <span className="badge" style={{ marginBottom: '16px', display: 'inline-flex' }}>
                            Execution
                        </span>
                        <h2 style={{ fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, color: 'white', letterSpacing: '-0.02em', marginBottom: '8px' }}>
                            Core 2025-2026
                        </h2>
                        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '15px' }}>Leadership · Execution · Excellence</p>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: '24px',
                    }} className="team-grid">
                        {core2526.map((member, i) => (
                            <TeamCard key={member.name} member={member} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── FEATURED EVENTS ─── */}
            <section style={{ padding: '80px 24px', background: 'rgba(255,255,255,0.015)' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '48px', flexWrap: 'wrap', gap: '16px' }}>
                        <div>
                            <span className="badge" style={{ marginBottom: '12px', display: 'inline-flex' }}>
                                <Calendar size={12} />
                                Events
                            </span>
                            <h2 style={{
                                fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)',
                                fontSize: 'clamp(26px, 4vw, 40px)',
                                fontWeight: 700,
                                color: 'white',
                                letterSpacing: '-0.02em',
                            }}>
                                Featured Events
                            </h2>
                        </div>
                        <Link href="/events" style={{ textDecoration: 'none' }}>
                            <motion.span
                                whileHover={{ x: 4 }}
                                style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#A3A3A3', fontWeight: 600, fontSize: '14px', cursor: 'pointer' }}
                            >
                                View All Events <ArrowRight size={14} />
                            </motion.span>
                        </Link>
                    </div>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '24px',
                    }} className="events-grid">
                        {featuredEvents.map((ev, i) => (
                            <EventCard key={ev.slug} event={ev} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── PROJECTS ─── */}
            {/*
            <section style={{ padding: '80px 24px' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                        <span className="badge" style={{ marginBottom: '16px', display: 'inline-flex' }}>
                            <Cpu size={12} />
                            Innovation
                        </span>
                        <h2 style={{
                            fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)',
                            fontSize: 'clamp(26px, 4vw, 44px)',
                            fontWeight: 700,
                            color: 'white',
                            letterSpacing: '-0.02em',
                            marginBottom: '12px',
                        }}>
                            Student-Built Projects
                        </h2>
                        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '16px', maxWidth: '500px', margin: '0 auto' }}>
                            Real solutions to real problems — built by ABIT students.
                        </p>
                    </div>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '24px',
                    }} className="projects-grid">
                        {featuredProjects.map((p, i) => (
                            <ProjectCard key={p.title} project={p} index={i} />
                        ))}
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '40px' }}>
                        <Link href="/projects" style={{ textDecoration: 'none' }}>
                            <motion.button
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.98 }}
                                className="btn-secondary"
                            >
                                See All Projects <ArrowRight size={16} />
                            </motion.button>
                        </Link>
                    </div>
                </div>
            </section>
            */}

            {/* ─── TESTIMONIALS ─── */}
            <section style={{
                padding: '80px 24px',
                background: 'rgba(255,255,255,0.012)',
                position: 'relative',
                overflow: 'hidden',
            }}>
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '800px',
                    height: '400px',
                    background: 'radial-gradient(ellipse, rgba(255, 106, 0, 0.08) 0%, transparent 70%)',
                    pointerEvents: 'none',
                }} />
                <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
                    <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                        <span className="badge" style={{ marginBottom: '16px', display: 'inline-flex' }}>Community</span>
                        <h2 style={{
                            fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)',
                            fontSize: 'clamp(26px, 4vw, 44px)',
                            fontWeight: 700,
                            color: 'white',
                            letterSpacing: '-0.02em',
                        }}>
                            Voices from the Community
                        </h2>
                    </div>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '24px',
                    }} className="testimonials-grid">
                        {testimonials.map((t, i) => (
                            <motion.div
                                key={t.name}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                style={{
                                    background: 'rgba(255,255,255,0.03)',
                                    border: '1px solid rgba(255,255,255,0.07)',
                                    borderRadius: '20px',
                                    padding: '28px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '20px',
                                }}
                            >
                                <div style={{ display: 'flex', gap: '3px' }}>
                                    {Array.from({ length: 5 }).map((_, j) => (
                                        <span key={j} style={{ color: '#F59E0B', fontSize: '16px' }}>★</span>
                                    ))}
                                </div>
                                <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '14px', lineHeight: 1.8, fontStyle: 'italic', flex: 1 }}>
                                    &ldquo;{t.quote}&rdquo;
                                </p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{
                                        width: 42,
                                        height: 42,
                                        borderRadius: '50%',
                                        background: 'linear-gradient(135deg, #FFFFFF, #A3A3A3)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)',
                                        fontWeight: 700,
                                        fontSize: '16px',
                                        color: 'white',
                                        flexShrink: 0,
                                    }}>
                                        {t.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 600, fontSize: '14px', color: 'white' }}>{t.name}</div>
                                        <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '13px' }}>{t.role} · {t.year}</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── SPONSORS ─── */}
            <section style={{ padding: '64px 24px' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
                    <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '32px' }}>
                        Trusted by leading organizations
                    </p>
                    <div style={{ display: 'flex', gap: '32px', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center', marginBottom: '40px' }}>
                        {sponsors.map((s) => (
                            <motion.div
                                key={s.name}
                                whileHover={{ scale: 1.05 }}
                                style={{
                                    padding: '16px 28px',
                                    borderRadius: '12px',
                                    background: 'rgba(255,255,255,0.03)',
                                    border: '1px solid rgba(255,255,255,0.07)',
                                    color: 'rgba(255,255,255,0.35)',
                                    fontSize: '16px',
                                    fontWeight: 700,
                                    fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)',
                                    letterSpacing: '0.02em',
                                    cursor: 'default',
                                    transition: 'all 0.2s ease',
                                }}
                                onHoverStart={(e) => { (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.65)'; }}
                                onHoverEnd={(e) => { (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.35)'; }}
                            >
                                {s.name}
                            </motion.div>
                        ))}
                    </div>
                    <Link href="/sponsors" style={{ textDecoration: 'none' }}>
                        <motion.button
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.98 }}
                            className="btn-secondary"
                            style={{ fontSize: '13px', padding: '10px 20px' }}
                        >
                            Become a Sponsor <ArrowRight size={14} />
                        </motion.button>
                    </Link>
                </div>
            </section>

            {/* ─── FINAL CTA ─── */}
            <section style={{ padding: '100px 24px' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        style={{
                            textAlign: 'center',
                            padding: '64px 48px',
                            borderRadius: '28px',
                            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(15, 23, 42, 0.8) 100%)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                    >
                        {/* Glow */}
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '300px',
                            height: '200px',
                            background: 'radial-gradient(ellipse, rgba(255, 106, 0, 0.2) 0%, transparent 70%)',
                            pointerEvents: 'none',
                        }} />
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                            style={{ fontSize: '48px', marginBottom: '24px', display: 'block' }}
                        >
                            ⚡
                        </motion.div>
                        <h2 style={{
                            fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)',
                            fontSize: 'clamp(28px, 5vw, 48px)',
                            fontWeight: 800,
                            color: 'white',
                            letterSpacing: '-0.03em',
                            marginBottom: '16px',
                            lineHeight: 1.1,
                        }}>
                            Ready to build the future?
                        </h2>
                        <p style={{
                            color: 'rgba(255,255,255,0.55)',
                            fontSize: '17px',
                            lineHeight: 1.7,
                            marginBottom: '40px',
                            maxWidth: '500px',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                        }}>
                            Join a community of curious minds, builders, and innovators. Your journey in technology starts here.
                        </p>
                        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Link href="/sharkathon" style={{ textDecoration: 'none' }}>
                                <motion.button
                                    whileHover={{ scale: 1.04, boxShadow: '0 8px 30px rgba(255, 106, 0, 0.5)' }}
                                    whileTap={{ scale: 0.98 }}
                                    className="btn-primary"
                                    style={{ fontSize: '16px', padding: '16px 32px' }}
                                >
                                    Sharkathon 2025 <ArrowRight size={18} />
                                </motion.button>
                            </Link>
                            <Link href="/events" style={{ textDecoration: 'none' }}>
                                <motion.button
                                    whileHover={{ scale: 1.04 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="btn-secondary"
                                    style={{ fontSize: '16px', padding: '16px 32px' }}
                                >
                                    Browse Events
                                </motion.button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            <style jsx global>{`
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .mentors-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .team-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .events-grid { grid-template-columns: 1fr 1fr !important; }
          .projects-grid { grid-template-columns: 1fr 1fr !important; }
          .testimonials-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .mentors-grid { grid-template-columns: 1fr !important; }
          .team-grid { grid-template-columns: 1fr !important; }
          .events-grid { grid-template-columns: 1fr !important; }
          .projects-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
        </div>
    );
}
