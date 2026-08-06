'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import ceyraText from '../../public/ceyra-text.png';

const navLinks = [
  { label: 'Solutions', href: '#solutions' },
  { label: 'Work', href: '#portfolio' },
  // { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'background 0.3s ease, box-shadow 0.3s ease, padding 0.3s ease',
        background: scrolled ? 'rgba(10,10,15,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(42,42,53,0.8)' : '1px solid transparent',
        padding: scrolled ? '12px 0' : '20px 0',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo + Wordmark */}
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          {/* <AnimatedLogo size={40} animated={false} style={{ filter: 'drop-shadow(0 0 8px rgba(255,107,0,0.5))' }} /> */}
          <Image
            src={ceyraText}
            alt="Ceyra Labs"
            style={{
              height: '32px',
              width: 'auto',
              display: 'block',
            }}
            priority
          />
        </a>

        {/* Desktop nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 8 }} className="hidden-mobile">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                color: '#A1A1AA',
                textDecoration: 'none',
                fontSize: 15,
                fontWeight: 500,
                padding: '8px 16px',
                borderRadius: 999,
                transition: 'color 0.2s ease, background 0.2s ease',
                fontFamily: "'Inter', Arial, sans-serif",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = '#F5F5F7';
                (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,107,0,0.08)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = '#A1A1AA';
                (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            style={{
              marginLeft: 8,
              padding: '10px 24px',
              background: 'linear-gradient(135deg, #FF6B00 0%, #FF8C00 100%)',
              color: '#fff',
              textDecoration: 'none',
              borderRadius: 999,
              fontSize: 14,
              fontWeight: 600,
              fontFamily: "'Inter', Arial, sans-serif",
              letterSpacing: '0.02em',
              boxShadow: '0 0 20px rgba(255,107,0,0.25)',
              transition: 'box-shadow 0.2s ease, transform 0.2s ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 32px rgba(255,107,0,0.5)';
              (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 20px rgba(255,107,0,0.25)';
              (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
            }}
          >
            Start a Project
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="show-mobile"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 8,
            display: 'none',
          }}
          aria-label="Toggle menu"
        >
          <div style={{ width: 24, display: 'flex', flexDirection: 'column', gap: 5 }}>
            {[0, 1, 2].map((i) => (
              <span key={i} style={{
                display: 'block',
                height: 2,
                background: '#F5F5F7',
                borderRadius: 2,
                transition: 'transform 0.2s ease, opacity 0.2s ease',
                transform: mobileOpen
                  ? i === 1 ? 'scaleX(0)' : i === 0 ? 'rotate(45deg) translateY(9px)' : 'rotate(-45deg) translateY(-9px)'
                  : 'none',
                opacity: mobileOpen && i === 1 ? 0 : 1,
              }} />
            ))}
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{
          background: 'rgba(10,10,15,0.98)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid #2A2A35',
          padding: '16px 32px 24px',
        }}>
          {navLinks.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                display: 'block',
                padding: '14px 0',
                borderBottom: '1px solid #2A2A35',
                color: '#F5F5F7',
                textDecoration: 'none',
                fontSize: 18,
                fontWeight: 500,
                animation: `fade-in-up 0.3s ease ${i * 0.07}s both`,
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            style={{
              display: 'block',
              marginTop: 20,
              padding: '14px 0',
              textAlign: 'center',
              background: 'linear-gradient(135deg, #FF6B00 0%, #FF8C00 100%)',
              color: '#fff',
              textDecoration: 'none',
              borderRadius: 8,
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            Start a Project
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </header>
  );
}
