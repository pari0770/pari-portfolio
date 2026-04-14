'use client';

import { useRef, useEffect } from 'react';
import { projects } from '@/data/projects';
import { useActiveProject } from '@/context/ActiveProjectContext';
import ProjectSection from './ProjectSection';

// Must match ProjectSection's SECTION_VW
const SECTION_VW = 60;

export default function ProjectReel() {
  const reelRef = useRef<HTMLDivElement>(null);
  const { setActiveIndex } = useActiveProject();

  useEffect(() => {
    const el = reelRef.current;
    if (!el) return;

    let isDown = false;
    let startX = 0;
    let startScroll = 0;
    let prevX = 0;
    let prevTime = 0;
    let velocity = 0; // px per 16ms frame
    let rafId: number | null = null;
    let lastActiveIndex = 0;

    const FRICTION = 0.88;
    const MIN_VEL = 0.4;
    const MAX_VEL = 80;

    const sectionWidth = () => (SECTION_VW / 100) * window.innerWidth;

    /** Update header year based on which section is most visible — driven by scroll position */
    function updateActiveIndex() {
      const sw = sectionWidth();
      // Use viewport centre to decide which section is "active"
      const viewCentre = el.scrollLeft + el.clientWidth / 2;
      const idx = Math.max(0, Math.min(
        Math.floor(viewCentre / sw),
        projects.length - 1
      ));
      if (idx !== lastActiveIndex) {
        lastActiveIndex = idx;
        setActiveIndex(idx);
      }
    }

    /** Smooth-scroll el.scrollLeft to target with ease-out cubic */
    function smoothScrollTo(target: number) {
      if (rafId !== null) { cancelAnimationFrame(rafId); rafId = null; }
      const startPos = el.scrollLeft;
      const distance = target - startPos;
      if (Math.abs(distance) < 0.5) { updateActiveIndex(); return; }
      const duration = Math.min(480, Math.max(180, Math.abs(distance) * 0.45));
      const startTime = performance.now();

      function frame(now: number) {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.scrollLeft = startPos + distance * eased;
        if (progress < 1) {
          rafId = requestAnimationFrame(frame);
        } else {
          el.scrollLeft = target;
          rafId = null;
        }
      }
      rafId = requestAnimationFrame(frame);
    }

    /** Snap el.scrollLeft to the nearest section boundary */
    function snapToNearest() {
      const sw = sectionWidth();
      const idx = Math.round(el.scrollLeft / sw);
      const clamped = Math.max(0, Math.min(idx, projects.length - 1));
      smoothScrollTo(clamped * sw);
    }

    /** Apply momentum physics, then snap when velocity settles */
    function applyMomentum() {
      if (rafId !== null) { cancelAnimationFrame(rafId); rafId = null; }

      function frame() {
        if (Math.abs(velocity) < MIN_VEL) {
          velocity = 0;
          snapToNearest();
          return;
        }
        el.scrollLeft += velocity;
        velocity *= FRICTION;
        rafId = requestAnimationFrame(frame);
      }
      rafId = requestAnimationFrame(frame);
    }

    const onMouseDown = (e: MouseEvent) => {
      if (rafId !== null) { cancelAnimationFrame(rafId); rafId = null; }
      isDown = true;
      velocity = 0;
      startX = e.pageX;
      prevX = e.pageX;
      startScroll = el.scrollLeft;
      prevTime = performance.now();
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      const now = performance.now();
      const dt = now - prevTime;
      if (dt > 0) {
        const raw = -(e.pageX - prevX) * (16 / dt);
        velocity = Math.max(-MAX_VEL, Math.min(MAX_VEL, raw));
      }
      prevX = e.pageX;
      prevTime = now;
      el.scrollLeft = startScroll - (e.pageX - startX);
    };

    const onMouseUp = () => {
      if (!isDown) return;
      isDown = false;
      applyMomentum();
    };

    // ── scroll listener: fires for ALL scroll sources (trackpad, wheel, drag, JS) ──
    const onScroll = () => updateActiveIndex();

    el.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    el.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      el.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      el.removeEventListener('scroll', onScroll);
    };
  }, [setActiveIndex]);

  return (
    <div
      ref={reelRef}
      style={{
        display: 'flex',
        height: '100vh',
        overflowX: 'auto',
        overflowY: 'hidden',
        // paddingLeft shifts the whole reel so the first image starts 3× further
        // from the left edge than the image's own box.left alone would place it.
        paddingLeft: '7.2vw',
        userSelect: 'none',
        WebkitUserSelect: 'none',
      }}
    >
      {projects.map((project, i) => (
        <ProjectSection key={project.id} project={project} index={i} />
      ))}
      {/* Trailing spacer = 100vw - SECTION_VW so last section snaps correctly */}
      <div style={{ flexShrink: 0, width: '40vw' }} />
    </div>
  );
}
