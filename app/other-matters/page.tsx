import type { Metadata } from 'next';
import LegalArticle from '@/components/legal/LegalArticle';
import MatterBrowser from '@/components/sections/MatterBrowser';
import PageIntro from '@/components/sections/PageIntro';
import { otherMatters } from '@/data/content/otherMatters';

export const metadata: Metadata = {
  title: otherMatters.metaTitle,
  description: otherMatters.metaDescription,
  alternates: { canonical: '/other-matters' }
};

export default function OtherMattersPage() {
  return (
    <>
      <PageIntro kicker={otherMatters.kicker} heading={otherMatters.heading} intro={otherMatters.intro} />
      <section aria-label="Categories" className="shell pb-24">
        <MatterBrowser />
      </section>
      <LegalArticle page={otherMatters} />
    </>
  );
}
