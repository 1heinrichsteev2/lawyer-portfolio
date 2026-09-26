'use client';
import { useEffect, useRef } from 'react';

const COLORS = ['#E0C27A', '#D6B56A', '#C8A45D', '#EDE7DA', '#D6B56A', '#C8A45D'];

/**
 * CSS/DOM fallback used when WebGL is unavailable or fails. A short chain of soft champagne
 * dots eases after the pointer. Transform-only, pointer-events none, and it stops its
 * animation loop when the pointer is still. The native arrow cursor stays visible.
 */
export default function CursorTrailFallback() {
  const dots = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const pos = COLORS.map(() => ({ x: -100, y: -100 }));
    const target = { x: -100, y: -100 };
    let raf = 0;
    let running = false;
    let last = 0;

    const tick = () => {
      let moving = false;
      pos.forEach((p, i) => {
        const lead = i === 0 ? target : pos[i - 1];
        p.x += (lead.x - p.x) * 0.35;
        p.y += (lead.y - p.y) * 0.35;
        if (Math.abs(lead.x - p.x) > 0.3 || Math.abs(lead.y - p.y) > 0.3) moving = true;
        const el = dots.current[i];
        if (el) {
          el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) translate(-50%, -50%) scale(${1 - i * 0.12})`;
          el.style.opacity = String(performance.now() - last < 900 ? 0.5 - i * 0.07 : 0);
        }
      });
      if (moving || performance.now() - last < 900) raf = requestAnimationFrame(tick);
      else running = false;
    };
    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      last = performance.now();
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[70] overflow-hidden" aria-hidden="true" data-cursor-fallback="">
      {COLORS.map((c, i) => (
        <span
          key={i}
          ref={el => {
            dots.current[i] = el;
          }}
          className="absolute top-0 left-0 block h-3 w-3 rounded-full opacity-0 blur-[3px] transition-opacity duration-300"
          style={{ background: c }}
        />
      ))}
    </div>
  );
}
