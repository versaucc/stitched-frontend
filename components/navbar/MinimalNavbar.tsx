'use client';

import Link from 'next/link';

export default function MinimalNavbar() {
  return (
    <nav className="fixed top-4 left-0 w-full h-30 z-50 pointer-events-none">
      <div className="flex justify-center gap-10 h-full items-center">
        <Link href="/" className="pointer-events-auto">
          <img src="/logos/red-s-logo.png" alt="Stitched Home" className="h-20 w-auto" />
        </Link>
      </div>
    </nav>
  );
}