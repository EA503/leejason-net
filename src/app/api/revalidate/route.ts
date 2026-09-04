import { revalidateTag } from 'next/cache'
import { NextResponse, type NextRequest } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

import { CONTENT_TAG } from '@/sanity/queries'

/**
 * Sanity webhook target. Configure in sanity.io/manage → API → Webhooks:
 *   URL     https://leejason.net/api/revalidate
 *   Trigger on create / update / delete
 *   Secret  the same value as SANITY_REVALIDATE_SECRET
 */
export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET

  if (!secret) {
    return NextResponse.json(
      { message: 'SANITY_REVALIDATE_SECRET is not set' },
      { status: 500 },
    )
  }

  try {
    const { isValidSignature, body } = await parseBody<{ _type?: string }>(req, secret)

    if (!isValidSignature) {
      return NextResponse.json({ message: 'Invalid signature' }, { status: 401 })
    }

    // Next 16 takes a cacheLife profile as the second argument; 'max' purges
    // the tag and leaves it cached until the next webhook.
    revalidateTag(CONTENT_TAG, 'max')

    return NextResponse.json({
      revalidated: true,
      tag: CONTENT_TAG,
      type: body?._type,
      now: Date.now(),
    })
  } catch (error) {
    console.error('[revalidate] webhook failed:', error)
    return NextResponse.json({ message: 'Revalidation failed' }, { status: 500 })
  }
}
