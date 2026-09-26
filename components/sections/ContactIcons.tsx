import { Mail, MapPin, Phone } from 'lucide-react';
import GlassIcons, { type GlassIconsItem } from '@/components/ui/GlassIcons';
import { FacebookGlyph, InstagramGlyph, LinkedinGlyph, YoutubeGlyph } from '@/components/ui/SocialGlyphs';
import { advocate, isPlaceholder } from '@/data/advocate';
import { activeSocialLinks } from '@/data/socialLinks';

const glyphs = { instagram: InstagramGlyph, linkedin: LinkedinGlyph, youtube: YoutubeGlyph, facebook: FacebookGlyph };

export default function ContactIcons({ includeSocial = true, className }: { includeSocial?: boolean; className?: string }) {
  const items: GlassIconsItem[] = [
    {
      icon: <Mail className="h-full w-full" strokeWidth={1.5} />,
      label: 'Email',
      caption: advocate.email,
      href: isPlaceholder(advocate.email) ? undefined : `mailto:${advocate.email}`,
      tone: 'champagne'
    },
    {
      icon: <Phone className="h-full w-full" strokeWidth={1.5} />,
      label: 'Phone',
      caption: advocate.phone,
      href: advocate.phoneHref ? `tel:${advocate.phoneHref}` : undefined,
      tone: 'graphite'
    },
    {
      icon: <MapPin className="h-full w-full" strokeWidth={1.5} />,
      label: 'Office',
      caption: advocate.officeAddress,
      href: advocate.mapUrl || undefined,
      external: true,
      tone: 'ivory'
    }
  ];
  if (includeSocial) {
    for (const s of activeSocialLinks()) {
      const G = glyphs[s.key];
      items.push({ icon: <G className="h-full w-full" />, label: s.label, caption: 'Opens in a new tab', href: s.href, external: true, tone: 'graphite' });
    }
  }
  return <GlassIcons items={items} className={className} />;
}
