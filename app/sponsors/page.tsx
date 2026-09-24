'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Check, Users, Megaphone, Briefcase, Share2 } from 'lucide-react';

const tiers = [
    {
        name: 'Title Sponsor',
        price: '₹1,00,000',
        popular: true,
        benefits: [
            '2 seminars + 1 webinar',
            '1500 college student database',
            'Brand exclusivity (no similar-domain sponsor)',
            'Database of participating students',
            'Instagram collaboration post + 75 story tags',
            'Logo on poster, merchandise, etc.',
            'Year-round WhatsApp publicity group',
            'Stall during the event',
            'Publicity across Mumbai engineering colleges',
        ],
    },
    {
        name: 'Powered By',
        price: '₹75,000',
        benefits: [
            '1 seminar + 1 webinar',
            '1200 college student database',
            'Brand exclusivity (no similar-domain sponsor)',
            'Database of participating students',
            'Instagram collaboration post + 50 story tags',
            'Logo on poster, merchandise, etc.',
            'Year-round WhatsApp publicity group',
            'Stall during the event',
            'Publicity across Mumbai engineering colleges',
        ],
    },
    {
        name: 'Partner',
        price: '₹50,000',
        benefits: [
            '1 seminar + 1 webinar',
            '800 college student database',
            'Database of participating students',
            'Instagram collaboration post + 30 story tags',
            'Logo on posters',
        ],
    },
    {
        name: 'Associate Partner',
        price: '₹30,000',
        benefits: [
            '1 webinar',
            '400 college student database',
            'Database of participating students',
            'Instagram collaboration post + 20 story tags',
        ],
    },
];

interface Sponsor {
    name: string;
    role: string;
    sector: string;
    logo: string;
}

