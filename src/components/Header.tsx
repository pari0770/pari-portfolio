'use client';

import ResumeViewer from './ResumeViewer';
import { useActiveProject } from '@/context/ActiveProjectContext';
import { projects } from '@/data/projects';

// Left edge must match where images start:
//   reel paddingLeft (7.2vw) + image box.left (6% of 60vw = 3.6vw) = 10.8vw
const HEADER_LEFT  = 'calc(10.8vw + 80px)';
const HEADER_RIGHT = '20vw';

const navLinkStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  padding: 0,
  fontSize: 16,
  fontWeight: 400,
  letterSpacing: '0.01em',
  color: '#1a1a1a',
  textDecoration: 'none',
  lineHeight: 1.7,
  cursor: 'none',
  fontFamily: 'inherit',
};

const titlesByYear: Record<number, string> = {
  2026: 'Sr Product Design Manager, Enterprise Copilot',
  2022: 'Lead Product Designer, Meta',
  2021: 'Product Designer II, Teams',
  2020: 'Product Designer, Edge',
};

export default function Header() {
  const { activeIndex } = useActiveProject();
  const currentYear = projects[activeIndex]?.year ?? projects[0].year;
  const currentTitle = titlesByYear[currentYear] || '';

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        paddingTop: 90,
        paddingLeft: HEADER_LEFT,
        paddingRight: HEADER_RIGHT,
        pointerEvents: 'none',
      }}
    >
      {/* Left: Name + dynamic year + title */}
      <div style={{ pointerEvents: 'auto' }}>
        <p style={{ fontSize: 40, fontWeight: 600, lineHeight: 1.15, letterSpacing: '-0.01em', color: '#1a1a1a' }}>
          Parinishtha
        </p>
        <div
          key={currentYear}
          style={{
            transition: 'opacity 0.3s ease',
          }}
        >
          <p style={{
            fontSize: 40,
            fontWeight: 600,
            lineHeight: 1.15,
            letterSpacing: '-0.01em',
            color: '#aaa',
            margin: 0,
          }}>
            {currentYear}
          </p>
          <p style={{
            fontSize: 14,
            fontWeight: 400,
            lineHeight: 1.4,
            letterSpacing: '0.01em',
            color: '#1a1a1a',
            margin: 0,
            marginTop: 4,
          }}>
            {currentTitle}
          </p>
        </div>
      </div>

      {/* Right: Nav */}
      <nav
        style={{
          pointerEvents: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          paddingTop: 4,
        }}
      >
        <a href="/about" style={navLinkStyle}>About</a>
        <a href="/notable-achievements" style={navLinkStyle}>Notable achievements</a>
        <ResumeViewer />
      </nav>
    </header>
  );
}
