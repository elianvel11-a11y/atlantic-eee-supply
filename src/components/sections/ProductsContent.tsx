'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Wrench, Shield, Flag, Shirt, Utensils, Zap, Gauge, Pipette, Anchor, Cable, ArrowRight, Leaf } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'
import { t, getText } from '@/lib/translations'
import { pick, type CmsCategory } from '@/lib/cms'

type CatKey = keyof typeof t.categories.items

interface Props {
  cms?: CmsCategory[] | null
}

const ICON_MAP: Record<string, React.ElementType> = {
  packing: Pipette, valves: Gauge, safety: Shield,
  flags: Flag, clothing: Shirt, cooking: Utensils,
  tools: Zap, hand: Wrench, measuring: Gauge,
  hose: Cable, rope: Anchor, electrical: Zap,
}

const IMG_MAP: Record<string, string> = {
  packing: '/images/product-packing.jpg',
  valves:  '/images/product-valves.jpg',
  safety:  '/images/product-safety-2.jpg',
}

const FALLBACK_FEATURED: { key: CatKey; icon: React.ElementType; img: string }[] = [
  { key: 'packing', icon: Pipette, img: '/images/product-packing.jpg'  },
  { key: 'valves',  icon: Gauge,   img: '/images/product-valves.jpg'   },
  { key: 'safety',  icon: Shield,  img: '/images/product-safety-2.jpg' },
]

const FALLBACK_STANDARD: { key: CatKey; icon: React.ElementType }[] = [
  { key: 'flags',     icon: Flag },
  { key: 'clothing',  icon: Shirt },
  { key: 'cooking',   icon: Utensils },
  { key: 'tools',     icon: Zap },
  { key: 'hand',      icon: Wrench },
  { key: 'measuring', icon: Gauge },
  { key: 'hose',      icon: Cable },
  { key: 'rope',      icon: Anchor },
  { key: 'electrical',icon: Zap },
]

const BRANDS_STRIP = [
  { name: 'DeWalt',         category: { en: 'Tools',          es: 'Herramientas'   } },
  { name: '3M',             category: { en: 'Safety',         es: 'Seguridad'      } },
  { name: 'Sea Contractor', category: { en: 'Marine Equip.',  es: 'Equipos Marít.' } },
  { name: 'Collebon',       category: { en: 'Packing',        es: 'Empaques'       } },
  { name: 'MSA Safety',     category: { en: 'Protection',     es: 'Protección'     } },
  { name: 'Ansell',         category: { en: 'PPE',            es: 'EPP'            } },
]

