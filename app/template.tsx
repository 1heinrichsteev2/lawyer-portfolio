'use client';
import { useEffect } from 'react';

// Module-level flag: false for the server render and the first client render (hydration),
// true afterwards. So the initial page load never animates in — content, and the hero
// image in particular, is fully visible from the first paint. Later route changes animate.
let hasMountedOnce = false;

/** Route transition — CSS only, plays on client-side navigation, never on first load. */
export default function Template({ children }: { children: React.ReactNode }) {
  const animate = hasMountedOnce;
  useEffect(() => {
    hasMountedOnce = true;
  }, []);
  return <div className={animate ? 'page-enter' : undefined}>{children}</div>;
}
