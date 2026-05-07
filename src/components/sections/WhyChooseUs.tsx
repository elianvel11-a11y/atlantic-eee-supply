'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Clock, CircleCheck, Tag, Compass, MessageSquare, Layers } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'
import { t, getText } from '@/lib/translations'

const ITEMS = [
  { icon: Clock, headKey: 'item1h', bodyKey: 'item1b' },
  { icon: CircleCheck, headKey: 'item2h', bodyKey: 'item2b' },
  { icon: Tag, headKey: 'item3h', bodyKey: 'item3b' },
  { icon: Compass, headKey: 'item4h', bodyKey: 'item4b' },
  { icon: MessageSquare, headKey: 'item5h', bodyKey: 'item5b' },
  { icon: Layers, headKey: 'item6h', bodyKey: 'item6b' },
] as const

export default function WhyChooseUs() {
  const { lang } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="why" className="py-32 bg-graphite relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_100%,rgba(0,0,128,0.2),transparent)]" />

      <div ref={ref} className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="max-w-2xl mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-8"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-blue-accent" />
            <span className="font-body text-xs tracking-[0.2em] text-slate-maritime uppercase">
              {getText(t.why.badge, lang)}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-semibold text-[clamp(2.4rem,4vw,3.2rem)] leading-[1.08] tracking-[-0.02em] text-white"
          >
            {getText(t.why.headline, lang)
              .split('\n')
              .map((line, i) => (
                <span key={i} className="block">
                  {i === 1 ? <em className="text-gradient-blue">{line}</em> : line}
                </span>
              ))}
          </motion.h2>
        </div>

        {/* Items grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 rounded-xl overflow-hidden">
          {ITEMS.map(({ icon: Icon, headKey, bodyKey }, i) => (
            <motion.div
              key={headKey}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
              className="bg-graphite p-8 group hover:bg-surface transition-colors duration-300"
            >
              <div className="w-10 h-10 rounded-md bg-blue-accent/8 flex items-center justify-center mb-5 group-hover:bg-blue-accent/15 transition-colors duration-300">
                <Icon size={16} className="text-blue-accent/80 group-hover:text-blue-accent transition-colors" />
              </div>
              <h3 className="font-display text-white text-xl font-medium mb-3">
                {getText(t.why[headKey], lang)}
              </h3>
              <p className="font-body text-slate-maritime text-sm leading-relaxed">
                {getText(t.why[bodyKey], lang)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
