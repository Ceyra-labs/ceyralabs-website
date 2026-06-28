'use client';

import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';

/* ─── WhatsApp SVG icon ─────────────────────────────────────────────── */
const WhatsAppIcon = () => (
  <svg width="26" height="26" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M16 2.667C8.636 2.667 2.667 8.636 2.667 16c0 2.342.627 4.54 1.723 6.432L2.667 29.333l7.09-1.703A13.27 13.27 0 0016 29.333c7.364 0 13.333-5.97 13.333-13.333S23.364 2.667 16 2.667z" fill="white"/>
    <path d="M16 4.667C9.74 4.667 4.667 9.74 4.667 16c0 2.14.59 4.14 1.614 5.849l.23.386-1.303 4.758 4.88-1.279.375.215A11.293 11.293 0 0016 27.333c6.26 0 11.333-5.073 11.333-11.333S22.26 4.667 16 4.667z" fill="#25D366"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M12.11 10.222c-.297-.662-.609-.674-.89-.686-.23-.01-.494-.01-.757-.01-.264 0-.693.099-1.056.494-.363.396-1.385 1.352-1.385 3.298s1.417 3.824 1.616 4.088c.198.264 2.736 4.351 6.73 5.923 3.33 1.313 4.003 1.052 4.724.986.72-.066 2.32-.946 2.648-1.86.33-.913.33-1.695.23-1.86-.099-.164-.363-.263-.758-.462-.396-.198-2.34-1.154-2.703-1.287-.363-.131-.627-.197-.89.199-.264.395-1.023 1.286-1.253 1.55-.23.264-.462.296-.857.099-.396-.198-1.671-.615-3.183-1.963-1.176-1.048-1.97-2.342-2.2-2.738-.23-.395-.025-.61.173-.807.177-.178.395-.462.594-.693.198-.23.264-.395.396-.659.131-.264.066-.495-.033-.693-.099-.198-.866-2.155-1.206-2.918z" fill="white"/>
  </svg>
);

/* ─── Phone SVG icon ────────────────────────────────────────────────── */
const PhoneIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="white"/>
  </svg>
);

/* ─── Close / Chat toggle icon ──────────────────────────────────────── */
const ChatIcon = ({ open }: { open: boolean }) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1)', transform: open ? 'rotate(135deg)' : 'rotate(0deg)' }}
  >
    {open
      ? <path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
      : <>
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 10h.01M12 10h.01M16 10h.01" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        </>
    }
  </svg>
);

/* ─── Tooltip label ─────────────────────────────────────────────────── */
function Tooltip({ label, sub, visible, delay }: { label: string; sub: string; visible: boolean; delay: number }) {
  return (
    <div style={{
      position: 'absolute',
      right: 72,
      top: '50%',
      transform: visible ? 'translateY(-50%) translateX(0)' : 'translateY(-50%) translateX(12px)',
      opacity: visible ? 1 : 0,
      pointerEvents: 'none',
      transition: `opacity 0.28s ease ${delay}s, transform 0.32s cubic-bezier(0.34,1.56,0.64,1) ${delay}s`,
      whiteSpace: 'nowrap',
    }}>
      {/* Glass card */}
      <div style={{
        background: 'rgba(20,20,28,0.82)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 12,
        padding: '8px 14px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
      }}>
        <div style={{
          fontSize: 13,
          fontWeight: 600,
          color: '#F5F5F7',
          fontFamily: "'Space Grotesk', Arial, sans-serif",
          lineHeight: 1.3,
        }}>
          {label}
        </div>
        <div style={{
          fontSize: 11,
          color: '#A1A1AA',
          fontFamily: "'Inter', Arial, sans-serif",
          marginTop: 1,
        }}>
          {sub}
        </div>
      </div>
      {/* Arrow */}
      <div style={{
        position: 'absolute',
        right: -5,
        top: '50%',
        transform: 'translateY(-50%) rotate(45deg)',
        width: 8,
        height: 8,
        background: 'rgba(20,20,28,0.82)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderLeft: 'none',
        borderBottom: 'none',
      }} />
    </div>
  );
}

/* ─── Pulse ring wrapper ────────────────────────────────────────────── */
function PulseRings({ color, active }: { color: string; active: boolean }) {
  return (
    <>
      {[0, 1, 2].map((i) => (
        <div key={i} style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          border: `2px solid ${color}`,
          opacity: active ? 0 : 0,
          animation: active ? `pulse-ring-${i} 2.4s cubic-bezier(0,0,0.2,1) ${i * 0.6}s infinite` : 'none',
        }} />
      ))}
    </>
  );
}

