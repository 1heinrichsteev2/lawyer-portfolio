import Image from 'next/image';
import { images } from '@/data/images';
import { cn } from '@/lib/cn';
import GlassPlaceholder from './GlassPlaceholder';

type SlotKey = keyof typeof images;

/** Renders the configured image for a slot, or an architectural glass placeholder until one is supplied. */
export default function ImageSlot({
  slot,
  shape = 'slab',
  className,
  sizes = '(min-width: 1024px) 40vw, 100vw',
  depth
}: {
  slot: SlotKey;
  shape?: 'arch' | 'slab' | 'column' | 'panel';
  className?: string;
  sizes?: string;
  depth?: 'near' | 'mid' | 'far';
}) {
  const img = images[slot];
  if (!img.src) return <GlassPlaceholder shape={shape} className={className} label={img.alt} depth={depth} />;
  const radius = shape === 'arch' ? 'arch' : shape === 'column' ? 'rounded-[999px_999px_10px_10px]' : 'rounded-[14px]';
  return (
    <div className={cn('relative overflow-hidden', radius, className)}>
      <Image src={img.src} alt={img.alt} fill sizes={sizes} className="object-cover" />
    </div>
  );
}
