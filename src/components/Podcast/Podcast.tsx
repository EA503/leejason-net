import type { Episode, LinksContent } from '@/sanity/types'
import { EpisodeList } from './EpisodeList'
import styles from './Podcast.module.css'

function hostname(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

export function Podcast({
  episodes,
  links,
}: {
  episodes: Episode[]
  links: LinksContent
}) {
  const listenLinks = [
    links.applePodcasts && { href: links.applePodcasts, label: 'Apple Podcasts' },
    links.amazonMusic && { href: links.amazonMusic, label: 'Amazon Music' },
    links.podcastWebsite && {
      href: links.podcastWebsite,
      label: hostname(links.podcastWebsite),
    },
  ].filter(Boolean) as { href: string; label: string }[]

  return (
    <section className={styles.podcast} id="podcast">
      <div className="wrap">
        <div className={styles.top}>
          <div>
            <p className={styles.eyebrow}>The Podcast</p>
            <h2>The Living Question</h2>
            {listenLinks.length > 0 && (
              <div className={styles.listenLinks}>
                {listenLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
          <p className={styles.question}>
            &ldquo;Conversations for the moments when logic isn&rsquo;t enough — the inner
            foundation that makes external success sustainable. No packaged lessons, no
            premature clarity.&rdquo;
          </p>
        </div>

        <EpisodeList episodes={episodes} />
      </div>
    </section>
  )
}
