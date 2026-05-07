import { defineField, defineType } from 'sanity'

// Future schema — not yet shown in the sidebar. Register in index.ts when ready to activate.
export const operationalUpdate = defineType({
  name:  'operationalUpdate',
  title: 'Operational Update',
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
      name: 'summary', title: 'Summary', type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'text', rows: 3 },
        { name: 'es', title: 'Spanish', type: 'text', rows: 3 },
      ],
    }),
    defineField({
      name: 'type', title: 'Update type', type: 'string',
      options: {
        list: [
          { title: 'New Product',   value: 'new-product'   },
          { title: 'Port Call',     value: 'port-call'     },
          { title: 'Certification', value: 'certification' },
          { title: 'Other',         value: 'other'         },
        ],
      },
    }),
    defineField({ name: 'date', title: 'Date', type: 'date' }),
    defineField({
      name: 'published', title: 'Published', type: 'boolean', initialValue: false,
    }),
  ],
  orderings: [
    { title: 'Newest first', name: 'dateDesc', by: [{ field: 'date', direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'title.en', subtitle: 'type' },
  },
})
