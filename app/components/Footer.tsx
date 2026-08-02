'use client';

import Image from 'next/image';

import AnimatedLogo from './AnimatedLogo';

type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

type FooterSection = {
  title: string;
  links: FooterLink[];
};

type SocialLink = {
  title: string;
  href: string;
  iconSrc: string;
};

type ContactInfo = {
  label: string;
  value: string;
  href: string;
  iconSrc: string;
};

const footerSections: FooterSection[] = [
  {
    title: 'Solutions',
    links: [
      {
        label: 'Software Engineering',
        href: '/services/software-engineering',
      },
      {
        label: 'AI & Machine Learning',
        href: '/services/ai-machine-learning',
      },
      {
        label: 'Mobile Applications',
        href: '/services/mobile-applications',
      },
      {
        label: 'Web Applications',
        href: '/services/web-applications',
      },
      {
        label: 'UI/UX Design',
        href: '/services/ui-ux-design',
      },
    ],
  },
  {
    title: 'Company',
    links: [
      {
        label: 'About Us',
        href: '/about',
      },
      {
        label: 'Our Work',
        href: '/work',
      },
      {
        label: 'Careers',
        href: '/careers',
      },
      {
        label: 'Blog',
        href: '/blog',
      },
      {
        label: 'Contact',
        href: '/#contact',
      },
    ],
  },
  {
    title: 'Connect',
    links: [
      {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/company/ceyra-labs',
        external: true,
      },
      {
        label: 'Facebook',
        href: 'https://www.facebook.com/share/1BgWXA2dzD/?mibextid=wwXIfr',
        external: true,
      },
      {
        label: 'Instagram',
        href: 'https://www.instagram.com/ceyralabs?igsh=MXhiZXNobGc1NzBiNA%3D%3D&utm_source=qr',
        external: true,
      },
    ],
  },
];

const socialLinks: SocialLink[] = [
  {
    title: 'LinkedIn',
    href: 'https://www.linkedin.com/company/ceyra-labs',
    iconSrc: '/icons/footer/linkedin-icon.svg',
  },
  {
    title: 'Facebook',
    href: 'https://www.facebook.com/share/1BgWXA2dzD/?mibextid=wwXIfr',
    iconSrc: '/icons/footer/facebook-icon.svg',
  },
  {
    title: 'Instagram',
    href: 'https://www.instagram.com/ceyralabs?igsh=MXhiZXNobGc1NzBiNA%3D%3D&utm_source=qr',
    iconSrc: '/icons/footer/instagram-icon.svg',
  },
];

const contactInfo: ContactInfo[] = [
  {
    label: 'Email',
    value: 'ceyralabs@outlook.com',
    href: 'mailto:ceyralabs@outlook.com',
    iconSrc: '/icons/footer/email-icon.svg',
  },
  {
    label: 'Phone',
    value: '+94 77 123 4567',
    href: 'tel:+94771234567',
    iconSrc: '/icons/footer/phone-icon.svg',
  },
];

