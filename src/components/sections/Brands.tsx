'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '@/lib/LanguageContext'
import { t, getText } from '@/lib/translations'

const BRANDS = [
  { name: 'DeWalt', sub: 'Power & Hand Tools' },
  { name: '3M', sub: 'Safety & Industrial' },
  { name: 'Sea Contractor', sub: 'Marine Equipment' },
  { name: 'Collebon', sub: 'Marine Supplies' },
]

export default function Brands() {
  const { lang } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="brands" className="py-32 bg-graphite relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_100%,rgba(0,0,128,0.15),transparent)]" />

      <div ref={ref} className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="max-w-xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-8"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-blue-accent" />
            <span className="font-body text-xs tracking-[0.2em] text-slate-maritime uppercase">
              {getText(t.brands.badge, lang)}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-semibold text-[clamp(2.4rem,4vw,3.2rem)] leading-[1.08] tracking-[-0.02em] text-white mb-5"
          >
            {getText(t.brands.headline, lang)
              .split('\n')
              .map((line, i) => (
                <span key={i} className="block">
                  {i === 1 ? <em className="text-gradient-blue">{line}</em> : line}
                </span>
              ))}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-body text-slate-maritime leading-relaxed"
          >
            {getText(t.brands.sub, lang)}
          </motion.p>
        </div>

        {/* Brand cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {BRANDS.map(({ name, sub }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="glass-light rounded-xl p-8 flex flex-col items-center justify-center gap-3 group hover:border-white/15 transition-all duration-300 min-h-[160px]"
            >
              {/* Brand name as logotype — replace with actual SVG logos when available */}
              <span className="font-display text-2xl font-light text-white/80 group-hover:text-white transition-colors duration-300 tracking-wide">
                {name}
              </span>
              <span className="font-body text-[10px] tracking-widest text-slate-maritime/60 uppercase">
                {sub}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Additional brands note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-8 font-body text-xs text-slate-maritime/50 tracking-wider"
        >
          {/* TODO: Add additional brand logos as they become available */}
          + additional represented maritime suppliers and manufacturers
        </motion.p>
      </div>
    </section>
  )
}
