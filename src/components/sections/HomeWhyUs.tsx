'use client'

import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useRef } from 'react'
import { useLanguage } from '@/lib/LanguageContext'
import { t, getText } from '@/lib/translations'

const items = [
  { headKey: 'item1h' as const, bodyKey: 'item1b' as const },
  { headKey: 'item2h' as const, bodyKey: 'item2b' as const },
  { headKey: 'item5h' as const, bodyKey: 'item5b' as const },
]

export default function HomeWhyUs() {
  const { lang } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="bg-navy py-24" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4 }}
              className="section-label-light"
            >
              {getText(t.why.badge, lang)}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="font-display font-semibold text-[clamp(1.9rem,3.5vw,2.9rem)] leading-[1.1] tracking-[-0.02em] text-white"
            >
              {getText(t.why.headline, lang).replace('\n', ' ')}
            </motion.h2>
          </div>

          <div className="flex flex-col gap-8">
            {items.map(({ headKey, bodyKey }, i) => (
              <motion.div
                key={headKey}
                initial={{ opacity: 0, y: 14 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.12 + i * 0.1 }}
                className="border-t border-white/[0.1] pt-6"
              >
                <h3 className="font-display font-semibold text-white text-[16px] mb-2">
                  {getText(t.why[headKey], lang)}
                </h3>
                <p className="font-body text-white/50 text-[13px] leading-relaxed">
                  {getText(t.why[bodyKey], lang)}
                </p>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
              className="pt-4"
            >
              <Link
                href="/about"
                className="inline-flex items-center gap-2 font-body text-[12px] tracking-[0.14em] uppercase text-blue-accent/70 hover:text-blue-accent font-semibold transition-colors"
              >
                {lang === 'es' ? 'Conócenos' : 'Learn more'} <ArrowRight size={13} />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
