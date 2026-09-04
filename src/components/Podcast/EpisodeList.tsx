import type { Episode } from '@/sanity/types'
import styles from './Podcast.module.css'

/** Dates are plain YYYY-MM-DD, so format in UTC — parsing them locally would
 *  shift an episode to the previous day west of Greenwich. */
const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
})

function formatDate(value: string) {
  const parsed = new Date(`${value}T00:00:00Z`)
  return Number.isNaN(parsed.getTime()) ? value : dateFormatter.format(parsed)
}

export function EpisodeList({ episodes }: { episodes: Episode[] }) {
  if (episodes.length === 0) return null

  return (
    <div className={styles.episodes}>
      {episodes.map((episode) => {
        const content = (
          <>
            <span className={styles.epDate}>{formatDate(episode.publishedAt)}</span>
            <span className={styles.epGuest}>{episode.guestName}</span>
            <span className={styles.epTitle}>{episode.title}</span>
          </>
        )

        return episode.episodeUrl ? (
          <a
            key={episode._id}
            className={styles.episode}
            href={episode.episodeUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {content}
          </a>
        ) : (
          <div key={episode._id} className={styles.episode}>
            {content}
          </div>
        )
      })}
    </div>
  )
}
