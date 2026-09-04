import { defineField, defineType } from 'sanity'

export const contact = defineType({
  name: 'contact',
  title: 'Contact info',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Display name',
      type: 'string',
      initialValue: 'Jason Lee',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Public email',
      type: 'string',
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: 'bookingLink',
      title: 'Booking link',
      description: 'Calendly, Cal.com, or whatever Jason uses to take calls.',
      type: 'url',
      validation: (rule) => rule.uri({ scheme: ['http', 'https'] }),
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Contact info' }),
  },
})
