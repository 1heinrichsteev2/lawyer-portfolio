'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import BlurText from '@/components/animations/BlurText';
import { procedureStages } from '@/data/content/criminalLaw';
import { useMediaQuery } from '@/lib/hooks';

/**
 * The criminal-law focus: eight procedural stages in order. On large screens the section
 * pins and the stages travel horizontally with scroll; elsewhere it is a vertical list.
 * Numbering is used here because the stages genuinely are a sequence.
 */
export default function ProcedureTimeline() {
  const wide = useMediaQuery('(min-width: 1024px)', true);
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const trackRef = useRef<HTMLOListElement>(null);
  const [distance, setDistance] = useState(0);
  const x = useTransform(scrollYProgress, [0.05, 0.95], [0, -distance]);
  const bar = useTransform(scrollYProgress, [0.05, 0.95], [0, 1]);
  const pinned = wide && !reduce;

  useEffect(() => {
    const track = trackRef.current;
    if (!pinned || !track) return;
    const measure = () => {
      const viewport = track.parentElement?.clientWidth ?? window.innerWidth;
      setDistance(Math.max(0, track.scrollWidth - viewport));
    };
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [pinned]);

  const header = (
    <div className="max-w-2xl">
      <BlurText as="p" text="Criminal-law focus" className="label label-rule" />
      <h2 id="procedure-heading" className="display display-lg mt-6">
        From first information to final remedy.
      </h2>
      <p className="lede mt-6">
        The stages a criminal case usually passes through under the BNSS. Each has its own safeguards and time limits.
      </p>
    </div>
  );

  const card = (s: (typeof procedureStages)[number], i: number) => (
    <article key={s.id} className="glass relative flex h-full flex-col rounded-[18px] p-7" data-cursor="">
      <span className="glass-edge" />
      <span className="font-display text-[3.2rem] leading-none text-champagne/80" aria-hidden="true">
        {String(i + 1).padStart(2, '0')}
      </span>
      <h3 className="mt-6 font-display text-[1.6rem] leading-tight">
        <span className="sr-only">Stage {i + 1}: </span>
        {s.title}
      </h3>
      <p className="mt-3 text-[0.93rem] text-ivory/72">{s.text}</p>
      <p className="mt-auto pt-6 text-[0.76rem] tracking-[0.04em] text-stone">{s.ref}</p>
    </article>
  );

  if (!pinned) {
    return (
      <section ref={ref} aria-labelledby="procedure-heading" className="shell py-28">
        {header}
        <ol className="mt-14 grid gap-4 sm:grid-cols-2">
          {procedureStages.map((s, i) => (
            <li key={s.id}>{card(s, i)}</li>
          ))}
        </ol>
        <Link href="/criminal-law" className="link-underline mt-10 inline-block text-[0.95rem] text-ivory">
          Read the full criminal-law overview
        </Link>
      </section>
    );
  }

  return (
    <section ref={ref} aria-labelledby="procedure-heading" className="relative h-[320vh]">
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <div className="shell">{header}</div>
        <div className="shell mt-14">
          <motion.ol ref={trackRef} className="flex w-max gap-5" style={{ x }}>
            {procedureStages.map((s, i) => (
              <li key={s.id} className="w-[22rem] shrink-0 xl:w-[24rem]">
                {card(s, i)}
              </li>
            ))}
            <li className="flex w-[22rem] shrink-0 items-center">
              <Link href="/criminal-law" className="group inline-flex items-center gap-3 font-display text-[2rem] text-ivory">
                <span className="link-underline">Read the full overview</span>
              </Link>
            </li>
          </motion.ol>
        </div>
        <div className="shell mt-12">
          <div className="relative h-px w-full bg-ivory/10">
            <motion.div className="absolute inset-y-0 left-0 w-full origin-left bg-champagne/70" style={{ scaleX: bar }} />
          </div>
        </div>
      </div>
    </section>
  );
}
