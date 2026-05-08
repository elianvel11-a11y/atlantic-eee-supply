'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import PageHero from '@/components/ui/PageHero'
import PresenceMapClient from '@/components/sections/PresenceMapClient'
import { useLanguage } from '@/lib/LanguageContext'
import { t, getText } from '@/lib/translations'

// ─── Coverage details ─────────────────────────────────────────────────────────
function CoverageDetails() {
  const { lang } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const offices = [
    {
      title: getText(t.panama.pacificTitle, lang),
      body: getText(t.panama.pacificBody, lang),
      address: 'Av. Juan Pablo II, Calle 2059\nPanama City, Panamá',
      tag: lang === 'es' ? 'Sede principal' : 'Primary Office',
    },
    {
      title: getText(t.panama.atlanticTitle, lang),
      body: getText(t.panama.atlanticBody, lang),
      address: 'Plaza Silver City, Local N25\nColón, Panamá',
      tag: lang === 'es' ? 'Oficina atlántica' : 'Atlantic Office',
    },
  ]

  return (
    <section className="bg-white py-24" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="section-label"
            >
              {getText(t.panama.badge, lang)}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.08 }}
              className="font-display font-semibold text-[clamp(1.8rem,3vw,2.6rem)] leading-[1.1] tracking-[-0.02em] text-ink mb-6"
            >
              {getText(t.panama.headline, lang).replace('\n', ' ')}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.16 }}
              className="font-body text-copy leading-relaxed mb-8"
            >
              {getText(t.panama.body, lang)}
            </motion.p>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.24 }}
              className="grid grid-cols-3 gap-6 pt-8 border-t border-ink/[0.08]"
            >
              {[
                { value: getText(t.panama.stat1v, lang), label: getText(t.panama.stat1, lang) },
                { value: getText(t.panama.stat2v, lang), label: getText(t.panama.stat2, lang) },
                { value: getText(t.panama.stat3v, lang), label: getText(t.panama.stat3, lang) },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p className="font-display font-semibold text-xl text-ink mb-1">{value}</p>
                  <p className="font-body text-stone text-[11px] leading-relaxed">{label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="flex flex-col gap-4">
            {offices.map(({ title, body, address, tag }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: 14 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.14 + i * 0.1 }}
                className="border border-ink/[0.08] rounded-lg p-6 hover:border-corp-blue/20 hover:shadow-sm transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <p className="font-display font-semibold text-ink text-[15px]">{title}</p>
                  <span className="font-body text-[10px] tracking-[0.14em] uppercase text-corp-blue bg-corp-blue/8 px-2.5 py-1 rounded-full">
                    {tag}
                  </span>
                </div>
                <p className="font-body text-stone text-[13px] leading-relaxed mb-3">{body}</p>
                <p className="font-mono text-[11px] text-stone/60 whitespace-pre-line">{address}</p>
              </motion.div>
            ))}

            {/* Cartagena */}
            <motion.div
              initial={{ opacity: 0, x: 14 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.34 }}
              className="border border-dashed border-ink/[0.12] rounded-lg p-6"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="font-display font-semibold text-ink text-[15px]">Cartagena</p>
                <span className="font-body text-[10px] tracking-[0.14em] uppercase text-stone bg-chalk px-2.5 py-1 rounded-full">
                  {lang === 'es' ? 'Alcance extendido' : 'Extended Reach'}
                </span>
              </div>
              <p className="font-body text-stone text-[13px] leading-relaxed">
                {lang === 'es'
                  ? 'Cobertura operacional hacia la costa caribeña de Colombia.'
                  : 'Operational coverage extending to the Caribbean coast of Colombia.'}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Operations page ──────────────────────────────────────────────────────────
export default function OperationsPage() {
  const { lang } = useLanguage()
  return (
    <main>
      <PageHero
        label={lang === 'es' ? 'PRESENCIA OPERACIONAL' : 'OPERATIONAL PRESENCE'}
        title={lang === 'es' ? 'Dónde operamos.' : 'Where we operate.'}
        subtitle={getText(t.map.sub, lang)}
        image="/images/port-aerial.jpg"
      />
      {/* Interactive map in dark section */}
      <section className="bg-[#07070C]">
        <PresenceMapClient />
      </section>
      {/* Canal photo strip */}
      <div
        className="h-64 bg-cover bg-center relative"
        style={{ backgroundImage: 'url(/images/canal-locks.jpg)' }}
      >
        <div className="absolute inset-0 bg-navy/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="font-body text-white/50 text-[11px] tracking-[0.3em] uppercase">
            {lang === 'es' ? 'Canal de Panamá · Acceso Atlántico y Pacífico' : 'Panama Canal · Atlantic & Pacific Access'}
          </p>
        </div>
      </div>
      <CoverageDetails />
    </main>
  )
}
