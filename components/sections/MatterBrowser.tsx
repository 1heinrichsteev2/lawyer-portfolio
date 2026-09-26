'use client';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import BranchedMenu from '@/components/ui/BranchedMenu';
import BorderGlow from '@/components/ui/BorderGlow';
import { otherMatterCategories } from '@/data/content/otherMatters';

const groups = [
  { label: 'Offences commonly alleged', ids: ['fraud', 'cbt', 'property', 'financial', 'cheque'] },
  { label: 'Connected matters', ids: ['domestic', 'digital', 'related'] }
];

/** Branched Menu (React Bits) used to browse categories; the selected one opens in a glass panel. */
export default function MatterBrowser() {
  const [active, setActive] = useState<string>('fraud');
  const current = otherMatterCategories.find(c => c.id === active) ?? otherMatterCategories[0];
  const items = groups.map(g => ({
    label: g.label,
    children: g.ids.map(id => {
      const c = otherMatterCategories.find(x => x.id === id)!;
      return { value: c.id, label: c.label };
    })
  }));
  return (
    <div className="grid gap-10 md:grid-cols-12">
      <div className="md:col-span-5 lg:col-span-4">
        <BranchedMenu
          items={items}
          defaultOpen={[0, 1]}
          defaultActive="fraud"
          onSelect={v => setActive(v)}
          color="#EDE7DA"
          accentColor="#D6B56A"
          lineColor="rgba(237,231,218,0.18)"
          width={340}
          rowHeight={40}
          fontSize={15}
        />
      </div>
      <div className="md:col-span-7 lg:col-span-8" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <BorderGlow>
              <div className="p-7 md:p-10">
                <p className="text-[0.76rem] tracking-[0.05em] text-champagne-pale">{current.refs}</p>
                <h2 className="display display-md mt-4">{current.label}</h2>
                <p className="mt-5 max-w-xl text-[1rem] text-ivory/78">{current.text}</p>
              </div>
            </BorderGlow>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
