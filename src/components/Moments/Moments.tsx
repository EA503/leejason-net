import Image from 'next/image'

import { urlForImage } from '@/sanity/image'
import type { Moment } from '@/sanity/types'
import styles from './Moments.module.css'

export function Moments({ moments }: { moments: Moment[] }) {
  if (moments.length === 0) return null

  return (
    <section className={styles.moments} id="moments">
      <div className="wrap">
        <p className={styles.eyebrow}>Moments</p>
        <h2>Photos and clips from the podcast and the projects.</h2>

        <div className={styles.grid}>
          {moments.map((moment) => {
            const url = urlForImage(moment.image)?.width(600).height(750).url()

            if (!url) {
              return (
                <div key={moment._id} className={styles.slot}>
                  {moment.placeholder ?? 'Photo to add'}
                </div>
              )
            }

            return (
              <figure key={moment._id} className={styles.photo}>
                <Image
                  src={url}
                  alt={moment.image?.alt || moment.caption || ''}
                  fill
                  sizes="(max-width: 860px) 50vw, 25vw"
                />
                {moment.caption && (
                  <figcaption className={styles.caption}>{moment.caption}</figcaption>
                )}
              </figure>
            )
          })}
        </div>
      </div>
    </section>
  )
}
