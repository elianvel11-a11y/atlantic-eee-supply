import { defineField, defineType } from 'sanity'

export const aboutContent = defineType({
  name:  'aboutContent',
  title: 'About Page',
  type:  'document',
  groups: [
    { name: 'content', title: 'Content' },
    { name: 'seo',     title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'badge', title: 'Section badge', type: 'object', group: 'content',
      fields: [
        { name: 'en', title: 'English', type: 'string' },
        { name: 'es', title: 'Spanish', type: 'string' },
      ],
    }),
    defineField({
      name: 'headline', title: 'Headline', type: 'object', group: 'content',
      fields: [
        { name: 'en', title: 'English', type: 'string' },
        { name: 'es', title: 'Spanish', type: 'string' },
      ],
    }),
    defineField({
      name: 'body1', title: 'First paragraph', type: 'object', group: 'content',
      fields: [
        { name: 'en', title: 'English', type: 'text', rows: 4 },
        { name: 'es', title: 'Spanish', type: 'text', rows: 4 },
      ],
    }),
    defineField({
      name: 'body2', title: 'Second paragraph', type: 'object', group: 'content',
      fields: [
        { name: 'en', title: 'English', type: 'text', rows: 4 },
        { name: 'es', title: 'Spanish', type: 'text', rows: 4 },
      ],
    }),
    defineField({
      name: 'stats', title: 'Key stat numbers', type: 'array', group: 'content',
      description: 'Four stats displayed in the right column (value + label).',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value',   title: 'Value',           type: 'string' },
            { name: 'labelEn', title: 'Label (English)', type: 'string' },
            { name: 'labelEs', title: 'Label (Spanish)', type: 'string' },
          ],
          preview: { select: { title: 'value', subtitle: 'labelEn' } },
        },
      ],
      validation: (R) => R.max(4),
    }),
    defineField({
      name: 'capabilities', title: 'Why Us / Capabilities', type: 'array', group: 'content',
      description: 'Six capability tiles on the About page.',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'headEn', title: 'Title (English)',       type: 'string' },
            { name: 'headEs', title: 'Title (Spanish)',       type: 'string' },
            { name: 'bodyEn', title: 'Description (English)', type: 'text', rows: 3 },
            { name: 'bodyEs', title: 'Description (Spanish)', type: 'text', rows: 3 },
          ],
          preview: { select: { title: 'headEn' } },
        },
      ],
      validation: (R) => R.max(6),
    }),
    // ── SEO ───────────────────────────────────────────────────────────────────
    defineField({
      name: 'seoTitle', title: 'About page title override', type: 'object', group: 'seo',
      fields: [
        { name: 'en', title: 'English', type: 'string' },
        { name: 'es', title: 'Spanish', type: 'string' },
      ],
    }),
    defineField({
      name: 'seoDescription', title: 'About page meta description', type: 'object', group: 'seo',
      fields: [
        { name: 'en', title: 'English', type: 'text', rows: 3 },
        { name: 'es', title: 'Spanish', type: 'text', rows: 3 },
      ],
    }),
    defineField({
      name: 'ogImage', title: 'About page OG image (1200×630)', type: 'image', group: 'seo',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'About Page' }),
  },
})
