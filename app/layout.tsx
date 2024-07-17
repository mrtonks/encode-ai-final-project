/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import PrelineScript from './components/PrelineScript'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Encode AI - Final Project',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100..900;1,100..900&display=swap');
        </style>
      </head>
      <body className={inter.className}>{children}</body>
      <PrelineScript />
    </html>
  )
}
