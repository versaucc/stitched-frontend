'use client';

import Link from 'next/link';
import { useRef } from 'react';
import PageBuffer, { PageBufferHandle } from '../global/PageBuffer';

export default function MinimalNavbar() {
  const bufferRef = useRef<PageBufferHandle>(null);

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    bufferRef.current?.showAndRedirect('/');
  };

  return (
    <nav className="fixed top-4 left-0 w-full h-30 z-50">
      <PageBuffer ref={bufferRef} />
      <div className="flex justify-center gap-10 h-full items-center">
        <Link href="/" className="pointer-events-auto" onClick={handleHomeClick}>
          <img src="/logos/red-s-logo.png" alt="Stitched Home" className="h-20 w-auto" />
        </Link>
      </div>
    </nav>
  );
}