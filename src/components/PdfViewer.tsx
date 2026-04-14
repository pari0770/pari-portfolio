'use client';

import { useEffect } from 'react';

interface Props {
  src: string;         // path to PDF in /public
  title: string;       // shown in the toolbar
  filename: string;    // download filename
  onClose: () => void;
}

export default function PdfViewer({ src, title, filename, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: '#f5f5f5',
        display: 'flex', flexDirection: 'column',
        animation: 'fadeIn 0.28s ease',
      }}
    >
      {/* Toolbar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 40px', height: 56, flexShrink: 0,
        background: '#fff', borderBottom: '1px solid #e8e8e8',
      }}>
        <button
          onClick={onClose}
          style={{
            background: 'none', border: 'none', cursor: 'none',
            fontSize: 13, fontWeight: 400, color: '#666',
            fontFamily: 'inherit', letterSpacing: '0.03em',
            display: 'flex', alignItems: 'center', gap: 6, padding: 0,
          }}
        >
          ← Close
        </button>

        <span style={{ fontSize: 13, color: '#aaa', letterSpacing: '0.04em' }}>
          {title}
        </span>

        <a
          href={src}
          download={filename}
          style={{
            fontSize: 13, fontWeight: 400, color: '#1a1a1a',
            textDecoration: 'none', letterSpacing: '0.03em',
            border: '1px solid #1a1a1a', padding: '6px 16px',
            borderRadius: 4, cursor: 'none',
          }}
        >
          ↓ Download PDF
        </a>
      </div>

      {/* PDF */}
      <iframe
        src={`${src}#toolbar=0&navpanes=0&scrollbar=1`}
        style={{ flex: 1, border: 'none', background: '#f5f5f5' }}
        title={title}
      />
    </div>
  );
}
