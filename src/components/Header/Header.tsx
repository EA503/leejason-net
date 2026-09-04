import styles from './Header.module.css'

const NAV_ITEMS = [
  { href: '#work', label: 'Work' },
  { href: '#podcast', label: 'The Living Question' },
  { href: '#apply', label: 'Be a guest' },
  { href: '#contact', label: 'Contact' },
]

export function Header() {
  return (
    <header className={styles.header}>
      <div className="wrap">
        <a href="#top" className={styles.logo}>
          Jason Lee
        </a>
        <nav className={styles.nav} aria-label="Main">
          {NAV_ITEMS.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <a href="#contact" className={styles.navCta}>
          Get in touch
        </a>
      </div>
    </header>
  )
}
