import { defineField, defineType } from 'sanity'

export const brand = defineType({
  name:  'brand',
  title: 'Brand',
  type:  'document',
  fields: [
    defineField({
      name:  'name',
      title: 'Brand name',
      type:  'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category / specialty',
      type: 'object',
      description: 'What this brand is known for supplying.',
      fields: [
        { name: 'en', title: 'English', type: 'string' },
        { name: 'es', title: 'Spanish', type: 'string' },
      ],
    }),
    defineField({
      name: 'description',
      title: 'Brand description',
      type: 'object',
      description: 'Short paragraph shown on brand detail / hover.',
      fields: [
        { name: 'en', title: 'English', type: 'text', rows: 3 },
        { name: 'es', title: 'Spanish', type: 'text', rows: 3 },
      ],
    }),
    defineField({
      name:  'specialties',
      title: 'Key specialties / product lines',
      description: 'Tags shown under the brand name (e.g. "Valves", "Safety Equipment").',
      type:  'array',
      of:    [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name:    'logo',
      title:   'Logo',
      type:    'image',
      options: { hotspot: false },
    }),
    defineField({
      name:  'featured',
      title: 'Show on homepage brands strip',
      type:  'boolean',
      initialValue: true,
    }),
    defineField({
      name:  'visible',
      title: 'Visible on site',
      description: 'Uncheck to hide this brand everywhere without deleting it.',
      type:  'boolean',
      initialValue: true,
    }),
    defineField({
      name:  'order',
      title: 'Display order',
      type:  'number',
      initialValue: 99,
    }),
  ],
  orderings: [
    {
      title: 'Display order',
      name:  'orderAsc',
      by:    [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'logo',
    },
  },
})
