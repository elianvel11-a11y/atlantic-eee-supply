'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '@/lib/LanguageContext'
import { t } from '@/lib/translations'
import { pick, type CmsAbout } from '@/lib/cms'

interface Props {
  cms?: CmsAbout
}

export default function AboutStory({ cms }: Props) {
  const { lang } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const badge    = pick(cms?.badge,    t.about.badge,    lang)
  const headline = pick(cms?.headline, t.about.headline, lang)
  const body1    = pick(cms?.body1,    t.about.body1,    lang)
  const body2    = pick(cms?.body2,    t.about.body2,    lang)

  const statItems = cms?.stats?.length
    ? cms.stats.map(s => ({
        value: s.value,
        label: (lang === 'es' ? s.labelEs : s.labelEn) ?? '',
      }))
    : [
        { value: '12',         label: lang === 'es' ? 'Categorías de productos' : 'Product categories' },
        { value: '2',          label: lang === 'es' ? 'Oficinas en Panamá' : 'Offices in Panama' },
        { value: '14,000+',    label: lang === 'es' ? 'Buques transitan el Canal' : 'Vessels transit the Canal' },
        { value: 'Atl. & Pac.', label: lang === 'es' ? 'Acceso oceánico' : 'Ocean access' },
      ]

  return (
    <section className="bg-white py-24" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="section-label"
            >
              {badge}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.08 }}
              className="font-display font-semibold text-[clamp(1.9rem,3.5vw,2.9rem)] leading-[1.1] tracking-[-0.02em] text-ink mb-7"
            >
              {headline.replace('\n', ' ')}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.16 }}
              className="font-body text-copy leading-relaxed mb-5"
            >
              {body1}
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.22 }}
              className="font-body text-copy leading-relaxed"
            >
              {body2}
            </motion.p>
          </div>

          <div className="flex flex-col gap-5">
            {/* Maritime photo */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="relative h-52 rounded-xl overflow-hidden"
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: 'url(/images/about-maritime-ops.jpg)' }}
              />
              <div className="absolute inset-0 bg-navy/15" />
            </motion.div>

            {/* Stats panel */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.18 }}
              className="bg-offwhite rounded-xl p-8 lg:p-10"
            >
              <div className="grid grid-cols-2 gap-8 mb-8">
                {statItems.map(({ value, label }) => (
                  <div key={label} className="border-t border-ink/[0.1] pt-5">
                    <p className="font-display font-semibold text-2xl text-ink mb-1">{value}</p>
                    <p className="font-body text-stone text-[12px] leading-relaxed">{label}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-ink/[0.1] pt-6">
                <p className="font-body text-stone text-[13px] leading-relaxed">
                  {lang === 'es'
                    ? 'Respondemos en menos de 24 horas. Contáctanos por WhatsApp, teléfono o correo.'
                    : 'We respond within 24 hours. Reach us by WhatsApp, phone, or email.'}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
