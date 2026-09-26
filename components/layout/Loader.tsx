import { ArchMark } from '@/components/navigation/Logo';
import { advocate } from '@/data/advocate';

/**
 * Initial intro (first page of a session only — see the inline script in app/layout.tsx).
 * Entirely CSS-driven and timed from the first paint: the arch fades in, a hairline runs,
 * then the panel lifts away at ~1.2s. It never waits for JavaScript, so it can't linger.
 */
export default function Loader() {
  return (
    <div className="site-loader fixed inset-0 z-[2000] items-center justify-center bg-ink" aria-hidden="true">
      <div className="loader-inner flex flex-col items-center">
        <ArchMark className="h-14 w-12 text-ivory" />
        <p className="mt-6 font-display text-[1.15rem] text-ivory/85">{advocate.name}</p>
        <div className="relative mt-5 h-px w-40 overflow-hidden bg-ivory/10">
          <span className="loader-bar absolute inset-y-0 left-0 w-full origin-left bg-gradient-to-r from-champagne/0 via-champagne to-champagne-pale" />
        </div>
      </div>
    </div>
  );
}
