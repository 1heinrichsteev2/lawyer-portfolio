# Advocate website

A multi-page Next.js website for an Indian advocate practising in criminal law and connected litigation.
All legal content reflects the BNS, BNSS and BSA (in force from 1 July 2024). Prior-law references (IPC, CrPC, Indian Evidence Act) are labelled as such.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm run start   # production
```

Requires Node.js 20.9 or later.

## Where to edit

| What | File |
| --- | --- |
| Advocate name, enrolment, Bar Council, courts, email, phone, address, map link | `data/advocate.ts` |
| Social links (Instagram, LinkedIn, YouTube, Facebook) — empty = hidden | `data/socialLinks.ts` → `SOCIAL_LINKS` |
| Hero artwork | `public/images/hero-lawyer.png`, configured in `data/images.ts` (`hero`; `focusX` sets the mobile crop) |
| Future photographs | `data/images.ts` — put files in `public/images/`, set `src` |
| Intro loader on/off | `data/site.ts` → `showIntroLoader` (plays only on the first page of a session) |
| Practice areas (set `offered: false` to hide one) | `data/practiceAreas.ts` |
| Articles (drafts until `status: 'published'`) | `data/articles.ts` |
| Criminal law / Bail / Cybercrime / Other matters page text | `data/content/*.ts` |
| Approach statements | `data/approach.ts` |
| Site URL, SEO text, disclaimer gate on/off, review date | `data/site.ts` and `.env` (see `.env.example`) |
| Contact form endpoint | `NEXT_PUBLIC_CONTACT_ENDPOINT` in `.env` |

Placeholders appear as `[LIKE THIS]`. Nothing factual about the advocate has been invented.

## Contact form

With no endpoint configured the form validates input but sends nothing, and tells the visitor so.
To enable it, set `NEXT_PUBLIC_CONTACT_ENDPOINT` to an HTTPS URL that accepts a JSON POST (`name, email, phone, topic, message`)
and returns a 2xx status. The privacy policy's contact-form section switches its wording automatically once an endpoint is set.

## React Bits components

Official implementations (TS + Tailwind variants) from github.com/DavidHDev/react-bits, adapted for production:

- Splash Cursor — `components/animations/SplashCursor.tsx` (arrow cursor stays visible; idles to zero GPU work; desktop only; off for reduced motion)
- Blur Text, Rotating Text, True Focus — `components/animations/`
- Bubble Menu — `components/navigation/BubbleMenu.tsx`
- Line Sidebar — `components/navigation/SectionRail.tsx`
- Accordion Gallery — `components/sections/PracticeAccordion.tsx`
- Glass Icons, Border Glow, Branched Menu, Jelly Radio, Hold Button — `components/ui/`

## Compliance notes (please review)

- Bar Council of India Rule 36 (with its 2008 proviso and Schedule) limits an advocate's website to specified particulars.
  The site publishes those particulars plus general legal information. The Legal Insights articles and social links go beyond
  the bare Schedule; confirm with your State Bar Council before publishing them.
- The disclaimer and privacy texts are templates and have not been approved by any Bar Council.
- Draft articles are marked "Draft", excluded from the sitemap and set to `noindex`.
- No testimonials, ratings, rankings, results, statistics or superiority claims are included.

## Hero rendering guarantees

The hero image never depends on JavaScript to appear: it is server-rendered with `priority`, its frame has a CSS
aspect-ratio (so it always has height), and its entrance effects are CSS keyframes that start from a visible state.
The first page load has no page-level fade, and the intro loader is decided before first paint and exits on a
CSS timer, so it never lingers over the hero. Verified with JavaScript disabled, on hard refresh, direct URL,
client-side navigation, in `npm run dev` and `npm run start`, at 320–1920px, by sampling screenshot pixels.

## Quality checks run

`npm run build`, `npm run lint` and `tsc` pass with no errors. All 19 pages and every internal link were crawled (no broken links, no `#` hrefs).
No horizontal overflow at 320, 375, 390, 414, 768, 1024, 1280, 1440 and 1920px. Keyboard tests: disclaimer dialog, menu (focus in, Escape, focus return),
Hold Button, Jelly Radio filtering, contact form validation. Reduced-motion mode disables the cursor effect and heavy animation.
