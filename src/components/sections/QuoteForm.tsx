'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Send, CircleCheck } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'
import { t, getText } from '@/lib/translations'

const CATEGORIES = [
  'Packing & Jointing', 'Valves & Cocks', 'Safety Equipment',
  'Flags & Bunting', 'Clothing & Maritime Wear', 'Electrical Cooking Appliances',
  'Pneumatic & Electrical Tools', 'Hand Tools', 'Measuring Tools',
  'Hose & Couplings', 'Rope & Hawsers', 'Electrical Equipment',
  'Vessel Support (Food & Beverage)', 'Multiple / Other',
]

const CATEGORIES_ES = [
  'Empaques y Juntas', 'Válvulas y Grifos', 'Equipos de Seguridad',
  'Banderas y Gallardetes', 'Ropa y Uniformes', 'Aparatos de Cocina Eléctricos',
  'Herramientas Eléctricas y Neumáticas', 'Herramientas Manuales', 'Herramientas de Medición',
  'Mangueras y Acoplamientos', 'Cabos y Estachas', 'Equipos Eléctricos',
  'Apoyo al Buque (Alimentos)', 'Múltiple / Otro',
]

type FormState = {
  name: string
  company: string
  email: string
  phone: string
  category: string
  message: string
}

export default function QuoteForm() {
  const { lang } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [form, setForm] = useState<FormState>({
    name: '', company: '', email: '', phone: '', category: '', message: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Partial<FormState>>({})

  const cats = lang === 'es' ? CATEGORIES_ES : CATEGORIES

  function validate() {
    const e: Partial<FormState> = {}
    if (!form.name.trim()) e.name = 'Required'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required'
    if (!form.message.trim()) e.message = 'Required'
    return e
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setStatus('sending')

    try {
      // TODO: Replace YOUR_FORMSPREE_ID with your actual Formspree form ID from formspree.io
      const res = await fetch('https://formspree.io/f/YOUR_FORMSPREE_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...form,
          _replyto: form.email,
          _subject: `Quote Request — ${form.company || form.name}`,
        }),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', company: '', email: '', phone: '', category: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  function field(
    id: keyof FormState,
    label: string,
    type: string = 'text',
    placeholder?: string
  ) {
    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={id} className="font-body text-xs tracking-widest text-slate-maritime uppercase">
          {label}
        </label>
        <input
          id={id}
          type={type}
          value={form[id]}
          onChange={(e) => setForm((f) => ({ ...f, [id]: e.target.value }))}
          placeholder={placeholder}
          className={`bg-graphite/80 border rounded px-4 py-3 font-body text-sm text-white placeholder:text-slate-maritime/40 outline-none transition-all duration-200 focus:border-blue-accent/50 focus:bg-surface/80 ${
            errors[id] ? 'border-red-400/50' : 'border-white/8'
          }`}
        />
        {errors[id] && (
          <span className="font-body text-xs text-red-400/80">{errors[id]}</span>
        )}
      </div>
    )
  }

  return (
    <section id="quote" className="py-32 bg-graphite relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_100%_50%,rgba(0,0,128,0.2),transparent)]" />

      <div ref={ref} className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: info */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-8"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-blue-accent" />
              <span className="font-body text-xs tracking-[0.2em] text-slate-maritime uppercase">
                {getText(t.quote.badge, lang)}
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display font-semibold text-[clamp(2.4rem,4vw,3.2rem)] leading-[1.08] tracking-[-0.02em] text-white mb-6"
            >
              {getText(t.quote.headline, lang)
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
              className="font-body text-slate-maritime leading-relaxed mb-10"
            >
              {getText(t.quote.sub, lang)}
            </motion.p>

            {/* Contact quick-links */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col gap-3"
            >
              <a
                href="https://wa.me/50766704578"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-sm font-body text-slate-maritime hover:text-white transition-colors"
              >
                <div className="w-7 h-7 rounded-md bg-green-accent/10 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-green-accent" aria-hidden>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                +507 6670-4578
              </a>
              <a
                href="mailto:sales1@atlanticshipsuppliers.com"
                className="inline-flex items-center gap-3 text-sm font-body text-slate-maritime hover:text-white transition-colors"
              >
                <div className="w-7 h-7 rounded-md bg-blue-accent/10 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-blue-accent fill-none" strokeWidth="1.5" aria-hidden>
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m2 7 10 7 10-7" />
                  </svg>
                </div>
                sales1@atlanticshipsuppliers.com
              </a>
            </motion.div>
          </div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="glass-light rounded-xl p-8"
          >
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
                <div className="w-14 h-14 rounded-full bg-green-accent/10 flex items-center justify-center">
                  <CircleCheck size={24} className="text-green-accent" />
                </div>
                <p className="font-display text-xl text-white font-light">
                  {getText(t.quote.success, lang)}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  {field('name', getText(t.quote.name, lang))}
                  {field('company', getText(t.quote.company, lang))}
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  {field('email', getText(t.quote.email, lang), 'email')}
                  {field('phone', getText(t.quote.phone, lang), 'tel')}
                </div>

                {/* Category select */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="category" className="font-body text-xs tracking-widest text-slate-maritime uppercase">
                    {getText(t.quote.category, lang)}
                  </label>
                  <select
                    id="category"
                    value={form.category}
                    onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                    className="bg-graphite/80 border border-white/8 rounded px-4 py-3 font-body text-sm text-white outline-none focus:border-blue-accent/50 focus:bg-surface/80 transition-all duration-200 appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-graphite text-slate-maritime">
                      {getText(t.quote.catPlaceholder, lang)}
                    </option>
                    {cats.map((c) => (
                      <option key={c} value={c} className="bg-graphite text-white">{c}</option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="font-body text-xs tracking-widest text-slate-maritime uppercase">
                    {getText(t.quote.message, lang)}
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    placeholder={getText(t.quote.messagePh, lang)}
                    className={`bg-graphite/80 border rounded px-4 py-3 font-body text-sm text-white placeholder:text-slate-maritime/40 outline-none transition-all duration-200 focus:border-blue-accent/50 focus:bg-surface/80 resize-none ${
                      errors.message ? 'border-red-400/50' : 'border-white/8'
                    }`}
                  />
                  {errors.message && (
                    <span className="font-body text-xs text-red-400/80">{errors.message}</span>
                  )}
                </div>

                {status === 'error' && (
                  <p className="font-body text-xs text-red-400/80">
                    Something went wrong. Please email us directly at sales1@atlanticshipsuppliers.com
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="group flex items-center justify-center gap-2 py-3.5 bg-blue-accent text-white font-body text-sm tracking-wider uppercase rounded hover:bg-blue-accent/90 disabled:opacity-60 transition-all duration-200 mt-1"
                >
                  {status === 'sending'
                    ? getText(t.quote.sending, lang)
                    : getText(t.quote.submit, lang)}
                  <Send size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
