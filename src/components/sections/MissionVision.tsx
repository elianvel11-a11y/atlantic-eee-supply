'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Star, Lightbulb, Anchor, Scale, Zap, Shield, Briefcase, Crosshair, Globe } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'
import { pick, type CmsMissionVision } from '@/lib/cms'

interface Props {
  cms?: CmsMissionVision
}

const ICON_MAP: Record<string, React.ElementType> = {
  star:      Star,
  lightbulb: Lightbulb,
  anchor:    Anchor,
  scale:     Scale,
  zap:       Zap,
  shield:    Shield,
  briefcase: Briefcase,
  crosshair: Crosshair,
  globe:     Globe,
}

const FALLBACK_BADGE = {
  en: 'Mission · Vision · Core Values',
  es: 'Misión · Visión · Valores',
}

const FALLBACK_MISSION = {
  en: 'We provide high-quality technical solutions and products to vessels transiting Panamanian waters, delivering reliable, agile service backed by the pride and commitment of local talent. At Atlantic EEE Supply, we focus on bringing real value to every maritime operation through expertise, close attention, and logistical excellence.',
  es: 'Proveer soluciones y productos técnicos de alta calidad a embarcaciones que transitan por aguas panameñas, ofreciendo un servicio confiable, ágil y respaldado por el orgullo y compromiso del talento local. En Atlantic EEE Supply nos enfocamos en aportar valor real a cada operación marítima mediante experiencia, atención cercana y excelencia logística.',
}

const FALLBACK_VISION = {
  en: 'To be recognized in Panama and the region as one of the leading maritime supply providers — distinguished by our operational efficiency, constant innovation, and technical-industrial expertise. We aspire to lead with practical, reliable solutions aligned with the needs of the global maritime environment.',
  es: 'Ser reconocidos en Panamá y la región como uno de los principales proveedores de suministros marítimos, distinguidos por nuestra eficiencia operativa, innovación constante y experiencia técnico-industrial. Aspiramos a liderar con soluciones prácticas, confiables y alineadas con las necesidades del entorno marítimo global.',
}

const FALLBACK_VALUES = [
  {
    iconKey: 'star',
    en: { title: 'Excellence',       body: 'We hold every order to the highest standard, without exception.' },
    es: { title: 'Excelencia',       body: 'Mantenemos cada pedido al más alto estándar, sin excepción.' },
  },
  {
    iconKey: 'lightbulb',
    en: { title: 'Innovation',       body: 'We continuously improve our processes, tools, and supply methods.' },
    es: { title: 'Innovación',       body: 'Mejoramos continuamente nuestros procesos, herramientas y métodos de suministro.' },
  },
  {
    iconKey: 'anchor',
    en: { title: 'Commitment',       body: 'We stay with every order from placement to delivery on your vessel.' },
    es: { title: 'Compromiso',       body: 'Permanecemos con cada pedido desde la colocación hasta la entrega en su embarcación.' },
  },
  {
    iconKey: 'scale',
    en: { title: 'Integrity',        body: 'We tell you exactly what we have — and what we don\'t.' },
    es: { title: 'Integridad',       body: 'Decimos exactamente lo que tenemos — y lo que no.' },
  },
  {
    iconKey: 'zap',
    en: { title: 'Speed',            body: '24-hour response. Tight vessel schedules are our normal.' },
    es: { title: 'Rapidez',          body: 'Respuesta en 24 horas. Los plazos ajustados son nuestra normalidad.' },
  },
  {
    iconKey: 'shield',
    en: { title: 'Quality',          body: 'ISO and SOLAS-grade supply for any vessel registry.' },
    es: { title: 'Calidad',          body: 'Suministro con estándares ISO y SOLAS para cualquier registro.' },
  },
  {
    iconKey: 'briefcase',
    en: { title: 'Professionalism',  body: 'Expert staff, precise documentation, zero shortcuts.' },
    es: { title: 'Profesionalismo',  body: 'Personal experto, documentación precisa, cero atajos.' },
  },
]

