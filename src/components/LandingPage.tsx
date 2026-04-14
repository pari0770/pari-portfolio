'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 100,
      background: '#fff',
      display: 'flex',
    }}>
      {/* ── Left Content ── */}
      <div style={{
        flex: 1,
        paddingTop: 90,
        paddingLeft: 'calc(10.8vw + 80px)',
        paddingRight: '4vw',
        paddingBottom: 60,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        overflowY: 'auto',
      }}>
        {/* Subtitle */}
        <p style={{
          fontSize: 28, fontWeight: 400, letterSpacing: '0.05em',
          color: '#bbb', marginBottom: 32, lineHeight: 1.2,
        }}>
          Hi, I'm Parinishtha
        </p>

        {/* Headline */}
        <h1 style={{
          fontSize: 58, fontWeight: 600, lineHeight: 1.28,
          letterSpacing: '-0.01em', color: '#1a1a1a', marginBottom: 48,
          maxWidth: '38vw',
        }}>
          I run the highly skilled experience team designing, coding &amp; shipping the enterprise{' '}
          <a href="https://www.microsoft.com/en-us/microsoft-365-copilot/download-copilot-app" target="_blank" rel="noopener noreferrer" style={{
            textDecoration: 'underline', color: '#1a1a1a',
          }}>
            Copilot app on Windows &amp; macOS
          </a>.
        </h1>

        {/* View Projects Button */}
        <Link href="/projects" style={{
          display: 'flex', alignItems: 'center', gap: 13,
          textDecoration: 'none',
          marginTop: 'auto',
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: '50%',
            border: '1.5px solid #1a1a1a',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
            cursor: 'none',
          }}>
            <span style={{ fontSize: 18, color: '#1a1a1a', lineHeight: 1 }}>→</span>
          </div>
          <span style={{ fontSize: 58, fontWeight: 500, color: '#1a1a1a' }}>
            View projects
          </span>
        </Link>
      </div>

      {/* ── Right: Image + Metadata ── */}
      <div style={{
        width: '50vw',
        flexShrink: 0,
        paddingTop: 90,
        paddingRight: 'calc(10.8vw + 80px)',
        paddingLeft: '4vw',
        paddingBottom: 60,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
      }}>
        {/* Image */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: 'auto',
          aspectRatio: '1 / 1.2',
          marginBottom: 32,
        }}>
          <Image
            src="/assets/cover-image.png"
            alt="Parinishtha portfolio cover"
            fill
            quality={95}
            style={{ objectFit: 'contain', objectPosition: 'center' }}
            sizes="45vw"
            priority
          />
        </div>

        {/* Metadata tags */}
        <div>
          <p style={{ fontSize: 13, color: '#aaa', marginBottom: 10 }}>
            Thriving score &gt; Microsoft avg ❤️
          </p>
          <p style={{ fontSize: 13, color: '#aaa', marginBottom: 10 }}>
            AI-native team 👥
          </p>
          <p style={{ fontSize: 13, color: '#aaa' }}>
            100% of my team ships code to Prod 🔒
          </p>
        </div>
      </div>
    </div>
  );
}
