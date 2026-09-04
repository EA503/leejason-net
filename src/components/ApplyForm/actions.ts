'use server'

import { Resend } from 'resend'

import { writeClient } from '@/sanity/client'
import type { ApplyState } from './types'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

async function notifyByEmail(application: {
  name: string
  email: string
  link: string
  story: string
}) {
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.GUEST_APPLICATION_TO_EMAIL
  const from = process.env.GUEST_APPLICATION_FROM_EMAIL || 'onboarding@resend.dev'

  if (!apiKey || !to) {
    console.warn('[apply] Resend not configured; application saved without email')
    return
  }

  const resend = new Resend(apiKey)
  await resend.emails.send({
    from: `The Living Question <${from}>`,
    to: [to],
    replyTo: application.email,
    subject: `Guest application — ${application.name}`,
    html: `
      <h2>New guest application</h2>
      <p><strong>Name:</strong> ${escapeHtml(application.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(application.email)}</p>
      <p><strong>Link:</strong> ${escapeHtml(application.link) || '—'}</p>
      <p><strong>The decision they'd want to talk about:</strong></p>
      <p style="white-space:pre-wrap">${escapeHtml(application.story)}</p>
    `,
  })
}

export async function submitApplication(
  _prev: ApplyState,
  formData: FormData,
): Promise<ApplyState> {
  // Honeypot. A real person never sees this field, so anything in it is a bot;
  // report success so the bot does not learn to retry.
  if ((formData.get('company') as string)?.trim()) {
    return { status: 'success', message: 'Thanks — your application is in.', fieldErrors: {} }
  }

  const name = ((formData.get('name') as string) || '').trim()
  const email = ((formData.get('email') as string) || '').trim()
  const link = ((formData.get('link') as string) || '').trim()
  const story = ((formData.get('story') as string) || '').trim()

  const fieldErrors: Record<string, string> = {}
  if (!name) fieldErrors.name = 'Please add your name.'
  if (!email) fieldErrors.email = 'Please add your email.'
  else if (!EMAIL_PATTERN.test(email)) fieldErrors.email = "That email doesn't look right."
  if (!story) fieldErrors.story = 'Tell us a little about the decision.'
  else if (story.length > 5000) fieldErrors.story = 'Please keep this under 5000 characters.'

  if (Object.keys(fieldErrors).length > 0) {
    return { status: 'error', message: '', fieldErrors }
  }

  const application = { name, email, link, story }

  try {
    if (writeClient) {
      await writeClient.create({
        _type: 'guestApplication',
        ...application,
        submittedAt: new Date().toISOString(),
      })
    } else {
      console.warn('[apply] Sanity write client not configured; application not stored')
    }

    // The email is a convenience on top of the stored record. If it fails, the
    // application is already safe, so don't fail the submission.
    try {
      await notifyByEmail(application)
    } catch (emailError) {
      console.error('[apply] email notification failed:', emailError)
    }

    if (!writeClient && !process.env.RESEND_API_KEY) {
      return {
        status: 'error',
        message: 'The application form is not connected yet. Please email us directly.',
        fieldErrors: {},
      }
    }

    return {
      status: 'success',
      message: "Thanks — your application is in. Jason reads every one of these.",
      fieldErrors: {},
    }
  } catch (error) {
    console.error('[apply] submission failed:', error)
    return {
      status: 'error',
      message: 'Something went wrong on our end. Please try again, or email us directly.',
      fieldErrors: {},
    }
  }
}
