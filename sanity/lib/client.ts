import { createClient } from 'next-sanity'

export const projectId  = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
export const dataset    = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'
export const apiVersion = '2024-01-01'

// client is null when NEXT_PUBLIC_SANITY_PROJECT_ID is not yet set —
// all query functions guard against this so the site renders with fallback content.
export const client = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: process.env.NODE_ENV === 'production',
    })
  : null
