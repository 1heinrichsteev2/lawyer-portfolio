'use client';
/* eslint-disable react-hooks/immutability --
   Vendored React Bits implementation kept faithful to the official source. It uses the
   "latest ref" and rAF-driven patterns that React Compiler lint rules flag but which are
   safe here: refs are only read inside event handlers, effects and animation frames. */
/**
 * React Bits — Line Sidebar (official proximity/easing loop), adapted as a page section
 * indicator: the active item follows scroll position, items are real buttons that
 * scroll to their section, and it is hidden below 1280px so it never crowds content.
 */
import { useRef, useState, useCallback, useEffect, useSyncExternalStore, type CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import { scrollToId } from '@/components/layout/SmoothScroll';

type Falloff = 'linear' | 'smooth' | 'sharp';
const FALLOFF_CURVES: Record<Falloff, (p: number) => number> = {
  linear: p => p,
  smooth: p => p * p * (3 - 2 * p),
  sharp: p => p * p * p
};

export type RailItem = { id: string; label: string };

export default function SectionRail({
  items,
  accentColor = '#D6B56A',
  textColor = 'rgba(237,231,218,0.42)',
  markerColor = 'rgba(237,231,218,0.28)',
  proximityRadius = 70,
  maxShift = 14,
  falloff = 'smooth',
  markerLength = 28,
  markerGap = 12,
  tickScale = 0.5,
  itemGap = 14,
  fontSize = 0.8,
  smoothing = 110
}: {
  items: RailItem[];
  accentColor?: string;
  textColor?: string;
  markerColor?: string;
  proximityRadius?: number;
  maxShift?: number;
  falloff?: Falloff;
  markerLength?: number;
  markerGap?: number;
  tickScale?: number;
  itemGap?: number;
  fontSize?: number;
  smoothing?: number;
}) {
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const targetsRef = useRef<number[]>([]);
  const currentRef = useRef<number[]>([]);
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef(0);
  const activeRef = useRef<number | null>(0);
  const smoothingRef = useRef(smoothing);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  useEffect(() => {
    activeRef.current = activeIndex;
    smoothingRef.current = smoothing;
  }, [activeIndex, smoothing]);

  const runFrame = useCallback((now: number) => {
    const dt = Math.min((now - lastRef.current) / 1000, 0.05);
    lastRef.current = now;
    const tau = Math.max(smoothingRef.current, 1) / 1000;
    const k = 1 - Math.exp(-dt / tau);
    let moving = false;
    const els = itemRefs.current;
    for (let i = 0; i < els.length; i++) {
      const el = els[i];
      if (!el) continue;
      const target = Math.max(targetsRef.current[i] || 0, activeRef.current === i ? 1 : 0);
      const cur = currentRef.current[i] || 0;
      const next = cur + (target - cur) * k;
      const settled = Math.abs(target - next) < 0.0015;
      const value = settled ? target : next;
      currentRef.current[i] = value;
      el.style.setProperty('--effect', value.toFixed(4));
      if (!settled) moving = true;
    }
    rafRef.current = moving ? requestAnimationFrame(runFrame) : null;
  }, []);

  const startLoop = useCallback(() => {
    if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    lastRef.current = performance.now();
    rafRef.current = requestAnimationFrame(runFrame);
  }, [runFrame]);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLUListElement>) => {
      const list = listRef.current;
      if (!list) return;
      const rect = list.getBoundingClientRect();
      const pointerY = e.clientY - rect.top;
      const ease = FALLOFF_CURVES[falloff];
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        const center = el.offsetTop + el.offsetHeight / 2;
        targetsRef.current[i] = ease(Math.max(0, 1 - Math.abs(pointerY - center) / proximityRadius));
      });
      startLoop();
    },
    [falloff, proximityRadius, startLoop]
  );

  const handlePointerLeave = useCallback(() => {
    targetsRef.current = targetsRef.current.map(() => 0);
    startLoop();
  }, [startLoop]);

  // Scroll spy
  useEffect(() => {
    const sections = items.map(it => document.getElementById(it.id)).filter(Boolean) as HTMLElement[];
    if (!sections.length) return;
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const idx = items.findIndex(it => it.id === entry.target.id);
            if (idx >= 0) setActiveIndex(idx);
          }
        });
      },
      { rootMargin: '-35% 0px -55% 0px' }
    );
    sections.forEach(s => io.observe(s));
    return () => io.disconnect();
  }, [items]);

  useEffect(() => {
    startLoop();
  }, [activeIndex, startLoop]);

  useEffect(
    () => () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    },
    []
  );

  if (!isClient) return null;

  // Portalled to <body> so route-transition transforms never offset this fixed rail.
  return createPortal(
    <nav
      aria-label="On this page"
      className="pointer-events-auto fixed top-1/2 left-[max(1rem,calc((100vw-1440px)/2+0.5rem))] z-40 hidden -translate-y-1/2 [padding-left:calc(var(--marker-length)+var(--marker-gap))] xl:block"
      style={
        {
          '--accent-color': accentColor,
          '--text-color': textColor,
          '--marker-color': markerColor,
          '--marker-length': `${markerLength}px`,
          '--marker-gap': `${markerGap}px`,
          '--tick-scale': tickScale,
          '--max-shift': `${maxShift}px`,
          '--item-gap': `${itemGap}px`,
          '--font-size': `${fontSize}rem`
        } as CSSProperties
      }
    >
      <ul ref={listRef} onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave} className="m-0 flex list-none flex-col py-4 [gap:var(--item-gap)]">
        {items.map((item, index) => (
          <li
            key={item.id}
            ref={el => {
              itemRefs.current[index] = el;
            }}
            className="relative after:absolute after:top-[calc(100%+var(--item-gap)/2)] after:left-[calc(-1*var(--marker-length)-var(--marker-gap))] after:h-px after:origin-left after:opacity-50 after:content-[''] after:[background-color:var(--marker-color)] after:[transform:translateY(-50%)_scaleX(calc(0.7+var(--effect,0)*0.6))] after:[width:calc(var(--marker-length)*var(--tick-scale))] last:after:content-none"
          >
            <span
              aria-hidden="true"
              className="absolute top-1/2 left-[calc(-1*var(--marker-length)-var(--marker-gap))] h-px w-[length:var(--marker-length)] origin-left [background-color:color-mix(in_srgb,var(--accent-color)_calc(var(--effect,0)*100%),var(--marker-color))] [transform:translateY(-50%)_scaleX(calc(0.7+var(--effect,0)*0.5))]"
            />
            <button
              type="button"
              onClick={() => {
                setActiveIndex(index);
                scrollToId(item.id);
              }}
              aria-current={activeIndex === index ? 'location' : undefined}
              className="relative inline-flex cursor-pointer items-baseline border-0 bg-transparent p-0 text-left leading-[1.2] [color:color-mix(in_srgb,var(--accent-color)_calc(var(--effect,0)*100%),var(--text-color))] [font-size:var(--font-size)] [transform:translateX(calc(var(--effect,0)*var(--max-shift)))] before:absolute before:-inset-x-3 before:-inset-y-[6px] before:content-['']"
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>,
    document.body
  );
}
