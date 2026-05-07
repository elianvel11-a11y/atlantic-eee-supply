import { defineField, defineType } from 'sanity'

export const aboutContent = defineType({
  name:  'aboutContent',
  title: 'About Page',
  type:  'document',
  fields: [
    defineField({
      name: 'badge',
      title: 'Section badge',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'string' },
        { name: 'es', title: 'Spanish', type: 'string' },
      ],
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'string' },
        { name: 'es', title: 'Spanish', type: 'string' },
      ],
    }),
    defineField({
      name: 'body1',
      title: 'First paragraph',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'text', rows: 4 },
        { name: 'es', title: 'Spanish', type: 'text', rows: 4 },
      ],
    }),
    defineField({
      name: 'body2',
      title: 'Second paragraph',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'text', rows: 4 },
        { name: 'es', title: 'Spanish', type: 'text', rows: 4 },
      ],
    }),
    defineField({
      name: 'stats',
      title: 'Key stat numbers',
      description: 'Four stats displayed in the right column (value + label).',
      type: 'array',
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
      name: 'capabilities',
      title: 'Why Us / Capabilities',
      description: 'Six capability tiles on the About page.',
      type: 'array',
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
  ],
  preview: {
    prepare: () => ({ title: 'About Page' }),
  },
})
