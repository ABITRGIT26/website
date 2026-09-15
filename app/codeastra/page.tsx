import type { Metadata } from 'next';
import CodeastraClient from './CodeastraClient';

export const metadata: Metadata = {
  title: 'CODEASTRA 2.0  Beyond the Code',
  description:
    'CODEASTRA 2.0 is a 24-hour offline hackathon under SYNERGY 2027 at RGIT, Andheri West, Mumbai. Build, adapt, collaborate and prove  beyond the code. ₹2,00,000 total prize pool.',
};

export default function CodeastraPage() {
  return <CodeastraClient />;
}
