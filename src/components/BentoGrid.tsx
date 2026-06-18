import { useState, useEffect, useRef } from 'react';
import type { ReactNode, CSSProperties } from 'react';

/* ── Spring easing matches Apple's product pages ─────────────────────── */
const SPRING = 'cubic-bezier(0.16, 1, 0.3, 1)';

/* ── Scroll-reveal hook (triggers once on entry) ─────────────────────── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold: 0.07, rootMargin: '0px 0px -50px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

/* ── Animated counter (eases from 0 → target when active) ───────────── */
function useCounter(target: number, active: boolean, delay = 200) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    const tid = setTimeout(() => {
      const dur = 1800;
      const started = Date.now();
      const tick = () => {
        const t = Math.min((Date.now() - started) / dur, 1);
        const ease = 1 - Math.pow(1 - t, 3);
        setVal(Math.round(ease * target));
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(tid);
  }, [active, target, delay]);
  return val;
}

/* ── Base card with Apple staggered-reveal animation ─────────────────── */
function BentoCard({
  children,
  index = 0,
  colSpan = 1,
  rowSpan = 1,
  style,
  innerStyle,
  hoverGlow,
}: {
  children: ReactNode;
  index?: number;
  colSpan?: number;
  rowSpan?: number;
  style?: CSSProperties;
  innerStyle?: CSSProperties;
  hoverGlow?: string;
}) {
  const { ref, visible } = useReveal();
  const [hovered, setHovered] = useState(false);
  const stagger = index * 75;

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        gridColumn: `span ${colSpan}`,
        gridRow: `span ${rowSpan}`,
        borderRadius: 20,
        overflow: 'hidden',
        position: 'relative',
        /* Apple reveal */
        opacity: visible ? 1 : 0,
        transform: visible
          ? 'translateY(0) scale(1)'
          : 'translateY(44px) scale(0.93)',
        filter: visible ? 'blur(0px)' : 'blur(10px)',
        transition: visible
          ? `opacity 0.9s ${SPRING} ${stagger}ms, transform 0.9s ${SPRING} ${stagger}ms, filter 0.75s ${SPRING} ${stagger}ms, box-shadow 0.3s ease`
          : 'none',
        /* Card base */
        background: '#111118',
        border: '1px solid rgba(255,255,255,0.07)',
        boxShadow: hovered && hoverGlow
          ? `0 0 0 1px rgba(255,255,255,0.1), 0 20px 60px rgba(0,0,0,0.5), 0 0 60px ${hoverGlow}`
          : '0 8px 32px rgba(0,0,0,0.3)',
        cursor: 'default',
        ...style,
      }}
    >
      <div style={{ position: 'relative', zIndex: 1, height: '100%', ...innerStyle }}>
        {children}
      </div>
    </div>
  );
}

/* ── Chip tag ─────────────────────────────────────────────────────────── */
function Chip({ label, color = 'rgba(255,255,255,0.07)', text = '#A1A1AA' }: { label: string; color?: string; text?: string }) {
  return (
    <span style={{
      display: 'inline-block',
      padding: '4px 11px',
      borderRadius: 100,
      background: color,
      border: '1px solid rgba(255,255,255,0.08)',
      fontSize: 11,
      fontWeight: 600,
      color: text,
      fontFamily: "'Inter', Arial, sans-serif",
      letterSpacing: '0.03em',
    }}>
      {label}
    </span>
  );
}

/* ── Label/tag above heading ──────────────────────────────────────────── */
function CardLabel({ children, color = '#FF6B00' }: { children: ReactNode; color?: string }) {
  return (
    <div style={{
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      color,
      fontFamily: "'Inter', Arial, sans-serif",
      marginBottom: 10,
      opacity: 0.9,
    }}>
      {children}
    </div>
  );
}

