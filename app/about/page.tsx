'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Target, Eye, BookOpen, Award } from 'lucide-react';
import StatsCounter from '../components/StatsCounter';

const stats = [
  { value: 9, suffix: '+', label: 'Years Active', icon: '9' },
  { value: 500, suffix: '+', label: 'Members', icon: '500' },
  { value: 35, suffix: '+', label: 'Events', icon: '35' },
  { value: 39, suffix: '', label: 'Industry Partners', icon: '39' },
];

const timeline = [
  { year: '2017', title: 'Web Development Workshop', description: 'Focused on hosting, Bootstrap, and SEO ABIT’s earliest recorded technical workshop.' },
  { year: '2018', title: 'Ethical Workshop', description: 'A hands-on workshop focused on ethical hacking and cybersecurity.' },
  { year: '2020', title: 'Education Fair', description: 'A virtual education fair connecting students with universities from around the world.' },
  { year: '2021', title: 'WordPress + Wellness', description: 'Workshop on WordPress Web Development (hands-on website creation) and Stress Management and Reclaiming Your Power (mind, stress, inner strengths).' },
  { year: '2022', title: 'Portfolio, Web, Finance & Security', description: 'Portfolio Building webinar, Seminar on Web Development (HTML/CSS/JS), Stock Market Trading webinar, and Cybersecurity protecting the digital world.' },
  { year: '2023', title: 'Breakout Year 10 Events', description: 'Ethical Hacking, Internships (LinkedIn/freelancing/jobs), ABIT X CRID bootcamp (HTML/CSS/JS/React/UI-UX), IT Team Bonding, CODE-E-MANIA, Programmer’s Date (pair-coding), Valedictory Ceremony, Cybersecurity Workshop, Database Connectivity (Java), Exploring VFX.' },
  { year: '2024', title: 'Hackathons & Shark Tank', description: 'Programmers Date 2.0 (code to impress partners), Code-A-mania 2.0 (12-hr online hackathon), Sharkathon (student Shark Tank India), Bike Expo.' },
  { year: '2025', title: 'Bootcamps, Pitches & Play', description: 'Sharkathon 2.0 (student Shark Tank India), CodeAstra (24-hr offline hackathon), Programmer’s Date 3.0 (pair-coding), Cyberflare, BGMI LAN and a Web Development Bootcamp (hands-on web dev).' },
  { year: '2026', title: 'Archive Flagships Scale Up', description: 'Sharkathon 3.0, BGMI Showdown (LAN tournament), Programmer’s Date 4.0, Blocktrail (Blockchain, Crypto, wallets, Smart Contracts, Scaling), Cyberflare (Cyber Security fundamentals, Linux, network security & tools, ethical hacking, 24-hr CTF), Cyberflare 2.0, CodeAstra (24-hr offline hackathon).' },
  { year: '2026', title: 'SYNERGY Phase 1', description: 'Campus Cup Season 2 (Free Fire), Predators Energy Drink presents Box Cricket, Cyberflare 3.0, CodeAstra ₹1,15,000 prize pool.' },
];

