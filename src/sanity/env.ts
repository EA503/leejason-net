// Pinned on purpose: Sanity treats the API version as a contract, so a fixed
// date keeps query behaviour stable even as the platform moves forward.
export const apiVersion = '2026-09-04'

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''

export const readToken = process.env.SANITY_API_READ_TOKEN || ''
export const writeToken = process.env.SANITY_API_WRITE_TOKEN || ''

/**
 * Until the Sanity project exists, every content read short-circuits to the
 * placeholder copy in `src/content/fallback.ts`. Set the project id and the
 * site starts reading live content with no other change.
 */
export const hasSanityConfig = projectId.length > 0

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://leejason.net'
