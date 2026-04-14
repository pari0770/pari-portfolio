'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function NotableAchievementsPage() {
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
        {/* Heading */}
        <h1 style={{
          fontSize: 32, fontWeight: 600, lineHeight: 1.3,
          color: '#1a1a1a', marginBottom: 32,
          maxWidth: '38vw',
        }}>
          Things I'm proud of
        </h1>

        {/* Achievements List */}
        <div style={{
          fontSize: 16, fontWeight: 400, lineHeight: 1.8,
          color: '#1a1a1a',
          maxWidth: '38vw',
        }}>
          <p style={{ marginBottom: 16 }}>
            🏆 Won Microsoft's Global hackathon: presented to Satya Nadella
          </p>

          <p style={{ marginBottom: 16 }}>
            Meta
            <br />
            East coast prototype forum winner 🏆
          </p>

          <p>
            Filed two patents with the office to the CTO, while working on AI-powered features on Edge
          </p>
        </div>
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
            src="/assets/achievements-collage.png"
            alt="Notable achievements collage"
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
