import { pickSources } from '../sources';
import type { LegalPage } from './types';

export const otherMatterCategories = [
  { id: 'fraud', label: 'Fraud and cheating', text: 'Cheating under section 318 of the BNS involves deceiving a person and thereby dishonestly inducing them to deliver property or to do or omit something. Intention at the time of the representation is central.', refs: 'BNS ss. 318, 319 · prior law IPC ss. 415–420' },
  { id: 'cbt', label: 'Criminal breach of trust', text: 'Where property is entrusted to a person who dishonestly misappropriates it or uses it in violation of the trust. Aggravated forms apply to carriers, clerks, servants, agents and public servants.', refs: 'BNS s. 316 · prior law IPC ss. 405–409' },
  { id: 'property', label: 'Property disputes with criminal allegations', text: 'Land and tenancy disputes sometimes involve allegations of trespass, mischief, forgery or intimidation. Courts examine whether a dispute that is essentially civil has been given a criminal colour.', refs: 'BNS ss. 324, 329, 336 · civil remedies' },
  { id: 'financial', label: 'Financial offences', text: 'Allegations arising from business, lending, investment or employment, often turning on accounts, agreements and correspondence. Special statutes may apply alongside the BNS.', refs: 'BNS · special statutes' },
  { id: 'cheque', label: 'Cheque dishonour', text: 'Dishonour of a cheque for insufficiency of funds may give rise to a complaint under section 138 of the Negotiable Instruments Act, 1881, which has its own notice requirements and timelines.', refs: 'NI Act, 1881, s. 138' },
  { id: 'domestic', label: 'Domestic criminal allegations', text: 'Cruelty by a husband or his relatives, and dowry-related allegations, are offences under the BNS and the Dowry Prohibition Act, 1961. Civil protection is separately available under the Protection of Women from Domestic Violence Act, 2005.', refs: 'BNS ss. 80, 85, 86 · prior law IPC ss. 304B, 498A' },
  { id: 'digital', label: 'Digital offences', text: 'Offences committed through devices and networks, covered in more detail on the Cybercrime page.', refs: 'IT Act, 2000 · BNS' },
  { id: 'related', label: 'Related litigation', text: 'Proceedings connected with a criminal case, such as applications for release of seized property, revisions, appeals and petitions before the High Court.', refs: 'BNSS' }
] as const;

export const otherMatters: LegalPage = {
  slug: 'other-matters',
  metaTitle: 'Other matters — fraud, breach of trust, property and connected litigation',
  metaDescription:
    'General information on cheating, criminal breach of trust, property disputes with criminal allegations, financial offences, cheque dishonour and domestic criminal allegations.',
  kicker: 'Other matters',
  heading: 'Where civil life meets criminal law',
  intro:
    'Many criminal matters grow out of ordinary transactions: a sale, a loan, a lease, a family relationship. This page outlines the offences most often alleged in those settings.',
  sections: [
    {
      id: 'civil-criminal',
      rail: 'Civil or criminal',
      title: 'Civil dispute or criminal offence?',
      paragraphs: [
        'The same facts can give rise to both civil remedies and criminal proceedings. The Supreme Court has repeatedly cautioned against using criminal proceedings to pursue what are essentially civil disputes, while recognising that a genuine offence is not excused because a civil remedy also exists.',
        'In cheating, for instance, the question is often whether there was dishonest intention at the start of the transaction, as distinct from a later failure to perform a promise.'
      ]
    },
    {
      id: 'documents',
      rail: 'Documents',
      title: 'The role of documents',
      paragraphs: [
        'In financial and property matters, agreements, receipts, bank statements, correspondence and electronic records usually carry much of the weight. Keeping originals safe and organised is generally sensible for anyone involved in such a dispute.'
      ]
    }
  ],
  authorities: [
    { name: 'Indian Oil Corporation v. NEPC India Ltd.', citation: '(2006) 6 SCC 736', point: 'Caution against converting civil disputes into criminal prosecutions.', priorLaw: true }
  ],
  sources: pickSources('indiaCode', 'sci')
};
