import { client } from './client'
import type { CmsHero, CmsContact, CmsAbout, CmsCategory, CmsBrand, CmsOpsMap } from '@/lib/cms'

// ── Hero ─────────────────────────────────────────────────────────────────────
export async function getHero(): Promise<CmsHero> {
  if (!client) return null
  return client.fetch<CmsHero>(
    `*[_type == "hero" && _id == "hero"][0]`,
    {},
    { next: { tags: ['hero'] } },
  ).catch(() => null)
}

// ── About ─────────────────────────────────────────────────────────────────────
export async function getAboutContent(): Promise<CmsAbout> {
  if (!client) return null
  return client.fetch<CmsAbout>(
    `*[_type == "aboutContent" && _id == "aboutContent"][0]`,
    {},
    { next: { tags: ['aboutContent'] } },
  ).catch(() => null)
}

// ── Contact ──────────────────────────────────────────────────────────────────
export async function getContactInfo(): Promise<CmsContact> {
  if (!client) return null
  return client.fetch<CmsContact>(
    `*[_type == "contactInfo" && _id == "contactInfo"][0]`,
    {},
    { next: { tags: ['contactInfo'] } },
  ).catch(() => null)
}

// ── Operations Map ────────────────────────────────────────────────────────────
export async function getOperationsMap(): Promise<CmsOpsMap> {
  if (!client) return null
  return client.fetch<CmsOpsMap>(
    `*[_type == "operationsMap" && _id == "operationsMap"][0]`,
    {},
    { next: { tags: ['operationsMap'] } },
  ).catch(() => null)
}

// ── Categories ────────────────────────────────────────────────────────────────
export async function getCategories(): Promise<CmsCategory[] | null> {
  if (!client) return null
  return client.fetch<CmsCategory[]>(
    `*[_type == "category"] | order(order asc) {
      _id,
      slug,
      name,
      description,
      featured,
      "imageUrl": image.asset->url,
      order
    }`,
    {},
    { next: { tags: ['category'] } },
  ).catch(() => null)
}

// ── Brands ────────────────────────────────────────────────────────────────────
export async function getBrands(): Promise<CmsBrand[] | null> {
  if (!client) return null
  return client.fetch<CmsBrand[]>(
    `*[_type == "brand"] | order(order asc) {
      _id,
      name,
      category,
      featured,
      "logoUrl": logo.asset->url,
      order
    }`,
    {},
    { next: { tags: ['brand'] } },
  ).catch(() => null)
}
