import { defineField, defineType } from 'sanity'

export const hero = defineType({
  name:  'hero',
  title: 'Hero Section',
  type:  'document',
  fields: [
    defineField({
      name: 'badge',
      title: 'Badge text',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'string' },
        { name: 'es', title: 'Spanish', type: 'string' },
      ],
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      description: 'Main hero headline. Use \\n for a line break.',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'string' },
        { name: 'es', title: 'Spanish', type: 'string' },
      ],
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'text', rows: 3 },
        { name: 'es', title: 'Spanish', type: 'text', rows: 3 },
      ],
    }),
    defineField({
      name: 'ctaPrimary',
      title: 'Primary CTA label',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'string' },
        { name: 'es', title: 'Spanish', type: 'string' },
      ],
    }),
    defineField({
      name: 'ctaSecondary',
      title: 'Secondary CTA label',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'string' },
        { name: 'es', title: 'Spanish', type: 'string' },
      ],
    }),
    defineField({
      name: 'stats',
      title: 'Stat items',
      description: 'Three key numbers displayed below the headline.',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', title: 'Value', type: 'string' },
            { name: 'labelEn', title: 'Label (English)', type: 'string' },
            { name: 'labelEs', title: 'Label (Spanish)', type: 'string' },
          ],
          preview: {
            select: { title: 'value', subtitle: 'labelEn' },
          },
        },
      ],
      validation: (R) => R.max(3),
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Hero Section' }),
  },
})
