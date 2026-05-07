'use client'

import dynamic from 'next/dynamic'
import config from '../../../../sanity.config'

// Sanity Studio polls sanity-cdn.com to display update notifications.
// In a self-hosted Next.js setup the request always fails (the CDN endpoint
// is for Sanity-managed cloud studios). The Studio loads and works correctly
// regardless — the internal catch block returns undefined and rendering
// continues. Suppress only this specific console.error to keep devtools clean.
if (typeof window !== 'undefined') {
  // eslint-disable-next-line no-console
  const _orig = console.error.bind(console)
  // eslint-disable-next-line no-console
  console.error = (...args: Parameters<typeof console.error>) => {
    if (typeof args[0] === 'string' && args[0].startsWith('Failed to fetch version for package')) return
    _orig(...args)
  }
}

const NextStudio = dynamic(
  () => import('next-sanity/studio').then((m) => m.NextStudio),
  { ssr: false },
)

export default function StudioPage() {
  return <NextStudio config={config} />
}
