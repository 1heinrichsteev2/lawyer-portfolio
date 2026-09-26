'use client';
/**
 * React Bits — Bubble Menu (official GSAP animation, TS + Tailwind variant).
 * Adaptations for production use:
 *  - Links use Next.js routing and close the menu on navigation.
 *  - Real disclosure semantics (aria-expanded/controls), Escape to close, focus moves
 *    into the menu on open, is trapped while open, and returns to the toggle on close.
 *  - A dark glass backdrop keeps the pills legible over any page.
 *  - Page scroll is locked while the menu is open.
 *  - Restrained rotations and a champagne hover state replace the playful defaults.
 */
import { useCallback, useEffect, useId, useRef, useState, type CSSProperties } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { getLenis } from '@/components/layout/SmoothScroll';
import { cn } from '@/lib/cn';

type MenuItem = { label: string; href: string; rotation?: number };

type Props = {
  items: MenuItem[];
  animationEase?: string;
  animationDuration?: number;
  staggerDelay?: number;
  footer?: React.ReactNode;
};

export default function BubbleMenu({ items, animationEase = 'back.out(1.25)', animationDuration = 0.5, staggerDelay = 0.06, footer }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const bubblesRef = useRef<HTMLAnchorElement[]>([]);
  const labelRefs = useRef<HTMLSpanElement[]>([]);
  const pathname = usePathname();
  const menuId = useId();

  const close = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const handleToggle = () => {
    const next = !isMenuOpen;
    if (next) setShowOverlay(true);
    setIsMenuOpen(next);
  };

  // Close on route change (render-phase state sync, no effect needed)
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setIsMenuOpen(false);
  }

  // Scroll lock
  useEffect(() => {
    const lenis = getLenis();
    if (isMenuOpen) {
      lenis?.stop();
      document.documentElement.style.overflow = 'hidden';
    } else {
      lenis?.start();
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Official animation sequence
  useEffect(() => {
    const overlay = overlayRef.current;
    const backdrop = backdropRef.current;
    const bubbles = bubblesRef.current.filter(Boolean);
    const labels = labelRefs.current.filter(Boolean);
    if (!overlay || !bubbles.length) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isMenuOpen) {
      gsap.set(overlay, { display: 'flex' });
      gsap.killTweensOf([...bubbles, ...labels, backdrop]);
      if (reduce) {
        gsap.set(bubbles, { scale: 1 });
        gsap.set(labels, { y: 0, autoAlpha: 1 });
        gsap.set(backdrop, { autoAlpha: 1 });
      } else {
        gsap.fromTo(backdrop, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.35, ease: 'power2.out' });
        gsap.set(bubbles, { scale: 0, transformOrigin: '50% 50%' });
        gsap.set(labels, { y: 24, autoAlpha: 0 });
        bubbles.forEach((bubble, i) => {
          const delay = i * staggerDelay + gsap.utils.random(-0.03, 0.03);
          const tl = gsap.timeline({ delay });
          tl.to(bubble, { scale: 1, duration: animationDuration, ease: animationEase });
          if (labels[i]) {
            tl.to(labels[i], { y: 0, autoAlpha: 1, duration: animationDuration, ease: 'power3.out' }, '-=' + animationDuration * 0.9);
          }
        });
      }
      const first = bubbles[0];
      window.setTimeout(() => first?.focus(), reduce ? 0 : 120);
    } else if (showOverlay) {
      gsap.killTweensOf([...bubbles, ...labels, backdrop]);
      gsap.to(labels, { y: 24, autoAlpha: 0, duration: 0.2, ease: 'power3.in' });
      gsap.to(backdrop, { autoAlpha: 0, duration: 0.25, ease: 'power2.in' });
      gsap.to(bubbles, {
        scale: 0,
        duration: 0.2,
        ease: 'power3.in',
        onComplete: () => {
          gsap.set(overlay, { display: 'none' });
          setShowOverlay(false);
        }
      });
    }
  }, [isMenuOpen, showOverlay, animationEase, animationDuration, staggerDelay]);

  // Escape + focus trap
  useEffect(() => {
    if (!isMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        close();
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== 'Tab') return;
      const focusables = [toggleRef.current, ...bubblesRef.current.filter(Boolean)].filter(Boolean) as HTMLElement[];
      const firstEl = focusables[0];
      const lastEl = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isMenuOpen, close]);

  return (
    <>
      <style>{`
        .bubble-menu-items .pill-link { transition: transform .35s cubic-bezier(.22,1,.36,1), background .3s ease, color .3s ease, border-color .3s ease; }
        @media (min-width: 900px) {
          .bubble-menu-items .pill-link { transform: rotate(var(--item-rot)); }
          .bubble-menu-items .pill-link:hover, .bubble-menu-items .pill-link:focus-visible {
            transform: rotate(var(--item-rot)) scale(1.04);
            background: var(--hover-bg) !important; color: var(--hover-color) !important;
          }
          .bubble-menu-items .pill-link:active { transform: rotate(var(--item-rot)) scale(.97); }
        }
        @media (max-width: 899px) {
          .bubble-menu-items { padding-top: 96px; padding-bottom: 32px; align-items: flex-start; }
          .bubble-menu-items .pill-list { row-gap: 10px; }
          .bubble-menu-items .pill-list .pill-col { flex: 0 0 100% !important; margin-left: 0 !important; overflow: visible; }
          .bubble-menu-items .pill-link { font-size: clamp(1.35rem, 6vw, 2rem) !important; padding: 0 !important; min-height: 60px !important; }
          .bubble-menu-items .pill-link:hover, .bubble-menu-items .pill-link:focus-visible { background: var(--hover-bg) !important; color: var(--hover-color) !important; }
        }
      `}</style>

      <button
        ref={toggleRef}
        type="button"
        onClick={handleToggle}
        aria-expanded={isMenuOpen}
        aria-controls={menuId}
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        className="menu-btn relative z-[1002] inline-flex h-11 items-center gap-3 rounded-full border border-ivory/15 bg-ivory/[0.04] pr-2 pl-4 text-[0.85rem] text-ivory backdrop-blur-md transition-colors duration-300 hover:border-champagne/50"
      >
        <span className="hidden sm:inline">{isMenuOpen ? 'Close' : 'Menu'}</span>
        <span className="grid h-8 w-8 place-items-center rounded-full bg-ivory/10" aria-hidden="true">
          <span className="relative block h-2.5 w-4">
            <span
              className="absolute left-0 block h-px w-4 bg-ivory transition-transform duration-300"
              style={{ top: 0, transform: isMenuOpen ? 'translateY(5px) rotate(45deg)' : 'none' }}
            />
            <span
              className="absolute left-0 block h-px w-4 bg-ivory transition-transform duration-300"
              style={{ bottom: 0, transform: isMenuOpen ? 'translateY(-4px) rotate(-45deg)' : 'none' }}
            />
          </span>
        </span>
      </button>

      {showOverlay && (
        <div
          id={menuId}
          ref={overlayRef}
          className="bubble-menu-items fixed inset-0 z-[1000] flex items-center justify-center overflow-y-auto"
          style={{ display: 'none' }}
        >
          <div
            ref={backdropRef}
            className="fixed inset-0 bg-[rgb(8_8_8/0.82)] backdrop-blur-xl"
            onClick={close}
            aria-hidden="true"
          />
          <nav aria-label="Site menu" className="relative w-full">
            <ul className="pill-list mx-auto m-0 flex w-full max-w-[1200px] list-none flex-wrap gap-x-0 gap-y-3 px-5 sm:px-8">
              {items.map((item, idx) => {
                const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
                return (
                  <li key={item.href} className="pill-col box-border flex items-stretch justify-center px-1.5 [flex:0_0_calc(100%/3)]">
                    <Link
                      href={item.href}
                      aria-current={active ? 'page' : undefined}
                      onClick={close}
                      className={cn(
                        'pill-link relative box-border flex w-full items-center justify-center overflow-hidden rounded-[999px] border whitespace-nowrap no-underline',
                        active ? 'border-champagne/60' : 'border-ivory/12'
                      )}
                      style={
                        {
                          ['--item-rot']: `${item.rotation ?? 0}deg`,
                          ['--hover-bg']: '#D6B56A',
                          ['--hover-color']: '#0A0A0A',
                          background: 'linear-gradient(160deg, rgb(237 231 218 / 0.09), rgb(237 231 218 / 0.03))',
                          color: '#EDE7DA',
                          minHeight: 'clamp(84px, 13vh, 132px)',
                          fontSize: 'clamp(1.5rem, 3.1vw, 2.9rem)',
                          fontFamily: 'var(--font-display)',
                          willChange: 'transform'
                        } as CSSProperties
                      }
                      ref={el => {
                        if (el) bubblesRef.current[idx] = el;
                      }}
                    >
                      <span
                        className="pill-label inline-block"
                        style={{ willChange: 'transform, opacity', lineHeight: 1.2 }}
                        ref={el => {
                          if (el) labelRefs.current[idx] = el;
                        }}
                      >
                        {item.label}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            {footer ? <div className="mx-auto mt-8 max-w-[1200px] px-6 sm:px-10">{footer}</div> : null}
          </nav>
        </div>
      )}
    </>
  );
}
