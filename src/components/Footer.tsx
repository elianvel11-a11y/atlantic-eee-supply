'use client'

import Link from 'next/link'
import { useLanguage } from '@/lib/LanguageContext'
import { t, getText } from '@/lib/translations'
import { pick, type CmsContact } from '@/lib/cms'

interface FooterProps {
  cms?: CmsContact
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
              <p className="font-display font-semibold text-[13px] tracking-[0.16em] uppercase text-white mb-0.5">
                Atlantic EEE Supply
              </p>
              <p className="font-body text-[9px] tracking-[0.3em] text-white/30 uppercase">
                S.A. — Republic of Panama
              </p>
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
