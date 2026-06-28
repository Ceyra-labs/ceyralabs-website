import type { Metadata, Viewport } from 'next';
import { PorscheDesignSystemProvider } from '@porsche-design-system/components-react';
import './globals.css';

export const metadata: Metadata = {
  title: 'CeyraLabs — Next-Gen Technology Lab',
  description: 'CeyraLabs builds intelligent, scalable, future-ready software — AI, mobile apps, platform engineering, blockchain, and more.',
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
  return (
    <html lang="en" className="dark">
      <body style={{ background: '#0A0A0F', margin: 0 }}>
        <PorscheDesignSystemProvider theme="dark">
          {children}
        </PorscheDesignSystemProvider>
      </body>
    </html>
  );
}
