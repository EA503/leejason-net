import { createImageUrlBuilder } from '@sanity/image-url'
import type { Image } from 'sanity'

import { dataset, hasSanityConfig, projectId } from './env'

const builder = hasSanityConfig ? createImageUrlBuilder({ projectId, dataset }) : null

export function urlForImage(source: Image | undefined | null) {
  if (!source || !builder) return null
  return builder.image(source).auto('format').fit('max')
}
