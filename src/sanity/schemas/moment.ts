import { defineField, defineType } from 'sanity'

export const moment = defineType({
  name: 'moment',
  title: 'Moments photo',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Photo',
      description:
        'Displayed in a 4-across grid, cropped to a tall 4:5 frame. Portrait photos work best.',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          description: 'Describe the photo for screen readers. Required.',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      description: 'Optional. Shown over the photo, e.g. "Podcast recording".',
      type: 'string',
    }),
    defineField({
      name: 'order',
      title: 'Sort order',
      description: 'Lower numbers appear first. Ties fall back to newest first.',
      type: 'number',
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: 'Sort order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'caption', media: 'image', subtitle: 'image.alt' },
    prepare: ({ title, media, subtitle }) => ({
      title: title || subtitle || 'Photo',
      media,
    }),
  },
})
