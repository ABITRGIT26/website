export interface TeamMember {
    name: string;
    role: string;
    team: 'core_25_26' | 'core_24_25' | 'core_23_24' | 'technical' | 'design' | 'events' | 'media';
    image: string;
    linkedin?: string;
    github?: string;
    bio?: string;
}

export const team: TeamMember[] = [
    // Core 2025-2026
    { name: 'Darshan Rane', role: 'President', team: 'core_25_26', image: '/team/darshan_rane.jpg', linkedin: '#', bio: 'Leadership · Execution · Excellence' },
    { name: 'Krishna Sharma', role: 'Managing Director', team: 'core_25_26', image: '/team/krishna_sharma.jpg', linkedin: '#', bio: 'Leadership · Execution · Excellence' },
    { name: 'Sarthaki Jadhav', role: 'General Secretary', team: 'core_25_26', image: '/team/sarthaki_jadhav.jpg', linkedin: '#', bio: 'Leadership · Execution · Excellence' },
    { name: 'Divyang Pawar', role: 'Treasurer', team: 'core_25_26', image: '/team/divyang_pawar.jpg', linkedin: '#', bio: 'Leadership · Execution · Excellence' },
    { name: 'Yash Todankar', role: 'Vice President', team: 'core_25_26', image: '/team/yash_todankar.jpg', linkedin: '#', bio: 'Leadership · Execution · Excellence' },
    { name: 'Nishant Salekar', role: 'Joint General Secretary', team: 'core_25_26', image: '/team/nishant_salekar.jpg', linkedin: '#', bio: 'Leadership · Execution · Excellence' },
    { name: 'Unnati Nashirkar', role: 'Joint General Secretary', team: 'core_25_26', image: '/team/unnati_nashirkar.jpg', linkedin: '#', bio: 'Leadership · Execution · Excellence' },

    // Core 2024-2025
    { name: 'Sanika Harad', role: 'President', team: 'core_24_25', image: '/team/sanika_harad.jpg', linkedin: '#', bio: 'Past President driving previous initiatives.' },
    { name: 'Devansh Jadhav', role: 'Managing Director', team: 'core_24_25', image: '/team/devansh_jadhav.jpg', linkedin: '#', bio: 'Past Managing Director.' },
    { name: 'Aaditya Mohile', role: 'General Secretary', team: 'core_24_25', image: '/team/aaditya_mohile.jpg', linkedin: '#', bio: 'Past General Secretary.' },
    { name: 'Hritik Kanse', role: 'Treasurer', team: 'core_24_25', image: '/team/hritik_kanse.jpg', linkedin: '#', bio: 'Past Treasurer.' },
    { name: 'Siddh Barbaya', role: 'Vice President', team: 'core_24_25', image: '/team/siddh_barbaya.jpg', linkedin: '#', bio: 'Past Vice President.' },
    { name: 'Jayesh Shinde', role: 'Joint General Secretary', team: 'core_24_25', image: '/team/jayesh_shinde.jpg', linkedin: '#', bio: 'Past Joint General Secretary.' },

    // Core 2023-2024
    { name: 'Pratik Dave', role: 'President', team: 'core_23_24', image: '/team/pratik_dave.jpg', linkedin: '#', bio: 'Past President setting the foundation.' },
    { name: 'Aaryaman Jha', role: 'General Secretary', team: 'core_23_24', image: '/team/aaryaman_jha.jpg', linkedin: '#', bio: 'Past General Secretary.' },
    { name: 'Jenil Kumbhani', role: 'Treasurer', team: 'core_23_24', image: '/team/jenil_kumbhani.jpg', linkedin: '#', bio: 'Past Treasurer.' },
    { name: 'Dhiraj Jadhav', role: 'Vice President', team: 'core_23_24', image: '/team/dhiraj_jadhav.jpg', linkedin: '#', bio: 'Past Vice President.' },

    // Technical Team
    { name: 'Aditya Patil', role: 'Technical Head', team: 'technical', image: '/team/aditya.jpg', linkedin: '#', github: '#', bio: 'Open source contributor and competitive programmer.' },
    { name: 'Kavya Joshi', role: 'Backend Lead', team: 'technical', image: '/team/kavya.jpg', linkedin: '#', github: '#', bio: 'Node.js and Python developer building scalable systems.' },
    { name: 'Mihir Shah', role: 'Frontend Lead', team: 'technical', image: '/team/mihir.jpg', linkedin: '#', github: '#', bio: 'React and Next.js specialist with a design-first mindset.' },
    { name: 'Tanvi Desai', role: 'ML Engineer', team: 'technical', image: '/team/tanvi.jpg', linkedin: '#', github: '#', bio: 'ML research intern exploring NLP and computer vision.' },

    // Design Team
    { name: 'Riya Mehta', role: 'Design Head', team: 'design', image: '/team/riya.jpg', linkedin: '#', bio: 'UI/UX designer crafting delightful digital experiences.' },
    { name: 'Sarthak Gupta', role: 'Graphic Designer', team: 'design', image: '/team/sarthak.jpg', linkedin: '#', bio: 'Brand identity and motion design enthusiast.' },

    // Events Team
    { name: 'Pooja Rane', role: 'Events Head', team: 'events', image: '/team/pooja.jpg', linkedin: '#', bio: 'Led successful execution of SYNERGY 2024 with 500+ participants.' },
    { name: 'Karan Malhotra', role: 'Sponsorship Lead', team: 'events', image: '/team/karan.jpg', linkedin: '#', bio: 'Securing partnerships with leading tech companies.' },
];

export const core2526 = team.filter((m) => m.team === 'core_25_26');
export const core2425 = team.filter((m) => m.team === 'core_24_25');
export const core2324 = team.filter((m) => m.team === 'core_23_24');
export const technicalTeam = team.filter((m) => m.team === 'technical');
export const designTeam = team.filter((m) => m.team === 'design');
export const eventsTeam = team.filter((m) => m.team === 'events');

export interface Mentor {
    name: string;
    role: string;
    quote: string;
    image?: string;
}

export const mentors: Mentor[] = [
    {
        name: 'Dr. Sanjay Bokade',
        role: 'PRINCIPAL',
        quote: 'Leading with vision to empower students for a bright future in technology.',
        image: '/team/sanjay_bokade.png',
    },
    {
        name: 'Dr. Sunil Wankhade',
        role: 'HEAD OF DEPARTMENT',
        quote: 'Fostering an environment of continuous learning and technical excellence.',
        image: '/team/sunil_wankhade.png',
    },
    {
        name: 'Prof. Ankush Hutke',
        role: 'ABIT CONVENOR',
        quote: 'Guiding the next generation of innovators is our passion and privilege.',
        image: '/team/ankush_hutke.png',
    }
];
