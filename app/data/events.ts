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
    highlights?: string[];
    speakers?: { name: string; role: string; company: string }[];
    upcoming: boolean;
}

export const events: Event[] = [
    {
        slug: 'synergy-2024',
        title: 'SYNERGY 2024',
        tagline: "ABIT's Flagship Annual Tech Fest",
        description:
            'SYNERGY is ABIT\'s premier annual technology festival, bringing together students, industry professionals, and innovators for three days of learning, building, and connecting. From hackathons to keynotes, SYNERGY is where ideas become reality.',
        date: 'March 15–17, 2024',
        location: 'RGIT, Versova, Mumbai',
        category: 'flagship',
        image: '/events/synergy.jpg',
        registrationLink: '#',
        highlights: ['500+ Participants', '₹1L+ Prize Pool', '20+ Events', '15+ Speakers'],
        speakers: [
            { name: 'Dr. Priya Sharma', role: 'AI Research Lead', company: 'Google India' },
            { name: 'Rahul Mehta', role: 'CTO', company: 'Startup India' },
            { name: 'Anika Patel', role: 'Senior Engineer', company: 'Microsoft' },
        ],
        upcoming: false,
    },
    {
        slug: 'hackathon-2024',
        title: 'ABIT Hackathon 2024',
        tagline: '24 Hours. Infinite Possibilities.',
        description:
            'A 24-hour hackathon challenging students to build innovative solutions to real-world problems. Teams of 2–4 compete for prizes and mentorship opportunities.',
        date: 'April 20, 2024',
        location: 'RGIT Campus',
        category: 'hackathon',
        image: '/events/hackathon.jpg',
        registrationLink: '#',
        highlights: ['150+ Teams', '₹50K Prize Pool', '10+ Mentors'],
        upcoming: false,
    },
    {
        slug: 'webdev-workshop',
        title: 'Full Stack Web Dev Workshop',
        tagline: 'Build Modern Web Apps in 2 Days',
        description:
            'An intensive two-day hands-on workshop covering React, Node.js, databases, and deployment. Perfect for beginners and intermediate developers.',
        date: 'May 10–11, 2024',
        location: 'RGIT Labs',
        category: 'workshop',
        image: '/events/webdev.jpg',
        registrationLink: '#',
        upcoming: false,
    },
    {
        slug: 'ai-ml-bootcamp',
        title: 'AI & ML Bootcamp',
        tagline: 'From Data to Intelligence',
        description:
            'A comprehensive bootcamp covering machine learning fundamentals, neural networks, and practical AI implementation using Python and TensorFlow.',
        date: 'June 5–7, 2024',
        location: 'RGIT Seminar Hall',
        category: 'workshop',
        image: '/events/aiml.jpg',
        registrationLink: '#',
        upcoming: true,
    },
    {
        slug: 'cloud-seminar',
        title: 'Cloud Computing & DevOps Seminar',
        tagline: 'Scale Your Skills',
        description:
            'Industry experts from AWS and Azure share insights on cloud architecture, DevOps practices, and the future of infrastructure.',
        date: 'July 12, 2024',
        location: 'RGIT Auditorium',
        category: 'seminar',
        image: '/events/cloud.jpg',
        registrationLink: '#',
        upcoming: true,
    },
    {
        slug: 'code-quest',
        title: 'CodeQuest 2024',
        tagline: 'ABIT\'s Annual Coding Competition',
        description:
            'Test your algorithmic skills in this multi-round competitive programming contest. From easy warm-ups to tough challenges — can you top the leaderboard?',
        date: 'August 2, 2024',
        location: 'Online + RGIT',
        category: 'competition',
        image: '/events/codequest.jpg',
        registrationLink: '#',
        upcoming: true,
    },
];

export const upcomingEvents = events.filter((e) => e.upcoming);
export const pastEvents = events.filter((e) => !e.upcoming);
