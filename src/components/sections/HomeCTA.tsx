'use client'

import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useRef } from 'react'
import { useLanguage } from '@/lib/LanguageContext'

export default function HomeCTA() {
  const { lang } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="bg-chalk py-24" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <p className="section-label">{lang === 'es' ? 'Trabajemos juntos' : 'Work With Us'}</p>
            <h2 className="font-display font-semibold text-[clamp(1.8rem,3vw,2.6rem)] leading-[1.1] tracking-[-0.02em] text-ink mb-4">
              {lang === 'es' ? 'Listos para abastecer su embarcación.' : 'Ready to supply your vessel.'}
            </h2>
            <p className="font-body text-copy leading-relaxed mb-8">
              {lang === 'es'
                ? 'Contáctenos por WhatsApp, correo o mediante el formulario. Respondemos en menos de 24 horas.'
                : 'Reach us by WhatsApp, email, or form. We respond within 24 hours.'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://wa.me/50766704578"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-navy text-white font-body font-semibold text-[12px] tracking-[0.12em] uppercase rounded-sm hover:bg-navy-mid transition-colors duration-200"
              >
                WhatsApp
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-navy/25 text-navy font-body font-semibold text-[12px] tracking-[0.12em] uppercase rounded-sm hover:bg-navy hover:text-white transition-all duration-200"
              >
                {lang === 'es' ? 'Solicitar cotización' : 'Request Quote'} <ArrowRight size={13} />
              </Link>
            </div>
          </motion.div>

          {/* Photo panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.14 }}
            className="relative h-72 rounded-xl overflow-hidden hidden lg:block"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: 'url(/images/ship-at-sea.jpg)' }}
            />
            <div className="absolute inset-0 bg-navy/30" />
            <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-navy/70 to-transparent">
              <p className="font-body text-white/60 text-[10px] tracking-[0.2em] uppercase">
                {lang === 'es' ? 'Respuesta en 24h · Panamá' : '24h Response · Panama'}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
