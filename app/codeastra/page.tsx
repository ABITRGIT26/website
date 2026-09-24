import type { Metadata } from 'next';
import CodeastraClient from './CodeastraClient';

export const metadata: Metadata = {
  title: 'CODEASTRA  Beyond the Code',
  description:
    'CODEASTRA is a 24-hour offline hackathon under SYNERGY 2027 at RGIT, Andheri West, Mumbai. Build, adapt, collaborate and prove beyond the code. ₹1,15,000 total prize pool.',
};

export default function CodeastraPage() {
  return <CodeastraClient />;
}
