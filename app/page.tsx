import type { Metadata } from 'next';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title: 'ABIT — Association of Budding Information Technocrats',
  description:
    'Empowering the next generation of technologists at RGIT through workshops, hackathons, competitions, and a vibrant tech community.',
};

export default function HomePage() {
  return <HomeClient />;
}
