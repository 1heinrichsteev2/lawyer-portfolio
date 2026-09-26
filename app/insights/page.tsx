import type { Metadata } from 'next';
import PageIntro from '@/components/sections/PageIntro';
import InsightsBrowser from '@/components/sections/InsightsBrowser';

export const metadata: Metadata = {
  title: 'Legal insights',
  description: 'Informational articles on criminal procedure, bail, evidence and cybercrime under the current Indian framework.',
  alternates: { canonical: '/insights' }
};

export default function InsightsPage() {
  return (
    <>
      <PageIntro
        kicker="Legal insights"
        heading="Notes on the law as it now stands"
        intro="Short explanations of procedure and evidence under the BNS, BNSS and BSA. Articles marked as drafts are sample content awaiting the advocate's review."
      />
      <section aria-label="Articles" className="shell pb-16">
        <InsightsBrowser />
      </section>
    </>
  );
}
