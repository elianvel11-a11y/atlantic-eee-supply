'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Phone, Mail, MessageCircle, MapPin, ExternalLink, Send, CheckCircle2, Paperclip } from 'lucide-react'
import PageHero from '@/components/ui/PageHero'
import { useLanguage } from '@/lib/LanguageContext'
import { t, getText } from '@/lib/translations'

const CATEGORIES = [
  'Packing & Jointing', 'Valves & Cocks', 'Safety Equipment',
  'Flags & Bunting', 'Clothing & Maritime Wear', 'Electrical Cooking Appliances',
  'Pneumatic & Electrical Tools', 'Hand Tools', 'Measuring Tools',
  'Hose & Couplings', 'Rope & Hawsers', 'Electrical Equipment', 'Other',
]

const L = {
  vesselName:    { en: 'Vessel name',          es: 'Nombre del buque' },
  imoNumber:     { en: 'IMO number',           es: 'Número IMO' },
  portOfCall:    { en: 'Port of call',         es: 'Puerto de escala' },
  deliveryDate:  { en: 'Required delivery date', es: 'Fecha de entrega requerida' },
  attachment:    { en: 'Attach requisition (PDF / Word)', es: 'Adjuntar requisición (PDF / Word)' },
  attachPh:      { en: 'No file selected',     es: 'Ningún archivo seleccionado' },
}

