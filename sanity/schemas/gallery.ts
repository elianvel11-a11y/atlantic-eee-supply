import { defineField, defineType } from 'sanity'

export const gallery = defineType({
  name:  'gallery',
  title: 'Gallery',
  type:  'document',
  fields: [
    defineField({
      name: 'title', title: 'Album title', type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'string' },
        { name: 'es', title: 'Spanish', type: 'string' },
      ],
    }),
    defineField({
      name: 'category', title: 'Category', type: 'string',
      options: {
        list: [
          { title: 'Vessels',    value: 'vessels'    },
          { title: 'Ports',      value: 'ports'      },
          { title: 'Products',   value: 'products'   },
          { title: 'Deliveries', value: 'deliveries' },
          { title: 'Offices',    value: 'offices'    },
          { title: 'Warehouse',  value: 'warehouse'  },
        ],
      },
    }),
    defineField({
      name: 'photos', title: 'Photos', type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'image',     title: 'Photo',               type: 'image', options: { hotspot: true } },
          { name: 'captionEn', title: 'Caption (English)',    type: 'string' },
          { name: 'captionEs', title: 'Caption (Spanish)',    type: 'string' },
        ],
        preview: { select: { media: 'image', title: 'captionEn' } },
      }],
    }),
    defineField({
      name: 'published', title: 'Published', type: 'boolean', initialValue: false,
    }),
    defineField({
      name: 'order', title: 'Display order', type: 'number', initialValue: 99,
      description: 'Lower numbers appear first.',
    }),
  ],
  orderings: [
    { title: 'Display order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'title.en', subtitle: 'category' },
  },
})
