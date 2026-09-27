import type { Metadata } from 'next';
import CyberflareClient from './CyberflareClient';

const SITE_URL = 'https://rgitabit.in';

export const metadata: Metadata = {
  title: 'CYBERFLARE 3.0 · Capture The Flag',
  description:
    'CYBERFLARE 3.0 — ABIT × Hacktify Cybersecurity present a 24-hour online Capture The Flag. 1st Oct 9:00 AM – 2nd Oct 9:00 AM. Free entry. Top 3 win goodies, internship opportunities & certificates. Prize distribution 9th Oct 2026.',
  alternates: { canonical: `${SITE_URL}/cyberflare` },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/cyberflare`,
    siteName: 'ABIT · RGIT Mumbai',
    title: 'CYBERFLARE 3.0 · Capture The Flag | ABIT RGIT',
    description:
      '24-hour online CTF · 1–2 Oct 2026 · Free entry · Top 3: goodies + internship opportunities + certificates. Think. Hack. Capture the Flag.',
    images: [
      {
        url: '/cyberflare-hero-desktop.png',
        width: 1173,
        height: 728,
        alt: 'CYBERFLARE 3.0 — Capture The Flag',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CYBERFLARE 3.0 · Capture The Flag | ABIT RGIT',
    description:
      '24-hour online CTF · 1–2 Oct 2026 · Free entry · Top 3: goodies + internship opportunities + certificates.',
    images: ['/cyberflare-hero-desktop.png'],
  },
};

export default function CyberflarePage() {
  return <CyberflareClient />;
}
