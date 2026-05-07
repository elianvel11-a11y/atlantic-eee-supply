'use client'

import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Clock, CheckCircle2, MapPin, Tag } from 'lucide-react'
import { useRef } from 'react'
import { useLanguage } from '@/lib/LanguageContext'
import { t, getText } from '@/lib/translations'
import { pick, type CmsAbout } from '@/lib/cms'

interface Props {
  cms?: CmsAbout
}

export default function HomeOverview({ cms }: Props) {
  const { lang } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const badge    = pick(cms?.badge,    t.about.badge,    lang)
  const headline = pick(cms?.headline, t.about.headline, lang)
  const body1    = pick(cms?.body1,    t.about.body1,    lang)
  const body2    = pick(cms?.body2,    t.about.body2,    lang)

  const cards = [
    { icon: Clock,        key: 'card1' as const },
    { icon: CheckCircle2, key: 'card2' as const },
    { icon: MapPin,       key: 'card3' as const },
    { icon: Tag,          key: 'card4' as const },
  ]

  return (
    <section className="bg-white py-24" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4 }}
              className="section-label"
            >
              {badge}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="font-display font-semibold text-[clamp(1.9rem,3.5vw,2.9rem)] leading-[1.1] tracking-[-0.02em] text-ink mb-7"
            >
              {headline.replace('\n', ' ')}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="font-body text-copy leading-relaxed mb-4"
            >
              {body1}
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.24 }}
              className="font-body text-copy leading-relaxed mb-8"
            >
              {body2}
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.32 }}
            >
              <Link
                href="/about"
                className="inline-flex items-center gap-2 font-body text-[12px] tracking-[0.14em] uppercase text-corp-blue font-semibold hover:text-navy transition-colors"
              >
                {lang === 'es' ? 'Sobre nosotros' : 'About us'} <ArrowRight size={13} />
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {cards.map(({ icon: Icon, key }, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.1 + i * 0.08 }}
                className="border border-ink/[0.08] rounded-lg p-5 hover:border-corp-blue/20 hover:shadow-sm transition-all duration-300"
              >
                <div className="w-8 h-8 rounded bg-corp-blue/8 flex items-center justify-center mb-3">
                  <Icon size={15} className="text-corp-blue" />
                </div>
                <p className="font-display font-semibold text-ink text-[14px] mb-1">
                  {getText(t.about[key as 'card1'], lang)}
                </p>
                <p className="font-body text-stone text-xs leading-relaxed">
                  {getText(t.about[`${key}b` as 'card1b'], lang)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