const legalLinks: FooterLink[] = [
  {
    label: 'Privacy Policy',
    href: '/privacy-policy',
  },
  {
    label: 'Terms of Service',
    href: '/terms-of-service',
  },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: '#0A0A0F',
        borderTop: '1px solid #2A2A35',
        padding: 'clamp(60px, 8vw, 96px) 0 32px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background watermark */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          opacity: 0.015,
          pointerEvents: 'none',
        }}
      >
        <AnimatedLogo size={500} animated={false} />
      </div>

      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '0 32px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Top row */}
        <div
          className="footer-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr',
            gap: 48,
            paddingBottom: 56,
            borderBottom: '1px solid #2A2A35',
          }}
        >
          {/* Brand column */}
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                marginBottom: 20,
              }}
            >
              <AnimatedLogo
                size={36}
                animated={false}
                style={{
                  filter:
                    'drop-shadow(0 0 8px rgba(255,107,0,0.4))',
                }}
              />

              <span
                style={{
                  fontFamily:
                    "'Space Grotesk', Arial, sans-serif",
                  fontWeight: 700,
                  fontSize: 18,
                  letterSpacing: '0.08em',
                  color: '#F5F5F7',
                }}
              >
                CEYRA <span className="gradient-text">LABS</span>
              </span>
            </div>

            <p
              style={{
                fontSize: 14,
                color: '#A1A1AA',
                lineHeight: 1.7,
                margin: '0 0 24px',
                fontFamily: "'Inter', Arial, sans-serif",
                maxWidth: 300,
              }}
            >
              Next-generation software engineering lab. We build
              intelligent, scalable, and future-ready digital
              products.
            </p>

            {/* Contact information */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: 12,
                marginBottom: 24,
              }}
            >
              {contactInfo.map(({ label, value, href, iconSrc }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={`${label}: ${value}`}
                  className="footer-contact-link"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 10,
                    color: '#A1A1AA',
                    textDecoration: 'none',
                    fontSize: 14,
                    lineHeight: 1.5,
                    fontFamily: "'Inter', Arial, sans-serif",
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(event) => {
                    event.currentTarget.style.color = '#FF8C00';
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.color = '#A1A1AA';
                  }}
                >
                  <Image
                    src={iconSrc}
                    alt=""
                    width={18}
                    height={18}
                    aria-hidden="true"
                    className="footer-contact-icon"
                  />

                  <span>{value}</span>
                </a>
              ))}
            </div>

            {/* Social icons */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 10,
              }}
            >
              {socialLinks.map(({ title, href, iconSrc }) => (
                <a
                  key={title}
                  href={href}
                  title={title}
                  aria-label={`Visit Ceyra Labs on ${title}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link"
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 8,
                    background: '#14141C',
                    border: '1px solid #2A2A35',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textDecoration: 'none',
                    transition:
                      'border-color 0.2s, background 0.2s, transform 0.2s',
                  }}
                  onMouseEnter={(event) => {
                    event.currentTarget.style.borderColor =
                      'rgba(255,107,0,0.4)';
                    event.currentTarget.style.background =
                      'rgba(255,107,0,0.08)';
                    event.currentTarget.style.transform =
                      'translateY(-2px)';
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.borderColor =
                      '#2A2A35';
                    event.currentTarget.style.background =
                      '#14141C';
                    event.currentTarget.style.transform =
                      'translateY(0)';
                  }}
                >
                  <Image
                    src={iconSrc}
                    alt=""
                    width={18}
                    height={18}
                    aria-hidden="true"
                    className="footer-social-icon"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4
                style={{
                  fontFamily:
                    "'Space Grotesk', Arial, sans-serif",
                  fontSize: 13,
                  fontWeight: 600,
                  color: '#F5F5F7',
                  margin: '0 0 16px',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}
              >
                {section.title}
              </h4>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: 10,
                }}
              >
                {section.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={
                      link.external
                        ? 'noopener noreferrer'
                        : undefined
                    }
                    style={{
                      fontSize: 13,
                      color: '#A1A1AA',
                      textDecoration: 'none',
                      fontFamily: "'Inter', Arial, sans-serif",
                      transition: 'color 0.2s',
                      lineHeight: 1.4,
                    }}
                    onMouseEnter={(event) => {
                      event.currentTarget.style.color = '#FF8C00';
                    }}
                    onMouseLeave={(event) => {
                      event.currentTarget.style.color = '#A1A1AA';
                    }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: 28,
            flexWrap: 'wrap',
            gap: 16,
          }}
        >
          <p
            style={{
              fontSize: 13,
              color: '#A1A1AA',
              margin: 0,
              fontFamily: "'Inter', Arial, sans-serif",
            }}
          >
            © {new Date().getFullYear()} CEYRA LABS. All rights
            reserved.
          </p>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 24,
            }}
          >
            {legalLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={{
                  fontSize: 12,
                  color: '#A1A1AA',
                  textDecoration: 'none',
                  fontFamily: "'Inter', Arial, sans-serif",
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(event) => {
                  event.currentTarget.style.color = '#F5F5F7';
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.color = '#A1A1AA';
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .footer-social-icon,
        .footer-contact-icon {
          transition: filter 0.2s ease;
        }

        .footer-social-link:hover .footer-social-icon,
        .footer-contact-link:hover .footer-contact-icon {
          filter:
            brightness(0)
            saturate(100%)
            invert(47%)
            sepia(98%)
            saturate(2777%)
            hue-rotate(1deg)
            brightness(103%)
            contrast(105%);
        }

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