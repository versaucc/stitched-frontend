'use client'
//NOTE : REMOVE PW PROTECTION FOR LIVE DEPLOY 

import './globals.css'
import { ReactNode, useEffect, useState } from 'react'
import FooterNav from '../components/shop/FooterNav'
import { useRouter } from 'next/navigation'
import { logPageView } from '../lib/sessionManager'

const PASSWORD = 'fred' // Replace with your password

export default function RootLayout({ children }: { children: ReactNode }) {
  const router = useRouter()
  const [authenticated, setAuthenticated] = useState(false)
  const [attempted, setAttempted] = useState(false)

  useEffect(() => {
    const sessionPass = sessionStorage.getItem('site-password')
    if (sessionPass === PASSWORD) {
      setAuthenticated(true)
    }

    if (sessionPass === PASSWORD) logPageView(window.location.pathname)

    const handleRouteChange = () => {
      if (sessionStorage.getItem('site-password') === PASSWORD) {
        logPageView(window.location.pathname)
      }
    }

    window.addEventListener('popstate', handleRouteChange)
    return () => window.removeEventListener('popstate', handleRouteChange)
  }, [router])

  const handlePasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const target = e.target as typeof e.target & { password: { value: string } }
    if (target.password.value === PASSWORD) {
      sessionStorage.setItem('site-password', PASSWORD)
      setAuthenticated(true)
    } else {
      alert('Incorrect password')
      setAttempted(true)
    }
  }

  return (
    <html lang="en">
      <body className="bg-black text-white min-h-screen">
        {!authenticated ? (
          <div className="flex flex-col justify-center items-center h-screen px-4">
            <h1 className="text-2xl mb-4">Enter Password</h1>
            <form onSubmit={handlePasswordSubmit} className="flex flex-col items-center">
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="p-2 mb-4 text-black rounded"
              />
              <button
                type="submit"
                className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200"
              >
                Enter
              </button>
              {attempted && <p className="text-red-500 mt-2">Wrong password, try again.</p>}
            </form>
          </div>
        ) : (
          <>
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
          </>
        )}
      </body>
    </html>
  )
}


