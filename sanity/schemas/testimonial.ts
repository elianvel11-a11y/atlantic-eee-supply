import { defineField, defineType } from 'sanity'

// Future schema — not yet shown in the sidebar. Register in index.ts when ready to use.
export const testimonial = defineType({
  name:  'testimonial',
  title: 'Testimonial',
  type:  'document',
  fields: [
    defineField({ name: 'authorName', title: 'Author name',   type: 'string' }),
    defineField({ name: 'authorRole', title: 'Role / title',  type: 'string' }),
    defineField({ name: 'company',    title: 'Company / vessel', type: 'string' }),
    defineField({
      name: 'quote', title: 'Quote', type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'text', rows: 4 },
        { name: 'es', title: 'Spanish', type: 'text', rows: 4 },
      ],
    }),
    defineField({ name: 'rating', title: 'Rating (1–5)', type: 'number',
      validation: (R) => R.min(1).max(5),
    }),
    defineField({
      name: 'published', title: 'Published', type: 'boolean', initialValue: false,
    }),
  ],
  preview: {
    select: { title: 'authorName', subtitle: 'company' },
  },
})