/* ── Card heading ─────────────────────────────────────────────────────── */
function CardHeading({ children, size = 22, color = '#F5F5F7' }: { children: ReactNode; size?: number; color?: string }) {
  return (
    <h3 style={{
      fontFamily: "'Space Grotesk', Arial, sans-serif",
      fontSize: size,
      fontWeight: 700,
      color,
      margin: '0 0 10px',
      lineHeight: 1.2,
    }}>
      {children}
    </h3>
  );
}

/* ── Card body text ───────────────────────────────────────────────────── */
function CardBody({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <p style={{
      fontSize: 13.5,
      color: '#71717A',
      lineHeight: 1.65,
      margin: 0,
      fontFamily: "'Inter', Arial, sans-serif",
      ...style,
    }}>
      {children}
    </p>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Individual Cards
   ──────────────────────────────────────────────────────────────────────── */

/* Card A — AI Feature (2 cols × 1 row) */
function CardAI({ index }: { index: number }) {
  return (
    <BentoCard
      index={index}
      colSpan={2}
      hoverGlow="rgba(255,107,0,0.08)"
      style={{ minHeight: 280 }}
    >
      {/* Animated mesh blobs */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', borderRadius: 20 }}>
        <div className="bento-blob" style={{
          position: 'absolute', width: 420, height: 420,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,107,0,0.13) 0%, transparent 70%)',
          top: '-120px', right: '-80px',
          animation: 'bento-blob-1 8s ease-in-out infinite',
        }} />
        <div className="bento-blob" style={{
          position: 'absolute', width: 300, height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,92,252,0.1) 0%, transparent 70%)',
          bottom: '-80px', left: '30%',
          animation: 'bento-blob-2 10s ease-in-out infinite',
        }} />
        {/* Subtle grid overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }} />
      </div>

      {/* Neural nodes decoration */}
      <svg
        width="240" height="140"
        viewBox="0 0 240 140"
        style={{ position: 'absolute', right: 24, bottom: 20, opacity: 0.18 }}
      >
        {/* Connecting lines */}
        <line x1="40" y1="70" x2="100" y2="30" stroke="#FF6B00" strokeWidth="1" strokeDasharray="4 4">
          <animate attributeName="stroke-dashoffset" from="0" to="16" dur="1.5s" repeatCount="indefinite" />
        </line>
        <line x1="40" y1="70" x2="100" y2="110" stroke="#FF6B00" strokeWidth="1" strokeDasharray="4 4">
          <animate attributeName="stroke-dashoffset" from="16" to="0" dur="2s" repeatCount="indefinite" />
        </line>
        <line x1="100" y1="30" x2="170" y2="20" stroke="#7C5CFC" strokeWidth="1" strokeDasharray="4 4">
          <animate attributeName="stroke-dashoffset" from="0" to="16" dur="2.5s" repeatCount="indefinite" />
        </line>
        <line x1="100" y1="30" x2="170" y2="70" stroke="#7C5CFC" strokeWidth="1" strokeDasharray="4 4">
          <animate attributeName="stroke-dashoffset" from="8" to="24" dur="1.8s" repeatCount="indefinite" />
        </line>
        <line x1="100" y1="110" x2="170" y2="70" stroke="#22D3EE" strokeWidth="1" strokeDasharray="4 4">
          <animate attributeName="stroke-dashoffset" from="0" to="16" dur="2.2s" repeatCount="indefinite" />
        </line>
        <line x1="100" y1="110" x2="170" y2="120" stroke="#22D3EE" strokeWidth="1" strokeDasharray="4 4">
          <animate attributeName="stroke-dashoffset" from="16" to="0" dur="3s" repeatCount="indefinite" />
        </line>
        <line x1="170" y1="20" x2="220" y2="50" stroke="#FF6B00" strokeWidth="1" strokeDasharray="4 4">
          <animate attributeName="stroke-dashoffset" from="0" to="12" dur="1.6s" repeatCount="indefinite" />
        </line>
        <line x1="170" y1="70" x2="220" y2="50" stroke="#7C5CFC" strokeWidth="1" strokeDasharray="4 4">
          <animate attributeName="stroke-dashoffset" from="12" to="0" dur="2.1s" repeatCount="indefinite" />
        </line>
        <line x1="170" y1="70" x2="220" y2="95" stroke="#7C5CFC" strokeWidth="1" strokeDasharray="4 4">
          <animate attributeName="stroke-dashoffset" from="0" to="12" dur="2.4s" repeatCount="indefinite" />
        </line>
        {/* Nodes */}
        {[
          [40, 70, '#FF6B00'], [100, 30, '#FF6B00'], [100, 110, '#22D3EE'],
          [170, 20, '#7C5CFC'], [170, 70, '#7C5CFC'], [170, 120, '#22D3EE'],
          [220, 50, '#FF6B00'], [220, 95, '#22D3EE'],
        ].map(([cx, cy, fill], i) => (
          <g key={i}>
            <circle cx={cx as number} cy={cy as number} r="7" fill={fill as string} opacity="0.15">
              <animate attributeName="r" values="7;9;7" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
            </circle>
            <circle cx={cx as number} cy={cy as number} r="3.5" fill={fill as string}>
              <animate attributeName="opacity" values="0.6;1;0.6" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
            </circle>
          </g>
        ))}
      </svg>

      {/* Text content */}
      <div style={{ padding: '36px 36px 36px', position: 'relative' }}>
        <CardLabel>Intelligence Layer</CardLabel>
        <CardHeading size={28}>
          AI-First Engineering,<br />
          <span style={{
            background: 'linear-gradient(90deg, #FF6B00, #FFB74D)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            At Every Layer
          </span>
        </CardHeading>
        <CardBody style={{ maxWidth: 340, marginBottom: 20 }}>
          From LLM fine-tuning and RAG pipelines to computer vision and real-time inference — intelligence woven into every product we ship.
        </CardBody>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Chip label="LLM Integration" color="rgba(255,107,0,0.12)" text="#FF8C42" />
          <Chip label="Computer Vision" color="rgba(124,92,252,0.12)" text="#A78BFA" />
          <Chip label="ML Ops" color="rgba(34,211,238,0.12)" text="#22D3EE" />
        </div>
      </div>
    </BentoCard>
  );
}

/* Card B — Projects counter (1 col × 2 rows, orange) */
function CardCounter({ index }: { index: number }) {
  const { ref, visible } = useReveal();
  const count = useCounter(50, visible, 300);

  return (
    <BentoCard
      index={index}
      colSpan={1}
      rowSpan={2}
      hoverGlow="rgba(255,107,0,0.12)"
      style={{
        background: 'linear-gradient(160deg, #FF6B00 0%, #C44A00 100%)',
        border: '1px solid rgba(255,255,255,0.1)',
        minHeight: 320,
      }}
    >
      {/* Inner ref for counter */}
      <div ref={ref} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />

      {/* Radial glow */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(circle at 50% 30%, rgba(255,180,60,0.3) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      {/* Rotating ring */}
      <div style={{
        position: 'absolute',
        width: 220, height: 220,
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '50%',
        border: '1px solid rgba(255,255,255,0.12)',
        animation: 'rotate-slow 12s linear infinite',
        pointerEvents: 'none',
      }}>
        {/* Dot on ring */}
        <div style={{
          position: 'absolute', top: -4, left: '50%',
          transform: 'translateX(-50%)',
          width: 8, height: 8,
          borderRadius: '50%',
          background: '#fff',
          boxShadow: '0 0 12px rgba(255,255,255,0.8)',
        }} />
      </div>
      <div style={{
        position: 'absolute',
        width: 170, height: 170,
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '50%',
        border: '1px solid rgba(255,255,255,0.08)',
        animation: 'rotate-slow 20s linear infinite reverse',
        pointerEvents: 'none',
      }} />

      {/* Content */}
      <div style={{
        position: 'relative', height: '100%',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: 32, textAlign: 'center',
      }}>
        <div style={{
          fontSize: 'clamp(72px, 6vw, 96px)',
          fontWeight: 800,
          color: '#fff',
          lineHeight: 1,
          fontFamily: "'Space Grotesk', Arial, sans-serif",
          letterSpacing: '-0.04em',
          marginBottom: 4,
          textShadow: '0 4px 24px rgba(0,0,0,0.3)',
        }}>
          {count}
          <span style={{ fontSize: '0.5em', verticalAlign: 'super' }}>+</span>
        </div>
        <div style={{
          fontSize: 15,
          fontWeight: 700,
          color: 'rgba(255,255,255,0.95)',
          fontFamily: "'Space Grotesk', Arial, sans-serif",
          marginBottom: 8,
          letterSpacing: '0.01em',
        }}>
          Projects Delivered
        </div>
        <div style={{
          fontSize: 12,
          color: 'rgba(255,255,255,0.6)',
          fontFamily: "'Inter', Arial, sans-serif",
        }}>
          Across 25+ industries
        </div>
      </div>
    </BentoCard>
  );
}

/* Card C — Clients counter (1 col × 1 row) */
function CardClients({ index }: { index: number }) {
  const { ref, visible } = useReveal();
  const count = useCounter(30, visible, 400);

  return (
    <BentoCard index={index} colSpan={1} hoverGlow="rgba(34,211,238,0.08)">
      <div ref={ref} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />
      {/* Subtle teal glow */}
      <div style={{
        position: 'absolute', bottom: -40, right: -40,
        width: 180, height: 180, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{ padding: '32px 28px' }}>
        {/* Globe SVG */}
        <div style={{
          width: 44, height: 44, borderRadius: 12,
          background: 'rgba(34,211,238,0.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 20,
        }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#22D3EE" strokeWidth="1.5"/>
            <path d="M12 2c-2.5 4-2.5 16 0 20M12 2c2.5 4 2.5 16 0 20M2 12h20" stroke="#22D3EE" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M4.9 7h14.2M4.9 17h14.2" stroke="#22D3EE" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
        <div style={{
          fontSize: 'clamp(40px, 4vw, 56px)',
          fontWeight: 800,
          color: '#F5F5F7',
          lineHeight: 1,
          fontFamily: "'Space Grotesk', Arial, sans-serif",
          letterSpacing: '-0.03em',
          marginBottom: 6,
        }}>
          {count}<span style={{ color: '#22D3EE' }}>+</span>
        </div>
        <CardLabel color="#22D3EE">Global Clients</CardLabel>
        <CardBody>Companies in 15+ countries trust CEYRALABS to build their products.</CardBody>
      </div>
    </BentoCard>
  );
}

/* Card D — Delivery speed (1 col × 1 row, violet) */
function CardSpeed({ index }: { index: number }) {
  return (
    <BentoCard
      index={index}
      colSpan={1}
      hoverGlow="rgba(124,92,252,0.12)"
      style={{
        background: 'linear-gradient(145deg, #2A1F6E 0%, #1A1240 100%)',
        border: '1px solid rgba(124,92,252,0.2)',
      }}
    >
      {/* Violet orb */}
      <div style={{
        position: 'absolute', top: -30, right: -30,
        width: 160, height: 160, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(124,92,252,0.25) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ padding: '32px 28px' }}>
        {/* Lightning icon */}
        <div style={{
          width: 44, height: 44, borderRadius: 12,
          background: 'rgba(124,92,252,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 20,
        }}>
          <svg width="20" height="22" viewBox="0 0 20 22" fill="none">
            <path d="M11 1L1 13h9l-1 8 10-12h-9l1-8z" fill="#A78BFA" stroke="#A78BFA" strokeWidth="1" strokeLinejoin="round"/>
          </svg>
        </div>
        <div style={{
          fontSize: 'clamp(40px, 4vw, 52px)',
          fontWeight: 800,
          color: '#F5F5F7',
          lineHeight: 1,
          fontFamily: "'Space Grotesk', Arial, sans-serif",
          letterSpacing: '-0.03em',
          marginBottom: 8,
        }}>
          5<span style={{ fontSize: '0.55em', color: '#A78BFA' }}>x</span>
        </div>
        <CardLabel color="#A78BFA">Delivery Speed</CardLabel>
        <CardBody style={{ color: 'rgba(167,139,250,0.7)' }}>
          Faster time-to-market with our AI-augmented development workflow.
        </CardBody>
      </div>
    </BentoCard>
  );
}

/* Card E — Tech stack (2 cols × 1 row) */
const techChips = [
  { label: 'React', color: 'rgba(97,218,251,0.12)', text: '#61DAFB' },
  { label: 'Next.js', color: 'rgba(255,255,255,0.07)', text: '#E5E7EB' },
  { label: 'Python', color: 'rgba(255,214,98,0.1)', text: '#FFD662' },
  { label: 'Node.js', color: 'rgba(104,178,84,0.12)', text: '#68B254' },
  { label: 'Rust', color: 'rgba(255,130,70,0.12)', text: '#FF8246' },
  { label: 'Solidity', color: 'rgba(124,92,252,0.12)', text: '#A78BFA' },
  { label: 'Swift', color: 'rgba(255,80,50,0.12)', text: '#FF6347' },
  { label: 'Kubernetes', color: 'rgba(50,149,233,0.12)', text: '#3295E9' },
  { label: 'GraphQL', color: 'rgba(225,0,152,0.1)', text: '#E10098' },
  { label: 'PostgreSQL', color: 'rgba(51,103,145,0.15)', text: '#336791' },
  { label: 'TensorFlow', color: 'rgba(255,160,0,0.1)', text: '#FFA000' },
  { label: 'AWS', color: 'rgba(255,153,0,0.1)', text: '#FF9900' },
];

function CardTechStack({ index }: { index: number }) {
  return (
    <BentoCard
      index={index}
      colSpan={2}
      hoverGlow="rgba(255,107,0,0.06)"
      style={{ minHeight: 200 }}
    >
      {/* Faint dotted grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)`,
        backgroundSize: '28px 28px',
        pointerEvents: 'none',
      }} />

      <div style={{ padding: '36px 36px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
          <div>
            <CardLabel>Technology</CardLabel>
            <CardHeading size={22}>Built With the Right Tools</CardHeading>
          </div>
          <div style={{
            fontSize: 12,
            color: '#52525B',
            fontFamily: "'Inter', Arial, sans-serif",
            textAlign: 'right',
            paddingTop: 4,
          }}>
            Full-stack to infrastructure
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {techChips.map((chip, i) => (
            <span
              key={chip.label}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                padding: '5px 12px', borderRadius: 100,
                background: chip.color,
                border: `1px solid ${chip.text}22`,
                fontSize: 12, fontWeight: 600,
                color: chip.text,
                fontFamily: "'Inter', Arial, sans-serif",
                letterSpacing: '0.02em',
                /* Staggered fade-in via CSS animation */
                animation: `chip-pop 0.4s ${SPRING} ${index * 75 + i * 40}ms both`,
              }}
            >
              {chip.label}
            </span>
          ))}
        </div>
      </div>
    </BentoCard>
  );
}

/* Card F — Years / Experience (1 col × 1 row) */
function CardYears({ index }: { index: number }) {
  const { ref, visible } = useReveal();
  const count = useCounter(5, visible, 300);

  return (
    <BentoCard
      index={index}
      colSpan={1}
      hoverGlow="rgba(255,107,0,0.08)"
    >
      <div ref={ref} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />
      {/* Orange accent glow */}
      <div style={{
        position: 'absolute', bottom: -30, left: -30,
        width: 160, height: 160, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,107,0,0.1) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ padding: '32px 28px' }}>
        {/* Shield icon */}
        <div style={{
          width: 44, height: 44, borderRadius: 12,
          background: 'rgba(255,107,0,0.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 20,
        }}>
          <svg width="20" height="22" viewBox="0 0 20 22" fill="none">
            <path d="M10 1L1 5v6c0 5.25 3.79 10.15 9 11.33C15.21 21.15 19 16.25 19 11V5L10 1z" stroke="#FF8C42" strokeWidth="1.5" strokeLinejoin="round"/>
            <path d="M6 11l3 3 5-5" stroke="#FF8C42" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div style={{
          fontSize: 'clamp(40px, 4vw, 52px)',
          fontWeight: 800,
          color: '#F5F5F7',
          lineHeight: 1,
          fontFamily: "'Space Grotesk', Arial, sans-serif",
          letterSpacing: '-0.03em',
          marginBottom: 8,
        }}>
          {count}<span style={{ color: '#FF6B00' }}>+</span>
        </div>
        <CardLabel color="#FF8C42">Years Active</CardLabel>
        <CardBody>Enterprise-grade security standards built into every project from day one.</CardBody>
      </div>
    </BentoCard>
  );
}

