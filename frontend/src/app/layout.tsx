import '../config/globals.css'

// app/layout.tsx (ou layout.js)
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { Albert_Sans, Geist, Geist_Mono, Poppins, Sora } from 'next/font/google'

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
    <html lang="pt-br">
      <body className={`${sora.variable} ${albertSans.variable} ${poppins.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
