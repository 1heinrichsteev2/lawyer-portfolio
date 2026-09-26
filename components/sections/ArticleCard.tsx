import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import BorderGlow from '@/components/ui/BorderGlow';
import { readingTime, type Article } from '@/data/articles';

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <BorderGlow className="h-full" borderRadius={18}>
      <Link href={`/insights/${article.slug}`} className="group flex h-full flex-col p-7 md:p-8">
        <div className="flex items-center justify-between gap-4 text-[0.76rem] text-stone">
          <span className="text-champagne-pale">{article.category}</span>
          <span>{readingTime(article)} min read</span>
        </div>
        <h3 className="mt-6 font-display text-[1.65rem] leading-[1.12] text-ivory">{article.title}</h3>
        <p className="mt-4 text-[0.92rem] text-ivory/70">{article.summary}</p>
        <div className="mt-auto flex items-center justify-between pt-8 text-[0.78rem] text-stone">
          <span>{article.status === 'draft' ? 'Draft, pending review' : article.date}</span>
          <ArrowUpRight aria-hidden="true" className="h-4 w-4 text-ivory/60 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-champagne" strokeWidth={1.5} />
        </div>
      </Link>
    </BorderGlow>
  );
}
