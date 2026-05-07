'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'
import { t, getText } from '@/lib/translations'
import { pick, type CmsHero } from '@/lib/cms'

interface HeroProps {
  cms?: CmsHero
}

export default function Hero({ cms }: HeroProps) {
  const { lang } = useLanguage()

  const badge        = pick(cms?.badge,        t.hero.badge,        lang)
  const headline     = pick(cms?.headline,     t.hero.headline,     lang)
  const subheading   = pick(cms?.subheading,   t.hero.sub,          lang)
  const ctaPrimary   = pick(cms?.ctaPrimary,   t.hero.cta,          lang)
  const ctaSecondary = pick(cms?.ctaSecondary, t.hero.ctaSecondary, lang)

  const stats = cms?.stats?.length
    ? cms.stats.map(s => ({
        value: s.value,
        label: (lang === 'es' ? s.labelEs : s.labelEn) ?? '',
      }))
    : [
        { value: '12',                         label: getText(t.hero.stat1, lang) },
        { value: getText(t.hero.stat3v, lang), label: getText(t.hero.stat2, lang) },
        { value: '2',                          label: lang === 'es' ? 'Oficinas en Panamá' : 'Offices in Panama' },
      ]

  const isVideo = cms?.backgroundType === 'video' && !!cms.backgroundVideoUrl
  const bgImageUrl = cms?.backgroundImageUrl ?? '/images/hero-port-3.jpg'

  return (
    <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">
      {/* Background media */}
      {isVideo ? (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={cms!.backgroundVideoUrl!}
          autoPlay
          muted
          loop
          playsInline
        />
      ) : (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${bgImageUrl})` }}
        />
      )}

      {/* Overlays */}
      <div className="absolute inset-0 bg-navy-deep/65" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/95 via-navy-deep/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/60 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-24 pt-36 w-full">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="font-body text-[11px] tracking-[0.24em] uppercase text-white/40 mb-7"
          >
            {badge}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="font-display font-semibold text-[clamp(2.6rem,5.5vw,5rem)] leading-[1.06] tracking-[-0.02em] text-white mb-7"
          >
            {headline
              .split('\n')
              .map((line, i) => (
                <span key={i} className="block">{line}</span>
              ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="font-body text-base text-white/58 leading-relaxed max-w-xl mb-10"
          >
            {subheading}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.32 }}
            className="flex flex-wrap items-center gap-3"
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-navy font-body font-semibold text-[12px] tracking-[0.12em] uppercase rounded-sm hover:bg-offwhite transition-colors duration-200"
            >
              {ctaPrimary}
              <ArrowRight size={13} />
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 border border-white/22 text-white/75 font-body text-[12px] tracking-[0.12em] uppercase rounded-sm hover:border-white/45 hover:text-white transition-all duration-200"
            >
              {ctaSecondary}
            </Link>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 pt-8 border-t border-white/[0.1] grid grid-cols-3 gap-8 max-w-lg"
        >
          {stats.map(({ value, label }) => (
            <div key={label}>
              <p className="font-display font-semibold text-2xl text-white mb-0.5">{value}</p>
              <p className="font-body text-[11px] text-white/38 leading-tight">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
