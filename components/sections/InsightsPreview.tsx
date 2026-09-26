import BlurText from '@/components/animations/BlurText';
import Reveal from '@/components/animations/Reveal';
import LinkButton from '@/components/ui/LinkButton';
import { articles } from '@/data/articles';
import ArticleCard from './ArticleCard';

export default function InsightsPreview() {
  const latest = articles.slice(0, 3);
  return (
    <section aria-labelledby="insights-heading" className="shell py-28 md:py-36">
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <BlurText as="p" text="Legal insights" className="label label-rule" />
          <h2 id="insights-heading" className="display display-lg mt-6">
            Notes on the law as it now stands.
          </h2>
        </div>
        <LinkButton href="/insights" variant="ghost">
          All insights
        </LinkButton>
      </div>
      <Reveal className="mt-14">
        <ul className="grid gap-5 md:grid-cols-3">
          {latest.map(a => (
            <li key={a.slug}>
              <ArticleCard article={a} />
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
