import Link from 'next/link';
import { cn } from '@/lib/cn';

/** Inline general-information notice used on every legal content page. */
export default function LegalNote({ className }: { className?: string }) {
  return (
    <aside className={cn('glass rounded-[14px] px-5 py-4 text-[0.88rem] leading-relaxed text-ivory/75', className)} aria-label="Legal information notice">
      <span className="glass-edge" />
      This page gives general information about the law in India. It is not legal advice, and reading it does not create an
      advocate–client relationship. Laws and procedures change, and outcomes depend on the facts of each case. Please read the{' '}
      <Link href="/disclaimer" className="link-underline text-ivory">
        full disclaimer
      </Link>
      .
    </aside>
  );
}
