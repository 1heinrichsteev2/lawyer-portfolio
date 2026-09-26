'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useSyncExternalStore } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { site } from '@/data/site';
import { getLenis } from '@/components/layout/SmoothScroll';

const KEY = 'advocate-disclaimer-acknowledged-v1';

const listeners = new Set<() => void>();
const subscribe = (cb: () => void) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};
const readAck = () => {
  try {
    return window.localStorage.getItem(KEY) === 'yes';
  } catch {
    return false;
  }
};
let memoryAck = false;

/**
 * First-visit acknowledgement, a common practice on Indian advocates' websites given
 * Bar Council of India Rule 36. The visitor confirms they are seeking information of
 * their own accord. Stored in localStorage only — nothing is sent anywhere.
 * Not shown on the disclaimer and privacy pages so they can always be read first.
 */
export default function DisclaimerGate({ ready }: { ready: boolean }) {
  const pathname = usePathname();
  const acknowledged = useSyncExternalStore(subscribe, () => memoryAck || readAck(), () => true);
  const exempt = pathname === '/disclaimer' || pathname === '/privacy';
  const open = site.requireDisclaimerAcknowledgement && ready && !exempt && !acknowledged;
  const agreeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = getLenis();
    if (open) {
      lenis?.stop();
      document.documentElement.style.overflow = 'hidden';
      const t = window.setTimeout(() => agreeRef.current?.focus(), 50);
      const onKey = (e: KeyboardEvent) => {
        if (e.key !== 'Tab' || !dialogRef.current) return;
        const nodes = dialogRef.current.querySelectorAll<HTMLElement>('a[href], button');
        if (!nodes.length) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      };
      document.addEventListener('keydown', onKey);
      return () => {
        window.clearTimeout(t);
        document.removeEventListener('keydown', onKey);
      };
    } else {
      lenis?.start();
      document.documentElement.style.overflow = '';
    }
  }, [open]);

  const agree = () => {
    try {
      window.localStorage.setItem(KEY, 'yes');
    } catch {
      /* storage unavailable: acknowledgement lasts for this page view */
    }
    memoryAck = true;
    listeners.forEach(l => l());
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[1500] flex items-end justify-center p-4 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className="absolute inset-0 bg-[rgb(6_6_6/0.78)] backdrop-blur-md" aria-hidden="true" />
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="gate-title"
            aria-describedby="gate-body"
            className="glass relative max-h-[88vh] w-full max-w-[36rem] overflow-y-auto rounded-[22px] bg-carbon/80 p-6 sm:p-9"
            initial={{ y: 24, opacity: 0, filter: 'blur(6px)' }}
            animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
            exit={{ y: 12, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="glass-edge" />
            <h2 id="gate-title" className="display display-sm">
              Before you continue
            </h2>
            <div id="gate-body" className="mt-4 space-y-3 text-[0.93rem] leading-relaxed text-ivory/78">
              <p>
                The Bar Council of India does not permit advocates to solicit work or advertise. By continuing, you acknowledge
                that:
              </p>
              <ul className="list-disc space-y-1.5 pl-5 marker:text-champagne/70">
                <li>you are seeking information about the advocate of your own accord;</li>
                <li>there has been no advertisement, solicitation or inducement of any kind;</li>
                <li>the information here is general, is not legal advice, and does not create an advocate–client relationship.</li>
              </ul>
            </div>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <button
                ref={agreeRef}
                type="button"
                onClick={agree}
                className="inline-flex h-11 items-center rounded-full bg-ivory px-6 text-[0.9rem] font-medium text-ink transition-colors hover:bg-[#f6f1e6]"
              >
                I agree, continue
              </button>
              <Link href="/disclaimer" className="link-underline text-[0.9rem] text-ivory/80 hover:text-ivory">
                Read the full disclaimer
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
