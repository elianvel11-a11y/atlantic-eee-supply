'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '@/lib/LanguageContext'
import { t, getText } from '@/lib/translations'

export default function PanamaAdvantage() {
  const { lang } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-32 bg-charcoal relative overflow-hidden">
      {/* Deep navy gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(0,0,128,0.25),transparent)]" />

      {/* Canal line — decorative */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-accent/15 to-transparent" />

      <div ref={ref} className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 mb-8"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-blue-accent" />
          <span className="font-body text-xs tracking-[0.2em] text-slate-maritime uppercase">
            {getText(t.panama.badge, lang)}
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display font-semibold text-[clamp(2.4rem,4vw,3.2rem)] leading-[1.08] tracking-[-0.02em] text-white mb-8"
            >
              {getText(t.panama.headline, lang)
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
              className="font-body text-slate-maritime leading-relaxed mb-12"
            >
              {getText(t.panama.body, lang)}
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-wrap gap-12"
            >
              {[
                { value: getText(t.panama.stat1v, lang), label: getText(t.panama.stat1, lang) },
                { value: getText(t.panama.stat2v, lang), label: getText(t.panama.stat2, lang) },
                { value: getText(t.panama.stat3v, lang), label: getText(t.panama.stat3, lang) },
              ].map((s) => (
                <div key={s.label} className="flex flex-col gap-1">
                  <span className="font-display text-3xl font-light text-gradient-blue">{s.value}</span>
                  <span className="font-body text-xs tracking-widest text-slate-maritime uppercase">
                    {s.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Canal diagram */}
          <div className="flex flex-col gap-4">
            {/* Atlantic side */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="glass-light rounded-lg p-6 border-l-2 border-blue-accent/50"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-blue-accent" />
                <span className="font-body text-xs tracking-widest text-blue-accent uppercase">
                  {getText(t.panama.atlanticTitle, lang)}
                </span>
              </div>
              <p className="font-body text-slate-maritime text-sm leading-relaxed">
                {getText(t.panama.atlanticBody, lang)}
              </p>
            </motion.div>

            {/* Canal connector */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex items-center gap-4 px-6"
            >
              <div className="flex-1 h-px bg-gradient-to-r from-blue-accent/40 to-navy/60" />
              <div className="glass rounded px-3 py-1.5 text-xs font-body text-slate-maritime tracking-widest uppercase">
                Canal
              </div>
              <div className="flex-1 h-px bg-gradient-to-l from-blue-accent/40 to-navy/60" />
            </motion.div>

            {/* Pacific side */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="glass-light rounded-lg p-6 border-l-2 border-blue-accent/20"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-blue-accent/50" />
                <span className="font-body text-xs tracking-widest text-blue-accent/70 uppercase">
                  {getText(t.panama.pacificTitle, lang)}
                </span>
              </div>
              <p className="font-body text-slate-maritime text-sm leading-relaxed">
                {getText(t.panama.pacificBody, lang)}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
