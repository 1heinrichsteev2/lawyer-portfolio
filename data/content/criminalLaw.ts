import { pickSources } from '../sources';
import type { LegalPage } from './types';

/** The procedural stages in the order they usually occur. Used for the numbered timeline. */
export const procedureStages = [
  { id: 'information', title: 'Information or complaint', ref: 'BNSS ss. 173, 223', text: 'A criminal case usually begins with information to the police about a cognizable offence, or a complaint made directly to a Magistrate.' },
  { id: 'investigation', title: 'Investigation', ref: 'BNSS ss. 176–193', text: 'Police collect evidence, record statements and may conduct searches. Serious offences attract forensic procedures.' },
  { id: 'arrest', title: 'Arrest and custody', ref: 'BNSS ss. 35–62, 187', text: 'Arrest is governed by statutory safeguards, including production before a Magistrate within 24 hours.' },
  { id: 'bail', title: 'Bail', ref: 'BNSS ss. 478–483', text: 'Release from custody on conditions, decided by the police or a court depending on the offence.' },
  { id: 'report', title: 'Police report', ref: 'BNSS s. 193', text: 'On completing investigation, the police file a report before the Magistrate, commonly called a charge-sheet or final report.' },
  { id: 'charge', title: 'Cognizance, discharge or charge', ref: 'BNSS ss. 210, 250–251, 262–263', text: 'The court takes cognizance, supplies documents, and either discharges the accused or frames a charge.' },
  { id: 'trial', title: 'Trial and judgment', ref: 'BNSS · BSA', text: 'Witnesses are examined and cross-examined, the accused may be questioned by the court, arguments are heard and judgment follows.' },
  { id: 'remedies', title: 'Remedies', ref: 'BNSS s. 528 · Constitution Art. 226', text: 'Appeals, revisions, and in suitable cases petitions to the High Court, including for quashing of proceedings.' }
] as const;

