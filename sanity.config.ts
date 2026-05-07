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
            // ── Global ────────────────────────────────────────────────────────
            S.listItem().title('Site Settings').id('siteSettings')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            S.divider(),

            // ── Home page ─────────────────────────────────────────────────────
            S.listItem().title('Hero Section').id('hero')
              .child(S.document().schemaType('hero').documentId('hero')),
            S.listItem().title('About / Overview').id('aboutContent')
              .child(S.document().schemaType('aboutContent').documentId('aboutContent')),
            S.listItem().title('Mission · Vision · Values').id('missionVision')
              .child(S.document().schemaType('missionVision').documentId('missionVision')),
            S.listItem().title('Operations Map').id('operationsMap')
              .child(S.document().schemaType('operationsMap').documentId('operationsMap')),
            S.divider(),

            // ── Products & Brands ─────────────────────────────────────────────
            S.documentTypeListItem('category').title('Product Categories'),
            S.documentTypeListItem('brand').title('Brands'),
            S.divider(),

            // ── Gallery ───────────────────────────────────────────────────────
            S.documentTypeListItem('gallery').title('Gallery Albums'),
            S.divider(),

            // ── Legacy ────────────────────────────────────────────────────────
            S.listItem().title('Contact Information (legacy)').id('contactInfo')
              .child(S.document().schemaType('contactInfo').documentId('contactInfo')),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})
