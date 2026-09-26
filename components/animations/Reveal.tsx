'use client';
import { motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** 'rise' = blur-to-sharp lift; 'mask' = clip reveal from the bottom edge */
  variant?: 'rise' | 'mask';
  as?: 'div' | 'section' | 'li' | 'article';
};

/** A single, restrained scroll reveal. Used on section entries, not on every element. */
export default function Reveal({ children, className, delay = 0, variant = 'rise', as = 'div' }: RevealProps) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  if (reduce) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }
  const initial =
    variant === 'mask'
      ? { clipPath: 'inset(100% 0% 0% 0%)', opacity: 1 }
      : { opacity: 0, y: 28, filter: 'blur(8px)' };
  const animate =
    variant === 'mask'
      ? { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }
      : { opacity: 1, y: 0, filter: 'blur(0px)' };
  return (
    <Comp
      className={className}
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: variant === 'mask' ? 1.1 : 0.9, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </Comp>
  );
}
