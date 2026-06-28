'use client';

import { useEffect, useRef } from 'react';

const projects = [
  {
    id: 'nexus-ai',
    category: 'AI Platform',
    title: 'Nexus Intelligence Platform',
    description: 'Enterprise AI orchestration platform processing 2M+ daily events with real-time decision intelligence.',
    tags: ['Python', 'TensorFlow', 'Kubernetes', 'React'],
    accent: '#FF6B00',
    gradient: 'linear-gradient(135deg, rgba(255,107,0,0.15) 0%, rgba(255,60,0,0.05) 100%)',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="14" stroke="rgba(255,107,0,0.3)" strokeWidth="1"/>
        <path d="M16 8v8l5 3" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="16" cy="16" r="3" fill="#FF6B00" opacity="0.6"/>
        <circle cx="8" cy="12" r="2" fill="rgba(255,107,0,0.4)"/>
        <circle cx="24" cy="12" r="2" fill="rgba(255,107,0,0.4)"/>
        <circle cx="24" cy="22" r="2" fill="rgba(255,107,0,0.4)"/>
        <path d="M10 12l4 4M22 12l-4 4M22 22l-4-2" stroke="rgba(255,107,0,0.3)" strokeWidth="1"/>
      </svg>
    ),
    result: '340% efficiency gain',
  },
  {
    id: 'chain-ledger',
    category: 'Blockchain',
    title: 'ChainLedger DeFi Protocol',
    description: 'Decentralized finance protocol managing $50M+ TVL with audit-grade smart contract security.',
    tags: ['Solidity', 'React', 'Node.js', 'Web3'],
    accent: '#7C5CFC',
    gradient: 'linear-gradient(135deg, rgba(124,92,252,0.15) 0%, rgba(90,60,220,0.05) 100%)',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 4L4 10v12l12 6 12-6V10L16 4z" stroke="#7C5CFC" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M4 10l12 6 12-6M16 16v12" stroke="#7C5CFC" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    result: '$50M+ TVL secured',
  },
  {
    id: 'pulse-health',
    category: 'Mobile App',
    title: 'Pulse Health Suite',
    description: 'HIPAA-compliant telemedicine platform serving 100K+ patients with real-time diagnostic tools.',
    tags: ['React Native', 'TypeScript', 'AWS', 'PostgreSQL'],
    accent: '#22D3EE',
    gradient: 'linear-gradient(135deg, rgba(34,211,238,0.12) 0%, rgba(6,182,212,0.04) 100%)',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="8" y="4" width="16" height="24" rx="3" stroke="#22D3EE" strokeWidth="1.5"/>
        <path d="M12 14h3l2-4 2 8 2-4h1" stroke="#22D3EE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="16" cy="22" r="1.5" fill="#22D3EE" opacity="0.6"/>
      </svg>
    ),
    result: '100K+ active patients',
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
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

  const rgbMap: Record<string, string> = {
    '#FF6B00': '255,107,0',
    '#7C5CFC': '124,92,252',
    '#22D3EE': '34,211,238',
  };

  return (
    <div
      ref={ref}
      className="reveal ceyr-card"
      style={{
        transitionDelay: `${index * 0.15}s`,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Gradient header area */}
      <div style={{
        background: project.gradient,
        borderBottom: `1px solid rgba(${rgbMap[project.accent]}, 0.15)`,
        padding: '32px 28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: 120,
      }}>
        <div>
          <div style={{
            display: 'inline-block',
            padding: '4px 12px',
            background: `rgba(${rgbMap[project.accent]}, 0.15)`,
            border: `1px solid rgba(${rgbMap[project.accent]}, 0.25)`,
            borderRadius: 100,
            fontSize: 11,
            fontWeight: 600,
            color: project.accent,
            letterSpacing: '0.1em',
            fontFamily: "'Inter', Arial, sans-serif",
            marginBottom: 12,
            textTransform: 'uppercase',
          }}>
            {project.category}
          </div>
          <div style={{
            padding: '6px 16px',
            background: `rgba(${rgbMap[project.accent]}, 0.12)`,
            borderRadius: 8,
            display: 'inline-block',
          }}>
            <span style={{
              fontSize: 12,
              fontWeight: 600,
              color: project.accent,
              fontFamily: "'Space Grotesk', Arial, sans-serif",
            }}>
              {project.result}
            </span>
          </div>
        </div>
        <div style={{
          width: 72,
          height: 72,
          borderRadius: '50%',
          background: `rgba(${rgbMap[project.accent]}, 0.08)`,
          border: `1px solid rgba(${rgbMap[project.accent]}, 0.2)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          {project.icon}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '24px 28px' }}>
        <h3 style={{
          fontFamily: "'Space Grotesk', Arial, sans-serif",
          fontSize: 19,
          fontWeight: 600,
          color: '#F5F5F7',
          margin: '0 0 10px',
          lineHeight: 1.3,
        }}>
          {project.title}
        </h3>
        <p style={{
          fontSize: 14,
          color: '#A1A1AA',
          lineHeight: 1.65,
          margin: '0 0 20px',
          fontFamily: "'Inter', Arial, sans-serif",
        }}>
          {project.description}
        </p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {project.tags.map((tag) => (
            <span key={tag} style={{
              padding: '4px 10px',
              background: '#1C1C26',
              border: '1px solid #2A2A35',
              borderRadius: 6,
              fontSize: 12,
              color: '#A1A1AA',
              fontFamily: "'Inter', Arial, sans-serif",
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {
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
    <section id="portfolio" style={{ background: '#0A0A0F', padding: 'clamp(80px, 10vw, 140px) 0', position: 'relative' }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: '10%',
        right: '10%',
        height: 1,
        background: 'linear-gradient(90deg, transparent, #2A2A35, transparent)',
      }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
        <div ref={headingRef} className="reveal" style={{ marginBottom: 60, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <div style={{
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '0.18em',
              color: '#FF6B00',
              fontFamily: "'Inter', Arial, sans-serif",
              marginBottom: 14,
              textTransform: 'uppercase',
            }}>
              Featured Work
            </div>
            <h2 style={{
              fontFamily: "'Space Grotesk', Arial, sans-serif",
              fontSize: 'clamp(28px, 3.5vw, 46px)',
              fontWeight: 700,
              color: '#F5F5F7',
              margin: 0,
              lineHeight: 1.15,
            }}>
              Projects That Define Us
            </h2>
          </div>
          <a
            href="#contact"
            style={{
              padding: '10px 24px',
              border: '1px solid #2A2A35',
              borderRadius: 8,
              color: '#A1A1AA',
              textDecoration: 'none',
              fontSize: 14,
              fontFamily: "'Inter', Arial, sans-serif",
              transition: 'color 0.2s, border-color 0.2s',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.color = '#F5F5F7';
              el.style.borderColor = 'rgba(255,107,0,0.4)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.color = '#A1A1AA';
              el.style.borderColor = '#2A2A35';
            }}
          >
            View All Work
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: 20,
        }}>
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
