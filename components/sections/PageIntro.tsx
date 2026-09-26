'use client';
import RotatingText from '@/components/animations/RotatingText';

type Props = { kicker: string; heading: string; rotating?: string[]; intro?: string; children?: React.ReactNode };

/**
 * Inner-page opening. Entrance is CSS-only and starts on the first paint, so headings are
 * never left hidden if JavaScript is slow or fails. Rotating Text is progressive
 * enhancement: without JS the first phrase is shown.
 */
export default function PageIntro({ kicker, heading, rotating, intro, children }: Props) {
  return (
    <header className="relative overflow-hidden pt-[140px] pb-16 md:pt-[180px] md:pb-24">
      <div aria-hidden="true" className="pointer-events-none absolute -top-24 right-[-8rem] -z-10 h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle,rgb(200_164_93/0.12),transparent_62%)]" />
      <div aria-hidden="true" className="hero-rise arch pointer-events-none absolute top-24 right-[6%] -z-10 hidden h-[30rem] w-[19rem] border border-champagne/15 lg:block" style={{ animationDelay: '0.2s' }}>
        <div className="glass arch absolute inset-6 opacity-60" />
      </div>
      <div className="shell">
        <p className="label label-rule hero-rise">{kicker}</p>
        <h1 className="display display-xl hero-rise mt-7 max-w-[15ch]" style={{ animationDelay: '0.08s' }}>
          <span className="block">{heading}</span>
          {rotating && (
            <RotatingText
              texts={rotating}
              rotationInterval={2600}
              staggerDuration={0.02}
              splitBy="characters"
              transition={{ type: 'spring', damping: 30, stiffness: 260 }}
              initial={{ y: '105%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '-110%', opacity: 0 }}
              mainClassName="overflow-hidden pb-[0.12em] italic text-champagne-pale"
              splitLevelClassName="overflow-hidden pb-[0.08em]"
            />
          )}
        </h1>
        {intro && (
          <p className="lede hero-rise mt-8" style={{ animationDelay: '0.18s' }}>
            {intro}
          </p>
        )}
        {children}
      </div>
    </header>
  );
}
