'use client';
import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import JellyRadio from '@/components/ui/JellyRadio';
import { articleCategories, articles } from '@/data/articles';
import ArticleCard from './ArticleCard';

/** Jelly Radio (React Bits) as the category filter for the insights list. */
export default function InsightsBrowser() {
  const [category, setCategory] = useState('All');
  const list = useMemo(() => (category === 'All' ? articles : articles.filter(a => a.category === category)), [category]);
  return (
    <>
      <div className="-mx-2 overflow-x-auto pb-2">
        <JellyRadio
          items={['All', ...articleCategories]}
          value={category}
          onChange={v => setCategory(v)}
          ariaLabel="Filter insights by category"
          chipColor="rgba(237,231,218,0.06)"
          activeColor="#D6B56A"
          textColor="#EDE7DA"
          activeTextColor="#0A0A0A"
          radius={999}
          swell={0.12}
          size="md"
        />
      </div>
      <p className="sr-only" aria-live="polite">
        {list.length} {list.length === 1 ? 'article' : 'articles'} shown
      </p>
      <motion.ul layout className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map(a => (
            <motion.li
              key={a.slug}
              layout
              initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <ArticleCard article={a} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </>
  );
}
