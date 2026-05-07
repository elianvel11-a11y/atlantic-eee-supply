import { defineField, defineType } from 'sanity'

export const operationsMap = defineType({
  name:  'operationsMap',
  title: 'Operations Map',
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
      title: 'Section headline',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'string' },
        { name: 'es', title: 'Spanish', type: 'string' },
      ],
    }),
    defineField({
      name: 'subheading',
      title: 'Section subheading',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'text', rows: 3 },
        { name: 'es', title: 'Spanish', type: 'text', rows: 3 },
      ],
    }),
    defineField({
      name: 'nodes',
      title: 'Location nodes',
      description: 'The three operational nodes shown on the map.',
      type: 'array',
      validation: (R) => R.max(3),
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'id',
              title: 'Node ID',
              description: 'Internal key: panamacity | colon | cartagena',
              type: 'string',
              options: {
                list: [
                  { title: 'Panama City', value: 'panamacity' },
                  { title: 'Colón',       value: 'colon'      },
                  { title: 'Cartagena',   value: 'cartagena'  },
                ],
              },
            },
            {
              name: 'cityName',
              title: 'City name',
              type: 'object',
              fields: [
                { name: 'en', title: 'English', type: 'string' },
                { name: 'es', title: 'Spanish', type: 'string' },
              ],
            },
            {
              name: 'role',
              title: 'Role label',
              type: 'object',
              fields: [
                { name: 'en', title: 'English', type: 'string' },
                { name: 'es', title: 'Spanish', type: 'string' },
              ],
            },
            {
              name:  'coordinates',
              title: 'Coordinate string',
              description: 'Displayed on the map. e.g. 08°58′N · 79°31′W',
              type:  'string',
            },
          ],
          preview: {
            select: { title: 'cityName.en', subtitle: 'role.en' },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Operations Map' }),
  },
})
