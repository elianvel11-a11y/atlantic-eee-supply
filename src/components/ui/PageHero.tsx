'use client'

import { motion } from 'framer-motion'

interface PageHeroProps {
  label: string
  title: string
  subtitle?: string
  image?: string
}

export default function PageHero({ label, title, subtitle, image }: PageHeroProps) {
  return (
    <section className="relative bg-navy pt-48 pb-20 overflow-hidden">
      {/* Background image (optional) */}
      {image && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center opacity-15"
            style={{ backgroundImage: `url(${image})` }}
          />
          <div className="absolute inset-0 bg-navy/70" />
        </>
      )}

      {/* Subtle atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_0%_50%,rgba(26,82,152,0.15),transparent)]" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/[0.07]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="section-label-light"
        >
          {label}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="font-display font-semibold text-[clamp(2rem,4vw,3.5rem)] leading-[1.07] tracking-[-0.02em] text-white max-w-3xl"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="font-body text-base text-white/50 leading-relaxed mt-4 max-w-2xl"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  )
}
