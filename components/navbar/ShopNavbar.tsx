'use client';

import Link from 'next/link';

export default function ShopNavbar() {
  return (
    <nav className="fixed top-0 left-0 w-full h-20 z-50 pointer-events-none">
      <div className="flex justify-center gap-10 h-full items-center">
        <Link href="/" className="pointer-events-auto">
          <img src="/navbar/home.png" alt="Home" className="h-20 w-auto" />
        </Link>
        <Link href="/shop/jeans" className="pointer-events-auto">
          <img src="/navbar/jeans.png" alt="Jeans" className="h-20 w-auto" />
        </Link>
        <Link href="shop/jorts" className="pointer-events-auto">
          <img src="/navbar/jorts.png" alt="Jorts" className="h-20 w-auto" />
        </Link>
        <Link href="/shop/custom" className="pointer-events-auto">
          <img src="/navbar/custom.png" alt="Custom" className="h-20 w-auto" />
        </Link>
      </div>
    </nav>
  );
}