'use client';

import './globals.css';
import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import FooterNav from '../components/shop/FooterNav';

export default function RootLayout({ children }: { children: ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const maintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true';
    if (maintenanceMode && router.pathname !== '/maintenance') {
      router.replace('/maintenance');
    }
  }, [router]);

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
  );
}