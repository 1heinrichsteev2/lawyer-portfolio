'use client';
import { useSyncExternalStore } from 'react';

function subscribeMedia(query: string) {
  return (callback: () => void) => {
    if (typeof window === 'undefined') return () => {};
    const mql = window.matchMedia(query);
    mql.addEventListener('change', callback);
    return () => mql.removeEventListener('change', callback);
  };
}

/** SSR-safe media query. Returns `serverValue` during SSR/hydration. */
export function useMediaQuery(query: string, serverValue = false) {
  return useSyncExternalStore(
    subscribeMedia(query),
    () => window.matchMedia(query).matches,
    () => serverValue
  );
}

export const usePrefersReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)');
/** A precise pointer (mouse/trackpad) that can hover — i.e. not touch-first devices. */
export const useFinePointer = () => useMediaQuery('(hover: hover) and (pointer: fine)');
