import { defineField, defineType } from 'sanity'

export const missionVision = defineType({
  name:  'missionVision',
  title: 'Mission · Vision · Values',
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
      name: 'mission',
      title: 'Mission statement',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'text', rows: 4 },
        { name: 'es', title: 'Spanish', type: 'text', rows: 4 },
      ],
    }),
    defineField({
      name: 'vision',
      title: 'Vision statement',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'text', rows: 4 },
        { name: 'es', title: 'Spanish', type: 'text', rows: 4 },
      ],
    }),
    defineField({
      name: 'values',
      title: 'Core Values',
      description: 'Up to 7 core values displayed as cards.',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'iconKey',
              title: 'Icon',
              type: 'string',
              options: {
                list: [
                  { title: 'Star (Excellence)',           value: 'star'       },
                  { title: 'Lightbulb (Innovation)',      value: 'lightbulb'  },
                  { title: 'Anchor (Commitment)',         value: 'anchor'     },
                  { title: 'Scale (Integrity)',           value: 'scale'      },
                  { title: 'Lightning (Speed)',           value: 'zap'        },
                  { title: 'Shield (Quality)',            value: 'shield'     },
                  { title: 'Briefcase (Professionalism)', value: 'briefcase'  },
                  { title: 'Crosshair (Precision)',       value: 'crosshair'  },
                  { title: 'Globe (Global)',              value: 'globe'      },
                ],
                layout: 'radio',
              },
            },
            { name: 'titleEn', title: 'Title (English)',       type: 'string' },
            { name: 'titleEs', title: 'Title (Spanish)',       type: 'string' },
            { name: 'bodyEn',  title: 'Description (English)', type: 'string' },
            { name: 'bodyEs',  title: 'Description (Spanish)', type: 'string' },
          ],
          preview: { select: { title: 'titleEn', subtitle: 'iconKey' } },
        },
      ],
      validation: (R) => R.max(7),
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Mission · Vision · Values' }),
  },
})
