import { ExternalLink } from 'lucide-react';
import type { Source } from '@/data/sources';
import type { Authority } from '@/data/content/types';

export function SourceList({ sources, title = 'Sources' }: { sources: Source[]; title?: string }) {
  return (
    <section aria-labelledby="sources-heading" className="mt-6">
      <h2 id="sources-heading" className="label label-rule">
        {title}
      </h2>
      <ul className="mt-5 space-y-3">
        {sources.map(s => (
          <li key={s.id} className="text-[0.92rem] leading-snug">
            <a href={s.url} target="_blank" rel="noopener noreferrer" className="group inline-flex items-start gap-2 text-ivory/85 hover:text-ivory">
              <span>
                <span className="link-underline">{s.title}</span>
                <span className="block text-[0.8rem] text-stone">{s.publisher}</span>
              </span>
              <ExternalLink aria-hidden="true" className="mt-1 h-3.5 w-3.5 shrink-0 text-champagne/70" strokeWidth={1.6} />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function AuthorityList({ authorities }: { authorities: Authority[] }) {
  return (
    <section aria-labelledby="authorities-heading">
      <h2 id="authorities-heading" className="label label-rule">
        Judgments referred to
      </h2>
      <ul className="mt-5 divide-y divide-ivory/[0.07] border-y border-ivory/[0.07]">
        {authorities.map(a => (
          <li key={a.name} className="py-4">
            <p className="font-display text-[1.2rem] leading-snug">
              <em>{a.name}</em>, <span className="not-italic text-ivory/70">{a.citation}</span>
            </p>
            <p className="mt-1.5 max-w-2xl text-[0.9rem] text-ivory/70">{a.point}</p>
            {a.priorLaw ? <p className="mt-1 text-[0.78rem] text-stone">Decided under prior law; read with the corresponding current provisions.</p> : null}
          </li>
        ))}
      </ul>
    </section>
  );
}
