'use client';

import Link from 'next/link';
import ASCIIText from '../effects/text/ASCIIText';

export default function ShopNavbar() {
  return (
    <nav className="relative top-4 left-0 w-full h-60 z-50 pointer-events-none">
        <ASCIIText
            text="Shop All"
            enableWaves={false}
            asciiFontSize={4}
        />
    </nav>
  );
}