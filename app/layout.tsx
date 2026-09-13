import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MUST Cafeteria | Campus food ordering',
  description: 'Pre-order meals, pay with M-Pesa, and get served faster at Meru University of Science and Technology.',
  manifest: '/manifest.webmanifest',
  icons: {
    icon: '/must-official-logo.png',
    shortcut: '/must-official-logo.png',
    apple: '/must-official-logo.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#00a859',
  colorScheme: 'light dark',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className="bg-background"><body>{children}</body></html>
}
