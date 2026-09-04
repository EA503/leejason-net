import { toBlocks, type SiteContent } from '@/sanity/types'

/**
 * Placeholder copy carried over from the approved prototype. Used verbatim
 * until the Sanity project is connected, and as a per-field safety net after
 * that, so an empty document never renders a blank section.
 *
 * Every link here is null on purpose: an unconfirmed link renders as plain
 * text rather than as a dead `href="#"`.
 */
export const fallbackContent: SiteContent = {
  hero: {
    lede: "He helps business owners navigate the decisions, people, and moving parts behind the businesses and lives they're actually trying to build — and hosts a weekly conversation about what happens when logic isn't enough.",
    bio: toBlocks([
      'Operator, advisor, and interviewer. Jason works hands-on with business and property operations through CBA Lifestyle, and explores the harder-to-name side of decision-making on his podcast.',
    ]),
    photo: null,
  },

  cba: toBlocks([
    "CBA Lifestyle is Jason's business and property operations practice — helping owners handle the coordination, projects, and decisions that keep a property or business running well, from contractor scheduling to day-to-day operations.",
  ]),

  contact: {
    name: 'Jason Lee',
    email: 'hello@leejason.net',
    bookingLink: null,
  },

  links: {
    applePodcasts: null,
    amazonMusic: null,
    podcastWebsite: null,
    linkedin: null,
    instagram: null,
    cbaLifestyle: null,
  },

  episodes: [
    {
      _id: 'fallback-ep-1',
      guestName: 'Chris Gray',
      title: 'The Cost of Trusting Your Gut',
      publishedAt: '2026-07-28',
      episodeUrl: null,
    },
    {
      _id: 'fallback-ep-2',
      guestName: 'Taylor Frame',
      title: 'Why Logic Often Fails You and the Hidden Cost of Trusting Your Gut',
      publishedAt: '2026-06-26',
      episodeUrl: null,
    },
    {
      _id: 'fallback-ep-3',
      guestName: 'Kelly Greenheart',
      title: 'Her Year-Long Migraine Broke on Day 3 of Total Silence',
      publishedAt: '2026-06-16',
      episodeUrl: null,
    },
    {
      _id: 'fallback-ep-4',
      guestName: 'Eric Farewell',
      title: 'The 3 Things Every Burned-Out Founder Needs to Hear',
      publishedAt: '2026-06-02',
      episodeUrl: null,
    },
    {
      _id: 'fallback-ep-5',
      guestName: 'Jon Vroman',
      title: 'Why the Most Devoted Men Quietly Destroy What Matters Most',
      publishedAt: '2026-05-19',
      episodeUrl: null,
    },
    {
      _id: 'fallback-ep-6',
      guestName: 'Preston Smiles',
      title: 'Your Nervous System Is Lying to You About Money',
      publishedAt: '2026-05-07',
      episodeUrl: null,
    },
  ],

  moments: [
    { _id: 'fallback-m-1', image: null, caption: null, placeholder: 'Podcast recording photo' },
    { _id: 'fallback-m-2', image: null, caption: null, placeholder: 'Property / project photo' },
    { _id: 'fallback-m-3', image: null, caption: null, placeholder: 'Guest episode clip' },
    { _id: 'fallback-m-4', image: null, caption: null, placeholder: 'Behind the scenes' },
  ],

  seoDescription:
    'Jason Lee is a Concierge Business Advisor at CBA Lifestyle and host of The Living Question, a weekly conversation about the decisions logic alone cannot make.',
}
