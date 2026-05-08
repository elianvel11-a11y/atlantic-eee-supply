'use client'

import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useRef } from 'react'
import { useLanguage } from '@/lib/LanguageContext'
import { t, getText } from '@/lib/translations'

const featured = [
  { key: 'packing', img: '/images/product-packing.jpg'  },
  { key: 'valves',  img: '/images/product-valves.jpg'   },
  { key: 'safety',  img: '/images/product-safety-2.jpg' },
] as const

export default function HomeProducts() {
  const { lang } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="bg-offwhite py-24" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4 }}
              className="section-label"
            >
              {getText(t.categories.badge, lang)}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="font-display font-semibold text-[clamp(1.8rem,3vw,2.6rem)] leading-[1.1] tracking-[-0.02em] text-ink max-w-lg"
            >
              {getText(t.categories.headline, lang).replace('\n', ' ')}
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            <Link
              href="/products"
              className="inline-flex items-center gap-2 font-body text-[12px] tracking-[0.14em] uppercase text-corp-blue font-semibold hover:text-navy transition-colors whitespace-nowrap"
            >
              {lang === 'es' ? 'Ver todos' : 'View all'} <ArrowRight size={13} />
            </Link>
          </motion.div>
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          {featured.map(({ key, img }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              className="group bg-white rounded-lg overflow-hidden border border-ink/[0.07] hover:border-corp-blue/20 hover:shadow-md transition-all duration-300"
            >
              <div
                className="h-40 bg-cover bg-center opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                style={{ backgroundImage: `url(${img})` }}
              />
              <div className="p-5">
                <h3 className="font-display font-semibold text-ink text-[15px] mb-2">
                  {getText(t.categories.items[key].name, lang)}
                </h3>
                <p className="font-body text-stone text-[13px] leading-relaxed">
                  {getText(t.categories.items[key].desc, lang)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
