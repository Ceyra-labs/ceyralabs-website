import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Ceyra Labs - Intelligence in Motion',
    short_name: 'Ceyra Labs',
    description: 'CEYRA LABS builds intelligent, scalable, future-ready software — AI, mobile apps, platform engineering, blockchain, and more.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0A0A0F',
    theme_color: '#0A0A0F',
    icons: [
      {
        src: '/ceyra.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
