import type { Metadata } from 'next';
import LegalArticle from '@/components/legal/LegalArticle';
import PageIntro from '@/components/sections/PageIntro';
import BorderGlow from '@/components/ui/BorderGlow';
import { bail, bailTypes } from '@/data/content/bail';

export const metadata: Metadata = { title: bail.metaTitle, description: bail.metaDescription, alternates: { canonical: '/bail' } };

export default function BailPage() {
  return (
    <>
      <PageIntro kicker={bail.kicker} heading={bail.heading} intro={bail.intro} />
      <section aria-label="Kinds of bail" className="shell pb-20">
        <ul className="grid gap-5 md:grid-cols-2">
          {bailTypes.map(t => (
            <li key={t.title}>
              <BorderGlow className="h-full">
                <div className="p-7 md:p-9">
                  <p className="text-[0.76rem] tracking-[0.05em] text-champagne-pale">{t.ref}</p>
                  <h2 className="mt-3 font-display text-[1.8rem] leading-tight">{t.title}</h2>
                  <p className="mt-4 text-[0.95rem] text-ivory/72">{t.text}</p>
                </div>
              </BorderGlow>
            </li>
          ))}
        </ul>
      </section>
      <LegalArticle page={bail} />
    </>
  );
}
