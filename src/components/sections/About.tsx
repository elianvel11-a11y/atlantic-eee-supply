'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Zap, Target, MapPin, ShieldCheck } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'
import { t, getText } from '@/lib/translations'

const cards = [
  { icon: Zap, key: 'card1' as const },
  { icon: Target, key: 'card2' as const },
  { icon: MapPin, key: 'card3' as const },
  { icon: ShieldCheck, key: 'card4' as const },
]

export default function About() {
  const { lang } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" className="py-32 bg-graphite relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_0%_50%,rgba(0,0,128,0.15),transparent)]" />

      <div ref={ref} className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-8"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-blue-accent" />
              <span className="font-body text-xs tracking-[0.2em] text-slate-maritime uppercase">
                {getText(t.about.badge, lang)}
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display font-semibold text-[clamp(2.4rem,4vw,3.2rem)] leading-[1.08] tracking-[-0.02em] text-white mb-8"
            >
              {getText(t.about.headline, lang)
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
              className="font-body text-slate-maritime leading-relaxed mb-5"
            >
              {getText(t.about.body1, lang)}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="font-body text-slate-maritime leading-relaxed"
            >
              {getText(t.about.body2, lang)}
            </motion.p>
          </div>

          {/* Right: Capability cards */}
          <div className="grid grid-cols-2 gap-4">
            {cards.map(({ icon: Icon, key }, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                className="glass-light rounded-lg p-6 flex flex-col gap-3 group hover:border-blue-accent/20 transition-colors duration-300"
              >
                <div className="w-9 h-9 rounded-md bg-blue-accent/10 flex items-center justify-center">
                  <Icon size={16} className="text-blue-accent" />
                </div>
                <div>
                  <p className="font-display text-white text-base font-medium mb-1">
                    {getText(t.about[key as 'card1'], lang)}
                  </p>
                  <p className="font-body text-slate-maritime text-xs leading-relaxed">
                    {getText(t.about[`${key}b` as 'card1b'], lang)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
