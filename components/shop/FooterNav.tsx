'use client'

import Link from 'next/link'
import { FC } from 'react'

interface FooterLink {
  label: string
  href: string
}

interface FooterNavProps {
  links: FooterLink[]
}

const FooterNav: FC<FooterNavProps> = ({ links }) => (
  <nav className="flex justify-left space-x-8 uppercase text-xs py-2">
    {links.map(({ label, href }) => (
      <Link
        key={href}
        href={href}
        className="transition-opacity duration-200 opacity-60 hover:opacity-100 hover:underline"
      >
        {label}
      </Link>
    ))}
  </nav>
)

export default FooterNav