// ─── Featured categories ──────────────────────────────────────────────────────
function FeaturedCategoriesSection() {
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
          {getText(t.categories.badge, lang)}
        </motion.p>
        <div className="grid lg:grid-cols-2 gap-6 items-end mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.08 }}
            className="font-display font-semibold text-[clamp(1.8rem,3vw,2.6rem)] leading-[1.1] tracking-[-0.02em] text-ink"
          >
            {getText(t.categories.headline, lang).replace('\n', ' ')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.16 }}
            className="font-body text-copy leading-relaxed lg:text-right"
          >
            {getText(t.categories.sub, lang)}
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-3 gap-5 mb-5">
          {FALLBACK_FEATURED.map(({ key, icon: Icon, img }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.12 + i * 0.08 }}
              className="group border border-ink/[0.08] rounded-lg overflow-hidden hover:border-corp-blue/25 hover:shadow-md transition-all duration-300 flex flex-col"
            >
              <div
                className="h-44 bg-cover bg-center opacity-80 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0"
                style={{ backgroundImage: `url(${img})` }}
              />
              <div className="p-7 flex flex-col justify-between flex-1">
                <div className="flex items-start justify-between">
                  <div className="w-9 h-9 rounded bg-corp-blue/8 flex items-center justify-center">
                    <Icon size={16} className="text-corp-blue" />
                  </div>
                  <ArrowRight size={14} className="text-stone/40 group-hover:text-corp-blue/60 transition-colors" />
                </div>
                <div className="pt-6">
                  <h3 className="font-display font-semibold text-ink text-lg mb-2">
                    {getText(t.categories.items[key].name, lang)}
                  </h3>
                  <p className="font-body text-stone text-[13px] leading-relaxed">
                    {getText(t.categories.items[key].desc, lang)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 mb-10">
          {FALLBACK_STANDARD.map(({ key, icon: Icon }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.25 + i * 0.04 }}
              className="group border border-ink/[0.07] rounded-md p-4 flex flex-col gap-2.5 hover:border-corp-blue/20 hover:bg-offwhite transition-all duration-250"
            >
              <div className="w-7 h-7 rounded bg-chalk flex items-center justify-center">
                <Icon size={13} className="text-stone group-hover:text-corp-blue transition-colors" />
              </div>
              <p className="font-display font-medium text-ink text-[13px] leading-tight">
                {getText(t.categories.items[key].name, lang)}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="flex items-center gap-2.5 text-stone/60 mb-10"
        >
          <Leaf size={11} className="text-green-accent/50 flex-shrink-0" />
          <p className="font-body text-[12px]">
            <span className="font-medium text-copy/60">{getText(t.categories.food, lang)}</span>
            {' — '}{getText(t.categories.foodSub, lang)}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 font-body font-semibold text-[12px] tracking-[0.14em] uppercase text-corp-blue hover:text-navy transition-colors"
          >
            {getText(t.categories.viewAll, lang)} <ArrowRight size={13} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

// ─── CMS-driven categories ────────────────────────────────────────────────────
function CmsCategoriesSection({ cats, lang }: { cats: CmsCategory[]; lang: 'en' | 'es' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const featured = cats.filter(c => c.featured).slice(0, 3)
  const standard = cats.filter(c => !c.featured)

  return (
    <section className="bg-white py-24" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="section-label"
        >
          {getText(t.categories.badge, lang)}
        </motion.p>
        <div className="grid lg:grid-cols-2 gap-6 items-end mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.08 }}
            className="font-display font-semibold text-[clamp(1.8rem,3vw,2.6rem)] leading-[1.1] tracking-[-0.02em] text-ink"
          >
            {getText(t.categories.headline, lang).replace('\n', ' ')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.16 }}
            className="font-body text-copy leading-relaxed lg:text-right"
          >
            {getText(t.categories.sub, lang)}
          </motion.p>
        </div>

        {featured.length > 0 && (
          <div className="grid sm:grid-cols-3 gap-5 mb-5">
            {featured.map((cat, i) => {
              const slug = cat.slug.current
              const Icon = ICON_MAP[slug] ?? Wrench
              const img  = cat.imageUrl ?? IMG_MAP[slug]
              const name = pick(cat.name, { en: cat._id, es: cat._id }, lang)
              const desc = cat.description ? pick(cat.description, { en: '', es: '' }, lang) : ''
              return (
                <motion.div
                  key={cat._id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.12 + i * 0.08 }}
                  className="group border border-ink/[0.08] rounded-lg overflow-hidden hover:border-corp-blue/25 hover:shadow-md transition-all duration-300 flex flex-col"
                >
                  {img && (
                    <div
                      className="h-44 bg-cover bg-center opacity-80 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0"
                      style={{ backgroundImage: `url(${img})` }}
                    />
                  )}
                  <div className="p-7 flex flex-col justify-between flex-1">
                    <div className="flex items-start justify-between">
                      <div className="w-9 h-9 rounded bg-corp-blue/8 flex items-center justify-center">
                        <Icon size={16} className="text-corp-blue" />
                      </div>
                      <ArrowRight size={14} className="text-stone/40 group-hover:text-corp-blue/60 transition-colors" />
                    </div>
                    <div className="pt-6">
                      <h3 className="font-display font-semibold text-ink text-lg mb-2">{name}</h3>
                      {desc && <p className="font-body text-stone text-[13px] leading-relaxed">{desc}</p>}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}

        {standard.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 mb-10">
            {standard.map((cat, i) => {
              const Icon = ICON_MAP[cat.slug.current] ?? Wrench
              const name = pick(cat.name, { en: cat._id, es: cat._id }, lang)
              return (
                <motion.div
                  key={cat._id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.25 + i * 0.04 }}
                  className="group border border-ink/[0.07] rounded-md p-4 flex flex-col gap-2.5 hover:border-corp-blue/20 hover:bg-offwhite transition-all duration-250"
                >
                  <div className="w-7 h-7 rounded bg-chalk flex items-center justify-center">
                    <Icon size={13} className="text-stone group-hover:text-corp-blue transition-colors" />
                  </div>
                  <p className="font-display font-medium text-ink text-[13px] leading-tight">{name}</p>
                </motion.div>
              )
            })}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 font-body font-semibold text-[12px] tracking-[0.14em] uppercase text-corp-blue hover:text-navy transition-colors"
          >
            {getText(t.categories.viewAll, lang)} <ArrowRight size={13} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Represented brands ───────────────────────────────────────────────────────
function ProductsBrandsSection() {
  const { lang } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="bg-offwhite py-20" ref={ref}>
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
          className="font-display font-semibold text-[clamp(1.6rem,2.8vw,2.2rem)] leading-[1.1] tracking-[-0.02em] text-ink mb-10 max-w-lg"
        >
          {getText(t.brands.headline, lang).replace('\n', ' ')}
        </motion.h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {BRANDS_STRIP.map(({ name, category }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.1 + i * 0.06 }}
              className="bg-white border border-ink/[0.08] rounded-lg p-5 text-center hover:border-corp-blue/20 hover:shadow-sm transition-all duration-200"
            >
              <p className="font-display font-semibold text-ink text-[14px] mb-1">{name}</p>
              <p className="font-body text-stone text-[11px]">{lang === 'es' ? category.es : category.en}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="font-body text-stone text-[13px] mt-8"
        >
          {getText(t.brands.sub, lang)}
        </motion.p>
      </div>
    </section>
  )
}

// ─── Main export ─────────────────────────────────────────────────────────────
export default function ProductsContent({ cms }: Props) {
  const { lang } = useLanguage()

  return (
    <>
      {cms?.length
        ? <CmsCategoriesSection cats={cms} lang={lang} />
        : <FeaturedCategoriesSection />
      }
      <ProductsBrandsSection />
    </>
  )
}
