'use client'

import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useRef } from 'react'
import { useLanguage } from '@/lib/LanguageContext'
import { t, getText } from '@/lib/translations'
import type { CmsBrand } from '@/lib/cms'

const FALLBACK_BRANDS = ['DeWalt', '3M', 'Sea Contractor', 'Collebon', 'MSA Safety', 'Ansell']

interface Props {
  cms?: CmsBrand[] | null
}

export default function HomeBrands({ cms }: Props) {
  const { lang } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const brandNames = cms?.length ? cms.map(b => b.name) : FALLBACK_BRANDS

  return (
    <section className="bg-white py-20 border-t border-ink/[0.07]" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-10">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="section-label"
            >
              {getText(t.brands.badge, lang)}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.08 }}
              className="font-display font-semibold text-ink text-xl"
            >
              {getText(t.brands.headline, lang).replace('\n', ' ')}
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.25 }}
          >
            <Link
              href="/brands"
              className="inline-flex items-center gap-2 font-body text-[12px] tracking-[0.14em] uppercase text-corp-blue font-semibold hover:text-navy transition-colors whitespace-nowrap"
            >
              {lang === 'es' ? 'Ver marcas' : 'All brands'} <ArrowRight size={13} />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {brandNames.map((name, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.08 + i * 0.06 }}
              className="border border-ink/[0.08] rounded-md px-4 py-5 flex items-center justify-center hover:border-corp-blue/20 hover:bg-offwhite transition-all duration-200"
            >
              <span className="font-display font-semibold text-ink/60 text-[12px] text-center leading-tight">{name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
