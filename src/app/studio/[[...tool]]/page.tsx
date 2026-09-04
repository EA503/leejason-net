import { NextStudio } from 'next-sanity/studio'

import config from '../../../../sanity.config'
import { hasSanityConfig } from '@/sanity/env'

export const dynamic = 'force-static'

export { metadata, viewport } from 'next-sanity/studio'

export default function StudioPage() {
  if (!hasSanityConfig) {
    return (
      <main style={{ padding: '64px 32px', maxWidth: 640, fontFamily: 'system-ui, sans-serif' }}>
        <h1 style={{ fontSize: 22, marginBottom: 12 }}>Studio not connected yet</h1>
        <p style={{ lineHeight: 1.6, color: '#444' }}>
          Set <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> in your environment and redeploy.
          Until then the site runs on the placeholder copy from the approved prototype.
        </p>
      </main>
    )
  }

  return <NextStudio config={config} />
}
