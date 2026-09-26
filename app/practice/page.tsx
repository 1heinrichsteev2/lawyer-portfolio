import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import LegalNote from '@/components/legal/LegalNote';
import PageIntro from '@/components/sections/PageIntro';
import PracticeAccordion from '@/components/sections/PracticeAccordion';
import BorderGlow from '@/components/ui/BorderGlow';
import { offeredPracticeAreas } from '@/data/practiceAreas';

export const metadata: Metadata = {
  title: 'Practice areas',
  description: 'Informational overview of criminal defence, bail, complaints, cybercrime, fraud, property-related, financial and trial matters.',
  alternates: { canonical: '/practice' }
};

const guides = [
  { href: '/criminal-law', title: 'Criminal law', text: 'FIR, investigation, arrest, evidence, trial and remedies.' },
  { href: '/bail', title: 'Bail and anticipatory bail', text: 'Regular, anticipatory and default bail under the BNSS.' },
  { href: '/cybercrime', title: 'Cybercrime', text: 'Online fraud, identity offences and digital evidence.' },
  { href: '/other-matters', title: 'Other matters', text: 'Cheating, breach of trust, property and connected litigation.' }
];

export default function PracticePage() {
  const areas = offeredPracticeAreas();
  return (
    <>
      <PageIntro
        kicker="Practice areas"
        heading="Areas of legal work"
        intro="The categories below describe the kinds of matters handled. They are informational, and are not a claim of specialisation or of any result."
      />
      <section aria-label="Practice areas" className="shell pb-24">
        <PracticeAccordion items={areas} height={580} />
      </section>

      <section aria-labelledby="guides-heading" className="shell pb-16">
        <h2 id="guides-heading" className="display display-md">
          Read the guides
        </h2>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2">
          {guides.map(g => (
            <li key={g.href}>
              <BorderGlow className="h-full">
                <Link href={g.href} className="group flex h-full items-end justify-between gap-6 p-7 md:p-9">
                  <span>
                    <span className="block font-display text-[1.8rem] leading-tight">{g.title}</span>
                    <span className="mt-2 block text-[0.92rem] text-ivory/70">{g.text}</span>
                  </span>
                  <ArrowRight aria-hidden="true" className="h-5 w-5 shrink-0 text-champagne transition-transform duration-500 group-hover:translate-x-1" strokeWidth={1.4} />
                </Link>
              </BorderGlow>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="all-areas-heading" className="shell pb-16">
        <h2 id="all-areas-heading" className="display display-md">
          At a glance
        </h2>
        <dl className="mt-10 divide-y divide-ivory/[0.08] border-y border-ivory/[0.08]">
          {areas.map(a => (
            <div key={a.slug} className="grid gap-2 py-6 md:grid-cols-12 md:gap-8">
              <dt className="font-display text-[1.4rem] md:col-span-4">{a.title}</dt>
              <dd className="text-[0.95rem] text-ivory/72 md:col-span-6">{a.summary}</dd>
              <dd className="text-[0.78rem] text-stone md:col-span-2 md:text-right">{a.framework}</dd>
            </div>
          ))}
        </dl>
      </section>
      <div className="shell">
        <LegalNote />
      </div>
    </>
  );
}
