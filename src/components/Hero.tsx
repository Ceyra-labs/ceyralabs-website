import { useEffect, useRef } from 'react';
import AnimatedLogo from './AnimatedLogo';

const words = ['Intelligent', 'Scalable', 'Future-Ready'];

export default function Hero() {
  const wordRef = useRef<HTMLSpanElement>(null);
  const wordIndex = useRef(0);
  const charIndex = useRef(0);
  const deleting = useRef(false);

  useEffect(() => {
    const el = wordRef.current;
    if (!el) return;

    let timeout: ReturnType<typeof setTimeout>;

    const type = () => {
      const word = words[wordIndex.current];
      if (!deleting.current) {
        el.textContent = word.slice(0, charIndex.current + 1);
        charIndex.current++;
        if (charIndex.current === word.length) {
          deleting.current = true;
          timeout = setTimeout(type, 2200);
          return;
        }
        timeout = setTimeout(type, 80);
      } else {
        el.textContent = word.slice(0, charIndex.current - 1);
        charIndex.current--;
        if (charIndex.current === 0) {
          deleting.current = false;
          wordIndex.current = (wordIndex.current + 1) % words.length;
          timeout = setTimeout(type, 300);
          return;
        }
        timeout = setTimeout(type, 45);
      }
    };

    timeout = setTimeout(type, 1200);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: '#0A0A0F',
      }}
      className="grid-bg"
    >
      {/* Radial glow behind logo */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        height: 600,
        background: 'radial-gradient(circle, rgba(255,107,0,0.07) 0%, rgba(255,107,0,0.02) 40%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Top-right violet accent */}
      <div style={{
        position: 'absolute',
        top: -80,
        right: -80,
        width: 400,
        height: 400,
        background: 'radial-gradient(circle, rgba(124,92,252,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Bottom-left cyan accent */}
      <div style={{
        position: 'absolute',
        bottom: -80,
        left: -80,
        width: 350,
        height: 350,
        background: 'radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth: 1280,
        width: '100%',
        margin: '0 auto',
        padding: '120px 32px 80px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 64,
        alignItems: 'center',
      }} className="hero-grid">
        {/* Left: Text content */}
        <div>
          {/* Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 16px',
              background: 'rgba(255,107,0,0.08)',
              border: '1px solid rgba(255,107,0,0.2)',
              borderRadius: 100,
              marginBottom: 28,
              animation: 'fade-in-up 0.6s ease 0.2s both',
            }}
          >
            <span style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#FF6B00',
              display: 'inline-block',
              boxShadow: '0 0 8px #FF6B00',
            }} />
            <span style={{
              fontSize: 13,
              fontWeight: 500,
              color: '#FF8C00',
              fontFamily: "'Inter', Arial, sans-serif",
              letterSpacing: '0.06em',
            }}>
              NEXT-GEN TECHNOLOGY LAB
            </span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily: "'Space Grotesk', 'Arial Narrow', Arial, sans-serif",
            fontSize: 'clamp(38px, 5vw, 64px)',
            fontWeight: 700,
            lineHeight: 1.1,
            color: '#F5F5F7',
            margin: '0 0 24px',
            animation: 'fade-in-up 0.6s ease 0.35s both',
          }}>
            Build{' '}
            <span className="gradient-text" style={{ display: 'inline-block', minWidth: 220 }}>
              <span ref={wordRef}>Intelligent</span>
              <span style={{
                display: 'inline-block',
                width: 2,
                height: '0.9em',
                background: '#FF6B00',
                marginLeft: 3,
                verticalAlign: 'middle',
                animation: 'fade-in 0.7s ease-in-out infinite alternate',
              }} />
            </span>
            <br />Software That Scales
          </h1>

          {/* Sub-description */}
          <p style={{
            fontSize: 'clamp(16px, 1.5vw, 19px)',
            color: '#A1A1AA',
            lineHeight: 1.7,
            maxWidth: 520,
            margin: '0 0 40px',
            fontFamily: "'Inter', Arial, sans-serif",
            fontWeight: 400,
            animation: 'fade-in-up 0.6s ease 0.5s both',
          }}>
            We design and engineer enterprise-grade software solutions — from AI systems and mobile apps to platform infrastructure and blockchain technology.
          </p>

          {/* CTA buttons */}
          <div style={{
            display: 'flex',
            gap: 16,
            flexWrap: 'wrap',
            animation: 'fade-in-up 0.6s ease 0.65s both',
          }}>
            <a
              href="#contact"
              style={{
                padding: '14px 32px',
                background: 'linear-gradient(135deg, #FF6B00 0%, #FF8C00 100%)',
                color: '#fff',
                textDecoration: 'none',
                borderRadius: 8,
                fontSize: 15,
                fontWeight: 600,
                fontFamily: "'Inter', Arial, sans-serif",
                boxShadow: '0 0 32px rgba(255,107,0,0.35)',
                transition: 'box-shadow 0.25s ease, transform 0.25s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 50px rgba(255,107,0,0.55)';
                (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 32px rgba(255,107,0,0.35)';
                (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
              }}
            >
              Start a Project
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a
              href="#portfolio"
              style={{
                padding: '14px 32px',
                background: 'transparent',
                color: '#F5F5F7',
                textDecoration: 'none',
                borderRadius: 8,
                fontSize: 15,
                fontWeight: 500,
                fontFamily: "'Inter', Arial, sans-serif",
                border: '1px solid #2A2A35',
                transition: 'border-color 0.25s ease, background 0.25s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,107,0,0.4)';
                (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,107,0,0.06)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = '#2A2A35';
                (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
              }}
            >
              View Our Work
            </a>
          </div>

          {/* Trust indicators */}
          <div style={{
            display: 'flex',
            gap: 32,
            marginTop: 52,
            animation: 'fade-in-up 0.6s ease 0.8s both',
          }}>
            {[
              { value: '50+', label: 'Projects Delivered' },
              { value: '30+', label: 'Global Clients' },
              { value: '5+', label: 'Years Active' },
            ].map(({ value, label }) => (
              <div key={label}>
                <div style={{
                  fontSize: 'clamp(22px, 2.5vw, 30px)',
                  fontWeight: 700,
                  fontFamily: "'Space Grotesk', Arial, sans-serif",
                  background: 'linear-gradient(135deg, #FF6B00, #FFB74D)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  {value}
                </div>
                <div style={{
                  fontSize: 12,
                  color: '#A1A1AA',
                  fontFamily: "'Inter', Arial, sans-serif",
                  marginTop: 2,
                }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Animated logo showcase */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          animation: 'scale-in 0.8s cubic-bezier(0.25,0.1,0.25,1) 0.4s both',
        }}>
          {/* Orbital rings */}
          <div style={{
            position: 'absolute',
            width: 320,
            height: 320,
            borderRadius: '50%',
            border: '1px solid rgba(255,107,0,0.08)',
          }} />
          <div style={{
            position: 'absolute',
            width: 420,
            height: 420,
            borderRadius: '50%',
            border: '1px dashed rgba(124,92,252,0.1)',
          }} />
          <div style={{
            position: 'absolute',
            width: 240,
            height: 240,
            borderRadius: '50%',
            border: '1px solid rgba(34,211,238,0.08)',
          }} />

          {/* Orbiting dots */}
          <div style={{
            position: 'absolute',
            width: 10,
            height: 10,
            borderRadius: '50%',
            background: '#FF6B00',
            boxShadow: '0 0 12px #FF6B00',
            transformOrigin: '0 0',
            animation: 'orbit 8s linear infinite',
            left: '50%',
            top: '50%',
          }} />
          <div style={{
            position: 'absolute',
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: '#7C5CFC',
            boxShadow: '0 0 10px #7C5CFC',
            transformOrigin: '0 0',
            animation: 'orbit-reverse 12s linear infinite',
            left: '50%',
            top: '50%',
          }} />

          {/* Central logo */}
          <div style={{
            position: 'relative',
            zIndex: 2,
            animation: 'float 4s ease-in-out infinite',
          }}>
            <AnimatedLogo
              size={200}
              animated
              style={{ filter: 'drop-shadow(0 0 30px rgba(255,107,0,0.4))' }}
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute',
        bottom: 36,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        animation: 'fade-in 0.6s ease 1.5s both',
      }}>
        <span style={{ fontSize: 11, color: '#A1A1AA', letterSpacing: '0.1em', fontFamily: "'Inter', Arial, sans-serif" }}>
          SCROLL
        </span>
        <div style={{
          width: 1,
          height: 48,
          background: 'linear-gradient(to bottom, #FF6B00, transparent)',
          animation: 'fade-in-up 1.5s ease-in-out infinite',
        }} />
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          .hero-grid > div:last-child {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
