export interface Project {
    title: string;
    description: string;
    tech: string[];
    github?: string;
    demo?: string;
    category: 'web' | 'mobile' | 'ai' | 'iot' | 'other';
    team: string[];
    featured: boolean;
}

export const projects: Project[] = [
    {
        title: 'MediChain',
        description: 'A blockchain-based medical records system enabling patients to securely share health data with healthcare providers through smart contracts.',
        tech: ['Solidity', 'React', 'Node.js', 'IPFS'],
        github: '#',
        demo: '#',
        category: 'web',
        team: ['Arjun S.', 'Kavya J.', 'Mihir S.'],
        featured: true,
    },
    {
        title: 'CampusConnect',
        description: 'A real-time campus communication platform with clubs management, event announcements, and student networking features.',
        tech: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'WebSockets'],
        github: '#',
        demo: '#',
        category: 'web',
        team: ['Priya V.', 'Rohit N.', 'Sarthak G.'],
        featured: true,
    },
    {
        title: 'AgriSense',
        description: 'IoT-powered smart farming system using soil sensors and ML to predict optimal irrigation and detect crop diseases early.',
        tech: ['Python', 'TensorFlow', 'Arduino', 'React Native', 'Firebase'],
        github: '#',
        category: 'iot',
        team: ['Tanvi D.', 'Karan M.', 'Aditya P.'],
        featured: true,
    },
    {
        title: 'CodeBuddy AI',
        description: 'An AI-powered coding assistant that explains code, suggests improvements, and helps debug — built specifically for college students.',
        tech: ['Python', 'FastAPI', 'LangChain', 'React', 'OpenAI'],
        github: '#',
        demo: '#',
        category: 'ai',
        team: ['Aditya P.', 'Tanvi D.'],
        featured: false,
    },
    {
        title: 'EcoTrack',
        description: 'A carbon footprint tracker mobile app that gamifies sustainability — users earn points by making eco-friendly choices.',
        tech: ['React Native', 'Expo', 'Node.js', 'MongoDB'],
        github: '#',
        demo: '#',
        category: 'mobile',
        team: ['Sneha K.', 'Riya M.'],
        featured: false,
    },
    {
        title: 'SkillBridge',
        description: 'A peer-to-peer skill exchange platform where students teach and learn from each other through micro-courses and live sessions.',
        tech: ['Next.js', 'Supabase', 'TypeScript', 'Tailwind'],
        github: '#',
        demo: '#',
        category: 'web',
        team: ['Kavya J.', 'Pooja R.'],
        featured: false,
    },
];

export const featuredProjects = projects.filter((p) => p.featured);
