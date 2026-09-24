export interface SynergyPhaseEvent {
  title: string;
  date: string;
  venue: string;
  blurb: string;
}

export interface SynergyPhase {
  id: string;
  no: string;
  title: string;
  range: string;
  status: 'unlocked' | 'locked';
  note: string;
  events: SynergyPhaseEvent[];
}

export const synergyMeta = {
  edition: 'SYNERGY',
  tagline: 'The annual flagship technology festival of ABIT.',
  description:
    'SYNERGY is ABIT\u2019s annual flagship technology festival months of hackathons, workshops, contests, talks and community, building up to one stage. The 2026 edition runs in two phases across the academic year.',
  venue: 'RGIT, Andheri West, Mumbai',
  stats: [
    { value: 1000, suffix: '+', label: 'Participants', icon: '1000' },
    { value: 20, suffix: '+', label: 'Events', icon: '20' },
    { value: 2, suffix: '', label: 'Phases', icon: '2' },
    { value: 15, suffix: '+', label: 'Speakers & Mentors', icon: '15' },
  ],
};

export const phases: SynergyPhase[] = [
  {
    id: 'phase-1',
    no: '01',
    title: 'Phase 1',
    range: '1st September – 31st December 2026',
    status: 'unlocked',
    note: 'Open season. Skill-ups, qualifiers and community builders every event feeds points and momentum into the festival leaderboard.',
    events: [
      {
        title: 'Campus Cup Season 2 Free Fire Tournament',
        date: 'October 2026',
        venue: 'RGIT Campus + Online',
        blurb: 'Season 2 of ABIT’s esports showdown Free Fire squads battle through qualifiers to the LAN finale.',
      },
      {
        title: 'Predators Energy Drink presents Box Cricket',
        date: 'November 2026',
        venue: 'Box Cricket Turf, Andheri West',
        blurb: 'Box cricket tournament presented by Predators Energy Drink inter-college squads, live commentary and high-energy finals.',
      },
      {
        title: 'Cyberflare 3.0',
        date: 'November 2026',
        venue: 'RGIT Labs',
        blurb: 'Cybersecurity flagship: fundamentals of cyber security, Linux, network security & tools, ethical hacking and a 24-hour CTF platform.',
      },
      // CODEASTRA hidden for main ABIT launch
      // {
      //   title: 'CodeAstra',
      //   date: 'December 2026',
      //   venue: 'RGIT, Andheri West, Mumbai',
      //   blurb: '24-hour offline hackathon build, adapt, collaborate and prove beyond the code. ₹1,15,000 prize pool (50K + 30K + 20K + 15K Convergence).',
      // },
    ],
  },
  {
    id: 'phase-2',
    no: '02',
    title: 'Phase 2',
    range: '7th January – 31st May 2027',
    status: 'locked',
    note: 'Sealed. The second half of SYNERGY reveals in January 2027.',
    events: [],
  },
];
