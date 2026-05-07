import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name:  'siteSettings',
  title: 'Site Settings',
  type:  'document',
  groups: [
    { name: 'contact', title: 'Contact & Offices' },
    { name: 'brand',   title: 'Branding' },
    { name: 'social',  title: 'Social Links' },
    { name: 'seo',     title: 'SEO & Metadata' },
  ],
  fields: [
    // ── Contact ──────────────────────────────────────────────────────────────
    defineField({
      name: 'whatsapp', title: 'WhatsApp number', type: 'string', group: 'contact',
      description: 'Include country code, e.g. +507 6670-4578',
    }),
    defineField({
      name: 'phone', title: 'Phone number', type: 'string', group: 'contact',
    }),
    defineField({
      name: 'emailSales', title: 'Sales email (English)', type: 'string', group: 'contact',
    }),
    defineField({
      name: 'emailVentas', title: 'Sales email (Spanish)', type: 'string', group: 'contact',
    }),
    defineField({
      name: 'footerTagline', title: 'Footer tagline', type: 'object', group: 'contact',
      fields: [
        { name: 'en', title: 'English', type: 'text', rows: 2 },
        { name: 'es', title: 'Spanish', type: 'text', rows: 2 },
      ],
    }),
    defineField({
      name: 'officePanama', title: 'Panama City office', type: 'object', group: 'contact',
      fields: [
        { name: 'address', title: 'Address (plain text)', type: 'text', rows: 3 },
        { name: 'mapsUrl', title: 'Google Maps URL',      type: 'url' },
      ],
    }),
    defineField({
      name: 'officeColon', title: 'Colón office', type: 'object', group: 'contact',
      fields: [
        { name: 'address', title: 'Address (plain text)', type: 'text', rows: 3 },
        { name: 'mapsUrl', title: 'Google Maps URL',      type: 'url' },
      ],
    }),
    // ── Branding ─────────────────────────────────────────────────────────────
    defineField({
      name: 'logo', title: 'Logo (PNG with transparency)', type: 'image', group: 'brand',
      options: { hotspot: false },
    }),
    defineField({
      name: 'favicon', title: 'Favicon (square, 48×48 PNG)', type: 'image', group: 'brand',
    }),
    // ── Social ───────────────────────────────────────────────────────────────
    defineField({ name: 'linkedin',  title: 'LinkedIn URL',  type: 'url', group: 'social' }),
    defineField({ name: 'instagram', title: 'Instagram URL', type: 'url', group: 'social' }),
    defineField({ name: 'facebook',  title: 'Facebook URL',  type: 'url', group: 'social' }),
    // ── SEO ──────────────────────────────────────────────────────────────────
    defineField({
      name: 'seoTitle', title: 'Default page title (override)', type: 'object', group: 'seo',
      description: 'Replaces the hardcoded site title if filled in.',
      fields: [
        { name: 'en', title: 'English', type: 'string' },
        { name: 'es', title: 'Spanish', type: 'string' },
      ],
    }),
    defineField({
      name: 'seoDescription', title: 'Default meta description', type: 'object', group: 'seo',
      fields: [
        { name: 'en', title: 'English', type: 'text', rows: 3 },
        { name: 'es', title: 'Spanish', type: 'text', rows: 3 },
      ],
    }),
    defineField({
      name: 'ogImage', title: 'Default OG / social share image (1200×630)', type: 'image', group: 'seo',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Site Settings' }),
  },
})
