import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  metadataBase: new URL('https://popo-client.vercel.app'),
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  applicationName: 'greencherry',
  title: 'greencherry',
  // authors: [
  //   { name: 'JaeJun', url: 'https://github.com/JaeMeDev' },
  //   { name: 'YangHa', url: 'https://github.com/ummaeha' },
  // ],
  description: '마감할인을 통한 지구 살리기',
  manifest: '/manifest.json',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFFFFF' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
  // TODO: itunes 등록 필요
  appleWebApp: {
    capable: true,
    title: 'greencherry',
    statusBarStyle: 'default',
    // TODO: startUpImage splash image
  },
  icons: {
    shortcut: '/favicon.ico',
    apple: '/icon-192x192.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
