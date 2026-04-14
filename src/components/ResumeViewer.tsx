'use client';

import { useState, useEffect } from 'react';

export default function ResumeViewer() {
  const [isOpen, setIsOpen] = useState(false);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  return (
    <>
      {/* Trigger link — looks like nav link */}
      <button
        onClick={() => setIsOpen(true)}
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          fontSize: 16,
          fontWeight: 400,
          letterSpacing: '0.01em',
          color: '#1a1a1a',
          lineHeight: 1.7,
          cursor: 'none',
          fontFamily: 'inherit',
          display: 'flex',
          alignItems: 'center',
          gap: 4,
        }}
      >
        <span>↓</span>
        <span>Resume</span>
      </button>

      {/* Full-screen PDF viewer overlay */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 200,
            background: '#f5f5f5',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Top bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 40px',
              height: 56,
              background: '#ffffff',
              borderBottom: '1px solid #e8e8e8',
              flexShrink: 0,
            }}
          >
            {/* Close */}
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: 13,
                fontWeight: 400,
                color: '#666',
                cursor: 'none',
                fontFamily: 'inherit',
                letterSpacing: '0.03em',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: 0,
              }}
            >
              ← Close
            </button>

            <span
              style={{ fontSize: 13, color: '#aaa', letterSpacing: '0.04em' }}
            >
              Resume
            </span>

            {/* Download — does NOT auto-trigger, opens save dialog */}
            <a
              href="/assets/resume.pdf"
              download="Parinishtha_Resume.pdf"
              style={{
                fontSize: 13,
                fontWeight: 400,
                color: '#1a1a1a',
                textDecoration: 'none',
                letterSpacing: '0.03em',
                border: '1px solid #1a1a1a',
                padding: '6px 16px',
                borderRadius: 4,
                cursor: 'none',
              }}
            >
              ↓ Download PDF
            </a>
          </div>

          {/* PDF iframe — browser renders the PDF natively */}
          <iframe
            src="/assets/resume.pdf#toolbar=0&navpanes=0&scrollbar=1"
            style={{
              flex: 1,
              border: 'none',
              background: '#f5f5f5',
            }}
            title="Parinishtha Resume"
          />
        </div>
      )}
    </>
  );
}
