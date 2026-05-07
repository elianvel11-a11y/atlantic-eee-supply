import { defineField, defineType } from 'sanity'

export const contactInfo = defineType({
  name:  'contactInfo',
  title: 'Contact Information',
  type:  'document',
  fields: [
    defineField({
      name:  'whatsapp',
      title: 'WhatsApp number',
      description: 'International format — e.g. +507 6670-4578',
      type:  'string',
    }),
    defineField({
      name:  'phone',
      title: 'Office phone',
      description: 'International format',
      type:  'string',
    }),
    defineField({
      name:  'emailSales',
      title: 'Sales email (English)',
      type:  'string',
      validation: (R) => R.email(),
    }),
    defineField({
      name:  'emailVentas',
      title: 'Sales email (Spanish)',
      type:  'string',
      validation: (R) => R.email(),
    }),
    defineField({
      name:  'officePanama',
      title: 'Panama City office',
      type:  'object',
      fields: [
        { name: 'address', title: 'Street address', type: 'string' },
        { name: 'mapsUrl', title: 'Google Maps URL', type: 'url' },
      ],
    }),
    defineField({
      name:  'officeColon',
      title: 'Colón office',
      type:  'object',
      fields: [
        { name: 'address', title: 'Street address', type: 'string' },
        { name: 'mapsUrl', title: 'Google Maps URL', type: 'url' },
      ],
    }),
    defineField({
      name:  'footerTagline',
      title: 'Footer tagline',
      type:  'object',
      fields: [
        { name: 'en', title: 'English', type: 'string' },
        { name: 'es', title: 'Spanish', type: 'string' },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Contact Information' }),
  },
})
