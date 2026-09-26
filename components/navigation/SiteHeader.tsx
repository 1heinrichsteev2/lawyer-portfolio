'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fullNav, primaryNav } from '@/data/navigation';
import { cn } from '@/lib/cn';
import BubbleMenu from './BubbleMenu';
import Logo from './Logo';

const ROTATIONS = [-3, 2, -2, 3, -2, 2, -3, 2, -2];

export default function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-[1001] transition-[background,border-color,backdrop-filter] duration-500',
        scrolled ? 'border-b border-ivory/[0.07] bg-[rgb(10_10_10/0.62)] backdrop-blur-xl' : 'border-b border-transparent'
      )}
    >
      <div className="shell flex h-[72px] items-center justify-between gap-6">
        <Logo />
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-8 text-[0.88rem]">
            {primaryNav.map(item => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={cn('link-underline pb-1 transition-colors', isActive(item.href) ? 'text-ivory' : 'text-ivory/65 hover:text-ivory')}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <BubbleMenu items={fullNav.map((item, i) => ({ ...item, rotation: ROTATIONS[i % ROTATIONS.length] }))} />
      </div>
    </header>
  );
}
