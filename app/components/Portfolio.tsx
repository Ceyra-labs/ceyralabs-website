'use client';

import { useEffect, useRef } from 'react';

const projects = [
  {
    id: 'pulse-feed',
    category: 'Social App',
    title: 'PulseFeed Engine',
    description: 'A real-time content aggregation and engagement engine with automated feed updates and social analytics.',
    tags: ['Next.js', 'Tailwind CSS', 'Socket.io', 'Redis'],
    accent: '#FF6B00',
    gradient: 'linear-gradient(135deg, rgba(255,107,0,0.15) 0%, rgba(255,60,0,0.05) 100%)',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="14" stroke="rgba(255,107,0,0.3)" strokeWidth="1" />
        <path d="M10 16h12M16 10l6 6-6 6" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="16" cy="16" r="2" fill="#FF6B00" />
      </svg>
    ),
    result: '14M+ monthly impressions',
  },
  {
    id: 'bioflow-creator',
    category: 'Web Platform',
    title: 'BioFlow Creator Hub',
    description: 'A customizable link-in-bio platform for creators to centralize social profiles, track audience clicks, and host micro-blogs.',
    tags: ['TypeScript', 'Next.js', 'Prisma', 'Tailwind'],
    accent: '#7C5CFC',
    gradient: 'linear-gradient(135deg, rgba(124,92,252,0.15) 0%, rgba(90,60,220,0.05) 100%)',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="6" y="6" width="20" height="20" rx="4" stroke="#7C5CFC" strokeWidth="1.5" />
        <path d="M11 12h10M11 16h10M11 20h6" stroke="#7C5CFC" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    result: '300K+ creators active',
  },
  {
    id: 'vibespace-community',
    category: 'Community Web',
    title: 'VibeSpace Portal',
    description: 'A dynamic, browser-based discussion forum featuring live chat rooms, thread-based updates, and profile customizers.',
    tags: ['React', 'Node.js', 'WebRTC', 'MongoDB'],
    accent: '#22D3EE',
    gradient: 'linear-gradient(135deg, rgba(34,211,238,0.12) 0%, rgba(6,182,212,0.04) 100%)',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M8 10h16M8 15h16M8 20h10" stroke="#22D3EE" strokeWidth="1.5" strokeLinecap="round" />
        <rect x="6" y="6" width="20" height="20" rx="3" stroke="#22D3EE" strokeWidth="1.5" />
      </svg>
    ),
    result: '85% higher retention rate',
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
              Our Projects
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
          {/* <a
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
          </a> */}
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