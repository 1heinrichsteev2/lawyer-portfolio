/**
 * ADVOCATE DETAILS — the single source of truth for every factual detail on the site.
 *
 * Replace each bracketed placeholder with verified information only.
 * Under Rule 36 of the Bar Council of India Rules (and its 2008 proviso/Schedule), an
 * advocate's website may furnish: name; address, telephone, e-mail; enrolment number and
 * date; State Bar Council(s); Bar Association; professional and academic qualifications;
 * and areas of practice. Keep additions within those particulars unless you have
 * confirmed with your State Bar Council that something else is permitted.
 *
 * Any field left as a placeholder is still shown as a placeholder (never as invented data).
 */
export const advocate = {
  name: '[ADVOCATE NAME]',
  /** Short form for the logo lock-up, e.g. initials. */
  shortName: '[ADVOCATE NAME]',
  designation: 'Advocate',
  enrolmentNumber: '[ENROLMENT NUMBER]',
  enrolmentDate: '[DATE OF ENROLMENT]',
  stateBarCouncilOriginal: '[STATE BAR COUNCIL — ORIGINAL ENROLMENT]',
  stateBarCouncilCurrent: '[STATE BAR COUNCIL — CURRENT ROLL]',
  barAssociation: '[BAR ASSOCIATION MEMBERSHIP]',
  education: ['[EDUCATION — DEGREE, INSTITUTION]', '[EDUCATION — DEGREE, INSTITUTION]'],
  professionalQualifications: ['[PROFESSIONAL QUALIFICATION]'],
  courts: '[COURTS / JURISDICTION]',
  city: '[CITY]',
  email: '[EMAIL ADDRESS]',
  phone: '[PHONE NUMBER]',
  /** Digits only with country code for tel: links, e.g. "+919876543210". Leave empty until known. */
  phoneHref: '',
  officeAddress: '[OFFICE ADDRESS]',
  officeHours: '[OFFICE HOURS]',
  /** Optional Google Maps / map link for the office. Leave empty to hide the map link. */
  mapUrl: '',
  professionalInformation: '[PROFESSIONAL INFORMATION — a short, factual paragraph supplied and verified by the advocate]'
} as const;

/** True when a value is still an unfilled placeholder like "[EMAIL ADDRESS]". */
export const isPlaceholder = (value: string | undefined | null) =>
  !value || /^\[.*\]$/.test(value.trim());
