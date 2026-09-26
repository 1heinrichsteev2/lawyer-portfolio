'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import LinkButton from '@/components/ui/LinkButton';
import { advocate } from '@/data/advocate';
import { images } from '@/data/images';

/**
 * Homepage hero. The supplied artwork IS the hero: it already carries the headline,
 * so no text is overlaid on it.
 *
 * Visibility guarantees (the image never depends on JavaScript to appear):
 *  - The frame has a CSS aspect-ratio, so it always has real height before the image loads.
 *  - The image is server-rendered with `priority` (eager, preloaded).
 *  - Entrance effects are CSS keyframes that START from a visible state (a slight
 *    scale and a light sweep). No opacity:0, visibility:hidden or clip-path starting state.
 *  - Motion only adds scroll parallax, which is at rest (0) on the server and before hydration.
 *
 * Responsive:
 *  - ≥768px: the full composition at its native 2048:682 ratio, edge to edge. Nothing is cropped.
 *  - <768px: a portrait crop centred on the advocate; the headline from the right half of
 *    the artwork is then set as real text beneath it (only on mobile, so it is never duplicated).
 */
export default function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const artY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '8%']);
  const stripY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -40]);
  const hero = images.hero;

  return (
    <section ref={ref} aria-label="Introduction" className="relative pt-[72px]">
      {/* ——— Artwork frame ——— */}
      <div className="hero-frame relative w-full overflow-hidden bg-[#efe9df]">
        <motion.div className="absolute inset-0" style={{ y: artY }}>
          <div className="hero-settle absolute inset-0">
            <Image
              src={hero.src}
              alt={hero.alt}
              fill
              priority
              quality={90}
              sizes="100vw"
              className="hero-img object-cover"
              style={{ ['--hero-focus' as string]: `${hero.focusX ?? 50}%` }}
            />
          </div>
        </motion.div>

        {/* one-time light sweep — a transparent gradient band, never a cover */}
        <div aria-hidden="true" className="hero-sweep pointer-events-none absolute inset-y-0 left-0 w-1/3" />
        {/* thin gold hairline where artwork meets the dark page */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-champagne/60 to-transparent" />

        {/* The artwork's painted "Consult us" button becomes a real, keyboard-focusable link (≥768px). */}
        <Link
          href="/contact"
          aria-label="Consult: view contact information"
          className="absolute hidden rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne md:block"
          style={{ left: '71.1%', top: '75%', width: '11.8%', height: '10.8%' }}
        />
      </div>

      {/* ——— Mobile: headline as real text (it is cropped out of the portrait crop) ——— */}
      <div className="shell pt-10 md:hidden">
        <p className="hero-rise font-display text-[1.6rem] italic text-champagne-pale" style={{ animationDelay: '0.1s' }}>
          Welcome
        </p>
        <h1 className="hero-rise display mt-2 text-[2.5rem] leading-[1.02]" style={{ animationDelay: '0.2s' }}>
          Where your questions meet legal clarity
        </h1>
        <p className="hero-rise lede mt-5" style={{ animationDelay: '0.3s' }}>
          Practical legal solutions for creators, professionals and individuals.
        </p>
      </div>
      {/* ≥768px the heading is in the artwork; keep it in the document outline for screen readers and search. */}
      <h1 className="sr-only hidden md:block">Where your questions meet legal clarity</h1>

      {/* ——— Floating glass strip (overlaps the artwork's lower edge on larger screens) ——— */}
      <motion.div style={{ y: stripY }} className="shell relative z-10 mt-8 md:-mt-6 lg:-mt-8">
        <div className="hero-rise glass rounded-[22px] bg-carbon/70 p-6 sm:p-8" style={{ animationDelay: '0.35s' }}>
          <span className="glass-edge" />
          <div className="grid items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="hero-track text-[0.74rem] tracking-[0.2em] text-champagne-pale">ADVOCATE • CRIMINAL LAW &amp; LITIGATION</p>
              <p className="mt-3 max-w-md text-[0.95rem] text-ivory/75">
                Legal information and professional representation across criminal matters and related disputes.
              </p>
            </div>
            <dl className="grid grid-cols-2 gap-6 text-[0.8rem] lg:col-span-3">
              <div>
                <dt className="text-stone">Enrolment</dt>
                <dd className="mt-1 text-ivory/90">{advocate.enrolmentNumber}</dd>
              </div>
              <div>
                <dt className="text-stone">Courts</dt>
                <dd className="mt-1 text-ivory/90">{advocate.courts}</dd>
              </div>
            </dl>
            <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
              <LinkButton href="/practice">View practice areas</LinkButton>
              <LinkButton href="/contact" variant="ghost">
                Contact information
              </LinkButton>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
