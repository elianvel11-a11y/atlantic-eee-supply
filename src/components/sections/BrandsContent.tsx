'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'
import { t, getText } from '@/lib/translations'
import type { CmsBrand } from '@/lib/cms'

interface Props {
  cms?: CmsBrand[] | null
}

const HARDCODED_BRANDS = [
  {
    name: 'DeWalt',
    category: { en: 'Power & Hand Tools', es: 'Herramientas Eléctricas y Manuales' },
    desc: { en: 'Professional-grade power tools and hand tools trusted by maritime maintenance crews worldwide.', es: 'Herramientas eléctricas y manuales de calidad profesional para tripulaciones de mantenimiento.' },
    highlight: true,
  },
  {
    name: '3M',
    category: { en: 'Safety & PPE', es: 'Seguridad y EPP' },
    desc: { en: 'Industry-standard personal protective equipment, safety tape, adhesives, and surface protection.', es: 'Equipo de protección personal estándar, cinta de seguridad, adhesivos y protección de superficies.' },
    highlight: true,
  },
  {
    name: 'Sea Contractor',
    category: { en: 'Marine Equipment', es: 'Equipos Marítimos' },
    desc: { en: 'Specialized marine-grade equipment designed for demanding vessel environments.', es: 'Equipos marinos especializados para entornos exigentes de embarcaciones.' },
    highlight: true,
  },
  {
    name: 'Collebon',
    category: { en: 'Packing & Sealing', es: 'Empaques y Sellado' },
    desc: { en: 'Industrial packing, gaskets, and sealing solutions for engine room and high-pressure systems.', es: 'Empaques industriales, juntas y soluciones de sellado para cuartos de máquinas y sistemas de alta presión.' },
    highlight: true,
  },
  {
    name: 'MSA Safety',
    category: { en: 'Fall Protection & Gas Detection', es: 'Protección y Detección de Gas' },
    desc: { en: 'Head protection, fall arrest systems, and gas detection equipment for vessel safety compliance.', es: 'Protección de cabeza, sistemas de detención de caídas y equipos de detección de gas.' },
    highlight: false,
  },
  {
    name: 'Ansell',
    category: { en: 'Protective Gloves & Apparel', es: 'Guantes y Ropa de Protección' },
    desc: { en: 'Chemical-resistant gloves and protective clothing for crew safety in all vessel environments.', es: 'Guantes resistentes a productos químicos y ropa de protección para la seguridad de la tripulación.' },
    highlight: false,
  },
]

const QUALITY_POINTS = [
  { en: 'No substitutes — only original manufacturer products', es: 'Sin sustitutos — solo productos del fabricante original' },
  { en: 'Verified against vessel specifications before shipment', es: 'Verificados contra especificaciones de la embarcación' },
  { en: 'Full traceability from manufacturer to delivery', es: 'Trazabilidad completa desde fabricante hasta entrega' },
  { en: 'Technical support on product selection', es: 'Soporte técnico en la selección de productos' },
]