export default function AboutPage() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingTop: 100 }}>
      {/* Hero */}
      <section style={{ padding: '80px 24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="mono-meta" style={{ marginBottom: 20, display: 'inline-flex' }}>About</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(36px, 6vw, 68px)',
              fontWeight: 800,
              color: 'var(--text)',
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              marginBottom: 24,
            }}
          >
            About ABIT
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ color: 'var(--muted)', fontSize: 'clamp(16px, 2vw, 18px)', lineHeight: 1.8, maxWidth: 680, margin: '0 auto' }}
          >
            Association of Budding Information Technocrats  empowering students to become industry-ready technologists through hands-on learning, community, and innovation.
          </motion.p>
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: '20px 24px 80px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <StatsCounter stats={stats} />
        </div>
      </section>

      {/* Mission & Vision */}
      <section style={{ padding: '80px 24px', background: 'var(--surface)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }} className="mv-grid">
            {[
              {
                icon: Target,
                title: 'Our Mission',
                text: 'To create an inclusive, innovation-driven community that empowers RGIT students with technical skills, industry exposure, and a collaborative mindset  preparing them for exceptional careers in technology.',
              },
              {
                icon: Eye,
                title: 'Our Vision',
                text: 'To be the most impactful student technology community in Mumbai, recognized for producing industry leaders, innovative thinkers, and responsible technologists who shape the future.',
              },
            ].map(({ icon: Icon, title, text }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                style={{
                  padding: 40,
                  border: '1px solid var(--border)',
                  position: 'relative',
                  overflow: 'hidden',
                  background: 'var(--bg)',
                }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'var(--blue)' }} />
                <div style={{ width: 60, height: 60, background: 'var(--surface)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
                  <Icon size={28} color="var(--blue)" />
                </div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800, color: 'var(--text)', marginBottom: 16, letterSpacing: '-0.02em' }}>{title}</h2>
                <p style={{ color: 'var(--muted)', fontSize: 16, lineHeight: 1.8 }}>{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What ABIT Does */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span className="mono-meta" style={{ marginBottom: 16, display: 'inline-flex' }}><BookOpen size={12} /> What We Do</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px, 4vw, 44px)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em' }}>
              How ABIT Shapes Careers
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }} className="what-grid">
            {[
              { title: 'Hackathons & Competitions', desc: 'Annual hackathons and competitive coding events that challenge students to build real solutions under pressure.' },
              { title: 'Technical Workshops', desc: 'Hands-on workshops on cutting-edge topics: web dev, AI/ML, blockchain, cloud, DevOps, and more.' },
              { title: 'Industry Seminars', desc: 'Talks and panels with engineers, founders, and leaders from top tech companies and startups.' },
              { title: 'Project Building', desc: 'Collaborative projects that let students apply skills to build real products with mentorship.' },
              { title: 'Networking', desc: 'Events and communities that connect ABIT members with alumni, professionals, and fellow students.' },
              { title: 'Placement Support', desc: 'Interview prep, resume reviews, and connections to companies actively hiring RGIT talent.' },
            ].map(({ title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4, borderColor: 'var(--blue)' }}
                className="ed-card"
              >
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 800, color: 'var(--text)', marginBottom: 10, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>{title}</h3>
                <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.7 }}>{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ padding: '80px 24px', background: 'var(--surface)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <span className="mono-meta" style={{ marginBottom: 16, display: 'inline-flex' }}><Award size={12} /> History</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px, 4vw, 44px)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em' }}>
              Our Journey
            </h2>
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1, background: 'var(--border)', transform: 'translateX(-50%)' }} className="timeline-line" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
              {timeline.map((item, i) => (
                <motion.div
                  key={`${item.year}-${i}`}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.5 }}
                  style={{ display: 'flex', justifyContent: i % 2 === 0 ? 'flex-start' : 'flex-end', position: 'relative' }}
                  className="timeline-item"
                >
                  <div style={{ position: 'absolute', left: '50%', top: 20, transform: 'translate(-50%, -50%)', width: 14, height: 14, background: 'var(--blue)', border: '3px solid var(--bg)', zIndex: 1 }} className="timeline-dot" />
                  <div
                    style={{ width: '45%', padding: 24, border: '1px solid var(--border)', background: 'var(--bg)' }}
                    className="timeline-content"
                  >
                    <div style={{ fontFamily: 'var(--font-utility)', fontWeight: 800, fontSize: 20, color: 'var(--blue)', marginBottom: 6 }}>{item.year}</div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 800, color: 'var(--text)', marginBottom: 8, letterSpacing: '-0.01em' }}>{item.title}</h3>
                    <p style={{ color: 'var(--muted)', fontSize: 13, lineHeight: 1.7 }}>{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 24px', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px, 4vw, 44px)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: 16 }}>
            Be part of our story
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: 16, marginBottom: 32 }}>Join ABIT and write the next chapter.</p>
          <Link href="/join" className="btn-editorial">
            Join ABIT <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </motion.div>
      </section>

      <style jsx global>{`
        @media (max-width: 768px) {
          .mv-grid { grid-template-columns: 1fr !important; }
          .what-grid { grid-template-columns: 1fr 1fr !important; }
          .timeline-line { display: none; }
          .timeline-dot { display: none; }
          .timeline-item { justify-content: flex-start !important; }
          .timeline-content { width: 100% !important; }
        }
        @media (max-width: 480px) {
          .what-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
