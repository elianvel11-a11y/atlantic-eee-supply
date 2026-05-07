'use client'

import PageHero from './PageHero'
import { useLanguage } from '@/lib/LanguageContext'

interface Props {
  en: { label: string; title: string; subtitle?: string }
  es: { label: string; title: string; subtitle?: string }
  image?: string
}

export default function PageHeroI18n({ en, es, image }: Props) {
  const { lang } = useLanguage()
  const c = lang === 'es' ? es : en
  return <PageHero label={c.label} title={c.title} subtitle={c.subtitle} image={image} />
}
