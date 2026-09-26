/**
 * IMAGE SLOTS — replace `src: null` with a path in /public/images to swap a glass
 * placeholder for a real photograph. Keep `alt` descriptive and factual.
 */
export type ImageSlot = { src: string | null; alt: string; width?: number; height?: number; focusX?: number };

export const images = {
  /**
   * Homepage hero artwork (2048 × 682). The right half already contains the headline
   * "Where Your Questions Meet Legal Clarity", so the hero does not repeat it as overlay text.
   * `focusX` is the horizontal position (%) of the advocate, used for the mobile crop.
   */
  hero: {
    src: '/images/hero-lawyer.png',
    alt: 'The advocate in court attire seated at a desk in chambers, beside the words: Welcome. Where your questions meet legal clarity.',
    width: 2048,
    height: 682,
    focusX: 19
  },
  aboutPortrait: { src: null, alt: 'Portrait of the advocate' },
  chambers: { src: null, alt: 'The chambers' },
  courtArchitecture: { src: null, alt: 'Court building' },
  library: { src: null, alt: 'Law library' },
  contactOffice: { src: null, alt: 'Office entrance' }
} satisfies Record<string, ImageSlot>;
