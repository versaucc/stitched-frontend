'use client'

import './globals.css'
import { ReactNode, useEffect } from 'react'
import FooterNav from '../components/shop/FooterNav'
import { logPageView } from '../lib/sessionManager'
import { useRouter } from 'next/navigation'

export default function RootLayout({ children }: { children: ReactNode }) {
  const router = useRouter()

  useEffect(() => {
    // log initial page load
    logPageView(window.location.pathname)

    const handleRouteChange = () => {
      logPageView(window.location.pathname)
    }

    window.addEventListener('popstate', handleRouteChange)
    return () => window.removeEventListener('popstate', handleRouteChange)
  }, [router])

  return (
    <html lang="en">
      <body className="bg-black text-white min-h-screen">
        {children}
        <div className="footer-nav">
          <FooterNav
            links={[
              { label: 'terms of service', href: '/about/tos' },
              { label: 'privacy policy', href: '/about/pp' },
              { label: 'refunds', href: '/about/refunds' },
            ]}
          />
        </div>
      </body>
    </html>
  )
}
