import '../config/globals.css'

import type { Metadata } from 'next'
import { Albert_Sans, Geist, Geist_Mono, Poppins, Sora } from 'next/font/google'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const poppins = Poppins({
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
})

const albertSans = Albert_Sans({
  variable: '--font-albert-sans',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
})

const sora = Sora({
  variable: '--font-sora',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-bt">
      <body className={`${sora.variable} ${albertSans.variable} ${poppins.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
