import { groq } from 'next-sanity'

import { fallbackContent } from '@/content/fallback'
import { client } from './client'
import type { SiteContent } from './types'

/** Revalidated on demand by the Sanity webhook; this is just the safety net. */
export const CONTENT_TAG = 'site-content'
const FALLBACK_REVALIDATE_SECONDS = 3600

const siteContentQuery = groq`{
  "settings": *[_type == "siteSettings"][0]{ heroLede, bio, heroPhoto, seoDescription },
  "cba": *[_type == "cba"][0].body,
  "contact": *[_type == "contact"][0]{ name, email, bookingLink },
  "links": *[_type == "socialLinks"][0]{
    applePodcasts, amazonMusic, podcastWebsite, linkedin, instagram, cbaLifestyle
  },
  "episodes": *[_type == "episode" && defined(publishedAt)] | order(publishedAt desc){
    _id, guestName, title, publishedAt, episodeUrl
  },
  "moments": *[_type == "moment" && defined(image.asset)] | order(order asc, _createdAt desc){
    _id, image, caption
  }
}`

type RawResult = {
  settings?: {
    heroLede?: string
    bio?: SiteContent['hero']['bio']
    heroPhoto?: SiteContent['hero']['photo']
    seoDescription?: string
  } | null
  cba?: SiteContent['cba'] | null
  contact?: Partial<SiteContent['contact']> | null
  links?: Partial<SiteContent['links']> | null
  episodes?: SiteContent['episodes'] | null
  moments?: SiteContent['moments'] | null
}

function isFilled(value: unknown): boolean {
  if (value === null || value === undefined) return false
  if (typeof value === 'string') return value.trim().length > 0
  if (Array.isArray(value)) return value.length > 0
  return true
}

/** Live value when the editor has filled it in, prototype copy when not. */
function pick<T>(live: T | null | undefined, fallback: T): T {
  return isFilled(live) ? (live as T) : fallback
}

function merge(raw: RawResult): SiteContent {
  const fb = fallbackContent
  return {
    hero: {
      lede: pick(raw.settings?.heroLede, fb.hero.lede),
      bio: pick(raw.settings?.bio, fb.hero.bio),
      photo: raw.settings?.heroPhoto ?? fb.hero.photo,
    },
    cba: pick(raw.cba, fb.cba),
    contact: {
      name: pick(raw.contact?.name, fb.contact.name),
      email: pick(raw.contact?.email, fb.contact.email),
      // Links stay null when unset so the UI can hide them instead of
      // rendering a dead link.
      bookingLink: raw.contact?.bookingLink ?? null,
    },
    links: {
      applePodcasts: raw.links?.applePodcasts ?? null,
      amazonMusic: raw.links?.amazonMusic ?? null,
      podcastWebsite: raw.links?.podcastWebsite ?? null,
      linkedin: raw.links?.linkedin ?? null,
      instagram: raw.links?.instagram ?? null,
      cbaLifestyle: raw.links?.cbaLifestyle ?? null,
    },
    episodes: pick(raw.episodes, fb.episodes),
    moments: pick(raw.moments, fb.moments),
    seoDescription: pick(raw.settings?.seoDescription, fb.seoDescription),
  }
}

export async function getSiteContent(): Promise<SiteContent> {
  if (!client) return fallbackContent

  try {
    const raw = await client.fetch<RawResult>(
      siteContentQuery,
      {},
      { next: { tags: [CONTENT_TAG], revalidate: FALLBACK_REVALIDATE_SECONDS } },
    )
    return merge(raw ?? {})
  } catch (error) {
    // A CMS outage should degrade to the prototype copy, never a broken page.
    console.error('[sanity] content fetch failed, using fallback copy:', error)
    return fallbackContent
  }
}
