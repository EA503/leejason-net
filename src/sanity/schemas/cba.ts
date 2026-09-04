import { defineField, defineType } from 'sanity'

export const cba = defineType({
  name: 'cba',
  title: 'CBA Lifestyle description',
  type: 'document',
  fields: [
    defineField({
      name: 'body',
      title: 'Description',
      description:
        'What CBA Lifestyle is and who it serves. Appears in the dark "About" section.',
      type: 'array',
      of: [{ type: 'block', styles: [{ title: 'Normal', value: 'normal' }] }],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    prepare: () => ({ title: 'CBA Lifestyle description' }),
  },
})