function BrandGridSection({ brands }: { brands: typeof HARDCODED_BRANDS }) {
  const { lang } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="bg-white py-24" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="section-label"
        >
          {getText(t.brands.badge, lang)}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.08 }}
          className="font-display font-semibold text-[clamp(1.8rem,3vw,2.6rem)] leading-[1.1] tracking-[-0.02em] text-ink mb-4 max-w-xl"
        >
          {getText(t.brands.headline, lang).replace('\n', ' ')}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.16 }}
          className="font-body text-copy leading-relaxed mb-14 max-w-2xl"
        >
          {getText(t.brands.sub, lang)}
        </motion.p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-ink/[0.07] border border-ink/[0.07] rounded-xl overflow-hidden">
          {brands.map(({ name, category, desc, highlight }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.06 + i * 0.07 }}
              className="bg-white p-8 group hover:bg-offwhite transition-colors duration-200 flex flex-col gap-4"
            >
              <div className="flex items-center justify-between">
                <div className="h-10 flex items-center">
                  <span className="font-display font-bold text-[1.6rem] tracking-tight text-ink/85 group-hover:text-ink transition-colors duration-200 leading-none">
                    {name}
                  </span>
                </div>
                {highlight && (
                  <span className="font-mono text-[9px] tracking-[0.18em] text-corp-blue/50 uppercase border border-corp-blue/20 rounded px-2 py-0.5">
                    KEY
                  </span>
                )}
              </div>

              <div className="h-px bg-ink/[0.06]" />

              <div>
                <p className="font-body text-[10px] tracking-[0.16em] uppercase text-stone/60 mb-2">
                  {lang === 'es' ? category.es : category.en}
                </p>
                <p className="font-body text-stone text-[13px] leading-relaxed">
                  {lang === 'es' ? desc.es : desc.en}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CmsBrandGridSection({ brands }: { brands: CmsBrand[] }) {
  const { lang } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="bg-white py-24" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="section-label"
        >
          {getText(t.brands.badge, lang)}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.08 }}
          className="font-display font-semibold text-[clamp(1.8rem,3vw,2.6rem)] leading-[1.1] tracking-[-0.02em] text-ink mb-4 max-w-xl"
        >
          {getText(t.brands.headline, lang).replace('\n', ' ')}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.16 }}
          className="font-body text-copy leading-relaxed mb-14 max-w-2xl"
        >
          {getText(t.brands.sub, lang)}
        </motion.p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-ink/[0.07] border border-ink/[0.07] rounded-xl overflow-hidden">
          {brands.map(({ _id, name, category, featured }, i) => {
            const catLabel = category
              ? (lang === 'es' ? category.es : category.en) ?? ''
              : ''
            return (
              <motion.div
                key={_id}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.06 + i * 0.07 }}
                className="bg-white p-8 group hover:bg-offwhite transition-colors duration-200 flex flex-col gap-4"
              >
                <div className="flex items-center justify-between">
                  <div className="h-10 flex items-center">
                    <span className="font-display font-bold text-[1.6rem] tracking-tight text-ink/85 group-hover:text-ink transition-colors duration-200 leading-none">
                      {name}
                    </span>
                  </div>
                  {featured && (
                    <span className="font-mono text-[9px] tracking-[0.18em] text-corp-blue/50 uppercase border border-corp-blue/20 rounded px-2 py-0.5">
                      KEY
                    </span>
                  )}
                </div>

                <div className="h-px bg-ink/[0.06]" />

                {catLabel && (
                  <p className="font-body text-[10px] tracking-[0.16em] uppercase text-stone/60">
                    {catLabel}
                  </p>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function QualityStatementSection() {
  const { lang } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="bg-navy py-20 relative overflow-hidden" ref={ref}>
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.08]"
        style={{ backgroundImage: 'url(/images/construction-ops.jpg)' }}
      />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="section-label-light"
            >
              {lang === 'es' ? 'NUESTRO ESTÁNDAR' : 'OUR STANDARD'}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.08 }}
              className="font-display font-semibold text-[clamp(1.8rem,3vw,2.6rem)] leading-[1.1] tracking-[-0.02em] text-white"
            >
              {lang === 'es' ? 'Marcas que importan. Productos que funcionan.' : 'Brands that matter. Products that work.'}
            </motion.h2>
          </div>
          <motion.ul
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.18 }}
            className="flex flex-col gap-4"
          >
            {QUALITY_POINTS.map((p, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: 14 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.08 }}
                className="flex items-start gap-3"
              >
                <CheckCircle2 size={14} className="text-blue-accent/60 flex-shrink-0 mt-0.5" />
                <span className="font-body text-white/55 text-[13px] leading-relaxed">
                  {lang === 'es' ? p.es : p.en}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  )
}

export default function BrandsContent({ cms }: Props) {
  return (
    <>
      {cms?.length
        ? <CmsBrandGridSection brands={cms} />
        : <BrandGridSection brands={HARDCODED_BRANDS} />
      }
      <QualityStatementSection />
    </>
  )
}
