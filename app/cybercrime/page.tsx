import type { Metadata } from 'next';
import LegalArticle from '@/components/legal/LegalArticle';
import PageIntro from '@/components/sections/PageIntro';
import GlassPlaceholder from '@/components/ui/GlassPlaceholder';
import { cybercrime, cyberTopics } from '@/data/content/cybercrime';

export const metadata: Metadata = {
  title: cybercrime.metaTitle,
  description: cybercrime.metaDescription,
  alternates: { canonical: '/cybercrime' }
};

export default function CybercrimePage() {
  return (
    <>
      <PageIntro kicker={cybercrime.kicker} heading={cybercrime.heading} intro={cybercrime.intro} />
      <section aria-labelledby="cyber-topics" className="shell pb-24">
        <h2 id="cyber-topics" className="sr-only">
          Topics
        </h2>
        <div className="grid gap-5 lg:grid-cols-12">
          <GlassPlaceholder shape="panel" depth="near" className="hidden min-h-[26rem] lg:col-span-4 lg:block" label="Image to be added" />
          <ul className="grid gap-px overflow-hidden rounded-[22px] border border-ivory/[0.08] bg-ivory/[0.08] sm:grid-cols-2 lg:col-span-8">
            {cyberTopics.map(t => (
              <li key={t.title} className="bg-ink p-7" data-cursor="">
                <h3 className="font-display text-[1.45rem] leading-tight">{t.title}</h3>
                <p className="mt-3 text-[0.92rem] text-ivory/72">{t.text}</p>
                <p className="mt-4 text-[0.75rem] text-stone">{t.refs}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <LegalArticle page={cybercrime} />
    </>
  );
}
