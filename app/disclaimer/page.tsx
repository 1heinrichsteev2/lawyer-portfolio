import type { Metadata } from 'next';
import PageIntro from '@/components/sections/PageIntro';
import SectionRail from '@/components/navigation/SectionRail';
import { SourceList } from '@/components/legal/SourceList';
import { advocate } from '@/data/advocate';
import { pickSources } from '@/data/sources';
import { site } from '@/data/site';

export const metadata: Metadata = {
  title: 'Disclaimer',
  description: 'General information, no advocate–client relationship, no guarantee, external links and accuracy of legal information.',
  alternates: { canonical: '/disclaimer' }
};

const sections = [
  {
    id: 'bci',
    title: 'Bar Council of India Rules',
    body: [
      `The Bar Council of India does not permit advocates to solicit work or advertise. This website is maintained for the purpose of furnishing information permitted under Rule 36 of the Bar Council of India Rules and its proviso. It is not an advertisement, a solicitation, or an invitation or inducement of any kind.`,
      `By accessing this website, you acknowledge that you are seeking information about ${advocate.name} of your own accord, and that there has been no advertisement, personal communication, solicitation or inducement from the advocate or anyone on the advocate's behalf.`,
      'The particulars published on this website are furnished by the advocate, who declares that they are true.'
    ]
  },
  {
    id: 'general',
    title: 'General information only',
    body: [
      'Content on this website, including pages about criminal law, bail and cybercrime and the articles under Legal insights, is provided for general informational purposes. It is not legal advice and should not be relied on as a substitute for advice from a qualified advocate on your specific circumstances.'
    ]
  },
  {
    id: 'relationship',
    title: 'No advocate–client relationship',
    body: [
      'Visiting this website, reading its content, or contacting the advocate through it does not create an advocate–client relationship. Such a relationship arises only when the advocate expressly agrees to act for you. Please do not send confidential information through this website.'
    ]
  },
  {
    id: 'guarantee',
    title: 'No guarantee of outcome',
    body: [
      'Every matter depends on its own facts, the evidence, the applicable law and the decision of the court or authority concerned. Nothing on this website is a promise or prediction of any result, including bail, discharge, quashing or acquittal. No advocate can guarantee an outcome.'
    ]
  },
  {
    id: 'accuracy',
    title: 'Accuracy and changes in law',
    body: [
      `Laws, rules, procedures and judicial interpretations change. ${site.frameworkNote} Older judgments and articles may refer to prior law. While care is taken to keep content accurate, it may not reflect the latest developments. Please verify information independently, including against official sources, before acting on it. Legal content last reviewed: ${site.legalContentReviewed}.`
    ]
  },
  {
    id: 'links',
    title: 'External links',
    body: [
      'Links to external websites, including government and court websites, are provided for convenience. The advocate does not control and is not responsible for their content, availability or privacy practices. A link is not an endorsement.'
    ]
  },
  {
    id: 'liability',
    title: 'Limitation',
    body: [
      'To the extent permitted by law, the advocate is not liable for any consequence of any action taken, or not taken, in reliance on information on this website.'
    ]
  }
];

export default function DisclaimerPage() {
  return (
    <>
      <PageIntro kicker="Disclaimer" heading="Please read before relying on this website" />
      <SectionRail items={sections.map(s => ({ id: s.id, label: s.title }))} />
      <div className="shell">
        <div className="xl:grid xl:grid-cols-12">
          <div className="xl:col-span-8 xl:col-start-4">
            {sections.map(s => (
              <section key={s.id} id={s.id} tabIndex={-1} className="scroll-mt-28 border-t border-ivory/[0.08] py-12 outline-none">
                <h2 className="display display-sm">{s.title}</h2>
                <div className="prose-legal mt-6">
                  {s.body.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </section>
            ))}
            <div className="border-t border-ivory/[0.08] pt-12">
              <SourceList sources={pickSources('bci', 'pibOnlineLegal')} title="Reference" />
              <p className="mt-10 text-[0.78rem] text-stone">
                This disclaimer is a template and has not been approved by any Bar Council. The advocate should review it
                before publication.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
