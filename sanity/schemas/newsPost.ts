import { defineField, defineType } from 'sanity'

// Future schema — not yet shown in the sidebar. Register in index.ts when ready to activate.
export const newsPost = defineType({
  name:  'newsPost',
  title: 'News / Maritime Blog',
  type:  'document',
  fields: [
    defineField({
      name: 'title', title: 'Title', type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'string' },
        { name: 'es', title: 'Spanish', type: 'string' },
      ],
    }),
    defineField({
      name: 'slug', title: 'Slug', type: 'slug',
      options: { source: 'title.en', maxLength: 80 },
    }),
    defineField({
      name: 'summary', title: 'Summary / excerpt', type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'text', rows: 3 },
        { name: 'es', title: 'Spanish', type: 'text', rows: 3 },
      ],
    }),
    defineField({ name: 'coverImage', title: 'Cover image', type: 'image',
      options: { hotspot: true },
    }),
    defineField({ name: 'publishedAt', title: 'Published at', type: 'datetime' }),
    defineField({
      name: 'published', title: 'Published', type: 'boolean', initialValue: false,
    }),
  ],
  orderings: [
    { title: 'Newest first', name: 'dateDesc', by: [{ field: 'publishedAt', direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'title.en', subtitle: 'publishedAt' },
  },
})
