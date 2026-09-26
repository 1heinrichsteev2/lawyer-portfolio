import { pickSources } from '../sources';
import type { LegalPage } from './types';

export const bailTypes = [
  { title: 'Bail in bailable offences', ref: 'BNSS s. 478', text: 'For bailable offences, release on bail is a matter of right on furnishing the bail bond or bond required. A person unable to furnish bail within a week of arrest may be treated as indigent.' },
  { title: 'Regular bail in non-bailable offences', ref: 'BNSS ss. 480, 483', text: 'Bail is at the court\'s discretion. A Magistrate\'s power is limited for offences punishable with death or life imprisonment, with exceptions for children, women, and sick or infirm persons. The Sessions Court and High Court have wider powers.' },
  { title: 'Anticipatory bail', ref: 'BNSS s. 482', text: 'A person with reason to believe they may be arrested for a non-bailable offence may apply to the Sessions Court or High Court for a direction that, if arrested, they be released on bail.' },
  { title: 'Default (statutory) bail', ref: 'BNSS s. 187', text: 'If investigation is not completed and a report not filed within 60 or 90 days (depending on the offence), the accused becomes entitled to be released on bail if they are prepared to furnish it.' }
] as const;

export const bail: LegalPage = {
  slug: 'bail',
  metaTitle: 'Bail and anticipatory bail — general information',
  metaDescription:
    'What bail means under the BNSS, the difference between regular, anticipatory and default bail, and the factors courts commonly consider.',
  kicker: 'Bail and anticipatory bail',
  heading: 'Bail, explained plainly',
  intro:
    'Bail decisions turn on the facts of each case and the discretion of the court. This page explains the concepts and the statutory framework. It does not predict or promise any outcome.',
  sections: [
    {
      id: 'meaning',
      rail: 'What bail means',
      title: 'What bail means',
      paragraphs: [
        'The BNSS defines bail for the first time: release of a person accused of or suspected of an offence from the custody of law, on conditions imposed by an officer or court, on the person executing a bond or bail bond.',
        'Bail does not decide guilt or innocence. It concerns whether a person should remain in custody while the case proceeds. Courts have long described personal liberty as the rule and its deprivation as the exception, while recognising that conditions may be necessary.'
      ],
      note: 'Prior law: bail provisions were in sections 436–439 of the Code of Criminal Procedure, 1973.'
    },
    {
      id: 'regular',
      rail: 'Regular bail',
      title: 'Regular bail',
      paragraphs: [
        'Regular bail is sought by a person who has been arrested or is in custody. For bailable offences, bail is a right. For non-bailable offences, the court exercises discretion under sections 480 and 483 of the BNSS and may impose conditions, such as appearing on dates, not leaving a specified area, and not contacting witnesses.',
        'Section 479 of the BNSS limits how long an undertrial may be detained. Where a person has been detained for up to one half of the maximum period of imprisonment for the offence, release is ordinarily to follow, and for a first-time offender the threshold is one third, subject to the exceptions in that section.'
      ]
    },
    {
      id: 'anticipatory',
      rail: 'Anticipatory bail',
      title: 'Anticipatory bail',
      paragraphs: [
        'Anticipatory bail is protection sought before arrest. Under section 482 of the BNSS, the High Court or the Court of Session may direct that, in the event of arrest, the applicant be released on bail. The court may attach conditions, such as making oneself available for interrogation and not leaving India without permission.',
        'It is not available for every offence. Section 482 itself excludes certain grave offences against children, and some special statutes restrict it further. Whether it can be sought, and in which court, depends on the offence alleged.'
      ]
    },
    {
      id: 'factors',
      rail: 'Factors courts consider',
      title: 'Factors courts may consider',
      paragraphs: ['There is no fixed formula. Courts weigh the circumstances of each case, and considerations frequently discussed in judgments include:'],
      points: [
        'The nature and gravity of the accusation and the severity of the possible punishment.',
        'The nature of the evidence gathered so far, at a prima facie level.',
        'The likelihood of the accused fleeing from justice.',
        'Any risk of tampering with evidence or influencing witnesses.',
        'The antecedents of the applicant and the period already spent in custody.',
        'The stage of the investigation or trial.'
      ]
    },
    {
      id: 'facts',
      rail: 'Why facts matter',
      title: 'Why individual facts matter',
      paragraphs: [
        'Two cases under the same section can lead to different bail outcomes because the facts, the evidence and the stage of proceedings differ. Delay, health, the conduct of the parties and the terms of any earlier orders may all be relevant.',
        'No lawyer can guarantee that bail will be granted. Anyone facing arrest or custody should seek advice specific to their situation from a qualified advocate. Free legal aid may be available through the Legal Services Authorities.'
      ]
    }
  ],
  authorities: [
    { name: 'Gudikanti Narasimhulu v. Public Prosecutor', citation: '(1978) 1 SCC 240', point: 'Bail discretion is to be exercised judicially, with regard to personal liberty.', priorLaw: true },
    { name: 'Sushila Aggarwal v. State (NCT of Delhi)', citation: '(2020) 5 SCC 1', point: 'Anticipatory bail need not invariably be limited to a fixed period; conditions depend on the case.', priorLaw: true },
    { name: 'Satender Kumar Antil v. CBI', citation: '(2022) 10 SCC 51', point: 'Guidelines on bail, including categories of offences and compliance with arrest safeguards.', priorLaw: true }
  ],
  sources: pickSources('indiaCode', 'sci', 'nalsa')
};
