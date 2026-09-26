import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import LegalNote from '@/components/legal/LegalNote';
import { SourceList } from '@/components/legal/SourceList';
import ArticleCard from '@/components/sections/ArticleCard';
import PageIntro from '@/components/sections/PageIntro';
import { advocate } from '@/data/advocate';
import { articles, getArticle, readingTime } from '@/data/articles';

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articles.map(a => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.summary,
    alternates: { canonical: `/insights/${article.slug}` },
    robots: article.status === 'draft' ? { index: false, follow: true } : undefined,
    openGraph: { type: 'article', title: article.title, description: article.summary }
  };
}

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  const related = articles.filter(a => a.slug !== article.slug && a.category === article.category).slice(0, 2);

  return (
    <article>
      <PageIntro kicker={article.category} heading={article.title} intro={article.summary}>
        <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-3 text-[0.82rem]">
          <div>
            <dt className="text-stone">Author</dt>
            <dd className="text-ivory/85">{advocate.name}</dd>
          </div>
          <div>
            <dt className="text-stone">Published</dt>
            <dd className="text-ivory/85">{article.date}</dd>
          </div>
          <div>
            <dt className="text-stone">Reading time</dt>
            <dd className="text-ivory/85">{readingTime(article)} min</dd>
          </div>
        </dl>
      </PageIntro>

      <div className="shell">
        <div className="mx-auto max-w-[44rem]">
          {article.status === 'draft' && (
            <p role="note" className="mb-10 rounded-[12px] border border-champagne/40 bg-champagne/[0.06] px-5 py-3 text-[0.88rem] text-champagne-pale">
              Draft: sample content pending review and approval by the advocate. It is not indexed by search engines.
            </p>
          )}
          <div className="prose-legal text-[1.05rem] leading-[1.8]">
            {article.body.map((block, i) => (
              <div key={i} className="mt-10 first:mt-0">
                {block.heading && <h2 className="display display-sm mb-5 text-ivory">{block.heading}</h2>}
                {block.paragraphs.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </div>
            ))}
          </div>
          <div className="mt-16 border-t border-ivory/[0.08] pt-10">
            <SourceList sources={article.sources} title="Sources" />
          </div>
          <LegalNote className="mt-14" />
          <Link href="/insights" className="mt-12 inline-flex items-center gap-2 text-[0.9rem] text-ivory/80 hover:text-ivory">
            <ArrowLeft aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
            <span className="link-underline">All insights</span>
          </Link>
        </div>
        {related.length > 0 && (
          <section aria-labelledby="related-h" className="mt-24">
            <h2 id="related-h" className="display display-md">
              Related
            </h2>
            <ul className="mt-10 grid gap-5 md:grid-cols-2">
              {related.map(a => (
                <li key={a.slug}>
                  <ArticleCard article={a} />
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </article>
  );
}
