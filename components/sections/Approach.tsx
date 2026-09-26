'use client';
import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import BlurText from '@/components/animations/BlurText';
import TrueFocus from '@/components/animations/TrueFocus';
import BorderGlow from '@/components/ui/BorderGlow';
import HoldButton from '@/components/ui/HoldButton';
import { neverPromised, principles } from '@/data/approach';

export default function Approach() {
  const [revealed, setRevealed] = useState(false);
  return (
    <section aria-labelledby="approach-heading" className="relative overflow-hidden py-28 md:py-40">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-1/3 -z-10 h-[30rem] bg-[radial-gradient(ellipse_at_center,rgb(200_164_93/0.08),transparent_65%)]" />
      <div className="shell">
        <BlurText as="p" text="Approach to legal practice" className="label label-rule" />
        <h2 id="approach-heading" className="sr-only">
          Approach to legal practice
        </h2>
        <TrueFocus
          as="div"
          sentence="Composure. Precision. Candour."
          wordClassName="display display-xl text-ivory"
          className="mt-10"
          blurAmount={5}
          animationDuration={0.7}
          pauseBetweenAnimations={1.6}
        />

        <ul className="mt-20 grid gap-5 md:grid-cols-3">
          {principles.map(p => (
            <li key={p.title}>
              <BorderGlow className="h-full" borderRadius={18}>
                <div className="p-7 md:p-8">
                  <h3 className="font-display text-[1.7rem] leading-none">{p.title}</h3>
                  <p className="mt-4 text-[0.95rem] text-ivory/72">{p.text}</p>
                </div>
              </BorderGlow>
            </li>
          ))}
        </ul>

        <div className="mt-16 grid items-start gap-8 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="text-[0.95rem] text-ivory/75">Some things no advocate can honestly offer. Hold the button to read them.</p>
            <div className="mt-6">
              <HoldButton
                holdTime={1400}
                backgroundColor="#1b1a18"
                fillColor="#D6B56A"
                textColor="#EDE7DA"
                fillTextColor="#0A0A0A"
                radius={999}
                resetAfter={0}
                doneLabel="Shown below"
                onHold={() => setRevealed(true)}
              >
                Hold to read what is never promised
              </HoldButton>
            </div>
          </div>
          <div className="md:col-span-7" aria-live="polite">
            <AnimatePresence>
              {revealed && (
                <motion.ul
                  className="glass space-y-3 rounded-[18px] p-7"
                  initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="glass-edge" />
                  {neverPromised.map(item => (
                    <li key={item} className="flex gap-3 text-[0.95rem] text-ivory/85">
                      <span aria-hidden="true" className="mt-[0.7em] h-px w-4 shrink-0 bg-champagne" />
                      {item}
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
            {!revealed && (
              <div aria-hidden="true" className="glass flex h-full min-h-[11rem] items-center rounded-[18px] p-7 text-[0.85rem] text-stone">
                <span className="glass-edge" />
                Four statements, kept behind glass until you ask for them.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
