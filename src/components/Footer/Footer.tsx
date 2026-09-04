import type { ContactContent, LinksContent } from '@/sanity/types'
import styles from './Footer.module.css'

export function Footer({
  contact,
  links,
}: {
  contact: ContactContent
  links: LinksContent
}) {
  const elsewhere = [
    links.podcastWebsite && { href: links.podcastWebsite, label: 'The Living Question' },
    links.linkedin && { href: links.linkedin, label: 'LinkedIn' },
    links.instagram && { href: links.instagram, label: 'Instagram' },
  ].filter(Boolean) as { href: string; label: string }[]

  return (
    <footer className={styles.footer} id="contact">
      <div className="wrap">
        <div className={styles.main}>
          <div>
            <h2>Let&rsquo;s talk business, property, or the podcast.</h2>
          </div>

          <div className={styles.col}>
            <p className={styles.colLabel}>Contact</p>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            {contact.bookingLink && (
              <a href={contact.bookingLink} target="_blank" rel="noopener noreferrer">
                Book a call
              </a>
            )}
          </div>

          {elsewhere.length > 0 && (
            <div className={styles.col}>
              <p className={styles.colLabel}>Elsewhere</p>
              {elsewhere.map((link) => (
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

        <div className={styles.bottom}>
          <span>{contact.name}</span>
          <span>&copy; {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  )
}
