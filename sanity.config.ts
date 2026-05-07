'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'

export default defineConfig({
  name:    'atlantic-eee-supply',
  title:   'Atlantic EEE Supply',
  projectId,
  dataset,
  basePath: '/studio',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem().title('Hero Section').id('hero')
              .child(S.document().schemaType('hero').documentId('hero')),
            S.listItem().title('About Page').id('aboutContent')
              .child(S.document().schemaType('aboutContent').documentId('aboutContent')),
            S.listItem().title('Contact Information').id('contactInfo')
              .child(S.document().schemaType('contactInfo').documentId('contactInfo')),
            S.listItem().title('Operations Map').id('operationsMap')
              .child(S.document().schemaType('operationsMap').documentId('operationsMap')),
            S.divider(),
            S.documentTypeListItem('category').title('Product Categories'),
            S.documentTypeListItem('brand').title('Brands'),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})
