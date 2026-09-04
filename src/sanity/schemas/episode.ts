import { defineField, defineType } from 'sanity'

export const episode = defineType({
  name: 'episode',
  title: 'Podcast episode',
  type: 'document',
  fields: [
    defineField({
      name: 'guestName',
      title: 'Guest name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Episode title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Publish date',
      description: 'Episodes are ordered newest first by this date.',
      type: 'date',
      options: { dateFormat: 'MMM D, YYYY' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'episodeUrl',
      title: 'Link to episode',
      description:
        'Optional. If set, the whole row becomes clickable and opens in a new tab.',
      type: 'url',
      validation: (rule) => rule.uri({ scheme: ['http', 'https'] }),
    }),
  ],
  orderings: [
    {
      title: 'Publish date, newest first',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'guestName', subtitle: 'title', date: 'publishedAt' },
    prepare: ({ title, subtitle }) => ({ title, subtitle }),
  },
})
