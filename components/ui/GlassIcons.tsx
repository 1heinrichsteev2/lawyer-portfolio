'use client';
/**
 * React Bits — Glass Icons (official interaction, TS + Tailwind variant).
 * Adaptations: items render as real links (mailto:, tel:, external URLs) or as
 * clearly unavailable tiles when a detail has not been supplied yet; champagne and
 * graphite gradients replace the saturated defaults; labels are always readable
 * for keyboard and touch users (not hover-only).
 */
import React from 'react';
import { cn } from '@/lib/cn';

export interface GlassIconsItem {
  icon: React.ReactElement;
  label: string;
  /** Visible caption under the tile (e.g. the email address). */
  caption?: string;
  href?: string;
  external?: boolean;
  tone?: 'champagne' | 'graphite' | 'ivory';
}

const gradientMapping: Record<string, string> = {
  champagne: 'linear-gradient(hsl(40, 45%, 62%), hsl(36, 38%, 42%))',
  graphite: 'linear-gradient(hsl(30, 4%, 30%), hsl(30, 4%, 14%))',
  ivory: 'linear-gradient(hsl(40, 30%, 88%), hsl(38, 18%, 64%))'
};

export default function GlassIcons({ items, className }: { items: GlassIconsItem[]; className?: string }) {
  return (
    <ul className={cn('flex flex-wrap gap-x-10 gap-y-12 overflow-visible', className)}>
      {items.map(item => {
        const available = Boolean(item.href);
        const inner = (
          <>
            <span
              className="absolute top-0 left-0 block h-full w-full origin-[100%_100%] rotate-[15deg] rounded-[1.1em] transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] [will-change:transform] group-hover:[transform:rotate(25deg)_translate3d(-0.5em,-0.5em,0.5em)] group-focus-visible:[transform:rotate(25deg)_translate3d(-0.5em,-0.5em,0.5em)]"
              style={{ background: gradientMapping[item.tone ?? 'champagne'], boxShadow: '0.5em -0.5em 0.75em hsla(223, 10%, 10%, 0.25)', opacity: available ? 1 : 0.35 }}
            />
            <span
              className="absolute top-0 left-0 flex h-full w-full origin-[80%_50%] transform rounded-[1.1em] bg-[hsla(0,0%,100%,0.12)] backdrop-blur-[0.75em] transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] [will-change:transform] group-hover:[transform:translate3d(0,0,2em)] group-focus-visible:[transform:translate3d(0,0,2em)]"
              style={{ boxShadow: '0 0 0 0.08em hsla(0, 0%, 100%, 0.28) inset' }}
            >
              <span className="m-auto flex h-[1.4em] w-[1.4em] items-center justify-center text-ivory" aria-hidden="true">
                {item.icon}
              </span>
            </span>
          </>
        );
        const tile = 'group relative block h-[3.6em] w-[3.6em] shrink-0 border-none bg-transparent [perspective:24em] [transform-style:preserve-3d] [-webkit-tap-highlight-color:transparent]';
        return (
          <li key={item.label} className="flex items-center gap-4 text-[1rem]">
            {available ? (
              <a
                href={item.href}
                className={tile}
                aria-label={item.label + (item.caption ? `: ${item.caption}` : '')}
                {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {inner}
              </a>
            ) : (
              <span className={cn(tile, 'cursor-not-allowed')} aria-hidden="true">
                {inner}
              </span>
            )}
            <span className="flex flex-col leading-tight">
              <span className="label">{item.label}</span>
              <span className={cn('mt-1 text-[0.95rem]', available ? 'text-ivory' : 'text-stone/70')}>
                {available ? item.caption ?? 'Open' : item.caption ?? 'Not yet available'}
              </span>
            </span>
          </li>
        );
      })}
    </ul>
  );
}
