import { defineField, defineType } from 'sanity'

const url = (name: string, title: string, description?: string) =>
  defineField({
    name,
    title,
    description,
    type: 'url',
    validation: (rule) => rule.uri({ scheme: ['http', 'https'] }),
  })

export const socialLinks = defineType({
  name: 'socialLinks',
  title: 'Links',
  type: 'document',
  description:
    'Every outbound link on the site. Anything left blank is hidden rather than shown as a dead link.',
  fields: [
    url('applePodcasts', 'Apple Podcasts'),
    url('amazonMusic', 'Amazon Music'),
    url('podcastWebsite', 'Podcast website', 'e.g. livingquestionpodcast.com'),
    url('linkedin', 'LinkedIn'),
    url('instagram', 'Instagram'),
    url('cbaLifestyle', 'CBA Lifestyle'),
  ],
  preview: {
    prepare: () => ({ title: 'Links' }),
  },
})
