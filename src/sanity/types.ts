import type { PortableTextBlock } from '@portabletext/react'
import type { Image } from 'sanity'

export interface HeroContent {
  lede: string
  bio: PortableTextBlock[]
  photo: (Image & { alt?: string }) | null
}

export interface ContactContent {
  name: string
  email: string
  bookingLink: string | null
}

export interface LinksContent {
  applePodcasts: string | null
  amazonMusic: string | null
  podcastWebsite: string | null
  linkedin: string | null
  instagram: string | null
  cbaLifestyle: string | null
}

export interface Episode {
  _id: string
  guestName: string
  title: string
  publishedAt: string
  episodeUrl: string | null
}

export interface Moment {
  _id: string
  image: (Image & { alt?: string }) | null
  caption: string | null
  /** Present only on fallback entries, which have no uploaded image yet. */
  placeholder?: string
}

export interface SiteContent {
  hero: HeroContent
  cba: PortableTextBlock[]
  contact: ContactContent
  links: LinksContent
  episodes: Episode[]
  moments: Moment[]
  seoDescription: string
}

/** Turns plain paragraphs into Portable Text so fallback and live content
 *  render through exactly one code path. */
export function toBlocks(paragraphs: string[]): PortableTextBlock[] {
  return paragraphs.map((text, i) => ({
    _type: 'block',
    _key: `fallback-${i}`,
    style: 'normal',
    markDefs: [],
    children: [{ _type: 'span', _key: `fallback-${i}-0`, text, marks: [] }],
  })) as PortableTextBlock[]
}
