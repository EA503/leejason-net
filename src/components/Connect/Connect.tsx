import type { LinksContent } from '@/sanity/types'
import styles from './Connect.module.css'

/** The prototype showed an em dash where follower counts would go. Rather than
 *  publish numbers that go stale the day they ship, each tile shows its action
 *  once the link exists, and keeps the em dash until then. */
export function Connect({ links }: { links: LinksContent }) {
  const items = [
    { platform: 'Instagram', href: links.instagram, action: 'Follow' },
    { platform: 'LinkedIn', href: links.linkedin, action: 'Follow' },
    { platform: 'The Living Question', href: links.podcastWebsite, action: 'Listen' },
    { platform: 'CBA Lifestyle', href: links.cbaLifestyle, action: 'Visit' },
  ]

  return (
    <section className={styles.connect} id="connect">
      <div className="wrap">
        <p className={styles.eyebrow}>Connect</p>
        <h2>Follow along across the podcast and the businesses.</h2>

        <div className={styles.grid}>
          {items.map((item) => {
            const body = (
              <>
                <span className={styles.platform}>{item.platform}</span>
                <span className={styles.count}>{item.href ? item.action : '—'}</span>
              </>
            )

            return item.href ? (
              <a
                key={item.platform}
                className={styles.item}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {body}
              </a>
            ) : (
              <div key={item.platform} className={styles.item}>
                {body}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
