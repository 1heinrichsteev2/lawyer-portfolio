import type { Metadata } from 'next';
import Link from 'next/link';
import BlurText from '@/components/animations/BlurText';
import Reveal from '@/components/animations/Reveal';
import TrueFocus from '@/components/animations/TrueFocus';
import LegalNote from '@/components/legal/LegalNote';
import PageIntro from '@/components/sections/PageIntro';
import { ParticularsList } from '@/components/sections/Particulars';
import ImageSlot from '@/components/ui/ImageSlot';
import { advocate } from '@/data/advocate';
import { principles } from '@/data/approach';
import { offeredPracticeAreas } from '@/data/practiceAreas';

export const metadata: Metadata = {
  title: 'About',
  description: `Professional profile, approach to legal practice and areas of legal work of ${advocate.name}, ${advocate.designation}.`,
  alternates: { canonical: '/about' }
};

export default function AboutPage() {
  return (
    <>
      <PageIntro kicker="About" heading={advocate.name} intro={advocate.professionalInformation} />

      <section aria-labelledby="profile-heading" className="shell py-16 md:py-24">
        <div className="grid gap-14 lg:grid-cols-12">
          <Reveal variant="mask" className="lg:col-span-5">
            <ImageSlot slot="aboutPortrait" shape="arch" className="aspect-[4/5] w-full max-w-[26rem]" depth="near" />
          </Reveal>
          <div className="lg:col-span-7">
            <BlurText as="p" text="Professional profile" className="label label-rule" />
            <h2 id="profile-heading" className="display display-md mt-6">
              Particulars
            </h2>
            <div className="glass mt-10 rounded-[22px] p-6 sm:p-8">
              <span className="glass-edge" />
              <ParticularsList compact />
            </div>
            <p className="mt-5 text-[0.8rem] text-stone">
              Every detail above is supplied by the advocate. Placeholders in square brackets have not yet been filled in.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="approach-h" className="shell py-16 md:py-24">
        <BlurText as="p" text="Approach to legal practice" className="label label-rule" />
        <h2 id="approach-h" className="sr-only">
          Approach to legal practice
        </h2>
        <TrueFocus sentence="Read closely. Explain plainly." wordClassName="display display-lg" className="mt-8" manualMode={false} />
        <ul className="mt-16 grid gap-10 md:grid-cols-3">
          {principles.map(p => (
            <li key={p.title} className="border-t border-champagne/30 pt-6">
              <h3 className="font-display text-[1.6rem]">{p.title}</h3>
              <p className="mt-3 text-[0.95rem] text-ivory/72">{p.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="areas-h" className="shell py-16 md:py-24">
        <BlurText as="p" text="Areas of legal work" className="label label-rule" />
        <h2 id="areas-h" className="display display-md mt-6">
          Areas of practice
        </h2>
        <ul className="mt-10 flex flex-wrap gap-3">
          {offeredPracticeAreas().map(a => (
            <li key={a.slug}>
              <Link
                href={a.href}
                className="inline-flex rounded-full border border-ivory/15 bg-ivory/[0.03] px-5 py-2.5 text-[0.9rem] text-ivory/85 transition-colors hover:border-champagne/60 hover:text-ivory"
              >
                {a.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <div className="shell pt-8">
        <LegalNote />
      </div>
    </>
  );
}
