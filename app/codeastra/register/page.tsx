import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Register — Codeastra 2.0 | Synergy 2027',
  description:
    'Register for Codeastra 2.0, a 24-hour offline hackathon under Synergy 2027. Go beyond the code.',
};

export default function RegisterPage() {
  return <RegisterClient />;
}

import RegisterClient from './RegisterClient';
