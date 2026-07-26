import type { Metadata, Viewport } from 'next';
import { PorscheDesignSystemProvider } from '@porsche-design-system/components-react';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : 'https://ceyralabs.com'
  ),
  title: {
    default: 'Ceyra Labs - Intelligence in Motion',
    template: '%s | Ceyra Labs',
  },
  description: 'Ceyra Labs builds intelligent, scalable, future-ready software — AI, mobile apps, platform engineering, blockchain, and more.',
  keywords: [
    'Software Engineering',
    'AI & Machine Learning',
    'Mobile Applications',
    'Web Applications',
    'UI/UX Design',
    'Platform Engineering',
    'Ceyra Labs',
    'Ceyora',
    'Custom Software Development',
    'Next-Gen Tech Lab'
  ],
  authors: [{ name: 'Ceyra Labs', url: 'https://ceyralabs.com' }],
  creator: 'Ceyra Labs',
  publisher: 'Ceyra Labs',
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Ceyra Labs - Intelligence in Motion',
    description: 'Ceyra Labs builds intelligent, scalable, future-ready software — AI, mobile apps, platform engineering, blockchain, and more.',
    url: 'https://ceyralabs.com',
    siteName: 'Ceyra Labs',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Ceyra Labs - Intelligence in Motion',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ceyra Labs - Intelligence in Motion',
    description: 'Ceyra Labs builds intelligent, scalable, future-ready software — AI, mobile apps, platform engineering, blockchain, and more.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/ceyra.svg', type: 'image/svg+xml' }
    ],
    apple: [
      { url: '/ceyra.svg' }
    ]
  }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    'name': 'Ceyra Labs',
    'url': 'https://ceyralabs.com',
    'logo': 'https://ceyralabs.com/ceyra.svg',
    'image': 'https://ceyralabs.com/og-image.png',
    'description': 'Ceyra Labs builds intelligent, scalable, future-ready software — AI, mobile apps, platform engineering, blockchain, and more.',
    'email': 'hello@ceyralabs.com',
    'knowsAbout': [
      'Software Engineering',
      'Artificial Intelligence',
      'Machine Learning',
      'Mobile App Development',
      'Web Application Development',
      'UI/UX Design',
      'Platform Engineering'
    ]
  };

  return (
    <html lang="en" className="dark">
      <body style={{ background: '#0A0A0F', margin: 0 }}>
        <PorscheDesignSystemProvider theme="dark">
          {children}
        </PorscheDesignSystemProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
