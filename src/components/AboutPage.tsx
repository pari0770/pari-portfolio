'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 100,
      background: '#fff',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Back Button */}
      <Link href="/" style={{
        position: 'fixed', top: 90, left: 'calc(10.8vw + 80px)',
        zIndex: 101,
        textDecoration: 'none', color: '#1a1a1a', fontSize: 24,
        cursor: 'pointer',
      }}>
        ←
      </Link>

      <div style={{
        display: 'flex',
        flex: 1,
        gap: '0',
      }}>
      {/* Left Content */}
      <div style={{
        flex: 1,
        minWidth: 0,
        padding: '60px calc(10.8vw + 80px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'left',
        overflowY: 'auto',
      }}>
        {/* Bio text */}
        <p style={{
          fontSize: 16, fontWeight: 400, lineHeight: 1.6,
          color: '#1a1a1a', marginBottom: 24,
          maxWidth: '38vw',
        }}>
          Hi, I'm Parinishtha. I run the highly skilled experience team designing, coding &amp; shipping the enterprise{' '}
          <a href="https://www.microsoft.com/en-us/microsoft-365-copilot/download-copilot-app" target="_blank" rel="noopener noreferrer" style={{
            textDecoration: 'underline', color: '#1a1a1a',
          }}>
            Copilot app on Windows &amp; macOS
          </a>
          .
        </p>

        {/* Second paragraph */}
        <p style={{
          fontSize: 16, fontWeight: 400, lineHeight: 1.6,
          color: '#1a1a1a', marginBottom: 40,
          maxWidth: '38vw',
        }}>
          Previously, at Meta, worked on protecting 3.7 Billion people from harmful Ads across Meta platforms.
        </p>

        {/* Social Links */}
        <nav style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
        }}>
          <a href="mailto:parinishtha07@gmail.com" style={{
            fontSize: 14, fontWeight: 400, color: '#aaa',
            textDecoration: 'none', cursor: 'pointer',
          }}>
            Email
          </a>
          <a href="https://www.linkedin.com/in/parinishtha-yadav-868777122/" target="_blank" rel="noopener noreferrer" style={{
            fontSize: 14, fontWeight: 400, color: '#aaa',
            textDecoration: 'none', cursor: 'pointer',
          }}>
            LinkedIn
          </a>
        </nav>
      </div>

      {/* Right: Image */}
      <div style={{
        flex: '0 1 50%',
        padding: '60px 0 60px 20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 0,
      }}>
        {/* Image */}
        <div style={{
          position: 'relative',
          width: '90%',
          maxWidth: '35vw',
          height: 'auto',
          aspectRatio: '1 / 1.2',
          minHeight: '300px',
        }}>
          <Image
            src="/assets/cover-image.png"
            alt="Parinishtha portfolio"
            fill
            quality={95}
            style={{ objectFit: 'contain', objectPosition: 'center' }}
            sizes="35vw"
            priority
          />
        </div>
      </div>
      </div>
    </div>
  );
}