const pastSponsors: Sponsor[] = [
    { name: 'Collegepond', role: 'Overseas Education Partner', sector: 'Higher Education & Study Abroad', logo: '/sponsors/01-collegepond.png' },
    { name: 'Infotech Academy', role: 'Workshop Partner (WordPress Web Development)', sector: 'IT Training & Education', logo: '/sponsors/02-infotech-academy.png' },
    { name: 'North Star Consultancy', role: 'Webinar Partner (Portfolio Building)', sector: 'Career & Overseas Consulting', logo: '/sponsors/03-north-star-consultancy.png' },
    { name: 'Talenthome Solutions', role: 'Seminar Partner (Web Development)', sector: 'IT Solutions & Training', logo: '/sponsors/04-talenthome-solutions.jpg' },
    { name: 'Finance Cafe', role: 'Webinar Partner (Stock Market Trading)', sector: 'Financial Education & Wealth Advisory', logo: '/sponsors/05-finance-cafe.png' },
    { name: 'Vidyalankar', role: 'Seminar Partner (Foreign Studies)', sector: 'Higher Education & Coaching', logo: '/sponsors/06-vidyalankar.png' },
    { name: 'Temples of India', role: 'Internship Partner', sector: 'Cultural Heritage & Content Platform', logo: '/sponsors/07-temples-of-india.png' },
    { name: 'GeeksforGeeks', role: 'Technical & Coding Partner', sector: 'EdTech & Computer Science', logo: '/sponsors/08-geeksforgeeks.png' },
    { name: 'Try Catch Classes', role: 'Title Sponsor', sector: 'IT Training & Certification', logo: '/sponsors/09-try-catch-classes.png' },
    { name: 'Inflow', role: 'Cybersecurity Workshop Partner', sector: 'Enterprise IT & Information Integrity', logo: '/sponsors/10-inflow.jpg' },
    { name: 'The VFX Institute by Visual Birds Studio', role: 'Creative & Media Partner', sector: 'Animation, VFX & Visual Arts', logo: '/sponsors/11-the-vfx-institute-by-visual-birds-studio.png' },
    { name: 'Vision Trading', role: 'Financial Education Partner', sector: 'Stock Trading & Financial Markets', logo: '/sponsors/12-vision-trading.jpg' },
    { name: 'Shivtara Enterprises', role: 'Industrial / Event Partner', sector: 'Manufacturing & Industrial Solutions', logo: '/sponsors/13-shivtara-enterprises.png' },
    { name: 'Coding Ninjas', role: 'Coding & EdTech Partner', sector: 'Programming Education & Upskilling', logo: '/sponsors/14-coding-ninjas.jpg' },
    { name: 'Riya Study Abroad', role: 'Study Abroad Partner', sector: 'Global Overseas Consulting', logo: '/sponsors/15-riya-study-abroad.jpg' },
    { name: 'Hacktify', role: 'Cyber Security & Training Partner', sector: 'Ethical Hacking & Infosec', logo: '/sponsors/16-hacktify.jpg' },
    { name: 'RHI Magnesita', role: 'Corporate / Industrial Sponsor', sector: 'Refractory Products & Solutions', logo: '/sponsors/17-rhi-magnesita.png' },
    { name: 'Cloud Counselage', role: 'IT & Cloud Partner', sector: 'Cloud Computing & Career Consulting', logo: '/sponsors/18-cloud-counselage.png' },
    { name: 'Vold Energy Drinks', role: 'Beverage Partner', sector: 'Energy Beverages & FMCG', logo: '/sponsors/19-vold-energy-drinks.png' },
    { name: 'Intervue.io', role: 'Technical Assessment Partner', sector: 'Live Interview & Hiring Platform', logo: '/sponsors/20-intervue-io.png' },
    { name: 'Watermelon Gang Marketing Agency', role: 'Marketing & Social Media Partner', sector: 'Digital Marketing & Creative Strategy', logo: '/sponsors/21-watermelon-gang-marketing-agency.png' },
    { name: "Markin’it", role: 'Branding & Design Partner', sector: 'Creative Marketing & Merchandise', logo: '/sponsors/22-markin-it.jpg' },
    { name: 'Mannasrekha Enterprises', role: 'Communication Partner', sector: 'Telecommunications & Services', logo: '/sponsors/23-mannasrekha-enterprises.png' },
    { name: 'Suraj Lama Momos', role: 'Food Partner', sector: 'Fast Food & Quick Service Restaurant', logo: '/sponsors/24-suraj-lama-momos.png' },
    { name: 'Pizza Hut', role: 'Food Partner', sector: 'Pizza Chain & Fast Food', logo: '/sponsors/25-pizza-hut.png' },
    { name: 'D Lakhani Hospitality', role: 'Hospitality Partner / Special Thanks', sector: 'Hospitality, Dining & Banquets', logo: '/sponsors/26-d-lakhani-hospitality.png' },
    { name: 'Travotic Holidays', role: 'Travel Partner', sector: 'Tours, Travel & Holiday Logistics', logo: '/sponsors/27-travotic-holidays.jpg' },
    { name: '369 Group of Companies', role: 'Title Sponsor', sector: 'Conglomerate & Corporate Ventures', logo: '/sponsors/28-369-group-of-companies.png' },
    { name: 'VS Sahil', role: 'Creative / Media Partner', sector: 'Media Production & Influencer', logo: '/sponsors/29-vs-sahil.jpg' },
    { name: 'Moon Thrifts', role: 'Accessory Partner', sector: 'Sustainable Fashion & Thrift Store', logo: '/sponsors/30-moon-thrifts.png' },
    { name: 'Cherry & Chocolatte', role: 'Cafe & Gifting Partner', sector: 'Bakery, Confectionery & Cafe', logo: '/sponsors/31-cherry-chocolatte.png' },
    { name: 'Black Simba Energy Drink', role: 'Beverage Partner', sector: 'Energy Drinks & Beverages', logo: '/sponsors/32-black-simba-energy-drink.png' },
    { name: 'The Belgian Waffle Co.', role: 'Food Partner', sector: 'Waffles, Desserts & Quick Service', logo: '/sponsors/33-the-belgian-waffle-co.jpg' },
    { name: "Domino's Pizza", role: 'Food Partner', sector: 'Pizza Chain & Fast Food', logo: '/sponsors/34-domino-s-pizza.png' },
    { name: 'VeeFly', role: 'Advertising Partner', sector: 'Video Marketing & YouTube Promotion', logo: '/sponsors/35-veefly.png' },
    { name: 'Leverage Edu', role: 'Knowledge Partner', sector: 'Study Abroad & Higher Education', logo: '/sponsors/36-leverage-edu.png' },
    { name: 'Imperial Overseas', role: 'Foreign Studies Partner', sector: 'Overseas Education Consultancy', logo: '/sponsors/37-imperial-overseas.png' },
    { name: 'TechBairn', role: 'Tech Partner', sector: 'Emerging Tech Training & Upskilling', logo: '/sponsors/38-techbairn.png' },
    { name: 'Uptiq.ai', role: 'AI & Innovation Partner', sector: 'Artificial Intelligence & SaaS Platform', logo: '/sponsors/39-uptiq-ai.jpg' },
];

