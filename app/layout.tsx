// app/layout.tsx
import './globals.css'

import { ReactNode } from 'react'
import FooterNav from '../components/shop/FooterNav'

export const metadata = {
  title: 'Stitched',
  description: 'Baggy denim, baggy jeans, hand sewn, made in Oregon',
}

export default function RootLayout({ children }: { children: ReactNode }) {
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
