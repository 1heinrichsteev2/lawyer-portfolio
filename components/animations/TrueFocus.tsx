'use client';
/**
 * React Bits — True Focus (official implementation, TS + Tailwind variant).
 * Adaptations: configurable typography via `wordClassName`, focus rect re-measured on
 * resize, cycling starts only when visible, screen readers get the sentence once,
 * and reduced motion shows every word in focus.
 */
import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { usePrefersReducedMotion } from '@/lib/hooks';
import { cn } from '@/lib/cn';

interface TrueFocusProps {
  sentence?: string;
  separator?: string;
  manualMode?: boolean;
  blurAmount?: number;
  borderColor?: string;
  glowColor?: string;
  animationDuration?: number;
  pauseBetweenAnimations?: number;
  className?: string;
  wordClassName?: string;
  as?: 'h2' | 'h3' | 'p' | 'div';
}

interface FocusRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

const TrueFocus: React.FC<TrueFocusProps> = ({
  sentence = 'True Focus',
  separator = ' ',
  manualMode = false,
  blurAmount = 4,
  borderColor = '#C8A45D',
  glowColor = 'rgba(200, 164, 93, 0.45)',
  animationDuration = 0.6,
  pauseBetweenAnimations = 1.4,
  className,
  wordClassName = 'display display-lg',
  as: Tag = 'div'
}) => {
  const reduce = usePrefersReducedMotion();
  const words = sentence.split(separator);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [lastActiveIndex, setLastActiveIndex] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [focusRect, setFocusRect] = useState<FocusRect>({ x: 0, y: 0, width: 0, height: 0 });

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.3 });
    io.observe(node);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!manualMode && !reduce && visible) {
      const interval = setInterval(
        () => setCurrentIndex(prev => (prev + 1) % words.length),
        (animationDuration + pauseBetweenAnimations) * 1000
      );
      return () => clearInterval(interval);
    }
  }, [manualMode, animationDuration, pauseBetweenAnimations, words.length, reduce, visible]);

  useEffect(() => {
    const measure = () => {
      if (currentIndex === null || currentIndex === -1) return;
      const el = wordRefs.current[currentIndex];
      if (!el || !containerRef.current) return;
      const parentRect = containerRef.current.getBoundingClientRect();
      const activeRect = el.getBoundingClientRect();
      setFocusRect({
        x: activeRect.left - parentRect.left,
        y: activeRect.top - parentRect.top,
        width: activeRect.width,
        height: activeRect.height
      });
    };
    measure();
    window.addEventListener('resize', measure);
    document.fonts?.ready.then(measure);
    return () => window.removeEventListener('resize', measure);
  }, [currentIndex, words.length]);

  const handleMouseEnter = (index: number) => {
    if (manualMode) {
      setLastActiveIndex(index);
      setCurrentIndex(index);
    }
  };

  const handleMouseLeave = () => {
    if (manualMode && lastActiveIndex !== null) setCurrentIndex(lastActiveIndex);
  };

  return (
    <Tag className={cn('relative', className)}>
      <span className="sr-only">{sentence}</span>
      <div
        aria-hidden="true"
        className="relative flex flex-wrap items-center gap-x-[0.35em] gap-y-2"
        ref={containerRef}
        style={{ userSelect: 'none' }}
      >
        {words.map((word, index) => {
          const isActive = index === currentIndex;
          return (
            <span
              key={index}
              ref={el => {
                wordRefs.current[index] = el;
              }}
              className={cn('relative', wordClassName)}
              style={{
                filter: reduce || isActive ? 'blur(0px)' : `blur(${blurAmount}px)`,
                opacity: reduce || isActive ? 1 : 0.55,
                transition: `filter ${animationDuration}s ease, opacity ${animationDuration}s ease`
              }}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              {word}
            </span>
          );
        })}

        {!reduce && (
          <motion.div
            className="pointer-events-none absolute top-0 left-0 box-border border-0"
            animate={{
              x: focusRect.x,
              y: focusRect.y,
              width: focusRect.width,
              height: focusRect.height,
              opacity: currentIndex >= 0 && focusRect.width > 0 ? 1 : 0
            }}
            transition={{ duration: animationDuration, ease: [0.22, 1, 0.36, 1] }}
            style={{ '--border-color': borderColor, '--glow-color': glowColor } as React.CSSProperties}
          >
            {(['top-[-8px] left-[-10px] border-r-0 border-b-0', 'top-[-8px] right-[-10px] border-l-0 border-b-0', 'bottom-[-4px] left-[-10px] border-r-0 border-t-0', 'bottom-[-4px] right-[-10px] border-l-0 border-t-0'] as const).map(pos => (
              <span
                key={pos}
                className={cn('absolute h-3.5 w-3.5 rounded-[2px] border-[1.5px]', pos)}
                style={{ borderColor: 'var(--border-color)', filter: 'drop-shadow(0 0 4px var(--glow-color))' }}
              />
            ))}
          </motion.div>
        )}
      </div>
    </Tag>
  );
};

export default TrueFocus;
