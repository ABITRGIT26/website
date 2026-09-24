import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Register Codeastra | Synergy 2027',
  description:
    'Register for Codeastra, a 24-hour offline hackathon under Synergy 2027. Go beyond the code.',
};

export default function RegisterPage() {
  return <RegisterClient />;
}

import RegisterClient from './RegisterClient';
