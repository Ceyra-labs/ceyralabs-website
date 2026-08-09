'use client';

import { useEffect, useRef } from 'react';

// Unified to use Brand Primary (#FF6A00) and Glow (#FF8A00)
const projects = [
  {
    id: 'pulse-feed',
    category: 'Social App',
    title: 'PulseFeed Engine',
    description: 'A real-time content aggregation and engagement engine with automated feed updates and social analytics.',
    tags: ['Next.js', 'Tailwind CSS', 'Socket.io', 'Redis'],
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="14" stroke="rgba(255,106,0,0.3)" strokeWidth="1" />
        <path d="M10 16h12M16 10l6 6-6 6" stroke="#FF6A00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="16" cy="16" r="2" fill="#FF6A00" />
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
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="6" y="6" width="20" height="20" rx="4" stroke="#FF6A00" strokeWidth="1.5" />
        <path d="M11 12h10M11 16h10M11 20h6" stroke="#FF6A00" strokeWidth="1.5" strokeLinecap="round" />
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
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M8 10h16M8 15h16M8 20h10" stroke="#FF6A00" strokeWidth="1.5" strokeLinecap="round" />
        <rect x="6" y="6" width="20" height="20" rx="3" stroke="#FF6A00" strokeWidth="1.5" />
      </svg>
    ),
    result: '85% higher retention',
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

  return (
    <div
      ref={ref}
      className="reveal brand-card"
      style={{ transitionDelay: `${index * 0.15}s` }}
    >
      {/* Gradient header area */}
      <div className="card-header">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '12px' }}>
          <div className="category-pill">
            {project.category}
          </div>
          <div className="result-pill">
            {project.result}
          </div>
        </div>
        <div className="icon-container">
          {project.icon}
        </div>
      </div>

      {/* Content area */}
      <div style={{ padding: '28px' }}>
        <h3 className="card-title">
          {project.title}
        </h3>
        <p className="card-description">
          {project.description}
        </p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {project.tags.map((tag) => (
            <span key={tag} className="tag-pill">
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
    <section id="portfolio" style={{ background: '#000000', padding: 'clamp(80px, 10vw, 140px) 0', position: 'relative' }}>
      {/* Injected CSS for modern hover effects, typography, and specific branding */}
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
        
        .brand-card {
          background-color: #0E0E12;
          border: 1px solid #262626;
          border-radius: 16px;
          overflow: hidden;
          position: relative;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .brand-card:hover {
          border-color: #FF6A00;
          box-shadow: 0 12px 40px -12px rgba(255, 138, 0, 0.2);
          transform: translateY(-4px);
        }

        .card-header {
          background: linear-gradient(135deg, rgba(255,106,0,0.12) 0%, rgba(255,138,0,0.03) 100%);
          border-bottom: 1px solid #262626;
          padding: 32px 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          min-height: 120px;
        }

        .category-pill {
          padding: 6px 14px;
          background: rgba(255, 106, 0, 0.1);
          border: 1px solid rgba(255, 106, 0, 0.2);
          border-radius: 100px;
          font-size: 11px;
          font-weight: 600;
          color: #FF6A00;
          letter-spacing: 0.12em;
          font-family: 'Montserrat', Arial, sans-serif;
          text-transform: uppercase;
        }

        .result-pill {
          padding: 6px 16px;
          background: #000000;
          border: 1px solid #262626;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 500;
          color: #F5F5F5;
          font-family: 'Inter', Arial, sans-serif;
        }

        .icon-container {
          width: 64px;
          height: 64px;
          border-radius: 16px;
          background: #000000;
          border: 1px solid #262626;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 4px 20px rgba(255, 138, 0, 0.08);
          transition: transform 0.4s ease;
        }

        .brand-card:hover .icon-container {
          transform: scale(1.05) rotate(2deg);
          border-color: rgba(255,106,0,0.4);
        }

        .card-title {
          font-family: 'Montserrat', Arial, sans-serif;
          font-size: 20px;
          font-weight: 600;
          color: #F5F5F5;
          margin: 0 0 12px;
          line-height: 1.3;
        }

        .card-description {
          font-size: 14px;
          color: #A3A3A3;
          line-height: 1.65;
          margin: 0 0 24px;
          font-family: 'Inter', Arial, sans-serif;
        }

        .tag-pill {
          padding: 6px 12px;
          background: #000000;
          border: 1px solid #262626;
          border-radius: 6px;
          font-size: 12px;
          color: #6B7280;
          font-family: 'Inter', Arial, sans-serif;
        }
      `}</style>

      {/* Top Divider */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '10%',
        right: '10%',
        height: 1,
        background: 'linear-gradient(90deg, transparent, #262626, transparent)',
      }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>

        {/* Header Section */}
        <div ref={headingRef} className="reveal" style={{ marginBottom: 64, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <div style={{
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '0.18em',
              color: '#FF6A00', /* Primary */
              fontFamily: "'Montserrat', Arial, sans-serif",
              marginBottom: 16,
              textTransform: 'uppercase',
            }}>
              Our Projects
            </div>
            <h2 style={{
              fontFamily: "'Montserrat', Arial, sans-serif",
              fontSize: 'clamp(32px, 4vw, 48px)',
              fontWeight: 700,
              color: '#F5F5F5', /* Primary Text */
              margin: 0,
              lineHeight: 1.15,
              letterSpacing: '-0.02em'
            }}>
              Projects That Define Us
            </h2>
          </div>
        </div>

        {/* Grid Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: 24,
        }}>
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}