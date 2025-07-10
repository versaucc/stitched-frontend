'use client';

import Link from 'next/link';

export default function MinimalNavbar() {
  return (
    <nav className="fixed top-0 left-0 w-full h-30 z-50 pointer-events-none">
      <div className="flex justify-center gap-10 h-full items-center">
        <Link href="/" className="pointer-events-auto">
          <img src="/navbar/stitched_static_graffiti_white_invert.png" alt="Home" className="h-20 w-auto" />
        </Link>
      </div>
    </nav>
  );
}