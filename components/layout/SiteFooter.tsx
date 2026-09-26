import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';
import { advocate, isPlaceholder } from '@/data/advocate';
import { fullNav, legalNav } from '@/data/navigation';
import { activeSocialLinks } from '@/data/socialLinks';
import { ArchMark } from '@/components/navigation/Logo';
import { FacebookGlyph, InstagramGlyph, LinkedinGlyph, YoutubeGlyph } from '@/components/ui/SocialGlyphs';

const glyphs = { instagram: InstagramGlyph, linkedin: LinkedinGlyph, youtube: YoutubeGlyph, facebook: FacebookGlyph };

export default function SiteFooter() {
  const socials = activeSocialLinks();
  const year = new Date().getFullYear();
  const emailOk = !isPlaceholder(advocate.email);
  const phoneOk = Boolean(advocate.phoneHref);

  return (
    <footer className="relative mt-32 border-t border-ivory/[0.08] bg-carbon/60">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-champagne/40 to-transparent" />
      <div className="shell grid gap-14 py-20 md:grid-cols-12">
        <div className="md:col-span-5">
          <ArchMark className="h-10 w-9 text-ivory" />
          <p className="mt-6 font-display text-[2rem] leading-none">{advocate.name}</p>
          <p className="mt-2 text-[0.9rem] text-stone">{advocate.designation}</p>
          <dl className="mt-8 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-[0.85rem]">
            <dt className="text-stone">Enrolment</dt>
            <dd className="text-ivory/80">{advocate.enrolmentNumber}</dd>
            <dt className="text-stone">Bar Council</dt>
            <dd className="text-ivory/80">{advocate.stateBarCouncilCurrent}</dd>
            <dt className="text-stone">Courts</dt>
            <dd className="text-ivory/80">{advocate.courts}</dd>
          </dl>
        </div>

        <nav aria-label="Footer" className="md:col-span-3">
          <p className="label">Pages</p>
          <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2.5 text-[0.9rem] md:grid-cols-1">
            {fullNav.map(item => (
              <li key={item.href}>
                <Link href={item.href} className="link-underline text-ivory/75 hover:text-ivory">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          <p className="label">Contact details</p>
          <ul className="mt-5 space-y-3.5 text-[0.9rem] text-ivory/80">
            <li className="flex gap-3">
              <Mail aria-hidden="true" className="mt-0.5 h-4 w-4 text-champagne/80" strokeWidth={1.5} />
              {emailOk ? (
                <a href={`mailto:${advocate.email}`} className="link-underline hover:text-ivory">
                  {advocate.email}
                </a>
              ) : (
                <span>{advocate.email}</span>
              )}
            </li>
            <li className="flex gap-3">
              <Phone aria-hidden="true" className="mt-0.5 h-4 w-4 text-champagne/80" strokeWidth={1.5} />
              {phoneOk ? (
                <a href={`tel:${advocate.phoneHref}`} className="link-underline hover:text-ivory">
                  {advocate.phone}
                </a>
              ) : (
                <span>{advocate.phone}</span>
              )}
            </li>
            <li className="flex gap-3">
              <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-champagne/80" strokeWidth={1.5} />
              {advocate.mapUrl ? (
                <a href={advocate.mapUrl} target="_blank" rel="noopener noreferrer" className="link-underline hover:text-ivory">
                  {advocate.officeAddress}
                  <span className="sr-only"> (opens map in a new tab)</span>
                </a>
              ) : (
                <span>{advocate.officeAddress}</span>
              )}
            </li>
          </ul>
          {socials.length > 0 && (
            <ul className="mt-8 flex gap-3" aria-label="Social profiles">
              {socials.map(s => {
                const Glyph = glyphs[s.key];
                return (
                  <li key={s.key}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${s.label} (opens in a new tab)`}
                      className="grid h-10 w-10 place-items-center rounded-full border border-ivory/15 text-ivory/75 transition-colors hover:border-champagne/60 hover:text-ivory"
                    >
                      <Glyph className="h-[18px] w-[18px]" />
                    </a>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      <div className="shell border-t border-ivory/[0.06] py-8">
        <p className="max-w-4xl text-[0.8rem] leading-relaxed text-stone">
          The information on this website is general legal information and not legal advice. Viewing this website, or
          contacting the advocate through it, does not create an advocate–client relationship. No outcome is guaranteed in any
          matter. This website is maintained in accordance with the Bar Council of India Rules; the particulars published here
          are furnished by the advocate, who declares them to be true.
        </p>
        <div className="mt-6 flex flex-col gap-4 text-[0.8rem] text-stone sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {advocate.name}. All rights reserved.
          </p>
          <ul className="flex gap-6">
            {legalNav.map(item => (
              <li key={item.href}>
                <Link href={item.href} className="link-underline hover:text-ivory">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