const sponsorCategories: { title: string; names: string[] }[] = [
    { title: 'Title Sponsors & Core Corporate Backers', names: ['369 Group of Companies', 'Try Catch Classes', 'RHI Magnesita'] },
    { title: 'Education, Upskilling & Technical Partners', names: ['GeeksforGeeks', 'Coding Ninjas', 'TechBairn', 'Inflow', 'Hacktify', 'Infotech Academy', 'Talenthome Solutions', 'Cloud Counselage', 'Intervue.io', 'Uptiq.ai'] },
    { title: 'Study Abroad & Overseas Education Partners', names: ['Collegepond', 'Vidyalankar', 'Leverage Edu', 'Imperial Overseas', 'North Star Consultancy', 'Riya Study Abroad'] },
    { title: 'Food, Beverage & Dining Partners', names: ["Domino's Pizza", 'Pizza Hut', 'The Belgian Waffle Co.', 'Suraj Lama Momos', 'Black Simba Energy Drink', 'Vold Energy Drinks', 'Cherry & Chocolatte', 'D Lakhani Hospitality'] },
    { title: 'Media, Marketing & Creative Partners', names: ['VeeFly', 'Watermelon Gang Marketing Agency', "Markin’it", 'The VFX Institute by Visual Birds Studio', 'VS Sahil'] },
    { title: 'Travel, Lifestyle & Allied Services', names: ['Travotic Holidays', 'Mannasrekha Enterprises', 'Moon Thrifts', 'Finance Cafe', 'Vision Trading', 'Temples of India', 'Shivtara Enterprises'] },
];

const sponsorByName = new Map(pastSponsors.map((s) => [s.name, s]));

const why = [
    { icon: Users, title: '500+ Students', desc: 'Directly reach a concentrated pool of engineering talent.' },
    { icon: Megaphone, title: 'Brand Visibility', desc: 'Premium placement across all ABIT event materials and digital channels.' },
    { icon: Briefcase, title: 'Talent Pipeline', desc: 'Early access to high-potential students for internships and placements.' },
    { icon: Share2, title: 'Social Reach', desc: '10,000+ combined social media reach across ABIT’s platforms.' },
];