// ─── Quote form ───────────────────────────────────────────────────────────────
function QuoteForm() {
  const { lang } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle')
  const [fileName, setFileName] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    const form = e.currentTarget
    const data = new FormData(form)
    try {
      const res = await fetch('https://formspree.io/f/YOUR_FORMSPREE_ID', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (res.ok) { setStatus('success'); form.reset(); setFileName('') }
      else setStatus('idle')
    } catch { setStatus('idle') }
  }

  const inputClass = "w-full font-body text-[14px] text-ink border border-ink/[0.15] rounded-sm px-4 py-3 bg-white placeholder:text-stone/50 focus:outline-none focus:border-corp-blue/40 focus:ring-1 focus:ring-corp-blue/20 transition-all"

  return (
    <section className="bg-offwhite py-24" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="section-label"
            >
              {getText(t.quote.badge, lang)}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.08 }}
              className="font-display font-semibold text-[clamp(1.8rem,3vw,2.6rem)] leading-[1.1] tracking-[-0.02em] text-ink mb-5"
            >
              {getText(t.quote.headline, lang).replace('\n', ' ')}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.16 }}
              className="font-body text-copy leading-relaxed mb-8"
            >
              {getText(t.quote.sub, lang)}
            </motion.p>

            {/* Quick channels */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.24 }}
              className="flex flex-col gap-3"
            >
              {[
                { icon: MessageCircle, text: '+507 6670-4578', href: 'https://wa.me/50766704578', label: 'WhatsApp' },
                { icon: Phone,         text: '+507 6670-4578', href: 'tel:+50766704578',           label: lang === 'es' ? 'Teléfono' : 'Phone' },
                { icon: Mail,          text: 'sales1@atlanticshipsuppliers.com', href: 'mailto:sales1@atlanticshipsuppliers.com', label: lang === 'es' ? 'Correo' : 'Email' },
              ].map(({ icon: Icon, text, href, label }) => (
                <a
                  key={href}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-3 group"
                >
                  <div className="w-9 h-9 rounded bg-white border border-ink/[0.1] flex items-center justify-center flex-shrink-0 group-hover:border-corp-blue/30 transition-colors">
                    <Icon size={14} className="text-stone group-hover:text-corp-blue transition-colors" />
                  </div>
                  <div>
                    <p className="font-body text-[10px] tracking-[0.14em] uppercase text-stone/60">{label}</p>
                    <p className="font-body text-[13px] text-copy group-hover:text-corp-blue transition-colors">{text}</p>
                  </div>
                </a>
              ))}
            </motion.div>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.14 }}
          >
            {status === 'success' ? (
              <div className="bg-white border border-ink/[0.08] rounded-xl p-10 flex flex-col items-center text-center gap-4">
                <CheckCircle2 size={36} className="text-corp-blue" />
                <p className="font-display font-semibold text-ink text-xl">{getText(t.quote.success, lang)}</p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
                className="bg-white border border-ink/[0.08] rounded-xl p-8 flex flex-col gap-4"
              >
                {/* Row 1: Name + Company */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-body text-[12px] text-copy/70 tracking-wide">{getText(t.quote.name, lang)}</label>
                    <input name="name" type="text" required placeholder={lang === 'es' ? 'Su nombre' : 'Your name'} className={inputClass} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-body text-[12px] text-copy/70 tracking-wide">{getText(t.quote.company, lang)}</label>
                    <input name="company" type="text" placeholder={lang === 'es' ? 'Empresa o compañía' : 'Company'} className={inputClass} />
                  </div>
                </div>

                {/* Row 2: Email + Phone */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-body text-[12px] text-copy/70 tracking-wide">{getText(t.quote.email, lang)}</label>
                    <input name="email" type="email" required placeholder="email@company.com" className={inputClass} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-body text-[12px] text-copy/70 tracking-wide">{getText(t.quote.phone, lang)}</label>
                    <input name="phone" type="tel" placeholder="+507 ..." className={inputClass} />
                  </div>
                </div>

                {/* Divider — vessel details */}
                <div className="flex items-center gap-3 pt-1">
                  <div className="flex-1 h-px bg-ink/[0.08]" />
                  <span className="font-body text-[10px] tracking-[0.18em] uppercase text-stone/50">
                    {lang === 'es' ? 'Datos del buque' : 'Vessel details'}
                  </span>
                  <div className="flex-1 h-px bg-ink/[0.08]" />
                </div>

                {/* Row 3: Vessel name + IMO */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-body text-[12px] text-copy/70 tracking-wide">{L.vesselName[lang]}</label>
                    <input name="vessel_name" type="text" placeholder={lang === 'es' ? 'M/V Nombre del buque' : 'M/V Vessel name'} className={inputClass} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-body text-[12px] text-copy/70 tracking-wide">{L.imoNumber[lang]}</label>
                    <input name="imo_number" type="text" placeholder="IMO 1234567" pattern="\d{7}" title="7-digit IMO number" className={inputClass} />
                  </div>
                </div>

                {/* Row 4: Port + Delivery date */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-body text-[12px] text-copy/70 tracking-wide">{L.portOfCall[lang]}</label>
                    <input name="port_of_call" type="text" placeholder={lang === 'es' ? 'Puerto de escala' : 'e.g. Colón, Balboa'} className={inputClass} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-body text-[12px] text-copy/70 tracking-wide">{L.deliveryDate[lang]}</label>
                    <input name="delivery_date" type="date" className={inputClass} />
                  </div>
                </div>

                {/* Category */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-body text-[12px] text-copy/70 tracking-wide">{getText(t.quote.category, lang)}</label>
                  <select name="category" className={inputClass}>
                    <option value="">{getText(t.quote.catPlaceholder, lang)}</option>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-body text-[12px] text-copy/70 tracking-wide">{getText(t.quote.message, lang)}</label>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder={getText(t.quote.messagePh, lang)}
                    className={inputClass + ' resize-none'}
                  />
                </div>

                {/* File upload */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-body text-[12px] text-copy/70 tracking-wide">{L.attachment[lang]}</label>
                  <label className="flex items-center gap-3 px-4 py-3 border border-ink/[0.15] rounded-sm bg-white cursor-pointer hover:border-corp-blue/40 transition-colors group">
                    <Paperclip size={14} className="text-stone group-hover:text-corp-blue transition-colors flex-shrink-0" />
                    <span className="font-body text-[13px] text-stone/60 truncate">
                      {fileName || L.attachPh[lang]}
                    </span>
                    <input
                      name="attachment"
                      type="file"
                      accept=".pdf,.doc,.docx,.xls,.xlsx"
                      className="sr-only"
                      onChange={(e) => setFileName(e.target.files?.[0]?.name ?? '')}
                    />
                  </label>
                  <p className="font-body text-[11px] text-stone/40">PDF, Word, or Excel — max 10 MB</p>
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="mt-2 w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-navy text-white font-body font-semibold text-[12px] tracking-[0.14em] uppercase rounded-sm hover:bg-navy-mid transition-colors disabled:opacity-60"
                >
                  <Send size={13} />
                  {status === 'sending' ? getText(t.quote.sending, lang) : getText(t.quote.submit, lang)}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─── Office cards ─────────────────────────────────────────────────────────────
function OfficeCards() {
  const { lang } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="bg-white py-20 border-t border-ink/[0.07]" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="section-label"
        >
          {getText(t.contact.badge, lang)}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.08 }}
          className="font-display font-semibold text-[clamp(1.8rem,3vw,2.6rem)] leading-[1.1] tracking-[-0.02em] text-ink mb-12"
        >
          {getText(t.contact.headline, lang).replace('\n', ' ')}
        </motion.h2>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Offices */}
          {[
            {
              name: getText(t.contact.panama, lang),
              address: 'Av. Juan Pablo II, Calle 2059\nPanama City, Panamá',
              map: 'https://maps.google.com/?q=Av+Juan+Pablo+II+Calle+2059+Panama',
            },
            {
              name: getText(t.contact.colon, lang),
              address: 'Plaza Silver City, Local N25\nColón, Panamá',
              map: 'https://maps.google.com/?q=Plaza+Silver+City+Colon+Panama',
            },
          ].map(({ name, address, map }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.1 }}
              className="border border-ink/[0.08] rounded-lg p-6"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="w-8 h-8 rounded bg-corp-blue/8 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin size={14} className="text-corp-blue" />
                </div>
                <p className="font-display font-semibold text-ink text-[15px]">{name}</p>
              </div>
              <p className="font-mono text-[12px] text-stone whitespace-pre-line mb-4">{address}</p>
              <a
                href={map}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-body text-[12px] tracking-[0.12em] uppercase text-corp-blue hover:text-navy font-semibold transition-colors"
              >
                {getText(t.contact.directions, lang)} <ExternalLink size={11} />
              </a>
            </motion.div>
          ))}

          {/* Channels */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="border border-ink/[0.08] rounded-lg p-6 flex flex-col gap-4"
          >
            {[
              { icon: MessageCircle, label: 'WhatsApp', value: '+507 6670-4578', href: 'https://wa.me/50766704578', ext: true },
              { icon: Phone,         label: lang === 'es' ? 'Teléfono' : 'Phone', value: '+507 6670-4578', href: 'tel:+50766704578', ext: false },
              { icon: Mail,          label: 'Sales EN', value: 'sales1@...', href: 'mailto:sales1@atlanticshipsuppliers.com', ext: false },
              { icon: Mail,          label: 'Sales ES', value: 'ventas@...', href: 'mailto:ventas@atlanticshipsuppliers.com', ext: false },
            ].map(({ icon: Icon, label, value, href, ext }) => (
              <a
                key={href}
                href={href}
                target={ext ? '_blank' : undefined}
                rel={ext ? 'noopener noreferrer' : undefined}
                className="flex items-center gap-3 group"
              >
                <div className="w-8 h-8 rounded bg-chalk flex items-center justify-center flex-shrink-0">
                  <Icon size={13} className="text-stone group-hover:text-corp-blue transition-colors" />
                </div>
                <div>
                  <p className="font-body text-[10px] tracking-[0.12em] uppercase text-stone/55">{label}</p>
                  <p className="font-body text-[13px] text-copy group-hover:text-corp-blue transition-colors">{value}</p>
                </div>
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default function ContactPage() {
  const { lang } = useLanguage()
  return (
    <main>
      <PageHero
        label={lang === 'es' ? 'CONTACTO' : 'CONTACT'}
        title={lang === 'es' ? 'Dos oficinas. Un equipo.' : 'Two offices. One team.'}
        subtitle={getText(t.contact.sub, lang)}
      />
      <QuoteForm />
      <OfficeCards />
    </main>
  )
}
