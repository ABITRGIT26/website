export interface Event {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  date: string;
  location: string;
  category: 'hackathon' | 'workshop' | 'seminar' | 'competition' | 'flagship';
  image: string;
  registrationLink?: string;
  href?: string;
  highlights?: string[];
  speakers?: { name: string; role: string; company: string }[];
  upcoming: boolean;
}

export const events: Event[] = [
  // CODEASTRA hidden for main ABIT launch
  // {
  //   slug: 'codeastra-2.0',
  //   title: 'CODEASTRA',
  //   tagline: 'Beyond the Code.',
  //   description:
  //     'A 24-hour offline hackathon under SYNERGY. Build real solutions, adapt when the challenge changes, collaborate beyond your domain and prove it with a live demo. ₹1,15,000 total prize pool (₹50,000 1st, ₹30,000 2nd, ₹20,000 3rd, ₹15,000 Convergence).',
  //   date: 'December 2026',
  //   location: 'RGIT, Andheri West, Mumbai',
  //   category: 'flagship',
  //   image: '/events/codeastra.jpg',
  //   href: '/codeastra',
  //   highlights: ['24 Hours', '4 Domains', '₹1,15,000 Prize Pool', '8 Phases'],
  //   upcoming: true,
  // },
  {
    slug: 'campus-cup-season-2',
    title: 'Campus Cup Season 2 Free Fire',
    tagline: 'SYNERGY Phase 1 Esports.',
    description:
      'Free Fire tournament squads battle through qualifiers to the finale.',
    date: 'October 2026',
    location: 'RGIT Campus + Online',
    category: 'competition',
    image: '/events/synergy.jpg',
    href: '/synergy',
    highlights: ['Phase 1', 'Esports', 'Free Fire'],
    upcoming: false,
  },
  {
    slug: 'box-cricket-predators',
    title: 'Predators Energy Drink presents Box Cricket',
    tagline: 'SYNERGY Phase 1 Turf battle.',
    description:
      'Box cricket tournament presented by Predators Energy Drink.',
    date: 'November 2026',
    location: 'Box Cricket Turf, Andheri West',
    category: 'competition',
    image: '/events/synergy.jpg',
    href: '/synergy',
    highlights: ['Phase 1', 'Box Cricket'],
    upcoming: false,
  },
  {
    slug: 'bgmi-lan',
    title: 'BGMI LAN',
    tagline: 'SYNERGY Phase 1 Battlegrounds.',
    description:
      'BGMI LAN tournament squads drop in and battle through qualifiers to the on-stage finale.',
    date: 'December 2026',
    location: 'RGIT Campus',
    category: 'competition',
    image: '/events/synergy.jpg',
    href: '/synergy',
    highlights: ['Phase 1', 'BGMI', 'LAN Finale'],
    upcoming: false,
  },
  {
    slug: 'cyberflare-3-0',
    title: 'Cyberflare 3.0',
    tagline: 'SYNERGY Phase 1 Security + CTF.',
    description:
      'Fundamentals of cyber security, Linux, network security & tools, ethical hacking and a 24-hour CTF platform.',
    date: 'November 2026',
    location: 'RGIT Labs',
    category: 'hackathon',
    image: '/events/synergy.jpg',
    href: '/synergy',
    highlights: ['Phase 1', 'Cybersecurity', '24-hr CTF'],
    upcoming: true,
  },
  {
    slug: 'sharkathon',
    title: 'SHARKATHON',
    tagline: 'Pitch. Innovate. Dominate.',
    description:
      'ABIT\u2019s high-stakes startup pitch competition where bold thinkers present to industry experts and investors. Every groundbreaking venture begins with someone daring to dream bigger.',
    date: 'March 2026',
    location: 'RGIT Campus',
    category: 'competition',
    image: '/events/sharkathon.jpg',
    href: '/sharkathon',
    highlights: ['Startup Pitches', 'Investor Panel', '20 Teams'],
    upcoming: false,
  },
];

/* Curated Upcoming: Cyberflare (+ CodeAstra hidden for main ABIT launch). SYNERGY has its own flagship
   card and gaming events live in the Gaming Arena, so they stay out here. */
export const upcomingEvents = events.filter((e) => e.upcoming);
export const pastEvents = events.filter((e) => !e.upcoming);
