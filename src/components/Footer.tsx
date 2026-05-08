'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/lib/LanguageContext'
import { t, getText } from '@/lib/translations'
import { pick, type CmsSiteSettings } from '@/lib/cms'

const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
  </svg>
)

const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
)

interface FooterProps {
  cms?: CmsSiteSettings
}

const PAGES = [
  { href: '/about',      key: 'about'      as const },
  { href: '/products',   key: 'products'   as const },
  { href: '/operations', key: 'operations' as const },
  { href: '/brands',     key: 'brands'     as const },
  { href: '/contact',    key: 'contact'    as const },
]

export default function Footer({ cms }: FooterProps) {
  const { lang } = useLanguage()
  const year = new Date().getFullYear()

  const whatsapp   = cms?.whatsapp   ?? '+507 6670-4578'
  const emailSales = cms?.emailSales ?? 'sales1@atlanticshipsuppliers.com'
  const tagline    = pick(cms?.footerTagline, t.footer.tagline, lang)

  const panamaCityAddr = cms?.officePanama?.address ?? 'Av. Juan Pablo II\nCalle 2059\nPanamá, Panamá'
  const panamaCityMap  = cms?.officePanama?.mapsUrl  ?? 'https://maps.google.com/?q=Av+Juan+Pablo+II+Calle+2059+Panama'
  const colonAddr      = cms?.officeColon?.address   ?? 'Plaza Silver City\nLocal N25\nColón, Panamá'
  const colonMap       = cms?.officeColon?.mapsUrl   ?? 'https://maps.google.com/?q=Plaza+Silver+City+Colon+Panama'

  const waHref = whatsapp.replace(/\D/g, '')

  return (
    <footer className="bg-navy text-white">
      <div className="h-px bg-gradient-to-r from-transparent via-blue-accent/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-14">

          {/* Brand + description */}
          <div className="col-span-2 lg:col-span-2">
            <div className="mb-5">
              {cms?.logoUrl ? (
                <Image
                  src={cms.logoUrl}
                  alt="Atlantic EEE Supply"
                  height={36}
                  width={180}
                  className="h-9 w-auto object-contain brightness-0 invert opacity-90"
                />
              ) : (
                <>
                  <p className="font-display font-semibold text-[13px] tracking-[0.16em] uppercase text-white mb-0.5">
                    Atlantic EEE Supply
                  </p>
                  <p className="font-body text-[9px] tracking-[0.3em] text-white/30 uppercase">
                    S.A. — Republic of Panama
                  </p>
                </>
              )}
            </div>
            <p className="font-body text-[13px] text-white/55 leading-relaxed mb-6 max-w-xs">
              {tagline}
            </p>
            <div className="space-y-1.5">
              <a
                href={`https://wa.me/${waHref}`}
                className="flex items-center gap-2 font-body text-xs text-white/45 hover:text-white transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-accent flex-shrink-0" />
                WhatsApp: {whatsapp}
              </a>
              <a
                href={`mailto:${emailSales}`}
                className="font-body text-xs text-white/40 hover:text-white transition-colors block"
              >
                {emailSales}
              </a>
            </div>
            {/* Social links — shown when configured in CMS */}
            {(cms?.linkedin || cms?.instagram || cms?.facebook) && (
              <div className="flex gap-4 mt-5">
                {cms.linkedin && (
                  <a href={cms.linkedin} target="_blank" rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="text-white/30 hover:text-white transition-colors">
                    <LinkedInIcon />
                  </a>
                )}
                {cms.instagram && (
                  <a href={cms.instagram} target="_blank" rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="text-white/30 hover:text-white transition-colors">
                    <InstagramIcon />
                  </a>
                )}
                {cms.facebook && (
                  <a href={cms.facebook} target="_blank" rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="text-white/30 hover:text-white transition-colors">
                    <FacebookIcon />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Navigation */}
          <div>
            <p className="font-body text-[10px] tracking-[0.22em] uppercase text-white/30 mb-4">
              {getText(t.footer.links, lang)}
            </p>
            <nav className="flex flex-col gap-2.5">
              {PAGES.map(({ href, key }) => (
                <Link
                  key={href}
                  href={href}
                  className="font-body text-[13px] text-white/55 hover:text-white transition-colors"
                >
                  {getText(t.nav[key], lang)}
                </Link>
              ))}
              <Link
                href="/contact"
                className="font-body text-[13px] text-corp-blue hover:text-blue-accent transition-colors mt-1"
              >
                {getText(t.nav.quote, lang)}
              </Link>
            </nav>
          </div>

          {/* Panama City */}
          <div>
            <p className="font-body text-[10px] tracking-[0.22em] uppercase text-white/30 mb-4">
              {lang === 'es' ? 'Oficina Pacífico' : 'Pacific Office'}
            </p>
            <p className="font-body text-[13px] text-white/70 font-medium mb-1">Panama City</p>
            <p className="font-body text-[12px] text-white/40 leading-relaxed mb-3 whitespace-pre-line">
              {panamaCityAddr}
            </p>
            <a
              href={panamaCityMap}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-[11px] text-corp-blue hover:text-blue-accent transition-colors"
            >
              {lang === 'es' ? 'Ver en mapa →' : 'View on map →'}
            </a>
          </div>

          {/* Colón */}
          <div>
            <p className="font-body text-[10px] tracking-[0.22em] uppercase text-white/30 mb-4">
              {lang === 'es' ? 'Oficina Atlántico' : 'Atlantic Office'}
            </p>
            <p className="font-body text-[13px] text-white/70 font-medium mb-1">Colón</p>
            <p className="font-body text-[12px] text-white/40 leading-relaxed mb-3 whitespace-pre-line">
              {colonAddr}
            </p>
            <a
              href={colonMap}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-[11px] text-corp-blue hover:text-blue-accent transition-colors"
            >
              {lang === 'es' ? 'Ver en mapa →' : 'View on map →'}
            </a>
          </div>
        </div>

        <div className="h-px bg-white/[0.07] mb-7" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-[11px] text-white/25 tracking-wider">
            © {year} Atlantic EEE Supply S.A. {getText(t.footer.rights, lang)}
          </p>
          <p className="font-body text-[11px] text-white/20">
            {getText(t.footer.credit, lang)}{' '}
            <a
              href="https://tododeia.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/40 transition-colors"
            >
              Tododeia
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
