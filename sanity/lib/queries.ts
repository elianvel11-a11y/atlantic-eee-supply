import { client } from './client'
import type {
  CmsHero, CmsContact, CmsAbout, CmsMissionVision,
  CmsCategory, CmsBrand, CmsOpsMap, CmsSiteSettings, CmsGallery,
} from '@/lib/cms'

// ── Site Settings ─────────────────────────────────────────────────────────────
export async function getSiteSettings(): Promise<CmsSiteSettings> {
  if (!client) return null
  return client.fetch<CmsSiteSettings>(
    `*[_type == "siteSettings" && _id == "siteSettings"][0] {
      whatsapp, phone, emailSales, emailVentas, footerTagline,
      officePanama, officeColon,
      "logoUrl":    logo.asset->url,
      "faviconUrl": favicon.asset->url,
      linkedin, instagram, facebook,
      seoTitle, seoDescription,
      "ogImageUrl": ogImage.asset->url
    }`,
    {},
    { next: { tags: ['siteSettings'] } },
  ).catch(() => null)
}

// ── Hero ─────────────────────────────────────────────────────────────────────
export async function getHero(): Promise<CmsHero> {
  if (!client) return null
  return client.fetch<CmsHero>(
    `*[_type == "hero" && _id == "hero"][0] {
      badge, headline, subheading, ctaPrimary, ctaSecondary,
      backgroundType, backgroundVideoUrl,
      "backgroundImageUrl": backgroundImage.asset->url,
      stats, seoTitle, seoDescription
    }`,
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

// ── Mission · Vision · Values ────────────────────────────────────────────────
export async function getMissionVision(): Promise<CmsMissionVision> {
  if (!client) return null
  return client.fetch<CmsMissionVision>(
    `*[_type == "missionVision" && _id == "missionVision"][0]`,
    {},
    { next: { tags: ['missionVision'] } },
  ).catch(() => null)
}

// ── Contact (legacy — prefer getSiteSettings) ─────────────────────────────────
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
      "gallery": gallery[]{
        "imageUrl": image.asset->url,
        captionEn,
        captionEs
      },
      "relatedBrands": relatedBrands[]->{
        _id, name,
        "logoUrl": logo.asset->url
      },
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
    `*[_type == "brand" && visible != false] | order(order asc) {
      _id,
      name,
      category,
      description,
      specialties,
      featured,
      visible,
      "logoUrl": logo.asset->url,
      order
    }`,
    {},
    { next: { tags: ['brand'] } },
  ).catch(() => null)
}

// ── Gallery ───────────────────────────────────────────────────────────────────
export async function getGallery(category?: string): Promise<CmsGallery[] | null> {
  if (!client) return null
  const filter = category
    ? `*[_type == "gallery" && published == true && category == $category]`
    : `*[_type == "gallery" && published == true]`
  return client.fetch<CmsGallery[]>(
    `${filter} | order(order asc) {
      _id,
      title,
      category,
      "photos": photos[]{
        "imageUrl": image.asset->url,
        captionEn,
        captionEs
      },
      order
    }`,
    category ? { category } : {},
    { next: { tags: ['gallery'] } },
  ).catch(() => null)
}
