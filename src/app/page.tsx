import { About } from '@/components/About/About'
import { ApplyForm } from '@/components/ApplyForm/ApplyForm'
import { Connect } from '@/components/Connect/Connect'
import { Duality } from '@/components/Duality/Duality'
import { Footer } from '@/components/Footer/Footer'
import { Header } from '@/components/Header/Header'
import { Hero } from '@/components/Hero/Hero'
import { Moments } from '@/components/Moments/Moments'
import { Podcast } from '@/components/Podcast/Podcast'
import { getSiteContent } from '@/sanity/queries'

export default async function HomePage() {
  const content = await getSiteContent()

  return (
    <>
      <Header />
      <main>
        <Hero hero={content.hero} />
        <Duality />
        <About body={content.cba} />
        <Podcast episodes={content.episodes} links={content.links} />
        <Connect links={content.links} />
        <Moments moments={content.moments} />
        <ApplyForm />
      </main>
      <Footer contact={content.contact} links={content.links} />
    </>
  )
}
