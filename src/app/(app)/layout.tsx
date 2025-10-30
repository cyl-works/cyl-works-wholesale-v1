import React from 'react'
import './styles.css'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { Header } from '@/components/Header'
import { BackToTop } from '@/components/BackToTop'
import { Footer } from '@/components/Footer'

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <head>
        <link href="/cyl-swoosh-icon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <LivePreviewListener />
        <Header />
        <main>{children}</main>
        <BackToTop />
        <Footer />
      </body>
    </html>
  )
}
