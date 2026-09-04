import { createClient } from 'next-sanity'

import { apiVersion, dataset, hasSanityConfig, projectId, readToken, writeToken } from './env'

export const client = hasSanityConfig
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
      token: readToken || undefined,
      perspective: 'published',
    })
  : null

/** Separate client for the guest-application form; never used for reads. */
export const writeClient = hasSanityConfig && writeToken
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      token: writeToken,
    })
  : null