function SponsorCard({ sponsor, index }: { sponsor: Sponsor; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (index % 6) * 0.06 }}
            style={{ border: '1px solid var(--border)', background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}
        >
            <div style={{ background: '#fff', height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, borderBottom: '1px solid var(--border)' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={sponsor.logo} alt={`${sponsor.name} logo`} loading="lazy" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
            </div>
            <div style={{ padding: '18px 20px' }}>
                <div style={{ fontWeight: 800, fontSize: 15, textTransform: 'uppercase', marginBottom: 4, lineHeight: 1.3 }}>{sponsor.name}</div>
                <div style={{ color: 'var(--accent)', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>{sponsor.role}</div>
                <div style={{ color: 'var(--muted)', fontSize: 12 }}>{sponsor.sector}</div>
            </div>
        </motion.div>
    );
}

export default function SponsorsPage() {
    return (
        <div style={{ background: 'var(--bg)', color: 'var(--text)', minHeight: '100vh', paddingTop: 100 }}>
            <section style={{ padding: '80px 24px', textAlign: 'center' }}>
                <div style={{ maxWidth: 900, margin: '0 auto' }}>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <span className="mono-meta" style={{ marginBottom: 20, display: 'inline-flex' }}>Sponsors · 39 Partners</span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                        style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 6vw, 68px)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.02, margin: '0 0 20px', textTransform: 'uppercase' }}
                    >
                        Partner with ABIT<span style={{ color: 'var(--accent)' }}>.</span>
                    </motion.h1>
                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ color: 'var(--muted)', fontSize: 'clamp(16px, 2vw, 18px)', lineHeight: 1.8, maxWidth: 640, margin: '0 auto' }}>
                        Reach 500+ passionate RGIT students and connect your brand with the next generation of tech talent. Trusted by 39 sponsors & partners from title sponsors to food, education, media and tech.
                    </motion.p>
                </div>
            </section>

            <section style={{ padding: '0 24px 100px' }}>
                <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 90 }} className="why-grid">
                        {why.map(({ icon: Icon, title, desc }, i) => (
                            <motion.div
                                key={title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                                style={{ padding: 28, border: '1px solid var(--border)', background: 'var(--bg)', textAlign: 'left' }}
                            >
                                <Icon size={24} color="var(--accent)" style={{ marginBottom: 16 }} />
                                <h3 style={{ fontSize: 16, fontWeight: 800, textTransform: 'uppercase', margin: '0 0 8px' }}>{title}</h3>
                                <p style={{ color: 'var(--muted)', fontSize: 13, lineHeight: 1.7, margin: 0 }}>{desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    <h2 style={{ fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 900, letterSpacing: '-0.02em', textTransform: 'uppercase', textAlign: 'center', margin: '0 0 40px' }}>
                        Sponsorship Tiers
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20, marginBottom: 90, alignItems: 'stretch' }} className="tiers-grid">
                        {tiers.map(({ name, price, benefits, popular }, i) => (
                            <motion.div
                                key={name}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                style={{
                                    padding: 36, background: popular ? 'var(--ink)' : 'var(--bg)',
                                    color: popular ? 'var(--paper)' : 'var(--text)',
                                    border: '1px solid var(--ink)',
                                    position: 'relative', display: 'flex', flexDirection: 'column',
                                }}
                            >
                                {popular && (
                                    <div style={{ position: 'absolute', top: -13, left: 32, background: 'var(--accent)', color: '#F4F1E8', fontFamily: 'var(--font-utility)', fontSize: 10, fontWeight: 700, padding: '5px 14px', letterSpacing: '0.1em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Most Popular</div>
                                )}
                                <h3 style={{ fontSize: 13, fontWeight: 700, fontFamily: 'var(--font-utility)', letterSpacing: '0.16em', textTransform: 'uppercase', color: popular ? 'var(--accent)' : 'var(--muted)', margin: '0 0 8px' }}>{name}</h3>
                                <div style={{ fontSize: 36, fontWeight: 900, letterSpacing: '-0.02em', marginBottom: 24 }}>{price}</div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
                                    {benefits.map((b) => (
                                        <div key={b} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                                            <Check size={15} color="var(--accent)" style={{ flexShrink: 0, marginTop: 2 }} />
                                            <span style={{ color: popular ? 'rgba(244,241,232,0.72)' : 'var(--muted)', fontSize: 14 }}>{b}</span>
                                        </div>
                                    ))}
                                </div>
                                <Link
                                    href="/contact"
                                    style={{
                                        marginTop: 'auto', textDecoration: 'none', textAlign: 'center',
                                        padding: '14px', fontWeight: 800, fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase',
                                        background: popular ? 'var(--paper)' : 'var(--accent)', color: popular ? 'var(--ink)' : '#F4F1E8',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                                    }}
                                >
                                    Contact Us <ArrowRight size={14} />
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    <h2 style={{ fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 900, letterSpacing: '-0.02em', textTransform: 'uppercase', textAlign: 'center', margin: '0 0 12px' }}>
                        Past Sponsors & Partners 39
                    </h2>
                    <p style={{ textAlign: 'center', color: 'var(--muted)', fontSize: 14, margin: '0 0 40px' }}>
                        Association of Budding Information Technocrats (ABIT), RGIT comprehensive roster from ABIT Sponsors archive.
                    </p>
                    {sponsorCategories.map((cat) => (
                        <div key={cat.title} style={{ marginBottom: 48 }}>
                            <h3 style={{ fontSize: 16, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 16px', borderLeft: '4px solid var(--accent)', paddingLeft: 12 }}>
                                {cat.title} ({cat.names.length})
                            </h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }} className="past-grid">
                                {cat.names.map((name, i) => {
                                    const s = sponsorByName.get(name);
                                    if (!s) return null;
                                    return <SponsorCard key={name} sponsor={s} index={i} />;
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <style jsx global>{`
        @media (max-width: 900px) { .why-grid { grid-template-columns: 1fr 1fr !important; } .tiers-grid { grid-template-columns: 1fr !important; } .past-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 560px) { .past-grid { grid-template-columns: 1fr !important; } .why-grid { grid-template-columns: 1fr !important; } }
      `}</style>
        </div>
    );
}
