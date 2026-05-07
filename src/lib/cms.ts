import type { Lang } from './translations'

// A Sanity bilingual text field — both languages optional
export type BiL = { en?: string | null; es?: string | null } | null | undefined

// Return the correct language value, falling back to the hardcoded translation.
export function pick(
  cmsField: BiL,
  fallback: { en: string; es: string },
  lang: Lang,
): string {
  if (cmsField && (cmsField.en || cmsField.es)) {
    return (cmsField[lang] ?? cmsField.en ?? cmsField.es ?? fallback[lang])!
  }
  return fallback[lang]
}

// ── CMS payload types ─────────────────────────────────────────────────────────

export type CmsHero = {
  badge?:         BiL
  headline?:      BiL
  subheading?:    BiL
  ctaPrimary?:    BiL
  ctaSecondary?:  BiL
  backgroundImage?: string | null
  stats?: Array<{ value: string; labelEn?: string | null; labelEs?: string | null }> | null
} | null

export type CmsContact = {
  whatsapp?:   string | null
  phone?:      string | null
  emailSales?: string | null
  emailVentas?: string | null
  footerTagline?: BiL
  officePanama?: { address?: string | null; mapsUrl?: string | null } | null
  officeColon?:  { address?: string | null; mapsUrl?: string | null } | null
} | null

export type CmsAbout = {
  badge?:    BiL
  headline?: BiL
  body1?:    BiL
  body2?:    BiL
  stats?: Array<{ value: string; labelEn?: string | null; labelEs?: string | null }> | null
  capabilities?: Array<{
    headEn?: string | null; headEs?: string | null
    bodyEn?: string | null; bodyEs?: string | null
  }> | null
} | null

export type CmsCategory = {
  _id:    string
  slug:   { current: string }
  name:   { en?: string | null; es?: string | null }
  description?: { en?: string | null; es?: string | null } | null
  featured?: boolean | null
  imageUrl?: string | null
  order?: number | null
}

export type CmsBrand = {
  _id:  string
  name: string
  category?: { en?: string | null; es?: string | null } | null
  featured?: boolean | null
  logoUrl?: string | null
  order?: number | null
}

export type CmsOpsMap = {
  badge?:      BiL
  headline?:   BiL
  subheading?: BiL
  nodes?: Array<{
    id:          string
    cityName?:   BiL
    role?:       BiL
    coordinates?: string | null
  }> | null
} | null
