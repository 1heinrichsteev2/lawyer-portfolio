import type { Metadata } from 'next';
import BlurText from '@/components/animations/BlurText';
import LegalNote from '@/components/legal/LegalNote';
import Approach from '@/components/sections/Approach';
import ContactBand from '@/components/sections/ContactBand';
import Hero from '@/components/sections/Hero';
import HomeIntro from '@/components/sections/HomeIntro';
import InsightsPreview from '@/components/sections/InsightsPreview';
import Particulars from '@/components/sections/Particulars';
import PracticeAccordion from '@/components/sections/PracticeAccordion';
import ProcedureTimeline from '@/components/sections/ProcedureTimeline';
import LinkButton from '@/components/ui/LinkButton';
import { offeredPracticeAreas } from '@/data/practiceAreas';

export const metadata: Metadata = { alternates: { canonical: '/' } };

export default function HomePage() {
  return (
    <div className="margin-rule">
      <Hero />
      <HomeIntro />

      <section aria-labelledby="practice-heading" className="shell py-24 md:py-32">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <BlurText as="p" text="Practice areas" className="label label-rule" />
            <h2 id="practice-heading" className="display display-lg mt-6">
              Areas of legal work.
            </h2>
            <p className="lede mt-5">Informational categories. Move across the arches, or use the arrow keys, to read each one.</p>
          </div>
          <LinkButton href="/practice" variant="ghost">
            All practice areas
          </LinkButton>
        </div>
        <div className="mt-14">
          <PracticeAccordion items={offeredPracticeAreas()} />
        </div>
      </section>

      <Approach />
      <ProcedureTimeline />
      <InsightsPreview />
      <Particulars />
      <ContactBand />
      <div className="shell">
        <LegalNote />
      </div>
    </div>
  );
}
