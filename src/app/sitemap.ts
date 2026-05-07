import type { MetadataRoute } from 'next'

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://atlanticeee.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    { url: BASE,                 lastModified: now, changeFrequency: 'monthly', priority: 1.0 },
    { url: `${BASE}/products`,   lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/brands`,     lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/operations`, lastModified: now, changeFrequency: 'yearly',  priority: 0.7 },
    { url: `${BASE}/about`,      lastModified: now, changeFrequency: 'yearly',  priority: 0.6 },
    { url: `${BASE}/contact`,    lastModified: now, changeFrequency: 'yearly',  priority: 0.8 },
  ]
}
