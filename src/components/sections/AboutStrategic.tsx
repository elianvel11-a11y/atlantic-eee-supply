'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '@/lib/LanguageContext'
import { t, getText } from '@/lib/translations'

export default function AboutStrategic() {
  const { lang } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="bg-navy py-24" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="section-label-light"
            >
              {getText(t.panama.badge, lang)}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.08 }}
              className="font-display font-semibold text-[clamp(1.9rem,3.5vw,2.9rem)] leading-[1.1] tracking-[-0.02em] text-white mb-6"
            >
              {getText(t.panama.headline, lang).replace('\n', ' ')}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.16 }}
              className="font-body text-white/55 leading-relaxed"
            >
              {getText(t.panama.body, lang)}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {[
              {
                title: getText(t.panama.pacificTitle, lang),
                body:  getText(t.panama.pacificBody, lang),
              },
              {
                title: getText(t.panama.atlanticTitle, lang),
                body:  getText(t.panama.atlanticBody, lang),
              },
            ].map(({ title, body }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: 16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="border border-white/[0.1] rounded-lg p-6 hover:border-white/20 transition-colors"
              >
                <p className="font-display font-semibold text-white text-[15px] mb-2">{title}</p>
                <p className="font-body text-white/45 text-[13px] leading-relaxed">{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
