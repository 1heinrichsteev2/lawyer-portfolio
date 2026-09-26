import type { Source } from '../sources';

export type ContentSection = {
  id: string;
  /** Short label for the section rail. */
  rail: string;
  title: string;
  paragraphs: string[];
  points?: string[];
  /** Optional note shown as a quiet aside (e.g. prior-law reference). */
  note?: string;
};

export type Authority = { name: string; citation: string; point: string; priorLaw?: boolean };

export type LegalPage = {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  kicker: string;
  heading: string;
  rotating?: string[];
  intro: string;
  sections: ContentSection[];
  authorities?: Authority[];
  sources: Source[];
};
