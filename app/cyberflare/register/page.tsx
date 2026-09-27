import type { Metadata } from 'next';
import RegisterClient from './RegisterClient';

const SITE_URL = 'https://rgitabit.in';

export const metadata: Metadata = {
  title: 'Register · CYBERFLARE 3.0',
  description:
    'Register free for CYBERFLARE 3.0 — the 24-hour online Capture The Flag by ABIT × Hacktify Cybersecurity. 1st Oct 9 AM – 2nd Oct 9 AM.',
  alternates: { canonical: `${SITE_URL}/cyberflare/register` },
};

export default function CyberflareRegisterPage() {
  return <RegisterClient />;
}