/* ── Section heading with Apple-style line-by-line reveal ─────────────── */
function SectionHeading() {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      style={{
        marginBottom: 'clamp(40px, 5vw, 64px)',
        textAlign: 'center',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.8s ${SPRING}, transform 0.8s ${SPRING}`,
      }}
    >
      <div style={{
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: '0.2em',
        color: '#FF6B00',
        fontFamily: "'Inter', Arial, sans-serif",
        marginBottom: 16,
        textTransform: 'uppercase',
      }}>
        Platform Capabilities
      </div>
      <h2 style={{
        fontFamily: "'Space Grotesk', Arial, sans-serif",
        fontSize: 'clamp(28px, 3.5vw, 48px)',
        fontWeight: 700,
        color: '#F5F5F7',
        margin: '0 0 18px',
        lineHeight: 1.1,
        letterSpacing: '-0.02em',
      }}>
        Built for builders who{' '}
        <span style={{
          background: 'linear-gradient(90deg, #FF6B00 0%, #FF8C00 50%, #FFB74D 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          think bigger
        </span>
      </h2>
      <p style={{
        fontSize: 16,
        color: '#71717A',
        maxWidth: 520,
        margin: '0 auto',
        lineHeight: 1.65,
        fontFamily: "'Inter', Arial, sans-serif",
      }}>
        A full-spectrum technology partner — from first commit to production scale.
      </p>
    </div>
  );
}

/* ── Main export ──────────────────────────────────────────────────────── */
export default function BentoGrid() {
  return (
    <>
      {/* Keyframes injected once */}
      <style>{`
        @keyframes bento-blob-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33%       { transform: translate(-20px, 15px) scale(1.05); }
          66%       { transform: translate(15px, -10px) scale(0.97); }
        }
        @keyframes bento-blob-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          40%       { transform: translate(18px, -12px) scale(1.08); }
          70%       { transform: translate(-12px, 8px) scale(0.95); }
        }
        @keyframes chip-pop {
          from { opacity: 0; transform: scale(0.85) translateY(6px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>

      <section
        style={{
          background: '#0A0A0F',
          padding: 'clamp(80px, 10vw, 130px) 0',
          position: 'relative',
        }}
      >
        {/* Top divider */}
        <div style={{
          position: 'absolute', top: 0, left: '10%', right: '10%', height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(255,107,0,0.2), transparent)',
        }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(16px, 3vw, 40px)' }}>
          <SectionHeading />

          {/* Bento grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 14,
          }}>
            {/* Row 1+2: [A: 2cols, 1row] [B: 1col, 2rows] */}
            {/* Row 2 cont: [C: 1col] [D: 1col] */}
            {/* Row 3: [E: 2cols] [F: 1col] */}
            <CardAI index={0} />
            <CardCounter index={1} />
            <CardClients index={2} />
            <CardSpeed index={3} />
            <CardTechStack index={4} />
            <CardYears index={5} />
          </div>
        </div>

        {/* Bottom divider */}
        <div style={{
          position: 'absolute', bottom: 0, left: '10%', right: '10%', height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(255,107,0,0.15), transparent)',
        }} />
      </section>
    </>
  );
}
