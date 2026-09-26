import type { Metadata } from 'next';
import LegalArticle from '@/components/legal/LegalArticle';
import PageIntro from '@/components/sections/PageIntro';
import { criminalLaw, procedureStages } from '@/data/content/criminalLaw';

export const metadata: Metadata = {
  title: criminalLaw.metaTitle,
  description: criminalLaw.metaDescription,
  alternates: { canonical: '/criminal-law' }
};

export default function CriminalLawPage() {
  return (
    <>
      <PageIntro kicker={criminalLaw.kicker} heading={criminalLaw.heading} rotating={criminalLaw.rotating} intro={criminalLaw.intro}>
        <ol className="mt-14 grid max-w-5xl grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4" aria-label="Stages of a criminal case">
          {procedureStages.map((s, i) => (
            <li key={s.id} className="border-t border-ivory/10 pt-3">
              <span className="font-display text-[1.4rem] text-champagne/80" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="mt-1 text-[0.85rem] text-ivory/80">{s.title}</p>
            </li>
          ))}
        </ol>
      </PageIntro>
      <LegalArticle page={criminalLaw} />
    </>
  );
}
