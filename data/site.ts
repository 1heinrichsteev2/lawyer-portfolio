import { advocate } from './advocate';

/** Site-wide settings. Metadata here is editable and makes no promotional claims. */
export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.example.com',
  title: `${advocate.name} — Advocate`,
  titleTemplate: `%s — ${advocate.name}`,
  description:
    'Professional information and general legal information on criminal matters, bail, cybercrime and connected litigation in India.',
  locale: 'en_IN',
  /** Contact form endpoint. Empty = the form does not send and says so. */
  contactEndpoint: process.env.NEXT_PUBLIC_CONTACT_ENDPOINT || '',
  /** Show the BCI-style disclaimer acknowledgement on a visitor's first visit. */
  requireDisclaimerAcknowledgement: true,
  /** Brief intro animation on a visitor's first page load of a session. Never on refresh/return visits. */
  showIntroLoader: true,
  /** Last reviewed date for legal content. Update whenever pages are reviewed. */
  legalContentReviewed: '[LAST REVIEWED DATE]',
  /** Accurate as of the build of this template. */
  frameworkNote:
    'The Bharatiya Nyaya Sanhita, 2023 (BNS), the Bharatiya Nagarik Suraksha Sanhita, 2023 (BNSS) and the Bharatiya Sakshya Adhiniyam, 2023 (BSA) came into force on 1 July 2024, replacing the Indian Penal Code, 1860, the Code of Criminal Procedure, 1973 and the Indian Evidence Act, 1872.'
} as const;
