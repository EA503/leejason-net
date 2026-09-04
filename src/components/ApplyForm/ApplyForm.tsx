'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'

import { submitApplication } from './actions'
import { initialApplyState } from './types'
import styles from './ApplyForm.module.css'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button type="submit" className={styles.submitBtn} disabled={pending}>
      {pending ? 'Sending…' : 'Submit application'}
    </button>
  )
}

export function ApplyForm() {
  const [state, formAction] = useActionState(submitApplication, initialApplyState)

  return (
    <section className={styles.apply} id="apply">
      <div className="wrap">
        <div>
          <p className={styles.eyebrow}>Be a guest</p>
          <h2>Apply to join the conversation.</h2>
          <p className={styles.note}>
            Looking for founders, leaders, and builders with a real story about a decision
            logic couldn&rsquo;t make alone.
          </p>
        </div>

        <form className={styles.formGrid} action={formAction} noValidate>
          <div className={styles.field}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              autoComplete="name"
              required
              aria-invalid={Boolean(state.fieldErrors.name)}
              aria-describedby={state.fieldErrors.name ? 'name-error' : undefined}
            />
            {state.fieldErrors.name && (
              <span id="name-error" className={styles.fieldError}>
                {state.fieldErrors.name}
              </span>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              required
              aria-invalid={Boolean(state.fieldErrors.email)}
              aria-describedby={state.fieldErrors.email ? 'email-error' : undefined}
            />
            {state.fieldErrors.email && (
              <span id="email-error" className={styles.fieldError}>
                {state.fieldErrors.email}
              </span>
            )}
          </div>

          <div className={`${styles.field} ${styles.full}`}>
            <label htmlFor="link">Website or social link</label>
            <input type="text" id="link" name="link" autoComplete="url" />
          </div>

          <div className={`${styles.field} ${styles.full}`}>
            <label htmlFor="story">What&rsquo;s the decision you&rsquo;d want to talk about?</label>
            <textarea
              id="story"
              name="story"
              rows={4}
              required
              aria-invalid={Boolean(state.fieldErrors.story)}
              aria-describedby={state.fieldErrors.story ? 'story-error' : undefined}
            />
            {state.fieldErrors.story && (
              <span id="story-error" className={styles.fieldError}>
                {state.fieldErrors.story}
              </span>
            )}
          </div>

          <div className={styles.honeypot} aria-hidden="true">
            <label htmlFor="company">Company</label>
            <input type="text" id="company" name="company" tabIndex={-1} autoComplete="off" />
          </div>

          {state.message && (
            <p
              className={`${styles.formStatus} ${
                state.status === 'success' ? styles.success : styles.error
              }`}
              role="status"
              aria-live="polite"
            >
              {state.message}
            </p>
          )}

          <div className={styles.submitRow}>
            <SubmitButton />
          </div>
        </form>
      </div>
    </section>
  )
}
