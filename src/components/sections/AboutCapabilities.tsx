'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Clock, CheckCircle2, Tag, MapPin, MessageSquare, Layers } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'
import { t, getText } from '@/lib/translations'
import type { CmsAbout } from '@/lib/cms'

interface Props {
  cms?: CmsAbout
}

const ICONS = [Clock, CheckCircle2, Tag, MapPin, MessageSquare, Layers]

const FALLBACK = [
  { headKey: 'item1h' as const, bodyKey: 'item1b' as const },
  { headKey: 'item2h' as const, bodyKey: 'item2b' as const },
  { headKey: 'item3h' as const, bodyKey: 'item3b' as const },
  { headKey: 'item4h' as const, bodyKey: 'item4b' as const },
  { headKey: 'item5h' as const, bodyKey: 'item5b' as const },
  { headKey: 'item6h' as const, bodyKey: 'item6b' as const },
]

export default function AboutCapabilities({ cms }: Props) {
  const { lang } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const items = cms?.capabilities?.length
    ? cms.capabilities.map((cap, i) => ({
        icon: ICONS[i % ICONS.length],
        head: (lang === 'es' ? cap.headEs : cap.headEn) ?? (cap.headEn ?? cap.headEs ?? ''),
        body: (lang === 'es' ? cap.bodyEs : cap.bodyEn) ?? (cap.bodyEn ?? cap.bodyEs ?? ''),
      }))
    : FALLBACK.map(({ headKey, bodyKey }, i) => ({
        icon: ICONS[i],
        head: getText(t.why[headKey], lang),
        body: getText(t.why[bodyKey], lang),
      }))

  return (
    <section className="bg-offwhite py-24" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="section-label"
        >
          {getText(t.why.badge, lang)}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.08 }}
          className="font-display font-semibold text-[clamp(1.8rem,3vw,2.6rem)] leading-[1.1] tracking-[-0.02em] text-ink mb-14 max-w-xl"
        >
          {getText(t.why.headline, lang).replace('\n', ' ')}
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-ink/[0.07] rounded-xl overflow-hidden">
          {items.map(({ icon: Icon, head, body }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.08 + i * 0.06 }}
              className="bg-offwhite p-7 hover:bg-white transition-colors duration-300"
            >
              <div className="w-9 h-9 rounded bg-corp-blue/8 flex items-center justify-center mb-4">
                <Icon size={15} className="text-corp-blue" />
              </div>
              <h3 className="font-display font-semibold text-ink text-[15px] mb-2">{head}</h3>
              <p className="font-body text-stone text-[13px] leading-relaxed">{body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
