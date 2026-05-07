import { defineField, defineType } from 'sanity'

export const hero = defineType({
  name:  'hero',
  title: 'Hero Section',
  type:  'document',
  groups: [
    { name: 'content',    title: 'Content' },
    { name: 'background', title: 'Background Media' },
    { name: 'seo',        title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'badge', title: 'Badge text', type: 'object', group: 'content',
      fields: [
        { name: 'en', title: 'English', type: 'string' },
        { name: 'es', title: 'Spanish', type: 'string' },
      ],
    }),
    defineField({
      name: 'headline', title: 'Headline', type: 'object', group: 'content',
      description: 'Main hero headline. Use \\n for a line break.',
      fields: [
        { name: 'en', title: 'English', type: 'string' },
        { name: 'es', title: 'Spanish', type: 'string' },
      ],
    }),
    defineField({
      name: 'subheading', title: 'Subheading', type: 'object', group: 'content',
      fields: [
        { name: 'en', title: 'English', type: 'text', rows: 3 },
        { name: 'es', title: 'Spanish', type: 'text', rows: 3 },
      ],
    }),
    defineField({
      name: 'ctaPrimary', title: 'Primary CTA label', type: 'object', group: 'content',
      fields: [
        { name: 'en', title: 'English', type: 'string' },
        { name: 'es', title: 'Spanish', type: 'string' },
      ],
    }),
    defineField({
      name: 'ctaSecondary', title: 'Secondary CTA label', type: 'object', group: 'content',
      fields: [
        { name: 'en', title: 'English', type: 'string' },
        { name: 'es', title: 'Spanish', type: 'string' },
      ],
    }),
    defineField({
      name: 'stats', title: 'Stat items', type: 'array', group: 'content',
      description: 'Three key numbers displayed below the headline.',
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
      validation: (R) => R.max(3),
    }),
    // ── Background media ──────────────────────────────────────────────────────
    defineField({
      name: 'backgroundType', title: 'Background type', type: 'string', group: 'background',
      initialValue: 'image',
      options: {
        list: [
          { title: 'Image (default)', value: 'image' },
          { title: 'Video',           value: 'video' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'backgroundImage', title: 'Background image', type: 'image', group: 'background',
      description: 'Used when Background type = Image. Leave blank to use the default port photo.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'backgroundVideoUrl', title: 'Background video URL', type: 'url', group: 'background',
      description: 'Used when Background type = Video. Link directly to an MP4 or WebM file (not YouTube).',
    }),
    // ── SEO ───────────────────────────────────────────────────────────────────
    defineField({
      name: 'seoTitle', title: 'Homepage title override', type: 'object', group: 'seo',
      fields: [
        { name: 'en', title: 'English', type: 'string' },
        { name: 'es', title: 'Spanish', type: 'string' },
      ],
    }),
    defineField({
      name: 'seoDescription', title: 'Homepage meta description', type: 'object', group: 'seo',
      fields: [
        { name: 'en', title: 'English', type: 'text', rows: 3 },
        { name: 'es', title: 'Spanish', type: 'text', rows: 3 },
      ],
    }),
    defineField({
      name: 'ogImage', title: 'Homepage OG image (1200×630)', type: 'image', group: 'seo',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Hero Section' }),
  },
})