/* ─── Individual action button ──────────────────────────────────────── */
interface ActionBtnProps {
  visible: boolean;
  delay: number;
  href: string;
  ariaLabel: string;
  gradient: string;
  glowColor: string;
  shadow: string;
  icon: ReactNode;
  tooltip: { label: string; sub: string };
  ringing?: boolean;
}

function ActionButton({ visible, delay, href, ariaLabel, gradient, glowColor, shadow, icon, tooltip, ringing }: ActionBtnProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div style={{
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.7)',
      transition: `opacity 0.35s cubic-bezier(0.34,1.56,0.64,1) ${delay}s, transform 0.4s cubic-bezier(0.34,1.56,0.64,1) ${delay}s`,
    }}>
      <Tooltip label={tooltip.label} sub={tooltip.sub} visible={visible && hovered} delay={0} />

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: 'relative',
          width: 54,
          height: 54,
          borderRadius: '50%',
          background: gradient,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          textDecoration: 'none',
          boxShadow: hovered
            ? `0 0 0 3px rgba(${glowColor},0.25), 0 0 32px rgba(${glowColor},0.45), ${shadow}`
            : `0 0 0 1px rgba(${glowColor},0.1), ${shadow}`,
          transform: hovered ? 'scale(1.13)' : ringing ? undefined : 'scale(1)',
          transition: 'box-shadow 0.25s ease, transform 0.25s cubic-bezier(0.34,1.56,0.64,1)',
          animation: ringing && !hovered ? 'phone-ring 3s ease-in-out 2s infinite' : 'none',
          outline: 'none',
          flexShrink: 0,
        }}
      >
        {/* Pulse rings */}
        <PulseRings color={`rgba(${glowColor},0.6)`} active={!hovered} />

        {/* Shimmer overlay on hover */}
        <div style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 60%)',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.25s ease',
          pointerEvents: 'none',
        }} />

        {icon}
      </a>
    </div>
  );
}

