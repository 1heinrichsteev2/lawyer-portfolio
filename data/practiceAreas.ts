/**
 * PRACTICE AREAS — informational categories only.
 * Set `offered: false` for any category the advocate does not handle; it will be hidden.
 * Descriptions explain what a category covers. They make no claim of specialisation.
 */
export type PracticeArea = {
  slug: string;
  title: string;
  summary: string;
  topics: string[];
  framework: string;
  href: string;
  offered: boolean;
};

export const practiceAreas: PracticeArea[] = [
  {
    slug: 'criminal-defence',
    title: 'Criminal defence',
    summary:
      'Representation of a person accused of an offence, from the first information report through investigation, charge and trial.',
    topics: ['FIR and complaint stage', 'Investigation and notices', 'Charge and discharge', 'Trial'],
    framework: 'BNS, 2023 · BNSS, 2023 · BSA, 2023',
    href: '/criminal-law',
    offered: true
  },
  {
    slug: 'bail',
    title: 'Bail and anticipatory bail',
    summary:
      'Applications for release from custody, and for protection in advance of an apprehended arrest in a non-bailable offence.',
    topics: ['Bailable offences (s. 478)', 'Regular bail (ss. 480, 483)', 'Anticipatory bail (s. 482)', 'Default bail (s. 187)'],
    framework: 'BNSS, 2023, Chapter XXXV',
    href: '/bail',
    offered: true
  },
  {
    slug: 'criminal-complaints',
    title: 'Criminal complaints',
    summary:
      'Setting the criminal law in motion: police information, complaints before a Magistrate, and what follows each route.',
    topics: ['Information to police (s. 173)', 'Complaint to Magistrate (s. 223)', 'Order for investigation (s. 175(3))'],
    framework: 'BNSS, 2023',
    href: '/criminal-law',
    offered: true
  },
  {
    slug: 'cybercrime',
    title: 'Cybercrime matters',
    summary:
      'Offences committed through computers, phones and networks, and the handling of electronic records as evidence.',
    topics: ['Online financial fraud', 'Identity theft and impersonation', 'Account compromise', 'Electronic evidence (BSA s. 63)'],
    framework: 'IT Act, 2000 · BNS, 2023 · BSA, 2023',
    href: '/cybercrime',
    offered: true
  },
  {
    slug: 'fraud-cheating',
    title: 'Fraud and cheating',
    summary:
      'Allegations of deception causing someone to part with property, including disputes that began as commercial transactions.',
    topics: ['Cheating (BNS s. 318)', 'Cheating by personation (s. 319)', 'Forgery-related allegations'],
    framework: 'BNS, 2023',
    href: '/other-matters',
    offered: true
  },
  {
    slug: 'property-criminal',
    title: 'Property-related criminal disputes',
    summary:
      'Disputes over land, buildings or goods in which criminal allegations are raised alongside, or instead of, civil remedies.',
    topics: ['Criminal trespass', 'Criminal breach of trust (s. 316)', 'Civil and criminal overlap'],
    framework: 'BNS, 2023 · BNSS, 2023',
    href: '/other-matters',
    offered: true
  },
  {
    slug: 'white-collar',
    title: 'White-collar and financial offences',
    summary:
      'Allegations arising from business, employment or financial dealings, often involving large volumes of documents and records.',
    topics: ['Breach of trust by employees or agents', 'Document and ledger evidence', 'Economic offences'],
    framework: 'BNS, 2023 · special statutes where applicable',
    href: '/other-matters',
    offered: true
  },
  {
    slug: 'trial-procedure',
    title: 'Trial and procedural matters',
    summary:
      'The stages between the police report and judgment: cognizance, discharge, framing of charge, evidence and arguments.',
    topics: ['Police report (s. 193)', 'Discharge and charge', 'Examination of witnesses', 'Quashing (s. 528)'],
    framework: 'BNSS, 2023 · BSA, 2023',
    href: '/criminal-law',
    offered: true
  },
  {
    slug: 'connected',
    title: 'Other connected matters',
    summary:
      'Domestic criminal allegations, police-related matters and related litigation connected with a criminal proceeding.',
    topics: ['Domestic criminal allegations', 'Police-related legal matters', 'Revisions and appeals'],
    framework: 'BNS, 2023 · BNSS, 2023',
    href: '/other-matters',
    offered: true
  }
];

export const offeredPracticeAreas = () => practiceAreas.filter(a => a.offered);
