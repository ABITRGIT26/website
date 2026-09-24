import type { Metadata } from 'next';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title: 'ABIT · Association of Budding Information Technocrats | RGIT Mumbai',
  description:
    'ABIT is the official departmental committee of RGIT Mumbai\u2019s Information Technology Department workshops, hackathons, SYNERGY festival, and a community of student builders.',
};

export default function HomePage() {
  return <HomeClient />;
}
