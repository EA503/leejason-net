import type { Metadata } from 'next'
import { Fraunces, Inter } from 'next/font/google'

import { getSiteContent } from '@/sanity/queries'
import { siteUrl } from '@/sanity/env'
import './globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fraunces',
  style: ['normal', 'italic'],
})

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const TITLE = 'Jason Lee — Concierge Business Advisor & Host of The Living Question'

export async function generateMetadata(): Promise<Metadata> {
  const { seoDescription } = await getSiteContent()

  return {
    metadataBase: new URL(siteUrl),
    title: TITLE,
    description: seoDescription,
    openGraph: {
      title: TITLE,
      description: seoDescription,
      url: siteUrl,
      siteName: 'Jason Lee',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: TITLE,
      description: seoDescription,
    },
    alternates: { canonical: siteUrl },
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  )
}
