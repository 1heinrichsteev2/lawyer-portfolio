'use client';
/**
 * React Bits — Accordion Gallery (official GSAP flex/tilt/parallax behaviour), adapted
 * for practice areas: each panel is an architectural glass bay rather than a photo,
 * the active bay reveals category, description and related topics, and a real link.
 * Below 768px it becomes a vertical disclosure list for touch.
 * An optional `image` per item can be added later and will sit behind the glass.
 */
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, Plus } from 'lucide-react';
import type { PracticeArea } from '@/data/practiceAreas';
import { useMediaQuery, usePrefersReducedMotion } from '@/lib/hooks';
import { cn } from '@/lib/cn';

type Props = {
  items: PracticeArea[];
  defaultIndex?: number;
  height?: number;
  gap?: number;
  expandRatio?: number;
  duration?: number;
  ease?: string;
  parallax?: number;
  tilt?: number;
  stagger?: number;
};

export default function PracticeAccordion({
  items,
  defaultIndex = 0,
  height = 540,
  gap = 8,
  expandRatio = 0.5,
  duration = 0.7,
  ease = 'power3.out',
  parallax = 0.5,
  tilt = 6,
  stagger = 0.05
}: Props) {
  const desktop = useMediaQuery('(min-width: 768px)', true);
  const prefersReduced = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLElement | null)[]>([]);
  const mediaRefs = useRef<(HTMLElement | null)[]>([]);
  const contentRefs = useRef<(HTMLElement | null)[]>([]);
  const railRefs = useRef<(HTMLElement | null)[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const firstRunRef = useRef(true);
  const count = items.length;
  const [active, setActive] = useState(Math.min(Math.max(defaultIndex, 0), count - 1));

  const applyLayout = useCallback(
    (animate: boolean) => {
      const panels = panelRefs.current;
      if (!panels.length) return;
      const r = Math.min(Math.max(expandRatio, 0.2), 0.9);
      const grow = count > 1 ? (r * (count - 1)) / (1 - r) : 1;
      tlRef.current?.kill();
      const dur = animate && !prefersReduced ? duration : 0;
      const tl = gsap.timeline();
      panels.forEach((panel, i) => {
        if (!panel) return;
        const isActive = i === active;
        const rot = isActive ? 0 : i < active ? tilt : -tilt;
        tl.to(panel, { flexGrow: isActive ? grow : 1, rotateY: rot, duration: dur, ease }, 0);
        const media = mediaRefs.current[i];
        if (media) {
          const drift = Math.max(-1.5, Math.min(1.5, active - i));
          tl.to(media, { xPercent: isActive ? 0 : drift * parallax * 8, duration: dur, ease }, 0);
        }
        const content = contentRefs.current[i];
        const rail = railRefs.current[i];
        if (content && rail) {
          if (isActive) {
            tl.to(rail, { autoAlpha: 0, duration: dur * 0.4, ease }, 0);
            tl.fromTo(content.children, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: dur, ease, stagger: prefersReduced ? 0 : stagger, delay: dur * 0.35 }, 0);
            tl.set(content, { autoAlpha: 1 }, 0);
          } else {
            tl.to(content, { autoAlpha: 0, duration: dur * 0.3, ease }, 0);
            tl.to(rail, { autoAlpha: 1, duration: dur * 0.6, ease, delay: dur * 0.3 }, 0);
          }
        }
      });
      tlRef.current = tl;
    },
    [active, count, expandRatio, duration, ease, tilt, parallax, stagger, prefersReduced]
  );

  useEffect(() => {
    if (!desktop) return;
    applyLayout(!firstRunRef.current);
    firstRunRef.current = false;
  }, [applyLayout, desktop]);

  useEffect(() => () => void tlRef.current?.kill(), []);

  const onKeyDown = (i: number, e: KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const n = (i + 1) % count;
      setActive(n);
      panelRefs.current[n]?.focus();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const n = (i - 1 + count) % count;
      setActive(n);
      panelRefs.current[n]?.focus();
    }
  };

  const r0 = Math.min(Math.max(expandRatio, 0.2), 0.9);
  const initialGrow = count > 1 ? (r0 * (count - 1)) / (1 - r0) : 1;

  if (!desktop) {
    return (
      <ul className="divide-y divide-ivory/[0.08] border-y border-ivory/[0.08]">
        {items.map((item, i) => {
          const open = i === active;
          return (
            <li key={item.slug}>
              <h3>
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={`pa-${item.slug}`}
                  onClick={() => setActive(open ? -1 : i)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="font-display text-[1.55rem] leading-tight">{item.title}</span>
                  <Plus aria-hidden="true" className={cn('h-5 w-5 shrink-0 text-champagne transition-transform duration-500', open && 'rotate-45')} strokeWidth={1.4} />
                </button>
              </h3>
              <div id={`pa-${item.slug}`} className={cn('grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]', open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}>
                <div className="overflow-hidden">
                  <div className="glass mb-5 rounded-[16px] p-5">
                    <span className="glass-edge" />
                    <p className="text-[0.95rem] text-ivory/80">{item.summary}</p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {item.topics.map(t => (
                        <li key={t} className="rounded-full border border-ivory/12 px-3 py-1 text-[0.78rem] text-ivory/75">
                          {t}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 text-[0.78rem] text-stone">{item.framework}</p>
                    <Link href={item.href} className="mt-4 inline-flex items-center gap-2 text-[0.88rem] text-ivory link-underline" tabIndex={open ? 0 : -1}>
                      Read about {item.title.toLowerCase()} <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
                    </Link>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <div ref={rootRef} className="flex w-full max-w-full [perspective:1600px]" style={{ gap: `${gap}px`, height: `${height}px` }} role="list" aria-label="Practice areas">
      {items.map((item, i) => {
        const isActive = i === active;
        return (
          <div
            key={item.slug}
            role="listitem"
            ref={el => {
              panelRefs.current[i] = el;
            }}
            tabIndex={0}
            data-cursor=""
            aria-current={isActive ? 'true' : undefined}
            aria-label={item.title}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onKeyDown={e => onKeyDown(i, e)}
            className="group relative min-w-0 flex-[1_1_0] cursor-pointer overflow-hidden rounded-[999px_999px_14px_14px] border border-ivory/[0.09] outline-none [transform-style:preserve-3d] focus-visible:border-champagne/70"
            style={{ willChange: 'flex-grow, transform', flexGrow: i === defaultIndex ? initialGrow : 1 }}
          >
            {/* media layer: glass depth (or a future image) */}
            <span
              ref={el => {
                mediaRefs.current[i] = el;
              }}
              aria-hidden="true"
              className="absolute inset-[-10%]"
              style={{
                background: isActive
                  ? 'radial-gradient(90% 60% at 50% 0%, rgb(200 164 93 / 0.22), transparent 60%), linear-gradient(180deg, #181716, #0e0e0e)'
                  : 'radial-gradient(80% 50% at 50% 0%, rgb(237 231 218 / 0.06), transparent 60%), linear-gradient(180deg, #141413, #0c0c0c)',
                transition: 'background 0.6s ease'
              }}
            />
            <span aria-hidden="true" className="glass absolute inset-[6px] rounded-[999px_999px_10px_10px] opacity-70" />
            <span aria-hidden="true" className="absolute inset-x-[22%] top-0 h-px bg-gradient-to-r from-transparent via-champagne/60 to-transparent" />

            {/* collapsed: vertical label */}
            <span
              ref={el => {
                railRefs.current[i] = el;
              }}
              aria-hidden="true"
              className="absolute inset-x-0 bottom-8 flex justify-center"
              style={{ visibility: i === defaultIndex ? 'hidden' : 'visible', opacity: i === defaultIndex ? 0 : 1 }}
            >
              <span className="font-display text-[1.2rem] whitespace-nowrap text-ivory/70 [writing-mode:vertical-rl] rotate-180">{item.title}</span>
            </span>

            {/* expanded content */}
            <div
              ref={el => {
                contentRefs.current[i] = el;
              }}
              className="absolute bottom-0 left-0 flex w-[min(34rem,100%)] min-w-[22rem] flex-col p-8 xl:p-10"
              style={{ visibility: i === defaultIndex ? 'visible' : 'hidden', opacity: i === defaultIndex ? 1 : 0 }}
            >
              <p className="text-[0.75rem] tracking-[0.06em] text-champagne-pale">{item.framework}</p>
              <h3 className="display display-md mt-3 max-w-md">{item.title}</h3>
              <p className="mt-4 max-w-md text-[0.95rem] text-ivory/75">{item.summary}</p>
              <ul className="mt-5 flex max-w-lg flex-wrap gap-2">
                {item.topics.map(t => (
                  <li key={t} className="rounded-full border border-ivory/12 bg-ivory/[0.03] px-3 py-1 text-[0.76rem] text-ivory/75">
                    {t}
                  </li>
                ))}
              </ul>
              <Link
                href={item.href}
                tabIndex={isActive ? 0 : -1}
                className="group/link mt-6 inline-flex w-fit items-center gap-2 text-[0.88rem] text-ivory"
              >
                <span className="link-underline">Read more</span>
                <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover/link:translate-x-1" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
