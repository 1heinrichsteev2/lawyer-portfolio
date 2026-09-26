'use client';
import dynamic from 'next/dynamic';
import { memo, useCallback, useState } from 'react';
import CursorTrailFallback from './CursorTrailFallback';
import { useFinePointer, useMediaQuery, usePrefersReducedMotion } from '@/lib/hooks';

const SplashCursor = dynamic(() => import('./SplashCursor'), { ssr: false });

// Stable references so the WebGL effect is created exactly once.
const BACK = { r: 0, g: 0, b: 0 };
const PALETTE = ['#C8A45D', '#EDE7DA', '#D6B56A', '#F4EFE4'];

/** Mounts the splash trail only on desktop-class fine pointers, never with reduced motion. */
function CursorLayer() {
  const fine = useFinePointer();
  const wide = useMediaQuery('(min-width: 1024px)');
  const reduce = usePrefersReducedMotion();
  const [webglFailed, setWebglFailed] = useState(false);
  const handleFail = useCallback(() => setWebglFailed(true), []);
  if (!fine || !wide || reduce) return null;
  // WebGL could not start (or the context was lost): a light CSS trail instead — never a broken canvas.
  if (webglFailed) return <CursorTrailFallback />;
  return (
    <SplashCursor
      onFail={handleFail}
      SIM_RESOLUTION={96}
      DYE_RESOLUTION={768}
      DENSITY_DISSIPATION={4.2}
      VELOCITY_DISSIPATION={2.4}
      PRESSURE={0.12}
      PRESSURE_ITERATIONS={14}
      CURL={2}
      SPLAT_RADIUS={0.14}
      SPLAT_FORCE={3200}
      SHADING={false}
      COLOR_UPDATE_SPEED={3}
      BACK_COLOR={BACK}
      TRANSPARENT
      RAINBOW_MODE={false}
      PALETTE={PALETTE}
      IDLE_TIMEOUT={2400}
      HOVER_BOOST={1.8}
    />
  );
}

export default memo(CursorLayer);
