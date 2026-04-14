'use client';

import { useRef, useState, useEffect, useCallback } from 'react';

interface VideoPlayerProps {
  videos: string[];
  title: string;
  subtitle: string;
  onClose: () => void;
}

export default function VideoPlayer({ videos, title, subtitle, onClose }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentIdx, setCurrentIdx] = useState(0);

  // Load & auto-play when switching videos
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.src = videos[currentIdx];
    v.load();
    v.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  }, [currentIdx, videos]);

  // Escape → close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); }
    else { v.pause(); setPlaying(false); }
  }, []);

  const onTimeUpdate = () => {
    const v = videoRef.current;
    if (v && v.duration) setProgress(v.currentTime / v.duration);
  };

  const onEnded = () => {
    if (currentIdx < videos.length - 1) setCurrentIdx(i => i + 1);
    else setPlaying(false);
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    const r = e.currentTarget.getBoundingClientRect();
    v.currentTime = ((e.clientX - r.left) / r.width) * v.duration;
  };

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: '#fff',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        animation: 'fadeIn 0.3s ease',
      }}
    >
      {/* Back */}
      <button onClick={onClose} style={backBtnStyle}>←</button>

      {/* Card */}
      <div
        style={{
          width: '76vw', maxWidth: 1100,
          background: '#f7f7f7', borderRadius: 16,
          overflow: 'hidden',
          animation: 'scaleIn 0.35s ease',
          boxShadow: '0 4px 40px rgba(0,0,0,0.08)',
        }}
      >
        {/* Video title bar */}
        <div style={{ padding: '18px 24px 14px', background: '#fff', borderBottom: '1px solid #ebebeb' }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a', lineHeight: 1.4 }}>{title}</p>
          <p style={{ fontSize: 12, color: '#aaa', marginTop: 2 }}>{subtitle}</p>
        </div>

        {/* Video */}
        <div style={{ background: '#000', position: 'relative', cursor: 'none' }} onClick={togglePlay}>
          <video
            ref={videoRef}
            onTimeUpdate={onTimeUpdate}
            onEnded={onEnded}
            style={{ width: '100%', display: 'block', maxHeight: '62vh', objectFit: 'contain' }}
            playsInline
          />
          {/* Centre play icon when paused */}
          {!playing && (
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              pointerEvents: 'none',
            }}>
              <div style={{
                width: 56, height: 56, borderRadius: '50%',
                background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M5 3L17 10L5 17V3Z" fill="#fff"/>
                </svg>
              </div>
            </div>
          )}
        </div>

        {/* Controls */}
        <div style={{
          padding: '14px 20px',
          display: 'flex', alignItems: 'center', gap: 14,
          background: '#fff',
        }}>
          {/* Play/pause */}
          <button onClick={togglePlay} style={ctrlBtnStyle}>
            {playing ? (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect x="3" y="2" width="4" height="14" rx="1.5" fill="#1a1a1a"/>
                <rect x="11" y="2" width="4" height="14" rx="1.5" fill="#1a1a1a"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M4 2.5L15 9L4 15.5V2.5Z" fill="#1a1a1a"/>
              </svg>
            )}
          </button>

          {/* Progress */}
          <div
            onClick={seek}
            style={{
              flex: 1, height: 3, background: '#e0e0e0',
              borderRadius: 2, cursor: 'none', position: 'relative',
            }}
          >
            <div style={{
              position: 'absolute', left: 0, top: 0, bottom: 0,
              width: `${progress * 100}%`,
              background: '#1a1a1a', borderRadius: 2,
            }} />
          </div>

          {/* Fullscreen */}
          <button onClick={() => videoRef.current?.requestFullscreen()} style={ctrlBtnStyle}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M1 1h5v2H3v3H1V1zm9 0h5v5h-2V3h-3V1zM1 10h2v3h3v2H1v-5zm12 3h-3v2h5v-5h-2v3z" fill="#1a1a1a"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Video navigation — prev / dots / next */}
      {videos.length > 1 && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 20, marginTop: 24,
        }}>
          {/* Prev */}
          <button
            onClick={() => setCurrentIdx(i => Math.max(0, i - 1))}
            disabled={currentIdx === 0}
            style={{
              background: 'none', border: '1px solid #ccc', borderRadius: '50%',
              width: 36, height: 36, cursor: 'none', padding: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              opacity: currentIdx === 0 ? 0.3 : 1,
              transition: 'opacity 0.2s',
              flexShrink: 0,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 2L4 7l5 5" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Dots + counter */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <div style={{ display: 'flex', gap: 8 }}>
              {videos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIdx(i)}
                  style={{
                    width: i === currentIdx ? 22 : 8,
                    height: 8, borderRadius: 4,
                    border: 'none', padding: 0, cursor: 'none',
                    background: i === currentIdx ? '#1a1a1a' : '#d0d0d0',
                    transition: 'all 0.25s ease',
                  }}
                />
              ))}
            </div>
            <span style={{ fontSize: 11, color: '#aaa', letterSpacing: '0.06em' }}>
              {currentIdx + 1} / {videos.length}
            </span>
          </div>

          {/* Next */}
          <button
            onClick={() => setCurrentIdx(i => Math.min(videos.length - 1, i + 1))}
            disabled={currentIdx === videos.length - 1}
            style={{
              background: 'none', border: '1px solid #ccc', borderRadius: '50%',
              width: 36, height: 36, cursor: 'none', padding: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              opacity: currentIdx === videos.length - 1 ? 0.3 : 1,
              transition: 'opacity 0.2s',
              flexShrink: 0,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M5 2l5 5-5 5" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

const backBtnStyle: React.CSSProperties = {
  position: 'absolute', top: 48, left: 44,
  background: 'none', border: 'none', cursor: 'none',
  fontSize: 22, color: '#1a1a1a', padding: 0,
  fontFamily: 'inherit', lineHeight: 1,
};

const ctrlBtnStyle: React.CSSProperties = {
  background: 'none', border: 'none', cursor: 'none',
  padding: 4, display: 'flex', alignItems: 'center', justifyContent: 'center',
  flexShrink: 0,
};
