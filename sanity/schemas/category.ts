import { defineField, defineType } from 'sanity'

export const category = defineType({
  name:  'category',
  title: 'Product Category',
  type:  'document',
  fields: [
    defineField({
      name:  'slug',
      title: 'Slug / ID',
      type:  'slug',
      description: 'Internal identifier — use lowercase, no spaces (e.g. packing, valves, safety).',
      options: { source: 'name.en', maxLength: 40 },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'name',
      title: 'Category name',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'string', validation: (R) => R.required() },
        { name: 'es', title: 'Spanish', type: 'string', validation: (R) => R.required() },
      ],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'text', rows: 3 },
        { name: 'es', title: 'Spanish', type: 'text', rows: 3 },
      ],
    }),
    defineField({
      name:  'featured',
      title: 'Featured category',
      description: 'Show as a large image card on the Products page (max 3).',
      type:  'boolean',
      initialValue: false,
    }),
    defineField({
      name:    'image',
      title:   'Category photo',
      type:    'image',
      options: { hotspot: true },
    }),
    defineField({
      name:  'order',
      title: 'Display order',
      type:  'number',
      description: 'Lower numbers appear first.',
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
      title:    'name.en',
      subtitle: 'slug.current',
      media:    'image',
    },
  },
})
