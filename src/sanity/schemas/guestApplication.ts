import { defineField, defineType } from 'sanity'

/**
 * Written by /api/apply, never created by hand. Every field is read-only in the
 * Studio so an accidental keystroke can't rewrite what somebody submitted.
 */
export const guestApplication = defineType({
  name: 'guestApplication',
  title: 'Guest application',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', readOnly: true }),
    defineField({ name: 'email', title: 'Email', type: 'string', readOnly: true }),
    defineField({ name: 'link', title: 'Website or social link', type: 'string', readOnly: true }),
    defineField({
      name: 'story',
      title: "The decision they'd want to talk about",
      type: 'text',
      rows: 6,
      readOnly: true,
    }),
    defineField({ name: 'submittedAt', title: 'Submitted', type: 'datetime', readOnly: true }),
  ],
  orderings: [
    {
      title: 'Newest first',
      name: 'submittedAtDesc',
      by: [{ field: 'submittedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'name', subtitle: 'email' },
  },
})