export const criminalLaw: LegalPage = {
  slug: 'criminal-law',
  metaTitle: 'Criminal law — how proceedings work in India',
  metaDescription:
    'General information on FIRs, complaints, investigation, arrest, bail, evidence and trial under the BNS, BNSS and BSA, in force since 1 July 2024.',
  kicker: 'Criminal law',
  heading: 'Understanding',
  rotating: ['the FIR', 'investigation', 'arrest', 'the trial'],
  intro:
    'An overview of how a criminal proceeding moves in India under the current framework. It explains terms and stages in general. It is not advice on any particular case.',
  sections: [
    {
      id: 'framework',
      rail: 'The framework',
      title: 'The framework since 1 July 2024',
      paragraphs: [
        'Three statutes now form the core of Indian criminal law. The Bharatiya Nyaya Sanhita, 2023 (BNS) defines offences and punishments. The Bharatiya Nagarik Suraksha Sanhita, 2023 (BNSS) sets out procedure: police powers, arrest, bail, inquiry and trial. The Bharatiya Sakshya Adhiniyam, 2023 (BSA) governs evidence.',
        'They replaced the Indian Penal Code, 1860, the Code of Criminal Procedure, 1973 and the Indian Evidence Act, 1872. Section numbers have changed, so older references need to be read carefully. For example, anticipatory bail, formerly section 438 of the Code of Criminal Procedure, is now section 482 of the BNSS, while the High Court\'s inherent powers, formerly section 482, are now section 528.',
        'Proceedings that began before 1 July 2024 may continue under the earlier law in certain respects. Which law applies to a given case depends on its facts and dates.'
      ],
      note: 'IPC, CrPC and Indian Evidence Act references on this site are historical and marked as prior law.'
    },
    {
      id: 'fir',
      rail: 'FIR and complaint',
      title: 'FIR and criminal complaint',
      paragraphs: [
        'Information about a cognizable offence may be given to the officer in charge of a police station orally or by electronic communication, and is recorded as a First Information Report under section 173 of the BNSS. It can be given at any police station irrespective of where the offence occurred (commonly called a zero FIR). Information given electronically is to be signed by the informant within three days before it is taken on record. The informant is entitled to a free copy.',
        'For offences punishable with three years or more but less than seven years, the BNSS permits a preliminary enquiry, with the permission of a senior officer, to be completed within fourteen days, to decide whether a prima facie case exists.',
        'Where the police refuse to record information, the person may send the substance of it to the Superintendent of Police, and may apply to a Magistrate under section 175(3), supported by an affidavit.',
        'Separately, a person may make a complaint directly to a Magistrate under section 223. The Magistrate examines the complainant and witnesses. The BNSS provides that the accused is to be given an opportunity of being heard before the Magistrate takes cognizance on a complaint.'
      ]
    },
    {
      id: 'investigation',
      rail: 'Investigation',
      title: 'Investigation',
      paragraphs: [
        'Investigation includes visiting the scene, recording statements, collecting documents and electronic records, and conducting searches and seizures. The BNSS requires searches and seizures to be recorded through audio-video electronic means, and for offences punishable with seven years or more, a forensic expert is to visit the crime scene.',
        'A person who receives a notice to appear from the police is generally required to comply with its terms. Statements recorded by police are not signed by the person making them, and their use at trial is limited by law.'
      ]
    },
    {
      id: 'arrest',
      rail: 'Arrest',
      title: 'Arrest and constitutional safeguards',
      paragraphs: [
        'Article 21 of the Constitution protects life and personal liberty. Article 22 requires that a person arrested be informed of the grounds of arrest, be allowed to consult a legal practitioner of their choice, and be produced before the nearest Magistrate within twenty-four hours, excluding travel time.',
        'The BNSS restates and extends these protections. Where arrest is not required, police may issue a notice of appearance under section 35(3). Section 47 requires the grounds of arrest, and for bailable offences the right to bail, to be communicated. Section 48 requires a relative or friend to be informed. Section 38 permits the arrested person to meet an advocate of their choice during interrogation, though not necessarily throughout it.',
        'After production, a Magistrate may authorise detention under section 187. Police custody of up to fifteen days may be authorised in whole or in parts during the initial period of detention, within the limits set by that section.'
      ]
    },
    {
      id: 'evidence',
      rail: 'Evidence',
      title: 'Evidence under the BSA',
      paragraphs: [
        'Evidence is broadly oral (statements of witnesses before the court) and documentary. Under the BSA, "document" includes electronic and digital records, and an electronic record is not inadmissible merely because it is electronic.',
        'Electronic records produced as secondary evidence are ordinarily accompanied by a certificate in the form prescribed under section 63 of the BSA. The general principle remains that the prosecution must prove its case beyond reasonable doubt, and Article 20(3) protects a person accused of an offence from being compelled to be a witness against themselves.'
      ],
      note: 'Prior law: section 65B of the Indian Evidence Act, 1872 dealt with electronic records.'
    },
    {
      id: 'trial',
      rail: 'Trial',
      title: 'Charge and trial',
      paragraphs: [
        'After the police report is filed, the court decides whether to take cognizance. Copies of the report and documents are supplied to the accused. The court then hears the parties on whether there is sufficient ground to proceed. If not, the accused is discharged; if there is, a charge is framed and read to the accused.',
        'At trial, prosecution witnesses are examined and cross-examined. The court may question the accused on circumstances appearing in the evidence. The defence may lead evidence, arguments are heard, and the court delivers judgment. The BNSS also contains provisions on plea bargaining and on trials in absentia of proclaimed offenders, each subject to conditions.'
      ]
    },
    {
      id: 'remedies',
      rail: 'Remedies',
      title: 'Legal remedies',
      paragraphs: [
        'Orders passed in criminal proceedings may be subject to appeal or revision, depending on the nature of the order and the court that passed it. The High Court has inherent powers, now under section 528 of the BNSS, to prevent abuse of the process of any court or otherwise to secure the ends of justice, which include, in appropriate cases, quashing proceedings.',
        'The High Court\'s writ jurisdiction under Article 226 of the Constitution, and the Supreme Court\'s jurisdiction under Article 32 and Article 136, remain available in the circumstances recognised by law. Limitation periods apply to many remedies, so timing can matter.'
      ]
    }
  ],
  authorities: [
    { name: 'Lalita Kumari v. Government of Uttar Pradesh', citation: '(2014) 2 SCC 1', point: 'Registration of an FIR is mandatory where information discloses a cognizable offence, subject to limited preliminary enquiry.', priorLaw: true },
    { name: 'D.K. Basu v. State of West Bengal', citation: '(1997) 1 SCC 416', point: 'Guidelines on arrest and detention, many of which are now reflected in statute.', priorLaw: true },
    { name: 'Arnesh Kumar v. State of Bihar', citation: '(2014) 8 SCC 273', point: 'Arrest must not be automatic; police must record reasons against statutory criteria.', priorLaw: true },
    { name: 'State of Haryana v. Bhajan Lal', citation: '1992 Supp (1) SCC 335', point: 'Illustrative categories in which criminal proceedings may be quashed.', priorLaw: true }
  ],
  sources: pickSources('indiaCode', 'mha', 'sci')
};
