'use client';

import { useEffect, useRef } from 'react';

const services = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'AI',
    description: 'Machine learning systems, LLM integrations, computer vision, and intelligent automation pipelines.',
    accent: '#FF6B00',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3M3 16v3a2 2 0 002 2h3m8 0h3a2 2 0 002-2v-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 9h6M9 12h6M9 15h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'SE',
    description: 'Full-stack engineering with scalable architecture, clean code principles, and enterprise reliability.',
    accent: '#7C5CFC',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="5" y="2" width="14" height="20" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M9 7h6M9 11h6M9 15h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="12" cy="18" r="1" fill="currentColor"/>
      </svg>
    ),
    title: 'App sol',
    description: 'Cross-platform mobile applications for iOS and Android built with performance-first principles.',
    accent: '#22D3EE',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Product desi',
    description: 'User-centric UI/UX design with research-driven decisions and refined design systems.',
    accent: '#FF6B00',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M9 17H7A5 5 0 017 7h2M15 7h2a5 5 0 010 10h-2M8 12h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Product managt',
    description: 'Strategic product lifecycle management from ideation to launch with agile execution.',
    accent: '#7C5CFC',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M20 7H4a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M16 3v4M8 3v4M16 17v4M8 17v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    title: 'Platform eng',
    description: 'Cloud infrastructure, DevOps pipelines, microservices, and highly available distributed systems.',
    accent: '#22D3EE',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M2 17l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'System int',
    description: 'System-level architecture, integration layers, and reliability-focused implementation.',
    accent: '#FF6B00',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <ellipse cx="12" cy="5" rx="9" ry="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M3 5v14a9 3 0 0018 0V5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M3 12a9 3 0 0018 0" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    title: 'Poc sistem',
    description: 'Rapid proof-of-concept builds to validate ideas, secure investment, and reduce technical risk.',
    accent: '#7C5CFC',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M4 6h16M4 12h16M4 18h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="17" cy="18" r="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M20 21l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'AI',
    description: 'AI-assisted product delivery, automation, and decision support systems for modern teams.',
    accent: '#22D3EE',
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="reveal ceyr-card"
      style={{
        padding: '28px',
        cursor: 'default',
        transitionDelay: `${(index % 5) * 0.08}s`,
      }}
    >
      <div style={{
        width: 48,
        height: 48,
        borderRadius: 10,
        background: `rgba(${service.accent === '#FF6B00' ? '255,107,0' : service.accent === '#7C5CFC' ? '124,92,252' : '34,211,238'}, 0.1)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: service.accent,
        marginBottom: 16,
        transition: 'background 0.25s ease',
      }}>
        {service.icon}
      </div>
      <h3 style={{
        fontFamily: "'Space Grotesk', Arial, sans-serif",
        fontSize: 17,
        fontWeight: 600,
        color: '#F5F5F7',
        margin: '0 0 8px',
        lineHeight: 1.3,
      }}>
        {service.title}
      </h3>
      <p style={{
        fontSize: 14,
        color: '#A1A1AA',
        lineHeight: 1.6,
        margin: 0,
        fontFamily: "'Inter', Arial, sans-serif",
      }}>
        {service.description}
      </p>
    </div>
  );
}

export default function Services() {
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="solutions" style={{ background: '#0A0A0F', padding: 'clamp(80px, 10vw, 140px) 0', position: 'relative' }}>
      {/* Subtle divider line */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '10%',
        right: '10%',
        height: 1,
        background: 'linear-gradient(90deg, transparent, #2A2A35, transparent)',
      }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
        {/* Heading */}
        <div ref={headingRef} className="reveal" style={{ marginBottom: 64, maxWidth: 600 }}>
          <div style={{
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: '0.18em',
            color: '#FF6B00',
            fontFamily: "'Inter', Arial, sans-serif",
            marginBottom: 14,
            textTransform: 'uppercase',
          }}>
            What We Build
          </div>
          <h2 style={{
            fontFamily: "'Space Grotesk', Arial, sans-serif",
            fontSize: 'clamp(28px, 3.5vw, 46px)',
            fontWeight: 700,
            color: '#F5F5F7',
            margin: '0 0 18px',
            lineHeight: 1.15,
          }}>
            Solutions That Drive{' '}
            <span className="gradient-text">Real Results</span>
          </h2>
          <p style={{
            fontSize: 17,
            color: '#A1A1AA',
            lineHeight: 1.7,
            margin: 0,
            fontFamily: "'Inter', Arial, sans-serif",
          }}>
            End-to-end technology services across the full product lifecycle — from concept to scale.
          </p>
        </div>

        {/* Services grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: 16,
        }}>
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