export default function MissionVision({ cms }: Props) {
  const { lang } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const badge   = pick(cms?.badge,   FALLBACK_BADGE,   lang)
  const mission = pick(cms?.mission, FALLBACK_MISSION, lang)
  const vision  = pick(cms?.vision,  FALLBACK_VISION,  lang)

  const values = cms?.values?.length
    ? cms.values.map(v => ({
        iconKey: v.iconKey ?? 'globe',
        title:   (lang === 'es' ? v.titleEs : v.titleEn) ?? (v.titleEn ?? v.titleEs ?? ''),
        body:    (lang === 'es' ? v.bodyEs  : v.bodyEn)  ?? (v.bodyEn  ?? v.bodyEs  ?? ''),
      }))
    : FALLBACK_VALUES.map(v => ({
        iconKey: v.iconKey,
        title:   v[lang].title,
        body:    v[lang].body,
      }))

  return (
    <section
      ref={ref}
      className="relative py-32 overflow-hidden"
      style={{ background: '#07080F' }}
    >
      {/* Subtle radial atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(26,82,152,0.10),transparent)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Badge */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45 }}
          className="section-label-light mb-16"
        >
          {badge}
        </motion.p>

        {/* Mission + Vision — editorial two-column */}
        <div className="grid lg:grid-cols-2 gap-0 mb-24">

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:pr-16 pb-12 lg:pb-0"
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="font-mono text-[10px] tracking-[0.25em] text-white/20">01</span>
              <div className="flex-1 h-px bg-white/[0.08]" />
            </div>
            <p className="font-body text-[10px] tracking-[0.22em] uppercase text-blue-accent/60 mb-5">
              {lang === 'es' ? 'Misión' : 'Mission'}
            </p>
            <p className="font-display font-medium text-[clamp(1.05rem,1.8vw,1.3rem)] leading-[1.65] tracking-[-0.01em] text-white/75">
              {mission}
            </p>
          </motion.div>

          {/* Vertical rule on lg */}
          <div className="hidden lg:block absolute left-1/2 top-[calc(5rem+6rem)] bottom-24 w-px bg-white/[0.05]" />

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.22 }}
            className="lg:pl-16 pt-12 lg:pt-0 border-t border-white/[0.06] lg:border-t-0"
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="font-mono text-[10px] tracking-[0.25em] text-white/20">02</span>
              <div className="flex-1 h-px bg-white/[0.08]" />
            </div>
            <p className="font-body text-[10px] tracking-[0.22em] uppercase text-blue-accent/60 mb-5">
              {lang === 'es' ? 'Visión' : 'Vision'}
            </p>
            <p className="font-display font-medium text-[clamp(1.05rem,1.8vw,1.3rem)] leading-[1.65] tracking-[-0.01em] text-white/75">
              {vision}
            </p>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/[0.06] mb-16" />

        {/* Values label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="font-body text-[10px] tracking-[0.22em] uppercase text-white/25 mb-10"
        >
          {lang === 'es' ? 'Valores fundamentales' : 'Core Values'}
        </motion.p>

        {/* Values grid — up to 7 cards, responsive */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {values.map(({ iconKey, title, body }, i) => {
            const Icon = ICON_MAP[iconKey] ?? Globe
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.4 + i * 0.07 }}
                className="glass-light rounded-xl p-6 hover:border-white/[0.12] transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-5">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(91,164,229,0.10)' }}
                  >
                    <Icon size={15} className="text-blue-accent/70 group-hover:text-blue-accent transition-colors duration-300" />
                  </div>
                  <span className="font-mono text-[9px] tracking-[0.2em] text-white/15 mt-1">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="font-display font-semibold text-white text-[14px] mb-2 tracking-[-0.01em]">
                  {title}
                </h3>
                <p className="font-body text-[12px] text-white/45 leading-relaxed">
                  {body}
                </p>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
