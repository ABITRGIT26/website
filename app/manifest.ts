import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ABIT · Association of Budding Information Technocrats | RGIT Mumbai',
    short_name: 'ABIT RGIT',
    description:
      'ABIT is the official departmental committee of RGIT Mumbai’s Information Technology Department. Workshops, hackathons, the SYNERGY festival, and a community of student builders.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#060A1A',
    theme_color: '#060A1A',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-maskable.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
