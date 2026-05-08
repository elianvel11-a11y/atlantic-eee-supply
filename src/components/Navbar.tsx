'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'
import { t, getText } from '@/lib/translations'

const NAV_LINKS = [
  { href: '/about',      labelKey: 'about'      as const },
  { href: '/products',   labelKey: 'products'   as const },
  { href: '/operations', labelKey: 'operations' as const },
  { href: '/brands',     labelKey: 'brands'     as const },
  { href: '/contact',    labelKey: 'contact'    as const },
]

interface NavbarProps {
  logoUrl?: string | null
}

export default function Navbar({ logoUrl }: NavbarProps) {
  const { lang, setLang } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 56)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const solid = scrolled || !isHome

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          solid
            ? 'bg-white/97 backdrop-blur-sm border-b border-ink/[0.08] shadow-[0_1px_12px_rgba(24,22,20,0.06)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center leading-none shrink-0">
            {logoUrl ? (
              <Image
                src={logoUrl}
                alt="Atlantic EEE Supply"
                height={48}
                width={240}
                className="h-10 sm:h-12 w-auto object-contain"
                priority
              />
            ) : (
              <span className="flex flex-col">
                <span className={`font-display font-semibold text-[13px] tracking-[0.16em] uppercase transition-colors duration-300 ${
                  solid ? 'text-navy' : 'text-white'
                }`}>
                  Atlantic EEE Supply
                </span>
                <span className={`font-body text-[9px] tracking-[0.3em] uppercase transition-colors duration-300 ${
                  solid ? 'text-stone' : 'text-white/45'
                }`}>
                  S.A. — Panama
                </span>
              </span>
            )}
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map(({ href, labelKey }) => {
              const active = pathname === href || pathname.startsWith(href + '/')
              return (
                <Link
                  key={href}
                  href={href}
                  className={`font-body text-[11px] tracking-[0.15em] uppercase transition-colors duration-200 ${
                    solid
                      ? active ? 'text-corp-blue font-semibold' : 'text-copy hover:text-navy'
                      : active ? 'text-white font-semibold' : 'text-white/60 hover:text-white'
                  }`}
                >
                  {getText(t.nav[labelKey], lang)}
                </Link>
              )
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Language */}
            <div className="hidden sm:flex items-center">
              {(['en', 'es'] as const).map((l, i) => (
                <span key={l} className="flex items-center">
                  {i === 1 && <span className={`w-px h-3 mx-1 ${solid ? 'bg-frame' : 'bg-white/20'}`} />}
                  <button
                    onClick={() => setLang(l)}
                    className={`px-1.5 py-1 text-[10px] font-body tracking-[0.14em] uppercase transition-colors ${
                      lang === l
                        ? solid ? 'text-navy font-semibold' : 'text-white font-semibold'
                        : solid ? 'text-stone hover:text-copy' : 'text-white/40 hover:text-white/70'
                    }`}
                  >
                    {l.toUpperCase()}
                  </button>
                </span>
              ))}
            </div>

            <Link
              href="/contact"
              className={`hidden lg:inline-flex items-center px-4 py-2 text-[11px] tracking-[0.14em] uppercase font-body font-semibold rounded-sm transition-all duration-200 ${
                solid
                  ? 'bg-navy text-white hover:bg-navy-mid'
                  : 'bg-white/10 border border-white/25 text-white hover:bg-white/18'
              }`}
            >
              {getText(t.nav.quote, lang)}
            </Link>

            <button
              className={`lg:hidden p-1.5 transition-colors ${
                solid ? 'text-copy hover:text-navy' : 'text-white/70 hover:text-white'
              }`}
              onClick={() => setOpen(v => !v)}
              aria-label="Toggle menu"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-white flex flex-col pt-20 px-8 pb-10 lg:hidden"
          >
            <nav className="flex flex-col gap-5">
              {NAV_LINKS.map(({ href, labelKey }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`font-display font-semibold text-[1.75rem] tracking-tight transition-colors ${
                    pathname === href ? 'text-corp-blue' : 'text-ink hover:text-navy'
                  }`}
                >
                  {getText(t.nav[labelKey], lang)}
                </Link>
              ))}
            </nav>
            <div className="mt-auto space-y-3">
              <div className="flex gap-2">
                {(['en', 'es'] as const).map(l => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`px-4 py-2 font-body text-xs tracking-widest uppercase border rounded-sm transition-all ${
                      lang === l ? 'border-navy bg-navy text-white' : 'border-frame text-stone'
                    }`}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="block text-center py-3 bg-navy text-white font-body text-xs tracking-widest uppercase rounded-sm"
              >
                {getText(t.nav.quote, lang)}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
