import { PortableText, type PortableTextBlock } from '@portabletext/react'

import styles from './About.module.css'

export function About({ body }: { body: PortableTextBlock[] }) {
  return (
    <section className={styles.about} id="about">
      <div className="wrap">
        <div>
          <p className={styles.eyebrow}>About CBA Lifestyle</p>
          <h2>What Jason actually does, day to day.</h2>
        </div>
        <div className={styles.body}>
          <PortableText value={body} />
        </div>
      </div>
    </section>
  )
}
