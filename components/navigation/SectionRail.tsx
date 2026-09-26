'use client';

/* eslint-disable react-hooks/immutability --
   Vendored React Bits implementation kept faithful to the official source.
   Refs are only read inside event handlers, effects and animation frames.
*/

/**
 * React Bits — Line Sidebar
 *
 * Adapted as a page section indicator.
 *
 * Improvements:
 * - Portalled to <body> so route-transition transforms never offset the rail.
 * - Active item follows scroll position.
 * - Items are real buttons that scroll to their sections.
 * - Hidden below 1280px so it never crowds content.
 * - IMPORTANT: The rail is only visible while the legal article itself
 *   is visible in the viewport. This prevents the rail from overlapping
 *   PageIntro / hero headings.
 */

import {
  useRef,
  useState,
  useCallback,
  useEffect,
  useSyncExternalStore,
  type CSSProperties
} from 'react';

import { createPortal } from 'react-dom';
import { scrollToId } from '@/components/layout/SmoothScroll';

type Falloff = 'linear' | 'smooth' | 'sharp';

const FALLOFF_CURVES: Record<
  Falloff,
  (p: number) => number
> = {
  linear: p => p,
  smooth: p => p * p * (3 - 2 * p),
  sharp: p => p * p * p
};

export type RailItem = {
  id: string;
  label: string;
};

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

  const itemRefs = useRef<
    (HTMLLIElement | null)[]
  >([]);

  const targetsRef = useRef<number[]>([]);
  const currentRef = useRef<number[]>([]);
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef(0);

  const activeRef = useRef<number | null>(0);

  const smoothingRef = useRef(smoothing);

  const [activeIndex, setActiveIndex] =
    useState<number>(0);

  /**
   * Controls whether the sidebar is currently visible.
   *
   * It starts hidden because the PageIntro / hero area should not
   * have the sidebar labels sitting over the main heading.
   */
  const [isArticleVisible, setIsArticleVisible] =
    useState(false);

  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  /**
   * Keep animation refs synchronized with React state.
   */
  useEffect(() => {
    activeRef.current = activeIndex;
    smoothingRef.current = smoothing;
  }, [activeIndex, smoothing]);

  /**
   * React Bits proximity animation.
   */
  const runFrame = useCallback((now: number) => {
    const dt = Math.min(
      (now - lastRef.current) / 1000,
      0.05
    );

    lastRef.current = now;

    const tau =
      Math.max(smoothingRef.current, 1) / 1000;

    const k = 1 - Math.exp(-dt / tau);

    let moving = false;

    const els = itemRefs.current;

    for (let i = 0; i < els.length; i++) {
      const el = els[i];

      if (!el) continue;

      const target = Math.max(
        targetsRef.current[i] || 0,
        activeRef.current === i ? 1 : 0
      );

      const cur = currentRef.current[i] || 0;

      const next =
        cur + (target - cur) * k;

      const settled =
        Math.abs(target - next) < 0.0015;

      const value = settled
        ? target
        : next;

      currentRef.current[i] = value;

      el.style.setProperty(
        '--effect',
        value.toFixed(4)
      );

      if (!settled) {
        moving = true;
      }
    }

    rafRef.current = moving
      ? requestAnimationFrame(runFrame)
      : null;
  }, []);

  const startLoop = useCallback(() => {
    if (rafRef.current != null) {
      cancelAnimationFrame(
        rafRef.current
      );
    }

    lastRef.current =
      performance.now();

    rafRef.current =
      requestAnimationFrame(runFrame);
  }, [runFrame]);

  /**
   * Proximity interaction.
   */
  const handlePointerMove =
    useCallback(
      (
        e: React.PointerEvent<HTMLUListElement>
      ) => {
        const list = listRef.current;

        if (!list) return;

        const rect =
          list.getBoundingClientRect();

        const pointerY =
          e.clientY - rect.top;

        const ease =
          FALLOFF_CURVES[falloff];

        itemRefs.current.forEach(
          (el, i) => {
            if (!el) return;

            const center =
              el.offsetTop +
              el.offsetHeight / 2;

            targetsRef.current[i] =
              ease(
                Math.max(
                  0,
                  1 -
                    Math.abs(
                      pointerY - center
                    ) /
                      proximityRadius
                )
              );
          }
        );

        startLoop();
      },
      [
        falloff,
        proximityRadius,
        startLoop
      ]
    );

  const handlePointerLeave =
    useCallback(() => {
      targetsRef.current =
        targetsRef.current.map(
          () => 0
        );

      startLoop();
    }, [startLoop]);

  /**
   * ---------------------------------------------------------
   * ARTICLE VISIBILITY
   * ---------------------------------------------------------
   *
   * The SectionRail contains links to the sections of the
   * LegalArticle.
   *
   * We observe those actual sections.
   *
   * When none of them is visible:
   *
   *     PageIntro / hero → rail hidden
   *
   * When at least one section is visible:
   *
   *     Legal article → rail visible
   *
   * This prevents the sidebar labels from sitting on top of
   * large PageIntro headings such as:
   *
   * "Offences that leave a digital trail"
   */
  useEffect(() => {
    const sections = items
  .filter(item => item.id !== 'references')
  .map(item =>
    document.getElementById(item.id)
  )
  .filter(
    Boolean
  ) as HTMLElement[];

    if (!sections.length) {
      setIsArticleVisible(false);
      return;
    }

    const visibleSections =
      new Set<string>();

    const updateVisibility = () => {
      setIsArticleVisible(
        visibleSections.size > 0
      );
    };

    const observer =
      new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            const id =
              (entry.target as HTMLElement)
                .id;

            if (entry.isIntersecting) {
              visibleSections.add(id);
            } else {
              visibleSections.delete(id);
            }
          });

          updateVisibility();
        },
        {
          /*
           * Small inset keeps the rail from appearing too early
           * while a section is only barely touching the viewport.
           */
          rootMargin:
            '-12% 0px -12% 0px',
          threshold: 0
        }
      );

    sections.forEach(section => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
      visibleSections.clear();
    };
  }, [items]);

  /**
   * ---------------------------------------------------------
   * ACTIVE SECTION SCROLL SPY
   * ---------------------------------------------------------
   */
  useEffect(() => {
    const sections = items
      .map(item =>
        document.getElementById(item.id)
      )
      .filter(
        Boolean
      ) as HTMLElement[];

    if (!sections.length) return;

    const io =
      new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const idx =
                items.findIndex(
                  item =>
                    item.id ===
                    entry.target.id
                );

              if (idx >= 0) {
                setActiveIndex(idx);
              }
            }
          });
        },
        {
          rootMargin:
            '-35% 0px -55% 0px'
        }
      );

    sections.forEach(section => {
      io.observe(section);
    });

    return () => {
      io.disconnect();
    };
  }, [items]);

  /**
   * Restart proximity animation whenever
   * active section changes.
   */
  useEffect(() => {
    startLoop();
  }, [activeIndex, startLoop]);

  /**
   * Cleanup animation frame.
   */
  useEffect(
    () => () => {
      if (rafRef.current != null) {
        cancelAnimationFrame(
          rafRef.current
        );
      }
    },
    []
  );

  /**
   * Don't render anything during SSR.
   */
  if (!isClient) {
    return null;
  }

  /**
   * Portalled to <body>.
   *
   * This prevents route-transition transforms,
   * filters and other page stacking contexts
   * from offsetting the fixed sidebar.
   */
  return createPortal(
    <nav
      aria-label="On this page"
      aria-hidden={!isArticleVisible}
      className={[
        'pointer-events-auto fixed top-1/2',
        'left-[max(1rem,calc((100vw-1440px)/2+0.5rem))]',
        'z-40 hidden -translate-y-1/2',
        '[padding-left:calc(var(--marker-length)+var(--marker-gap))]',
        'xl:block',
        'transition-opacity duration-500 ease-out',
        isArticleVisible
          ? 'opacity-100'
          : 'pointer-events-none opacity-0'
      ].join(' ')}
      style={
        {
          '--accent-color':
            accentColor,

          '--text-color':
            textColor,

          '--marker-color':
            markerColor,

          '--marker-length':
            `${markerLength}px`,

          '--marker-gap':
            `${markerGap}px`,

          '--tick-scale':
            tickScale,

          '--max-shift':
            `${maxShift}px`,

          '--item-gap':
            `${itemGap}px`,

          '--font-size':
            `${fontSize}rem`
        } as CSSProperties
      }
    >
      <ul
        ref={listRef}
        onPointerMove={
          handlePointerMove
        }
        onPointerLeave={
          handlePointerLeave
        }
        className="m-0 flex list-none flex-col py-4 [gap:var(--item-gap)]"
      >
        {items.map(
          (item, index) => (
            <li
              key={item.id}
              ref={el => {
                itemRefs.current[index] =
                  el;
              }}
              className="
                relative
                after:absolute
                after:top-[calc(100%+var(--item-gap)/2)]
                after:left-[calc(-1*var(--marker-length)-var(--marker-gap))]
                after:h-px
                after:origin-left
                after:opacity-50
                after:content-['']
                after:[background-color:var(--marker-color)]
                after:[transform:translateY(-50%)_scaleX(calc(0.7+var(--effect,0)*0.6))]
                after:[width:calc(var(--marker-length)*var(--tick-scale))]
                last:after:content-none
              "
            >
              <span
                aria-hidden="true"
                className="
                  absolute
                  top-1/2
                  left-[calc(-1*var(--marker-length)-var(--marker-gap))]
                  h-px
                  w-[length:var(--marker-length)]
                  origin-left
                  [background-color:color-mix(in_srgb,var(--accent-color)_calc(var(--effect,0)*100%),var(--marker-color))]
                  [transform:translateY(-50%)_scaleX(calc(0.7+var(--effect,0)*0.5))]
                "
              />

              <button
                type="button"
                onClick={() => {
                  setActiveIndex(index);
                  scrollToId(item.id);
                }}
                aria-current={
                  activeIndex === index
                    ? 'location'
                    : undefined
                }
                className="
                  relative
                  inline-flex
                  cursor-pointer
                  items-baseline
                  border-0
                  bg-transparent
                  p-0
                  text-left
                  leading-[1.2]
                  [color:color-mix(in_srgb,var(--accent-color)_calc(var(--effect,0)*100%),var(--text-color))]
                  [font-size:var(--font-size)]
                  [transform:translateX(calc(var(--effect,0)*var(--max-shift)))]
                  before:absolute
                  before:-inset-x-3
                  before:-inset-y-[6px]
                  before:content-['']
                "
              >
                {item.label}
              </button>
            </li>
          )
        )}
      </ul>
    </nav>,
    document.body
  );
}