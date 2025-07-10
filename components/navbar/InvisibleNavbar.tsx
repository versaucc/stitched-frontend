'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function InvisibleNavbar() {
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full h-20 z-50 pointer-events-none">
        <div className="flex justify-center gap-10 h-full items-center">
          <Link href="/" className="pointer-events-auto">
            <img src="/navbar/home.png" alt="Home" className="h-20 w-auto" />
          </Link>
          <Link href="/shop" className="pointer-events-auto">
            <img src="/navbar/shop.png" alt="Shop" className="h-20 w-auto" />
          </Link>
          <Link href="/about" className="pointer-events-auto">
            <img src="/navbar/about.png" alt="About" className="h-20 w-auto" />
          </Link>
          <Link href="/gallery" className="pointer-events-auto">
            <img src="/navbar/gallery.png" alt="Gallery" className="h-20 w-auto" />
          </Link>
          <Link href="/account" className="pointer-events-auto">
            <img src="/navbar/account.png" alt="Account" className="h-20 w-auto" />
          </Link>
        </div>
      </nav>

      {accountMenuOpen && (
        <div className="fixed top-20 left-0 w-64 h-full bg-white text-black z-50 shadow-lg p-6 space-y-4 pointer-events-auto">
          <h2 className="text-xl font-bold mb-4">Account</h2>
          <Link href="/login" className="block hover:underline">
            Sign In
          </Link>
          <Link href="/register" className="block hover:underline">
            Sign Up
          </Link>
        </div>
      )}
    </>
  );
}