/* ─── Main floating widget ──────────────────────────────────────────── */
export default function FloatingContact() {
  const [open, setOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [bubbleDismissed, setBubbleDismissed] = useState(false);
  const [mainHovered, setMainHovered] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => { if (!bubbleDismissed) setShowBubble(true); }, 3500);
    const t2 = setTimeout(() => setShowBubble(false), 9000);
    return () => { clearTimeout(t); clearTimeout(t2); };
  }, [bubbleDismissed]);

  const handleBubbleDismiss = () => {
    setShowBubble(false);
    setBubbleDismissed(true);
  };

  return (
    <>
      {/* ── Keyframes injected once ─────────────────────────────────── */}
      <style>{`
        @keyframes pulse-ring-0 {
          0%   { transform: scale(1);   opacity: 0.55; }
          100% { transform: scale(1.9); opacity: 0; }
        }
        @keyframes pulse-ring-1 {
          0%   { transform: scale(1);   opacity: 0.4; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        @keyframes pulse-ring-2 {
          0%   { transform: scale(1);   opacity: 0.25; }
          100% { transform: scale(2.6); opacity: 0; }
        }
        @keyframes phone-ring {
          0%,100% { transform: rotate(0deg) scale(1); }
          5%       { transform: rotate(-12deg) scale(1.05); }
          10%      { transform: rotate(12deg) scale(1.05); }
          15%      { transform: rotate(-10deg) scale(1.05); }
          20%      { transform: rotate(10deg) scale(1.05); }
          25%      { transform: rotate(0deg) scale(1); }
        }
        @keyframes bubble-in {
          from { opacity: 0; transform: translateX(12px) scale(0.9); }
          to   { opacity: 1; transform: translateX(0) scale(1); }
        }
      `}</style>

      <div style={{
        position: 'fixed',
        bottom: 28,
        right: 28,
        zIndex: 999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: 14,
      }}>

        {/* ── "We reply instantly" bubble ─────────────────────────── */}
        {showBubble && !open && (
          <div style={{
            animation: 'bubble-in 0.4s cubic-bezier(0.34,1.56,0.64,1)',
            position: 'relative',
            maxWidth: 210,
          }}>
            <div style={{
              background: 'rgba(20,20,28,0.92)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '16px 16px 4px 16px',
              padding: '12px 16px',
              boxShadow: '0 12px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,107,0,0.1)',
            }}>
              {/* Green live dot */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 6 }}>
                <div style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: '#25D366',
                  boxShadow: '0 0 8px #25D366',
                  flexShrink: 0,
                  animation: 'pulse-ring-0 1.4s ease-in-out infinite',
                }} />
                <span style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: '#25D366',
                  letterSpacing: '0.06em',
                  fontFamily: "'Inter', Arial, sans-serif",
                  textTransform: 'uppercase',
                }}>
                  Online Now
                </span>
              </div>
              <p style={{
                fontSize: 13,
                color: '#F5F5F7',
                fontFamily: "'Space Grotesk', Arial, sans-serif",
                fontWeight: 500,
                margin: 0,
                lineHeight: 1.45,
              }}>
                Hi! Chat with us on WhatsApp — we reply within minutes.
              </p>
            </div>
            {/* Dismiss */}
            <button
              onClick={handleBubbleDismiss}
              style={{
                position: 'absolute',
                top: -8,
                right: -8,
                width: 20,
                height: 20,
                borderRadius: '50%',
                background: '#2A2A35',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#A1A1AA',
                fontSize: 11,
                lineHeight: 1,
                transition: 'background 0.2s',
                padding: 0,
              }}
              aria-label="Dismiss"
            >
              ×
            </button>
          </div>
        )}

        {/* ── Action buttons stack ─────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-end' }}>

          {/* Phone button */}
          <ActionButton
            visible={open}
            delay={0.08}
            href="tel:+1234567890"
            ariaLabel="Call us"
            gradient="linear-gradient(135deg, #7C5CFC 0%, #22D3EE 100%)"
            glowColor="124,92,252"
            shadow="0 8px 24px rgba(124,92,252,0.35)"
            icon={<PhoneIcon />}
            tooltip={{ label: 'Call Us', sub: 'Available Mon–Fri, 9am–6pm' }}
            ringing
          />

          {/* WhatsApp button */}
          <ActionButton
            visible={open}
            delay={0}
            href="https://wa.me/1234567890"
            ariaLabel="Chat on WhatsApp"
            gradient="linear-gradient(135deg, #25D366 0%, #128C7E 100%)"
            glowColor="37,211,102"
            shadow="0 8px 24px rgba(37,211,102,0.35)"
            icon={<WhatsAppIcon />}
            tooltip={{ label: 'Chat on WhatsApp', sub: 'Typically replies in minutes' }}
          />
        </div>

        {/* ── Main toggle button ───────────────────────────────────── */}
        <div style={{ position: 'relative' }}>
          {/* Outer glow ring */}
          <div style={{
            position: 'absolute',
            inset: -4,
            borderRadius: '50%',
            background: 'conic-gradient(from 0deg, #FF6B00, #FF8C00, #FFB74D, #7C5CFC, #22D3EE, #FF6B00)',
            opacity: mainHovered || open ? 0.6 : 0.25,
            transition: 'opacity 0.3s ease',
            animation: 'rotate-slow 4s linear infinite',
          }} />
          <div style={{
            position: 'absolute',
            inset: -1,
            borderRadius: '50%',
            background: '#0A0A0F',
          }} />

          <button
            onClick={() => setOpen(!open)}
            onMouseEnter={() => setMainHovered(true)}
            onMouseLeave={() => setMainHovered(false)}
            aria-label={open ? 'Close contact menu' : 'Open contact menu'}
            style={{
              position: 'relative',
              width: 60,
              height: 60,
              borderRadius: '50%',
              background: open
                ? 'linear-gradient(135deg, #1C1C26 0%, #2A2A35 100%)'
                : 'linear-gradient(135deg, #FF6B00 0%, #FF8C00 60%, #FFB74D 100%)',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: mainHovered
                ? open
                  ? '0 0 32px rgba(255,107,0,0.25), 0 8px 32px rgba(0,0,0,0.5)'
                  : '0 0 40px rgba(255,107,0,0.55), 0 8px 32px rgba(255,107,0,0.3)'
                : open
                  ? '0 0 20px rgba(255,107,0,0.15), 0 4px 20px rgba(0,0,0,0.4)'
                  : '0 0 24px rgba(255,107,0,0.35), 0 6px 24px rgba(255,107,0,0.2)',
              transition: 'background 0.35s ease, box-shadow 0.25s ease, transform 0.25s cubic-bezier(0.34,1.56,0.64,1)',
              transform: mainHovered ? 'scale(1.08)' : 'scale(1)',
              outline: 'none',
            }}
          >
            {/* Shimmer overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 60%)',
              pointerEvents: 'none',
            }} />
            <ChatIcon open={open} />

            {/* Count badge */}
            {!open && (
              <div style={{
                position: 'absolute',
                top: -2,
                right: -2,
                width: 18,
                height: 18,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #FF6B00, #FFB74D)',
                border: '2px solid #0A0A0F',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 9,
                fontWeight: 700,
                color: '#fff',
                fontFamily: "'Inter', Arial, sans-serif",
                boxShadow: '0 0 10px rgba(255,107,0,0.6)',
                animation: 'scale-in 0.3s cubic-bezier(0.34,1.56,0.64,1)',
              }}>
                2
              </div>
            )}
          </button>
        </div>

      </div>
    </>
  );
}
