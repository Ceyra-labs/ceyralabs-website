import AnimatedLogo from './AnimatedLogo';

const footerLinks = {
  Solutions: ['AI Solutions', 'Software Development', 'App Solutions', 'Platform Engineering', 'Blockchain', 'Data Governance'],
  Company: ['About Us', 'Our Work', 'Careers', 'Blog', 'Contact'],
  Connect: ['LinkedIn', 'GitHub', 'Twitter / X', 'Instagram'],
};

export default function Footer() {
  return (
    <footer style={{
      background: '#0A0A0F',
      borderTop: '1px solid #2A2A35',
      padding: 'clamp(60px, 8vw, 96px) 0 32px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background watermark */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        opacity: 0.015,
        pointerEvents: 'none',
      }}>
        <AnimatedLogo size={500} animated={false} />
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', position: 'relative', zIndex: 1 }}>
        {/* Top row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: 48,
          paddingBottom: 56,
          borderBottom: '1px solid #2A2A35',
        }} className="footer-grid">
          {/* Brand column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <AnimatedLogo size={36} animated={false} style={{ filter: 'drop-shadow(0 0 8px rgba(255,107,0,0.4))' }} />
              <span style={{
                fontFamily: "'Space Grotesk', Arial, sans-serif",
                fontWeight: 700,
                fontSize: 18,
                letterSpacing: '0.08em',
                color: '#F5F5F7',
              }}>
                CEYRA<span className="gradient-text">LABS</span>
              </span>
            </div>
            <p style={{
              fontSize: 14,
              color: '#A1A1AA',
              lineHeight: 1.7,
              margin: '0 0 24px',
              fontFamily: "'Inter', Arial, sans-serif",
              maxWidth: 280,
            }}>
              Next-generation software engineering lab. We build intelligent, scalable, and future-ready digital products.
            </p>
            {/* Social links */}
            <div style={{ display: 'flex', gap: 10 }}>
              {[
                { label: 'LI', title: 'LinkedIn' },
                { label: 'GH', title: 'GitHub' },
                { label: 'X', title: 'Twitter' },
              ].map(({ label, title }) => (
                <a
                  key={title}
                  href="#"
                  title={title}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    background: '#14141C',
                    border: '1px solid #2A2A35',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#A1A1AA',
                    textDecoration: 'none',
                    fontSize: 11,
                    fontWeight: 700,
                    fontFamily: "'Inter', Arial, sans-serif",
                    transition: 'border-color 0.2s, color 0.2s, background 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.borderColor = 'rgba(255,107,0,0.4)';
                    el.style.color = '#FF8C00';
                    el.style.background = 'rgba(255,107,0,0.08)';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.borderColor = '#2A2A35';
                    el.style.color = '#A1A1AA';
                    el.style.background = '#14141C';
                  }}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 style={{
                fontFamily: "'Space Grotesk', Arial, sans-serif",
                fontSize: 13,
                fontWeight: 600,
                color: '#F5F5F7',
                margin: '0 0 16px',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}>
                {section}
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {links.map((link) => (
                  <a
                    key={link}
                    href="#"
                    style={{
                      fontSize: 13,
                      color: '#A1A1AA',
                      textDecoration: 'none',
                      fontFamily: "'Inter', Arial, sans-serif",
                      transition: 'color 0.2s',
                      lineHeight: 1.4,
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#FF8C00'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#A1A1AA'; }}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: 28,
          flexWrap: 'wrap',
          gap: 16,
        }}>
          <p style={{
            fontSize: 13,
            color: '#A1A1AA',
            margin: 0,
            fontFamily: "'Inter', Arial, sans-serif",
          }}>
            © {new Date().getFullYear()} CeyraLabs. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Privacy Policy', 'Terms of Service'].map((label) => (
              <a
                key={label}
                href="#"
                style={{
                  fontSize: 12,
                  color: '#A1A1AA',
                  textDecoration: 'none',
                  fontFamily: "'Inter', Arial, sans-serif",
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#F5F5F7'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#A1A1AA'; }}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 480px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
