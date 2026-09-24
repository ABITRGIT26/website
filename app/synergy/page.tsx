import type { Metadata } from 'next';
import SynergyClient from './SynergyClient';

export const metadata: Metadata = {
  title: 'Synergy · ABIT Flagship Festival',
  description:
    'SYNERGY ABIT\u2019s annual flagship technology festival. Phase 1 unlocked (1st September – 31st December 2026), Phase 2 reveals January 2027.',
};

export default function SynergyPage() {
  return <SynergyClient />;
}
