import { pickSources, type Source } from './sources';

/**
 * LEGAL INSIGHTS — SAMPLE / DRAFT ARTICLES.
 * These are drafts prepared as starting points. Each must be reviewed, edited and approved
 * by the advocate before publication. Set `status: 'published'` and add a real date only
 * after review. Draft articles display a visible "Draft" notice.
 */
export type ArticleCategory = 'Bail' | 'Procedure' | 'Evidence' | 'Cybercrime';

export type Article = {
  slug: string;
  title: string;
  category: ArticleCategory;
  date: string;
  status: 'draft' | 'published';
  summary: string;
  body: { heading?: string; paragraphs: string[] }[];
  sources: Source[];
};

export const articleCategories: ArticleCategory[] = ['Bail', 'Procedure', 'Evidence', 'Cybercrime'];

export const articles: Article[] = [
  {
    slug: 'understanding-bail-under-bnss',
    title: 'Understanding bail under India\'s current criminal procedure framework',
    category: 'Bail',
    date: '[PUBLICATION DATE]',
    status: 'draft',
    summary:
      'How the Bharatiya Nagarik Suraksha Sanhita organises bail: bailable and non-bailable offences, the courts involved, and the new definition of bail itself.',
    body: [
      {
        paragraphs: [
          'Since 1 July 2024, bail is governed by Chapter XXXV of the Bharatiya Nagarik Suraksha Sanhita, 2023 (BNSS). The structure will be familiar to anyone who knew the Code of Criminal Procedure, 1973, but the section numbers have changed and there are some new provisions.'
        ]
      },
      {
        heading: 'A definition, at last',
        paragraphs: [
          'The BNSS defines "bail" as the release of a person accused of or suspected of an offence from the custody of law upon conditions imposed by an officer or court, on execution of a bond or bail bond. It also defines "bail bond" and "bond" separately, which clarifies the distinction between release with and without sureties.'
        ]
      },
      {
        heading: 'Where each kind of bail now sits',
        paragraphs: [
          'Bail in bailable offences is in section 478; bail in non-bailable offences before a Magistrate is in section 480; anticipatory bail is in section 482; and the special powers of the High Court and Court of Session are in section 483. Default bail, where investigation is not completed in time, arises under section 187.',
          'Section 479 addresses the maximum period for which an undertrial prisoner may be detained, including a reduced threshold for first-time offenders.'
        ]
      },
      {
        heading: 'What has not changed',
        paragraphs: [
          'The central principles developed by the Supreme Court under the earlier Code continue to be cited: that bail is concerned with securing the presence of the accused rather than punishment, and that discretion must be exercised judicially on the facts of each case. Those judgments were decided under prior law and are read with the corresponding BNSS provisions.'
        ]
      }
    ],
    sources: pickSources('indiaCode', 'mha', 'sci')
  },
  {
    slug: 'what-happens-after-an-fir',
    title: 'What happens after an FIR?',
    category: 'Procedure',
    date: '[PUBLICATION DATE]',
    status: 'draft',
    summary:
      'A plain-language walk through the steps that usually follow the registration of a First Information Report.',
    body: [
      {
        paragraphs: [
          'A First Information Report records information about a cognizable offence. Its registration starts an investigation; it does not decide that anyone is guilty.'
        ]
      },
      {
        heading: 'Investigation',
        paragraphs: [
          'The police investigate: they may visit the scene, record statements, collect documents and electronic records, and conduct searches. The BNSS requires searches and seizures to be recorded by audio-video electronic means, and provides for forensic examination of the scene for offences punishable with seven years or more.'
        ]
      },
      {
        heading: 'Notice or arrest',
        paragraphs: [
          'Arrest is not automatic. In many cases police may issue a notice requiring a person to appear, under section 35(3) of the BNSS. If a person is arrested, they must be informed of the grounds and produced before a Magistrate within twenty-four hours.'
        ]
      },
      {
        heading: 'The police report',
        paragraphs: [
          'When investigation is complete, the officer files a report under section 193 of the BNSS. The report may seek that the accused be tried, or may state that no offence is made out. The Magistrate then decides how to proceed, and the informant is entitled to be told of the outcome.'
        ]
      }
    ],
    sources: pickSources('indiaCode', 'mha')
  },
  {
    slug: 'fir-and-criminal-complaint',
    title: 'Understanding the difference between an FIR and a criminal complaint',
    category: 'Procedure',
    date: '[PUBLICATION DATE]',
    status: 'draft',
    summary:
      'Two ways to set the criminal law in motion, handled by different authorities and followed by different procedures.',
    body: [
      {
        heading: 'The FIR route',
        paragraphs: [
          'Information about a cognizable offence is given to the police and recorded under section 173 of the BNSS. The police investigate. It can be lodged at any police station, and it may be given electronically, to be signed within three days.'
        ]
      },
      {
        heading: 'The complaint route',
        paragraphs: [
          'A complaint is made directly to a Magistrate under section 223 of the BNSS. The Magistrate examines the complainant and witnesses on oath, and may postpone issuing process to inquire or have an investigation made. Under the BNSS, the accused is to be given an opportunity of being heard before cognizance is taken on a complaint.'
        ]
      },
      {
        heading: 'When police do not act',
        paragraphs: [
          'If the police decline to register information, the person may approach the Superintendent of Police, and may apply to a Magistrate under section 175(3), supported by an affidavit. Which route is appropriate depends on the facts and the offence alleged.'
        ]
      }
    ],
    sources: pickSources('indiaCode', 'sci')
  },
  {
    slug: 'digital-evidence-in-criminal-proceedings',
    title: 'Digital evidence in criminal proceedings',
    category: 'Evidence',
    date: '[PUBLICATION DATE]',
    status: 'draft',
    summary:
      'How the Bharatiya Sakshya Adhiniyam treats electronic records, and why the certificate under section 63 matters.',
    body: [
      {
        paragraphs: [
          'Messages, call records, e-mails, CCTV footage and transaction logs now appear in a large share of criminal cases. The Bharatiya Sakshya Adhiniyam, 2023 (BSA) treats electronic and digital records as documents and states that they cannot be refused admission merely because they are electronic.'
        ]
      },
      {
        heading: 'The certificate',
        paragraphs: [
          'When an electronic record is produced as secondary evidence, section 63 of the BSA ordinarily requires a certificate in the form set out in its Schedule. The prescribed form has a part to be completed by the person in charge of the device and a part by an expert.'
        ]
      },
      {
        heading: 'Continuity from prior law',
        paragraphs: [
          'Section 63 corresponds to section 65B of the Indian Evidence Act, 1872. Supreme Court decisions on section 65B, such as Anvar P.V. v. P.K. Basheer (2014) and Arjun Panditrao Khotkar v. Kailash Kushanrao Gorantyal (2020), were decided under that prior law and are read in the light of the new provision.'
        ]
      }
    ],
    sources: pickSources('indiaCode', 'sci')
  },
  {
    slug: 'understanding-anticipatory-bail',
    title: 'Understanding anticipatory bail',
    category: 'Bail',
    date: '[PUBLICATION DATE]',
    status: 'draft',
    summary:
      'What pre-arrest bail is, which courts may grant it under section 482 of the BNSS, and the limits on its availability.',
    body: [
      {
        paragraphs: [
          'Anticipatory bail is a direction that, if a person is arrested for a non-bailable offence, they shall be released on bail. It is sought before arrest from the High Court or the Court of Session.'
        ]
      },
      {
        heading: 'Conditions',
        paragraphs: [
          'Courts may attach conditions, such as making oneself available for interrogation, not inducing or threatening witnesses, and not leaving India without permission. In Sushila Aggarwal v. State (NCT of Delhi) (2020), decided under the earlier Code, the Supreme Court held that such protection need not always be limited to a fixed period.'
        ]
      },
      {
        heading: 'Limits',
        paragraphs: [
          'Section 482 of the BNSS excludes certain grave sexual offences against children, and special statutes can restrict anticipatory bail further. The availability of relief, and the court to approach, depend on the offence and the facts.'
        ]
      }
    ],
    sources: pickSources('indiaCode', 'sci')
  },
  {
    slug: 'criminal-procedure-after-2024',
    title: 'Criminal procedure after the 2024 legal changes',
    category: 'Procedure',
    date: '[PUBLICATION DATE]',
    status: 'draft',
    summary:
      'A short orientation to the BNS, BNSS and BSA for anyone reading older judgments, notices or articles that refer to the IPC or CrPC.',
    body: [
      {
        paragraphs: [
          'On 1 July 2024, the Bharatiya Nyaya Sanhita, the Bharatiya Nagarik Suraksha Sanhita and the Bharatiya Sakshya Adhiniyam came into force, replacing the Indian Penal Code, the Code of Criminal Procedure and the Indian Evidence Act.'
        ]
      },
      {
        heading: 'Reading old references',
        paragraphs: [
          'Many familiar numbers now point elsewhere. Anticipatory bail moved from section 438 to section 482; the High Court\'s inherent powers moved from section 482 to section 528; the FIR provision moved from section 154 to section 173; remand moved from section 167 to section 187.'
        ]
      },
      {
        heading: 'New features',
        paragraphs: [
          'The BNSS introduces electronic FIRs, statutory zero FIRs, audio-video recording of searches, mandatory forensic examination for more serious offences, and timelines for several procedural steps. Which law governs an older case depends on its dates and facts.'
        ]
      }
    ],
    sources: pickSources('indiaCode', 'mha')
  },
  {
    slug: 'reporting-online-financial-fraud',
    title: 'Reporting online financial fraud: the official channels',
    category: 'Cybercrime',
    date: '[PUBLICATION DATE]',
    status: 'draft',
    summary: 'Where online fraud can be reported in India and what records people commonly keep.',
    body: [
      {
        paragraphs: [
          'The Ministry of Home Affairs operates the National Cyber Crime Reporting Portal and the 1930 helpline for online financial fraud. Complaints may also be made at a police station.'
        ]
      },
      {
        heading: 'Records worth keeping',
        paragraphs: [
          'Transaction references, bank statements, screenshots showing dates and identifiers, links, phone numbers and the full conversation are commonly useful. Keeping the original device is generally better than keeping only copies.'
        ]
      }
    ],
    sources: pickSources('cyberPortal', 'indiaCode')
  }
];

export const readingTime = (article: Article) => {
  const words = article.body
    .flatMap(b => [b.heading ?? '', ...b.paragraphs])
    .join(' ')
    .split(/\s+/).length + article.summary.split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
};

export const getArticle = (slug: string) => articles.find(a => a.slug === slug);
