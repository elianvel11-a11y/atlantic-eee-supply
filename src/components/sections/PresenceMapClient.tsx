'use client'

import dynamic from 'next/dynamic'

const PresenceMap = dynamic(() => import('./PresenceMap'), {
  ssr: false,
  loading: () => (
    <div style={{ height: '680px', background: '#07070C' }} className="animate-pulse" />
  ),
})

export default function PresenceMapClient() {
  return <PresenceMap />
}
