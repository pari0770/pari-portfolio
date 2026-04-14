'use client';

import { useEffect, useRef } from 'react';

const SIZE = 44;       // resting diameter in px
const SIZE_DOWN = 30;  // diameter when mouse button held

export default function Cursor() {
  const elRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -200, y: -200 });
  const current = useRef({ x: -200, y: -200 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const onDown = () => {
      el.style.width = `${SIZE_DOWN}px`;
      el.style.height = `${SIZE_DOWN}px`;
      // keep centred — offset changes because size changes
    };

    const onUp = () => {
      el.style.width = `${SIZE}px`;
      el.style.height = `${SIZE}px`;
    };

    const animate = () => {
      // Ease toward target position (lag feel)
      current.current.x += (pos.current.x - current.current.x) * 0.13;
      current.current.y += (pos.current.y - current.current.y) * 0.13;

      const halfW = parseFloat(el.style.width || `${SIZE}`) / 2;
      const halfH = parseFloat(el.style.height || `${SIZE}`) / 2;

      el.style.transform = `translate(${current.current.x - halfW}px, ${current.current.y - halfH}px)`;
      rafRef.current = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={elRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: SIZE,
        height: SIZE,
        borderRadius: '50%',
        background: 'rgba(0, 0, 0, 0.18)',
        pointerEvents: 'none',
        zIndex: 9999,
        willChange: 'transform, width, height',
        // Size transition only (not transform — that's handled by RAF)
        transition: 'width 0.15s ease, height 0.15s ease',
      }}
    />
  );
}
