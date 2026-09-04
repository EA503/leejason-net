import type { SchemaTypeDefinition } from 'sanity'

import { cba } from './cba'
import { contact } from './contact'
import { episode } from './episode'
import { guestApplication } from './guestApplication'
import { moment } from './moment'
import { siteSettings } from './siteSettings'
import { socialLinks } from './socialLinks'

/** Documents that must exist exactly once. Surfaced as a single edit form. */
export const SINGLETON_TYPES = ['siteSettings', 'cba', 'contact', 'socialLinks'] as const

export const schemaTypes: SchemaTypeDefinition[] = [
  siteSettings,
  cba,
  contact,
  socialLinks,
  episode,
  moment,
  guestApplication,
]
