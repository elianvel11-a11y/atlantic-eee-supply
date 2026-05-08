import type { Metadata } from 'next'
import { Inter_Tight, DM_Sans } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/lib/LanguageContext'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import { getSiteSettings } from '../../sanity/lib/queries'

const interTight = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://atlanticeee.com'

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: {
    default:  'Atlantic EEE Supply S.A. | Maritime & Industrial Supply — Panama',
    template: '%s | Atlantic EEE Supply',
  },
  description:
    'Marine and industrial supply for vessels, ship operators, and maritime companies in Panama. Offices in Panama City and Colón — Atlantic & Pacific access. 24-hour response.',
  keywords: [
    'maritime supply Panama',
    'ship chandler Panama',
    'marine equipment Panama Canal',
    'industrial supply vessels',
    'Atlantic EEE Supply',
    'ship suppliers Colón',
    'vessel supply Panama City',
    'SOLAS safety equipment Panama',
    'marine valves packing Panama',
  ],
  authors:   [{ name: 'Atlantic EEE Supply S.A.' }],
  creator:   'Atlantic EEE Supply S.A.',
  publisher: 'Atlantic EEE Supply S.A.',
  openGraph: {
    type:            'website',
    locale:          'en_US',
    alternateLocale: ['es_PA'],
    title:       'Atlantic EEE Supply S.A. | Maritime Supply — Panama',
    description: 'Maritime and industrial supply for vessels operating through the Panama Canal. Pacific and Atlantic access.',
    siteName:    'Atlantic EEE Supply S.A.',
    url: BASE,
    images: [
      {
        url:    '/og-image.jpg',
        width:  1200,
        height: 630,
        alt:    'Atlantic EEE Supply S.A. — Maritime & Industrial Supply, Panama',
      },
    ],
  },
  twitter: {
    card:        'summary_large_image',
    title:       'Atlantic EEE Supply S.A. | Maritime Supply — Panama',
    description: 'Marine and industrial supply at the Panama Canal. Atlantic & Pacific access.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index:  true,
    follow: true,
    googleBot: {
      index:  true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: BASE,
    languages: {
      'en': `${BASE}`,
      'es': `${BASE}`,
    },
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Atlantic EEE Supply S.A.',
  url: BASE,
  logo: `${BASE}/logo.png`,
  description: 'Maritime and industrial supply company in Panama. Serving vessels at Panama City and Colón.',
  address: [
    {
      '@type': 'PostalAddress',
      streetAddress: 'Avenida Juan Pablo II, Calle 2059',
      addressLocality: 'Panama City',
      addressCountry: 'PA',
    },
    {
      '@type': 'PostalAddress',
      streetAddress: 'Plaza Silver City, Local N25',
      addressLocality: 'Colón',
      addressCountry: 'PA',
    },
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+507-6670-4578',
      contactType: 'sales',
      availableLanguage: ['English', 'Spanish'],
    },
  ],
  sameAs: [],
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings()

  return (
    <html
      lang="en"
      className={`${interTight.variable} ${dmSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {settings?.faviconUrl && (
          <link rel="icon" href={settings.faviconUrl} />
        )}
      </head>
      <body>
        <LanguageProvider>
          <Navbar logoUrl={settings?.logoUrl ?? null} />
          {children}
          <Footer cms={settings} />
          <WhatsAppButton />
        </LanguageProvider>
      </body>
    </html>
  )
}
