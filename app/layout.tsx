'use client'

import { Montserrat } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { store } from '@/store/api'

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} antialiased`}>
        <Toaster />
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  )
}
