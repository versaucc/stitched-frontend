'use client'

import './globals.css'
import { ReactNode, useEffect } from 'react'
import FooterNav from '../components/shop/FooterNav'
import { useRouter } from 'next/navigation' // Correct import for App Router
import { logPageView } from '../lib/sessionManager' // Assuming logPageView is implemented in sessionManager.ts

export default function RootLayout({ children }: { children: ReactNode }) {
  const router = useRouter()

  useEffect(() => {
    // Log the initial page view
    logPageView(window.location.pathname)

    // Listen for route changes
    const handleRouteChange = () => {
      logPageView(window.location.pathname) // Log the new page view
    }

    // Add a listener for route changes
    window.addEventListener('popstate', handleRouteChange)

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener('popstate', handleRouteChange)
    }
  }, [router])

  return (
    <html lang="en">
      <body className="bg-black text-white">
        {children}

        <div className="footer-nav">
          <FooterNav
            links={[
              { label: 'terms of service', href: '/tos' },
              { label: 'privacy policy', href: '/privacy' },
              { label: 'legal notice', href: '/legal' },
              { label: 'refund', href: '/refund' },
            ]}
          />
        </div>
      </body>
    </html>
  )
}