import { cn } from '@/lib/cn';

type Shape = 'arch' | 'slab' | 'column' | 'panel';

/**
 * Architectural glass stand-in for a future photograph. Layers: tinted depth field,
 * frosted pane, internal reflection, gold edge light, and a faint ring or column.
 * Replace by setting an image in data/images.ts — see ImageSlot.
 */
export default function GlassPlaceholder({
  shape = 'slab',
  className,
  label,
  depth = 'mid'
}: {
  shape?: Shape;
  className?: string;
  label?: string;
  depth?: 'near' | 'mid' | 'far';
}) {
  const radius = shape === 'arch' ? 'arch' : shape === 'column' ? 'rounded-[999px_999px_10px_10px]' : shape === 'panel' ? 'rounded-[22px]' : 'rounded-[14px]';
  return (
    <div className={cn('relative isolate overflow-hidden', radius, className)} role="img" aria-label={label ? `Image placeholder: ${label}` : 'Image placeholder'}>
      {/* depth field */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            depth === 'near'
              ? 'radial-gradient(120% 90% at 20% 0%, rgb(200 164 93 / 0.20), transparent 55%), radial-gradient(80% 60% at 90% 100%, rgb(237 231 218 / 0.08), transparent 60%), #141312'
              : depth === 'far'
                ? 'radial-gradient(100% 80% at 70% 10%, rgb(237 231 218 / 0.07), transparent 60%), #0e0e0e'
                : 'radial-gradient(110% 80% at 30% 0%, rgb(200 164 93 / 0.13), transparent 58%), radial-gradient(90% 70% at 100% 100%, rgb(237 231 218 / 0.06), transparent 60%), #121211'
        }}
      />
      {/* architectural lines: mullions */}
      <div className="absolute inset-0 -z-10 opacity-[0.35]" style={{ background: 'repeating-linear-gradient(90deg, transparent 0 calc(33.33% - 1px), rgb(237 231 218 / 0.06) calc(33.33% - 1px) 33.33%)' }} />
      {/* frosted pane */}
      <div className={cn('glass absolute inset-[10%] rounded-[inherit]', shape === 'arch' && 'arch')} style={{ transform: 'translate3d(0,0,0)' }}>
        <span className="glass-edge" />
      </div>
      {/* reflection sweep */}
      <div className="pointer-events-none absolute inset-0" style={{ background: 'linear-gradient(115deg, transparent 30%, rgb(255 255 255 / 0.06) 42%, transparent 52%)' }} />
      {/* ring */}
      <div className="pointer-events-none absolute right-[12%] bottom-[14%] aspect-square w-[28%] rounded-full border border-champagne/25" />
      {label ? (
        <span className="absolute bottom-4 left-5 text-[0.72rem] tracking-[0.06em] text-stone/80">{label}</span>
      ) : null}
    </div>
  );
}
