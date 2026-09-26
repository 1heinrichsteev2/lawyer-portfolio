export type NavItem = { label: string; href: string };

/** Top bar (desktop). */
export const primaryNav: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Practice areas', href: '/practice' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' }
];

/** Full menu (bubble menu). */
export const fullNav: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Practice areas', href: '/practice' },
  { label: 'Criminal law', href: '/criminal-law' },
  { label: 'Bail', href: '/bail' },
  { label: 'Cybercrime', href: '/cybercrime' },
  { label: 'Other matters', href: '/other-matters' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' }
];

export const legalNav: NavItem[] = [
  { label: 'Disclaimer', href: '/disclaimer' },
  { label: 'Privacy policy', href: '/privacy' }
];
