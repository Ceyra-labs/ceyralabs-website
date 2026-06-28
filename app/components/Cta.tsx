'use client';

import { useEffect, useRef, useState } from 'react';
import AnimatedLogo from './AnimatedLogo';

export default function Cta() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        background: '#14141C',
        padding: 'clamp(80px, 10vw, 140px) 0',
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
        background: 'linear-gradient(90deg, transparent, rgba(124,92,252,0.3), transparent)',
      }} />

      {/* Decorative orange glow */}
      <div style={{
        position: 'absolute',
        bottom: -100,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 600,
        height: 400,
        background: 'radial-gradient(ellipse, rgba(255,107,0,0.08) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 80,
          alignItems: 'center',
        }} className="cta-grid">
          {/* Left: CTA text */}
          <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(32px)', transition: 'all 0.7s ease 0.1s' }}>
            <div style={{
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '0.18em',
              color: '#FF6B00',
              fontFamily: "'Inter', Arial, sans-serif",
              marginBottom: 14,
              textTransform: 'uppercase',
            }}>
              Let's Work Together
            </div>
            <h2 style={{
              fontFamily: "'Space Grotesk', Arial, sans-serif",
              fontSize: 'clamp(28px, 3.5vw, 48px)',
              fontWeight: 700,
              color: '#F5F5F7',
              margin: '0 0 20px',
              lineHeight: 1.12,
            }}>
              Ready to Build Something{' '}
              <span className="gradient-text">Extraordinary?</span>
            </h2>
            <p style={{
              fontSize: 17,
              color: '#A1A1AA',
              lineHeight: 1.7,
              margin: '0 0 40px',
              fontFamily: "'Inter', Arial, sans-serif",
              maxWidth: 460,
            }}>
              Whether you&apos;re launching a startup, scaling an enterprise, or exploring emerging technology — we&apos;re the team that ships.
            </p>

            {/* Contact info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                {
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M3 3h12a1 1 0 011 1v10a1 1 0 01-1 1H3a1 1 0 01-1-1V4a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M2 4l7 6 7-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  ),
                  label: 'hello@ceyralabs.com',
                },
                {
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M9 5v4l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  ),
                  label: 'Response within 1 business day',
                },
              ].map(({ icon, label }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#A1A1AA' }}>
                  <div style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    background: 'rgba(255,107,0,0.08)',
                    border: '1px solid rgba(255,107,0,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FF6B00',
                    flexShrink: 0,
                  }}>
                    {icon}
                  </div>
                  <span style={{ fontSize: 14, fontFamily: "'Inter', Arial, sans-serif" }}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Contact form */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'none' : 'translateY(32px)',
              transition: 'all 0.7s ease 0.25s',
              background: '#1C1C26',
              border: '1px solid #2A2A35',
              borderRadius: 16,
              padding: '40px',
            }}
          >
            <h3 style={{
              fontFamily: "'Space Grotesk', Arial, sans-serif",
              fontSize: 20,
              fontWeight: 600,
              color: '#F5F5F7',
              margin: '0 0 28px',
            }}>
              Start a Conversation
            </h3>
            <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {['Name', 'Company'].map((label) => (
                  <div key={label}>
                    <label style={{
                      display: 'block',
                      fontSize: 12,
                      fontWeight: 500,
                      color: '#A1A1AA',
                      marginBottom: 6,
                      fontFamily: "'Inter', Arial, sans-serif",
                      letterSpacing: '0.04em',
                    }}>
                      {label.toUpperCase()}
                    </label>
                    <input
                      placeholder={label}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        background: '#14141C',
                        border: '1px solid #2A2A35',
                        borderRadius: 8,
                        color: '#F5F5F7',
                        fontSize: 14,
                        fontFamily: "'Inter', Arial, sans-serif",
                        outline: 'none',
                        transition: 'border-color 0.2s',
                        boxSizing: 'border-box',
                      }}
                      onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = 'rgba(255,107,0,0.5)'; }}
                      onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = '#2A2A35'; }}
                    />
                  </div>
                ))}
              </div>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: 12,
                  fontWeight: 500,
                  color: '#A1A1AA',
                  marginBottom: 6,
                  fontFamily: "'Inter', Arial, sans-serif",
                  letterSpacing: '0.04em',
                }}>
                  EMAIL
                </label>
                <input
                  type="email"
                  placeholder="you@company.com"
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    background: '#14141C',
                    border: '1px solid #2A2A35',
                    borderRadius: 8,
                    color: '#F5F5F7',
                    fontSize: 14,
                    fontFamily: "'Inter', Arial, sans-serif",
                    outline: 'none',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = 'rgba(255,107,0,0.5)'; }}
                  onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = '#2A2A35'; }}
                />
              </div>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: 12,
                  fontWeight: 500,
                  color: '#A1A1AA',
                  marginBottom: 6,
                  fontFamily: "'Inter', Arial, sans-serif",
                  letterSpacing: '0.04em',
                }}>
                  PROJECT TYPE
                </label>
                <select
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    background: '#14141C',
                    border: '1px solid #2A2A35',
                    borderRadius: 8,
                    color: '#A1A1AA',
                    fontSize: 14,
                    fontFamily: "'Inter', Arial, sans-serif",
                    outline: 'none',
                    boxSizing: 'border-box',
                    appearance: 'none',
                    cursor: 'pointer',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={(e) => { (e.target as HTMLSelectElement).style.borderColor = 'rgba(255,107,0,0.5)'; }}
                  onBlur={(e) => { (e.target as HTMLSelectElement).style.borderColor = '#2A2A35'; }}
                >
                  <option value="">Select a service...</option>
                  <option>AI Solutions</option>
                  <option>Software Development</option>
                  <option>App Solutions</option>
                  <option>Platform Engineering</option>
                  <option>Blockchain Technology</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: 12,
                  fontWeight: 500,
                  color: '#A1A1AA',
                  marginBottom: 6,
                  fontFamily: "'Inter', Arial, sans-serif",
                  letterSpacing: '0.04em',
                }}>
                  TELL US ABOUT YOUR PROJECT
                </label>
                <textarea
                  rows={4}
                  placeholder="Brief description of what you're building..."
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    background: '#14141C',
                    border: '1px solid #2A2A35',
                    borderRadius: 8,
                    color: '#F5F5F7',
                    fontSize: 14,
                    fontFamily: "'Inter', Arial, sans-serif",
                    outline: 'none',
                    resize: 'vertical',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={(e) => { (e.target as HTMLTextAreaElement).style.borderColor = 'rgba(255,107,0,0.5)'; }}
                  onBlur={(e) => { (e.target as HTMLTextAreaElement).style.borderColor = '#2A2A35'; }}
                />
              </div>
              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '14px',
                  background: 'linear-gradient(135deg, #FF6B00 0%, #FF8C00 100%)',
                  border: 'none',
                  borderRadius: 8,
                  color: '#fff',
                  fontSize: 15,
                  fontWeight: 600,
                  fontFamily: "'Inter', Arial, sans-serif",
                  cursor: 'pointer',
                  boxShadow: '0 0 24px rgba(255,107,0,0.3)',
                  transition: 'box-shadow 0.2s, transform 0.2s',
                  marginTop: 4,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                }}
                onMouseEnter={(e) => {
                  const btn = e.currentTarget as HTMLButtonElement;
                  btn.style.boxShadow = '0 0 40px rgba(255,107,0,0.5)';
                  btn.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  const btn = e.currentTarget as HTMLButtonElement;
                  btn.style.boxShadow = '0 0 24px rgba(255,107,0,0.3)';
                  btn.style.transform = 'translateY(0)';
                }}
              >
                Send Message
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Logo watermark */}
      <div style={{
        position: 'absolute',
        right: -60,
        bottom: -60,
        opacity: 0.03,
        pointerEvents: 'none',
      }}>
        <AnimatedLogo size={300} animated={false} />
      </div>

      <style>{`
        @media (max-width: 900px) {
          .cta-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </section>
  );
}
