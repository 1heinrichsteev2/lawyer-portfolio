import SectionRail from '@/components/navigation/SectionRail';
import Reveal from '@/components/animations/Reveal';
import type { LegalPage } from '@/data/content/types';
import { site } from '@/data/site';
import LegalNote from './LegalNote';
import { AuthorityList, SourceList } from './SourceList';

/** Renders a LegalPage's sections with the Line Sidebar rail, notes, authorities and sources. */
export default function LegalArticle({ page, children }: { page: LegalPage; children?: React.ReactNode }) {
  const rail = [
    ...page.sections.map(s => ({ id: s.id, label: s.rail })),
    ...(page.authorities?.length ? [{ id: 'references', label: 'References' }] : [{ id: 'references', label: 'Sources' }])
  ];
  return (
    <>
      <SectionRail items={rail} />
      <div className="shell">
        <div className="xl:grid xl:grid-cols-12">
          <div className="xl:col-span-8 xl:col-start-4">
            <LegalNote className="mb-16" />
            {page.sections.map(section => (
              <section key={section.id} id={section.id} tabIndex={-1} aria-labelledby={`${section.id}-h`} className="scroll-mt-28 border-t border-ivory/[0.08] py-14 outline-none md:py-20">
                <Reveal>
                  <h2 id={`${section.id}-h`} className="display display-md max-w-[20ch]">
                    {section.title}
                  </h2>
                  <div className="prose-legal mt-8">
                    {section.paragraphs.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                  {section.points && (
                    <ul className="mt-6 max-w-2xl space-y-3">
                      {section.points.map(pt => (
                        <li key={pt} className="flex gap-4 text-ivory/80">
                          <span aria-hidden="true" className="mt-[0.8em] h-px w-5 shrink-0 bg-champagne/80" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {section.note && (
                    <p className="mt-8 max-w-2xl border-l border-champagne/40 pl-4 text-[0.85rem] text-stone">{section.note}</p>
                  )}
                </Reveal>
              </section>
            ))}
            {children}
            <section id="references" tabIndex={-1} className="scroll-mt-28 space-y-14 border-t border-ivory/[0.08] py-14 outline-none">
              {page.authorities?.length ? <AuthorityList authorities={page.authorities} /> : null}
              <SourceList sources={page.sources} />
              <p className="text-[0.78rem] text-stone">
                Legal content last reviewed: {site.legalContentReviewed}. {site.frameworkNote}
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
