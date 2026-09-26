import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/cn';
import Magnetic from '@/components/animations/Magnetic';

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: 'solid' | 'ghost' | 'text';
  className?: string;
  external?: boolean;
};

/** Compact button: subtle magnetic pull, border light, arrow travel. */
export default function LinkButton({ href, children, variant = 'solid', className, external }: Props) {
  const styles =
    variant === 'solid'
      ? 'bg-ivory text-ink hover:bg-[#f6f1e6] shadow-[0_0_0_1px_rgb(237_231_218/0.2),0_12px_30px_-12px_rgb(200_164_93/0.45)]'
      : variant === 'ghost'
        ? 'text-ivory border border-ivory/20 bg-ivory/[0.03] hover:border-champagne/60 hover:bg-ivory/[0.06] backdrop-blur-md'
        : 'text-ivory px-0! h-auto! link-underline';
  const cls = cn(
    'group inline-flex h-11 items-center gap-3 rounded-full px-5 text-[0.9rem] font-medium tracking-[0.01em] transition-[background,border-color,color,box-shadow] duration-300',
    styles,
    className
  );
  const arrow = (
    <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1" strokeWidth={1.6} />
  );
  const content = (
    <>
      <span>{children}</span>
      {variant !== 'text' && arrow}
    </>
  );
  const el = external ? (
    <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
      {content}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {content}
    </Link>
  );
  return variant === 'text' ? el : <Magnetic>{el}</Magnetic>;
}
