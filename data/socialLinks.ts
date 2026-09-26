/**
 * SOCIAL LINKS — paste full URLs (https://...) when available.
 * Empty strings are hidden automatically everywhere on the site. Nothing is invented.
 */
export const SOCIAL_LINKS = {
  instagram: '',
  linkedin: '',
  youtube: '',
  facebook: ''
} as const;

export type SocialKey = keyof typeof SOCIAL_LINKS;

export const SOCIAL_LABELS: Record<SocialKey, string> = {
  instagram: 'Instagram',
  linkedin: 'LinkedIn',
  youtube: 'YouTube',
  facebook: 'Facebook'
};

export const activeSocialLinks = () =>
  (Object.keys(SOCIAL_LINKS) as SocialKey[])
    .filter(key => /^https?:\/\//.test(SOCIAL_LINKS[key]))
    .map(key => ({ key, label: SOCIAL_LABELS[key], href: SOCIAL_LINKS[key] }));
