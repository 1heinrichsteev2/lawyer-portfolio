import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import AppChrome from '@/components/layout/AppChrome';
import SiteFooter from '@/components/layout/SiteFooter';
import { advocate } from '@/data/advocate';
import { site } from '@/data/site';
import './globals.css';

// Fonts are self-hosted (OFL licensed): no requests to third-party font services.
const instrument = localFont({
  src: [
    { path: './fonts/instrument-serif-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: './fonts/instrument-serif-latin-400-italic.woff2', weight: '400', style: 'italic' }
  ],
  variable: '--font-instrument',
  display: 'swap'
});
const geist = localFont({ src: './fonts/Geist-Variable.woff2', weight: '100 900', variable: '--font-geist', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: site.titleTemplate },
  description: site.description,
  applicationName: advocate.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: site.locale,
    url: '/',
    siteName: advocate.name,
    title: site.title,
    description: site.description,
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: advocate.name }]
  },
  twitter: { card: 'summary_large_image', title: site.title, description: site.description, images: ['/opengraph-image'] },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false, email: false, address: false }
};

export const viewport: Viewport = {
  themeColor: '#0A0A0A',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1
};

const INTRO_SCRIPT = `try{if(${site.showIntroLoader ? 'true' : 'false'}&&!sessionStorage.getItem('advocate-intro-seen-v1')&&!matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.setAttribute('data-intro','play')}sessionStorage.setItem('advocate-intro-seen-v1','1')}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${instrument.variable} ${geist.variable}`} suppressHydrationWarning>
      <head>
        {/* Decides before first paint whether the intro plays, so it never flashes over the hero on refresh. */}
        <script dangerouslySetInnerHTML={{ __html: INTRO_SCRIPT }} />
      </head>
      <body>
        <noscript>
          <style>{'.site-loader{display:none!important}'}</style>
        </noscript>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <AppChrome>
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <SiteFooter />
        </AppChrome>
      </body>
    </html>
  );
}
