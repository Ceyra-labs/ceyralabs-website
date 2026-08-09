'use client';

import { useEffect, useRef } from 'react';

// Removed individual 'accent' colors to unify under the Brand Primary (#FF6A00)
const services = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3M3 16v3a2 2 0 002 2h3m8 0h3a2 2 0 002-2v-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 9h6M9 12h6M9 15h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: 'Software Development',
    description: 'Full-stack engineering with scalable architecture, clean code principles, and enterprise reliability.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="5" y="2" width="14" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9 7h6M9 11h6M9 15h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="12" cy="18" r="1" fill="currentColor" />
      </svg>
    ),
    title: 'Mobile Applications',
    description: 'Cross-platform mobile applications for iOS and Android built with performance-first principles.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'UI/UX Design',
    description: 'User-centric UI/UX design with research-driven decisions and refined design systems.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Artificial Intelligence',
    description: 'Machine learning systems, LLM integrations, computer vision, and intelligent automation pipelines.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M9 17H7A5 5 0 017 7h2M15 7h2a5 5 0 010 10h-2M8 12h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Product Management',
    description: 'Strategic product lifecycle management from ideation to launch with agile execution.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M20 7H4a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M16 3v4M8 3v4M16 17v4M8 17v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    title: 'Platform Engineering',
    description: 'Cloud infrastructure, DevOps pipelines, microservices, and highly available distributed systems.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M4 6h16M4 12h16M4 18h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="17" cy="18" r="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M20 21l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: 'System Integrations',
    description: 'System-level architecture, integration layers, and reliability-focused implementation.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <ellipse cx="12" cy="5" rx="9" ry="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M3 5v14a9 3 0 0018 0V5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M3 12a9 3 0 0018 0" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    title: 'PoC Development',
    description: 'Rapid proof-of-concept builds to validate ideas, secure investment, and reduce technical risk.',
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
      className="reveal brand-service-card"
      style={{
        transitionDelay: `${(index % 5) * 0.08}s`,
      }}
    >
      <div className="icon-wrapper">
        {service.icon}
      </div>
      <h3 className="card-title">
        {service.title}
      </h3>
      <p className="card-description">
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
    <section id="solutions" style={{ background: '#000000', padding: 'clamp(80px, 10vw, 140px) 0', position: 'relative' }}>

      {/* Embedded CSS for strict brand guideline enforcement & modern interactions */}
      <style>{`
        .reveal {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .brand-service-card {
          background-color: #0E0E12; /* Surface */
          border: 1px solid #262626; /* Border */
          border-radius: 16px;
          padding: 28px;
          cursor: default;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .brand-service-card:hover {
          border-color: #FF6A00; /* Primary */
          box-shadow: 0 12px 32px -12px rgba(255, 138, 0, 0.15); /* Glow */
          transform: translateY(-4px);
        }

        .icon-wrapper {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: rgba(255, 106, 0, 0.1); /* 10% Primary */
          color: #FF6A00; /* Primary */
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          transition: all 0.4s ease;
          border: 1px solid transparent;
        }

        .brand-service-card:hover .icon-wrapper {
          background: rgba(255, 138, 0, 0.15); /* 15% Glow */
          border-color: rgba(255, 106, 0, 0.3);
          transform: scale(1.05);
        }

        .card-title {
          font-family: 'Montserrat', Arial, sans-serif;
          font-size: 18px;
          font-weight: 600;
          color: #F5F5F5; /* Primary Text */
          margin: 0 0 10px;
          line-height: 1.3;
        }

        .card-description {
          font-family: 'Inter', Arial, sans-serif;
          font-size: 14px;
          color: #A3A3A3; /* Secondary Text */
          line-height: 1.65;
          margin: 0;
        }

        .text-gradient {
          background: linear-gradient(135deg, #FF6A00 0%, #FF8A00 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      {/* Subtle divider line - updated to border color */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '10%',
        right: '10%',
        height: 1,
        background: 'linear-gradient(90deg, transparent, #262626, transparent)',
      }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>

        {/* Heading */}
        <div ref={headingRef} className="reveal" style={{ marginBottom: 64, maxWidth: 640 }}>
          <div style={{
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: '0.18em',
            color: '#FF6A00', /* Primary */
            fontFamily: "'Montserrat', Arial, sans-serif",
            marginBottom: 16,
            textTransform: 'uppercase',
          }}>
            What We Build
          </div>
          <h2 style={{
            fontFamily: "'Montserrat', Arial, sans-serif",
            fontSize: 'clamp(32px, 4vw, 48px)',
            fontWeight: 700,
            color: '#F5F5F5', /* Primary Text */
            margin: '0 0 20px',
            lineHeight: 1.15,
            letterSpacing: '-0.02em'
          }}>
            Solutions That Drive{' '}
            <span className="text-gradient">Real Results</span>
          </h2>
          <p style={{
            fontSize: 17,
            color: '#A3A3A3', /* Secondary Text */
            lineHeight: 1.7,
            margin: 0,
            fontFamily: "'Inter', Arial, sans-serif",
          }}>
            End-to-end technology services across the full product lifecycle from concept to scale.
          </p>
        </div>

        {/* Services grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 20,
        }}>
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}