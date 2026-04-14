'use client';

import Image from 'next/image';
import { Project } from '@/data/projects';
import { useActiveProject } from '@/context/ActiveProjectContext';

interface ProjectSectionProps {
  project: Project;
  index: number;
}

const SECTION_VW = 60; // must match ProjectReel

const LANDSCAPE_BOX = { top: '28%', left: '6%', right: '2%', bottom: '6%' };
const PORTRAIT_BOX  = { top: '12%', left: '32%', right: '32%', bottom: '6%' };

const BOX_OVERRIDES: Record<string, typeof LANDSCAPE_BOX> = {};

export default function ProjectSection({ project, index }: ProjectSectionProps) {
  const { setOpenDetailId } = useActiveProject();
  const defaultBox = project.orientation === 'portrait' ? PORTRAIT_BOX : LANDSCAPE_BOX;
  const box = BOX_OVERRIDES[project.id] ?? defaultBox;
  const hasDetail = !!project.detail;

  return (
    <section
      style={{
        position: 'relative',
        flexShrink: 0,
        width: `${SECTION_VW}vw`,
        height: '100vh',
        marginRight: 0,
      }}
      aria-label={project.company}
    >
      {/* Clickable image area — only if the project has detail content */}
      <div
        onClick={hasDetail ? () => setOpenDetailId(project.id) : undefined}
        style={{
          position: 'absolute',
          top: box.top, left: box.left, right: box.right, bottom: box.bottom,
          cursor: hasDetail ? 'none' : undefined,
        }}
      >
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            quality={95}
            style={{
              objectFit: 'contain',
              objectPosition: 'left bottom',
              // Subtle hover state for clickable projects
              transition: 'opacity 0.2s ease',
            }}
            sizes={`${SECTION_VW}vw`}
            priority={index === 0}
            draggable={false}
          />
        </div>
      </div>

      {/* Company label */}
      <div style={{ position: 'absolute', bottom: 20, left: box.left }}>
        <p style={{ fontSize: 13, fontWeight: 400, letterSpacing: '0.04em', color: '#aaa' }}>
          {project.company}
        </p>
      </div>
    </section>
  );
}
