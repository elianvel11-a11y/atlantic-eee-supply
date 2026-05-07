'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Phone, Mail, MessageCircle, MapPin, ExternalLink } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'
import { t, getText } from '@/lib/translations'

export default function Contact() {
  const { lang } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const offices = [
    {
      city: getText(t.contact.panama, lang),
      address: 'Avenida Juan Pablo II, Calle 2059, Panama City, Panamá Province',
      maps: 'https://maps.google.com/?q=Avenida+Juan+Pablo+II+Calle+2059+Panama+City',
    },
    {
      city: getText(t.contact.colon, lang),
      address: 'Plaza Silver City, Local N25, Colón Province, Panama',
      maps: 'https://maps.google.com/?q=Plaza+Silver+City+Colon+Panama',
    },
  ]

  const channels = [
    {
      icon: MessageCircle,
      label: getText(t.contact.whatsapp, lang),
      value: '+507 6670-4578',
      href: 'https://wa.me/50766704578',
      accent: 'text-green-accent',
      bg: 'bg-green-accent/10',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+507 6670-4578',
      href: 'tel:+50766704578',
      accent: 'text-blue-accent',
      bg: 'bg-blue-accent/10',
    },
    {
      icon: Mail,
      label: 'Sales',
      value: 'sales1@atlanticshipsuppliers.com',
      href: 'mailto:sales1@atlanticshipsuppliers.com',
      accent: 'text-blue-accent',
      bg: 'bg-blue-accent/10',
    },
    {
      icon: Mail,
      label: 'Ventas',
      value: 'ventas@atlanticshipsuppliers.com',
      href: 'mailto:ventas@atlanticshipsuppliers.com',
      accent: 'text-blue-accent',
      bg: 'bg-blue-accent/10',
    },
  ]

  return (
    <section id="contact" className="py-32 bg-charcoal relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_100%,rgba(0,0,128,0.2),transparent)]" />

      <div ref={ref} className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-8"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-blue-accent" />
            <span className="font-body text-xs tracking-[0.2em] text-slate-maritime uppercase">
              {getText(t.contact.badge, lang)}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-semibold text-[clamp(2.4rem,4vw,3.2rem)] leading-[1.08] tracking-[-0.02em] text-white mb-5"
          >
            {getText(t.contact.headline, lang)
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
            className="font-body text-slate-maritime"
          >
            {getText(t.contact.sub, lang)}
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Offices */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-4"
          >
            {offices.map(({ city, address, maps }) => (
              <div key={city} className="glass-light rounded-xl p-6">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-md bg-navy/60 flex items-center justify-center">
                      <MapPin size={13} className="text-blue-accent" />
                    </div>
                    <span className="font-display text-white text-base font-medium">{city}</span>
                  </div>
                  <a
                    href={maps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 font-body text-xs text-slate-maritime hover:text-blue-accent transition-colors"
                  >
                    {getText(t.contact.directions, lang)}
                    <ExternalLink size={11} />
                  </a>
                </div>
                <p className="font-body text-slate-maritime text-sm leading-relaxed pl-9">
                  {address}
                </p>
              </div>
            ))}
          </motion.div>

          {/* Channels */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 gap-4"
          >
            {channels.map(({ icon: Icon, label, value, href, accent, bg }) => (
              <a
                key={href}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="glass-light rounded-xl p-5 flex flex-col gap-3 hover:border-white/15 transition-all duration-200 group"
              >
                <div className={`w-9 h-9 rounded-md ${bg} flex items-center justify-center`}>
                  <Icon size={15} className={accent} />
                </div>
                <div>
                  <p className="font-body text-[10px] tracking-widest text-slate-maritime uppercase mb-1">
                    {label}
                  </p>
                  <p className={`font-body text-sm ${accent} break-all leading-relaxed group-hover:opacity-90`}>
                    {value}
                  </p>
                </div>
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
