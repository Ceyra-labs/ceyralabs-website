'use client';

import { useEffect, useRef, useState } from 'react';

const stats = [
  { value: 50, suffix: '+', label: 'Projects Delivered', description: 'Across web, mobile, AI, and enterprise' },
  { value: 30, suffix: '+', label: 'Global Clients', description: 'From startups to Fortune 500 companies' },
  { value: 5, suffix: '+', label: 'Years of Excellence', description: 'Building software since 2019' },
  { value: 15, suffix: '+', label: 'Technologies Mastered', description: 'Full-stack expertise across the board' },
];

const techStack = [
  'React', 'TypeScript', 'Node.js', 'Python', 'Go', 'Kubernetes',
  'AWS', 'PostgreSQL', 'MongoDB', 'Solidity', 'TensorFlow', 'Next.js',
];

function AnimatedCounter({ target, suffix, duration = 1800 }: { target: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const cards = cardsRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLDivElement).classList.add('visible');
          }
        });
      },
      { threshold: 0.15 }
    );
    cards.forEach((card) => { if (card) observer.observe(card); });
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      style={{
        background: '#14141C',
        padding: 'clamp(80px, 10vw, 120px) 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top border */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(255,107,0,0.3), transparent)',
      }} />

      {/* Background decoration */}
      <div style={{
        position: 'absolute',
        top: '50%',
        right: -100,
        transform: 'translateY(-50%)',
        width: 500,
        height: 500,
        background: 'radial-gradient(circle, rgba(124,92,252,0.06) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
        {/* Stats grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 2,
          marginBottom: 80,
        }}>
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              ref={(el) => { if (el) cardsRef.current[i] = el; }}
              className="reveal"
              style={{
                padding: '40px 32px',
                borderRight: i < stats.length - 1 ? '1px solid #2A2A35' : 'none',
                transitionDelay: `${i * 0.12}s`,
              }}
            >
              <div style={{
                fontFamily: "'Space Grotesk', Arial, sans-serif",
                fontSize: 'clamp(40px, 4vw, 56px)',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #FF6B00, #FFB74D)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                lineHeight: 1,
                marginBottom: 8,
              }}>
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div style={{
                fontFamily: "'Space Grotesk', Arial, sans-serif",
                fontSize: 16,
                fontWeight: 600,
                color: '#F5F5F7',
                marginBottom: 6,
              }}>
                {stat.label}
              </div>
              <div style={{
                fontSize: 13,
                color: '#A1A1AA',
                fontFamily: "'Inter', Arial, sans-serif",
                lineHeight: 1.5,
              }}>
                {stat.description}
              </div>
            </div>
          ))}
        </div>

        {/* Tech stack marquee */}
        <div
          ref={sectionRef}
          style={{ borderTop: '1px solid #2A2A35', paddingTop: 48 }}
        >
          <div style={{
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: '0.16em',
            color: '#A1A1AA',
            marginBottom: 24,
            fontFamily: "'Inter', Arial, sans-serif",
            textTransform: 'uppercase',
            textAlign: 'center',
          }}>
            Technologies We Work With
          </div>
          <div style={{
            display: 'flex',
            gap: 12,
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}>
            {techStack.map((tech, i) => (
              <div
                key={tech}
                style={{
                  padding: '8px 18px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid #2A2A35',
                  borderRadius: 100,
                  fontSize: 13,
                  color: '#A1A1AA',
                  fontFamily: "'Inter', Arial, sans-serif",
                  fontWeight: 500,
                  transition: 'border-color 0.2s ease, color 0.2s ease, background 0.2s ease',
                  cursor: 'default',
                  animation: `fade-in-up 0.4s ease ${0.05 * i}s both`,
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = 'rgba(255,107,0,0.4)';
                  el.style.color = '#FF8C00';
                  el.style.background = 'rgba(255,107,0,0.06)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = '#2A2A35';
                  el.style.color = '#A1A1AA';
                  el.style.background = 'rgba(255,255,255,0.03)';
                }}
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom border */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(124,92,252,0.2), transparent)',
      }} />
    </section>
  );
}
