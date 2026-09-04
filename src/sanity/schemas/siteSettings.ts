import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Hero & Bio',
  type: 'document',
  fields: [
    defineField({
      name: 'heroLede',
      title: 'Hero intro paragraph',
      description:
        'The large paragraph directly under "Jason Lee" at the top of the page.',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required().max(400),
    }),
    defineField({
      name: 'bio',
      title: 'Short bio',
      description: 'The shorter bio in the column beside the hero photo.',
      type: 'array',
      of: [{ type: 'block', styles: [{ title: 'Normal', value: 'normal' }] }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroPhoto',
      title: 'Photo of Jason',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          description:
            'Describe the photo for screen readers and search engines. Required.',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO description',
      description:
        'Shown in Google results and link previews on LinkedIn. Aim for 150–160 characters.',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(200),
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Hero & Bio' }),
  },
})
