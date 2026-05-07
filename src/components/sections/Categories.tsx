'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Wrench, Shield, Flag, Shirt, Utensils, Zap, Gauge, Pipette, Anchor, Cable, ArrowUpRight, Leaf } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'
import { t, getText } from '@/lib/translations'

type CatKey = keyof typeof t.categories.items

// Featured (larger) + standard grid
const FEATURED: { key: CatKey; icon: React.ElementType }[] = [
  { key: 'packing', icon: Pipette },
  { key: 'valves', icon: Gauge },
  { key: 'safety', icon: Shield },
]
const STANDARD: { key: CatKey; icon: React.ElementType }[] = [
  { key: 'flags', icon: Flag },
  { key: 'clothing', icon: Shirt },
  { key: 'cooking', icon: Utensils },
  { key: 'tools', icon: Zap },
  { key: 'hand', icon: Wrench },
  { key: 'measuring', icon: Gauge },
  { key: 'hose', icon: Cable },
  { key: 'rope', icon: Anchor },
  { key: 'electrical', icon: Zap },
]

export default function Categories() {
  const { lang } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="categories" className="py-32 bg-void relative overflow-hidden">
      {/* Port operations photo — subtle background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.08]"
        style={{ backgroundImage: 'url(/images/port-operations.jpg)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-void via-void/95 to-void" />

      <div ref={ref} className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-8 items-end mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="label-tag mb-7"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-blue-accent" />
              {getText(t.categories.badge, lang)}
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display font-semibold text-[clamp(2.4rem,4vw,3.2rem)] leading-[1.08] tracking-[-0.02em] text-white"
            >
              {getText(t.categories.headline, lang)
                .split('\n')
                .map((line, i) => (
                  <span key={i} className="block">
                    {i === 1
                      ? <span className="font-accent italic text-gradient-blue">{line}</span>
                      : line}
                  </span>
                ))}
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-body text-slate-maritime leading-relaxed lg:text-right"
          >
            {getText(t.categories.sub, lang)}
          </motion.p>
        </div>

        {/* Featured — larger cards with accent treatment */}
        <div className="grid sm:grid-cols-3 gap-4 mb-4">
          {FEATURED.map(({ key, icon: Icon }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.15 + i * 0.08 }}
              className="group relative glass-light rounded-lg p-7 flex flex-col justify-between min-h-[200px] hover:border-blue-accent/20 transition-all duration-400 cursor-default overflow-hidden"
            >
              {/* Background accent */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_0%_100%,rgba(91,164,229,0.05),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-md bg-blue-accent/12 flex items-center justify-center">
                  <Icon size={18} className="text-blue-accent" />
                </div>
                <ArrowUpRight size={14} className="text-slate-maritime/30 group-hover:text-blue-accent/60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
              </div>

              <div>
                <h3 className="font-display font-semibold text-white text-lg tracking-tight mb-2">
                  {getText(t.categories.items[key].name, lang)}
                </h3>
                <p className="font-body text-slate-maritime text-sm leading-relaxed">
                  {getText(t.categories.items[key].desc, lang)}
                </p>
              </div>

              {/* Featured indicator */}
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-blue-accent/40 to-transparent" />
            </motion.div>
          ))}
        </div>

        {/* Standard grid — smaller */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 mb-10">
          {STANDARD.map(({ key, icon: Icon }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.3 + i * 0.05 }}
              className="group glass-light rounded-md p-4 flex flex-col gap-3 hover:border-white/12 transition-all duration-300 cursor-default"
            >
              <div className="w-7 h-7 rounded bg-surface flex items-center justify-center">
                <Icon size={13} className="text-slate-maritime group-hover:text-blue-accent/80 transition-colors" />
              </div>
              <div>
                <p className="font-display font-medium text-white text-xs mb-1 leading-tight">
                  {getText(t.categories.items[key].name, lang)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Secondary: food & beverage */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex items-center gap-3 mb-10 opacity-60"
        >
          <Leaf size={11} className="text-green-accent/50 flex-shrink-0" />
          <p className="font-body text-slate-maritime/60 text-xs">
            <span className="text-white/40 font-medium">{getText(t.categories.food, lang)}</span>
            {' — '}{getText(t.categories.foodSub, lang)}
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <a
            href="#quote"
            className="inline-flex items-center gap-2 border-b border-blue-accent/40 text-blue-accent font-body text-sm tracking-wider pb-0.5 hover:border-blue-accent/80 transition-colors duration-200"
          >
            {getText(t.categories.viewAll, lang)}
            <ArrowUpRight size={13} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
