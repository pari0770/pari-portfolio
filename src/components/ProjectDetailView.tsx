'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Project } from '@/data/projects';
import { useActiveProject } from '@/context/ActiveProjectContext';
import VideoPlayer from './VideoPlayer';
import PdfViewer from './PdfViewer';

interface Props {
  project: Project;
  onClose: () => void;
}

const CLOSE_DURATION = 380; // ms — must match animation durations below

export default function ProjectDetailView({ project, onClose }: Props) {
  const [showVideo, setShowVideo] = useState(false);
  const [showPdf,   setShowPdf]   = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const { activeIndex } = useActiveProject();
  const { detail } = project;
  const paragraphs = detail?.description?.split('\n\n') ?? [];

  // Calculate translate for closing animation (image shrinks back to scroll position)
  const SECTION_VW = 60;
  // Approximate offset from detail view center back to scroll position
  const scrollOffset = activeIndex * SECTION_VW;
  const viewportCenter = 50; // 50vw center of viewport
  const targetOffset = scrollOffset + SECTION_VW / 2; // center of section in scroll
  const translateX = targetOffset - viewportCenter; // how much to shift back

  // Trigger closing animation then unmount
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, CLOSE_DURATION);
  };

  // Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (showVideo && detail?.videos?.length) {
    return (
      <VideoPlayer
        videos={detail.videos}
        title={project.company}
        subtitle={detail.period ?? project.year}
        onClose={() => setShowVideo(false)}
      />
    );
  }

  if (showPdf && detail?.pdf) {
    return (
      <PdfViewer
        src={detail.pdf}
        title={`${project.company} — Case Study`}
        filename={`${project.company.replace(/\s+/g, '_')}_Case_Study.pdf`}
        onClose={() => setShowPdf(false)}
      />
    );
  }

  // Animation strings switch on isClosing
  const wrapAnim  = isClosing ? `fadeOut ${CLOSE_DURATION}ms ease forwards`         : 'fadeIn 0.35s ease';
  const leftAnim  = isClosing ? `slideOutLeft ${CLOSE_DURATION - 40}ms ease forwards` : 'slideInLeft 0.42s ease 0.06s both';
  const rightAnim = isClosing ? `scaleOut ${CLOSE_DURATION}ms ease forwards`         : 'scaleIn 0.48s ease 0.04s both';

  // Close animation with translate back to scroll position
  const rightClosingStyle = isClosing ? {
    animation: `scaleOut ${CLOSE_DURATION}ms ease forwards`,
    transformOrigin: 'center',
  } : undefined;

  return (
    <div
      onClick={(e) => {
        // Close on any click (buttons have stopPropagation to prevent this)
        handleClose();
      }}
      style={{
        position: 'fixed', inset: 0, zIndex: 150,
        background: '#fff',
        display: 'flex',
        animation: wrapAnim,
      }}>

      {/* ── Back arrow ── */}
      <button
        onClick={handleClose}
        style={{
          position: 'absolute', top: 44, left: 44,
          background: 'none', border: 'none', cursor: 'none',
          fontSize: 20, color: '#1a1a1a', padding: 8,
          fontFamily: 'inherit', lineHeight: 1, zIndex: 10,
        }}
      >
        ←
      </button>

      {/* ── Left sidebar ── */}
      <div
        onClick={(e) => {
          // Only close if clicking on sidebar itself, not buttons
          if ((e.target as HTMLElement).closest('button')) return;
          handleClose();
        }}
        style={{
          width: '32vw',
          flexShrink: 0,
          overflowY: 'auto',
          paddingTop: 110,
          paddingBottom: 60,
          paddingLeft: '10vw',
          paddingRight: '3vw',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          animation: leftAnim,
        }}>

        {/* Eyebrow */}
        <p style={{
          fontSize: 11, fontWeight: 500, letterSpacing: '0.1em',
          color: '#bbb', textTransform: 'uppercase', marginBottom: 16,
        }}>
          {project.company}
        </p>

        {/* Title */}
        <h1 style={{
          fontSize: 18, fontWeight: 600, lineHeight: 1.4,
          letterSpacing: '-0.01em', color: '#1a1a1a',
          marginBottom: 10,
        }}>
          {detail?.title ?? project.company}
        </h1>

        {/* Period — below the title */}
        {detail?.period && (
          <p style={{
            fontSize: 13, fontWeight: 400,
            color: '#aaa', marginBottom: 22,
            letterSpacing: '0.01em',
          }}>
            {detail.period}
          </p>
        )}

        {/* Description */}
        {paragraphs.map((para, i) => (
          <p key={i} style={{
            fontSize: 13, lineHeight: 1.75,
            color: '#666', marginBottom: 12,
          }}>
            {para}
          </p>
        ))}

        {/* Play button */}
        {detail?.videos?.length ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowVideo(true);
            }}
            style={{
              marginTop: 28,
              display: 'flex', alignItems: 'center', gap: 13,
              background: 'none', border: 'none', cursor: 'none',
              padding: 0, fontFamily: 'inherit', alignSelf: 'flex-start',
            }}
          >
            <div style={{
              width: 44, height: 44, borderRadius: '50%',
              border: '1.5px solid #1a1a1a',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <svg width="13" height="15" viewBox="0 0 13 15" fill="none">
                <path d="M1 1.5L12 7.5L1 13.5V1.5Z" fill="#1a1a1a"/>
              </svg>
            </div>
            <span style={{ fontSize: 13, fontWeight: 500, color: '#1a1a1a' }}>
              Play
            </span>
          </button>
        ) : null}

        {/* Browse case study button */}
        {detail?.pdf ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowPdf(true);
            }}
            style={{
              marginTop: detail?.videos?.length ? 16 : 28,
              display: 'flex', alignItems: 'center', gap: 13,
              background: 'none', border: 'none', cursor: 'none',
              padding: 0, fontFamily: 'inherit', alignSelf: 'flex-start',
            }}
          >
            <div style={{
              width: 44, height: 44, borderRadius: '50%',
              border: '1.5px solid #1a1a1a',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              {/* Document icon */}
              <svg width="14" height="15" viewBox="0 0 14 15" fill="none">
                <rect x="2" y="1" width="8" height="11" rx="1" stroke="#1a1a1a" strokeWidth="1.4"/>
                <path d="M4 5h5M4 7.5h5M4 10h3" stroke="#1a1a1a" strokeWidth="1.2" strokeLinecap="round"/>
                <path d="M8 1v3h4" stroke="#1a1a1a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span style={{ fontSize: 13, fontWeight: 500, color: '#1a1a1a' }}>
              Browse case study
            </span>
          </button>
        ) : null}
      </div>

      {/* ── Right: image ── */}
      <div
        onClick={handleClose}
        style={{
          flex: 1,
          padding: '7vh 6vw 7vh 3vw',
          display: 'flex', alignItems: 'center',
          animation: rightAnim,
          ...(isClosing && {
            transformOrigin: 'center center',
          }),
        }}>
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            quality={95}
            style={{ objectFit: 'contain', objectPosition: 'center' }}
            sizes="70vw"
            priority
          />
        </div>
      </div>
    </div>
  );
}
