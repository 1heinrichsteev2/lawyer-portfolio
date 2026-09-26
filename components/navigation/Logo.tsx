import Link from 'next/link';
import { advocate } from '@/data/advocate';

/** Arch mark + name. The arch is the site's recurring architectural motif. */
export function ArchMark({ className = 'h-7 w-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 28" className={className} fill="none" aria-hidden="true">
      <path d="M2 27V12C2 6.5 6.5 2 12 2s10 4.5 10 10v15" stroke="currentColor" strokeWidth="1.2" />
      <path d="M6.5 27V13c0-3 2.5-5.5 5.5-5.5s5.5 2.5 5.5 5.5v14" stroke="#C8A45D" strokeWidth="1.2" />
      <path d="M1 27h22" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export default function Logo() {
  return (
    <Link href="/" className="group inline-flex items-center gap-3 text-ivory" aria-label={`${advocate.name}, ${advocate.designation} — home`}>
      <ArchMark className="h-7 w-6 transition-transform duration-500 group-hover:-translate-y-0.5" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.15rem] tracking-[-0.01em] sm:text-[1.25rem]">{advocate.shortName}</span>
        <span className="mt-1 text-[0.68rem] tracking-[0.08em] text-stone">{advocate.designation}</span>
      </span>
    </Link>
  );
}
