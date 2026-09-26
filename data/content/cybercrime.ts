import { pickSources } from '../sources';
import type { LegalPage } from './types';

export const cyberTopics = [
  { title: 'Online financial fraud', text: 'Unauthorised transactions, investment or job scams, fake payment requests and similar deceptions carried out through digital channels.', refs: 'BNS s. 318 · IT Act s. 66D' },
  { title: 'Identity-related offences', text: 'Fraudulent or dishonest use of another person\'s password, electronic signature or other unique identification feature.', refs: 'IT Act s. 66C' },
  { title: 'Impersonation', text: 'Cheating by pretending to be another person, including through fake profiles, cloned accounts and spoofed messages.', refs: 'BNS s. 319 · IT Act s. 66D' },
  { title: 'Account compromise', text: 'Unauthorised access to e-mail, social media or banking accounts, and damage to computer systems or data.', refs: 'IT Act ss. 43, 66' },
  { title: 'Online harassment', text: 'Stalking, including monitoring a woman\'s use of the internet or electronic communication, criminal intimidation, and publication of private images without consent.', refs: 'BNS ss. 78, 351 · IT Act ss. 66E, 67' },
  { title: 'Electronic records', text: 'Messages, logs, e-mails and files used as evidence, and the certificate that ordinarily accompanies them.', refs: 'BSA ss. 61, 63' }
] as const;

export const cybercrime: LegalPage = {
  slug: 'cybercrime',
  metaTitle: 'Cybercrime — general legal information',
  metaDescription:
    'General information on online fraud, identity offences, account compromise, online harassment and digital evidence under the IT Act, BNS and BSA.',
  kicker: 'Cybercrime',
  heading: 'Offences that leave a digital trail',
  intro:
    'Cyber offences are dealt with under the Information Technology Act, 2000 together with the Bharatiya Nyaya Sanhita, 2023. Electronic evidence is governed by the Bharatiya Sakshya Adhiniyam, 2023.',
  sections: [
    {
      id: 'law',
      rail: 'Applicable law',
      title: 'Which laws apply',
      paragraphs: [
        'The Information Technology Act, 2000 contains specific offences involving computers and networks, such as identity theft (section 66C), cheating by personation using a computer resource (section 66D) and violation of privacy (section 66E). Section 43 deals with unauthorised access and damage, which may also lead to proceedings under section 66.',
        'Many online offences are also offences under the BNS, for example cheating (section 318), cheating by personation (section 319), forgery of documents including electronic records, and criminal intimidation (section 351). Which provisions apply depends on what happened and how.'
      ]
    },
    {
      id: 'reporting',
      rail: 'Reporting',
      title: 'Reporting a cyber offence',
      paragraphs: [
        'Complaints may be made at a police station, including a cyber cell where one exists, or through the National Cyber Crime Reporting Portal run by the Ministry of Home Affairs. The national helpline 1930 is intended for reporting online financial fraud, where speed can matter for requesting that funds be held.',
        'Under the BNSS, information about a cognizable offence may also be given by electronic communication, subject to it being signed within three days.'
      ],
      note: 'Use only the official portal and helpline. Be cautious of anyone contacting you and claiming to recover lost money for a fee.'
    },
    {
      id: 'evidence',
      rail: 'Digital evidence',
      title: 'Digital evidence',
      paragraphs: [
        'Electronic records can be decisive, and they can also be altered or lost. People commonly keep the original device, full screenshots showing dates and identifiers, transaction references, URLs, e-mail headers and the complete conversation rather than extracts.',
        'In court, an electronic record produced as secondary evidence is ordinarily accompanied by a certificate under section 63 of the BSA. The BNSS also provides for the recording of search and seizure through audio-video electronic means.'
      ],
      note: 'Prior law: section 65B of the Indian Evidence Act, 1872. See Anvar P.V. v. P.K. Basheer, (2014) 10 SCC 473 and Arjun Panditrao Khotkar v. Kailash Kushanrao Gorantyal, (2020) 7 SCC 1.'
    },
    {
      id: 'accused',
      rail: 'If you are accused',
      title: 'If an allegation is made against you',
      paragraphs: [
        'Online allegations sometimes involve shared devices, compromised accounts or mistaken identity. The same procedural safeguards on notices, arrest and bail apply as in any other criminal matter.',
        'Because the facts are often technical, it helps to seek advice early, before responding to notices or handing over devices, so that your rights and obligations are clear.'
      ]
    }
  ],
  sources: pickSources('indiaCode', 'cyberPortal', 'meity', 'mha')
};
