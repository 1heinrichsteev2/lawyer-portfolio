/** Authoritative sources referenced across the site. Root domains only — no guessed deep links. */
export type Source = { id: string; title: string; publisher: string; url: string };

export const sources: Record<string, Source> = {
  indiaCode: {
    id: 'indiaCode',
    title: 'India Code — official repository of Central Acts (BNS, BNSS, BSA, IT Act)',
    publisher: 'Legislative Department, Ministry of Law and Justice',
    url: 'https://www.indiacode.nic.in/'
  },
  mha: {
    id: 'mha',
    title: 'New criminal laws — information and notifications',
    publisher: 'Ministry of Home Affairs, Government of India',
    url: 'https://www.mha.gov.in/'
  },
  sci: {
    id: 'sci',
    title: 'Judgments and orders',
    publisher: 'Supreme Court of India',
    url: 'https://www.sci.gov.in/'
  },
  legalAffairs: {
    id: 'legalAffairs',
    title: 'Department of Legal Affairs',
    publisher: 'Ministry of Law and Justice',
    url: 'https://legalaffairs.gov.in/'
  },
  bci: {
    id: 'bci',
    title: 'Bar Council of India Rules, Part VI, Chapter II (including Rule 36)',
    publisher: 'Bar Council of India',
    url: 'https://www.barcouncilofindia.org/'
  },
  pibOnlineLegal: {
    id: 'pibOnlineLegal',
    title: 'Regulation for Online Legal Services (9 August 2024)',
    publisher: 'Press Information Bureau, Ministry of Law and Justice',
    url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2043470'
  },
  cyberPortal: {
    id: 'cyberPortal',
    title: 'National Cyber Crime Reporting Portal (helpline 1930)',
    publisher: 'Indian Cyber Crime Coordination Centre (I4C), Ministry of Home Affairs',
    url: 'https://cybercrime.gov.in/'
  },
  meity: {
    id: 'meity',
    title: 'Information Technology Act, 2000 and related rules',
    publisher: 'Ministry of Electronics and Information Technology',
    url: 'https://www.meity.gov.in/'
  },
  nalsa: {
    id: 'nalsa',
    title: 'Free legal aid and legal services authorities',
    publisher: 'National Legal Services Authority',
    url: 'https://nalsa.gov.in/'
  }
};

export const pickSources = (...ids: (keyof typeof sources)[]) => ids.map(id => sources[id]);
