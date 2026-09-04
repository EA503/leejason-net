import Image from 'next/image'
import { PortableText } from '@portabletext/react'

import { urlForImage } from '@/sanity/image'
import type { HeroContent } from '@/sanity/types'
import styles from './Hero.module.css'

export function Hero({ hero }: { hero: HeroContent }) {
  const photoUrl = urlForImage(hero.photo)?.width(720).height(900).url()

  return (
    <section className={styles.hero} id="top">
      <div className="wrap">
        <div>
          <p className={styles.heroRole}>
            Concierge Business Advisor · Host of <em>The Living Question</em>
          </p>
          <h1>Jason Lee</h1>
          <p className={styles.heroLede}>{hero.lede}</p>
        </div>

        <div className={styles.heroSide}>
          {photoUrl ? (
            <div className={styles.photoFrame}>
              <Image
                src={photoUrl}
                alt={hero.photo?.alt || 'Jason Lee'}
                fill
                sizes="(max-width: 860px) 100vw, 360px"
                priority
              />
            </div>
          ) : (
            <div className={styles.photoPlaceholder}>Photo of Jason — to add</div>
          )}

          <PortableText value={hero.bio} />

          <div className={styles.ctaRow}>
            <a href="#podcast" className={styles.btn}>
              <span>Listen</span>to The Living Question
            </a>
            <a href="#contact" className={styles.btn}>
              <span>Connect</span>with Jason
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
