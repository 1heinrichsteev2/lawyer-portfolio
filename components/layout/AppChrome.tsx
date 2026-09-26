'use client';
import { useEffect, useState, type ReactNode } from 'react';
import CursorLayer from '@/components/animations/CursorLayer';
import DisclaimerGate from '@/components/legal/DisclaimerGate';
import SiteHeader from '@/components/navigation/SiteHeader';
import { IntroContext } from './IntroContext';
import Loader from './Loader';
import SmoothScroll from './SmoothScroll';

/**
 * Client shell. The intro loader is shown only when the inline head script marked this
 * load with <html data-intro="play"> (first page of a session). Otherwise it is display:none
 * from the very first paint, so the hero is never covered on refresh or return visits.
 */
export default function AppChrome({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    const playing = root.getAttribute('data-intro') === 'play';
    const hide = window.setTimeout(() => setLoading(false), playing ? 1250 : 0);
    const cleanup = window.setTimeout(() => root.removeAttribute('data-intro'), playing ? 1400 : 0);
    return () => {
      window.clearTimeout(hide);
      window.clearTimeout(cleanup);
    };
  }, []);

  return (
    <IntroContext.Provider value={!loading}>
      <Loader />
      <SmoothScroll />
      <SiteHeader />
      {children}
      <CursorLayer />
      <DisclaimerGate ready={!loading} />
      <div className="grain" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
    </IntroContext.Provider>
  );
}
