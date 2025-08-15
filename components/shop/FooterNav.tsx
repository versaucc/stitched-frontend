'use client'

import Link from 'next/link'
import { useRef, FC, MouseEvent } from 'react'
import { useRouter } from 'next/navigation'
import PageBuffer, { PageBufferHandle } from '../global/PageBuffer'

interface FooterLink {
  label: string
  href: string
}

interface FooterNavProps {
  links: FooterLink[]
}

const FooterNav: FC<FooterNavProps> = ({ links }) => {
  const bufferRef = useRef<PageBufferHandle>(null)
  const router = useRouter()

  const handleNav = (href: string) => (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    bufferRef.current?.showAndRedirect(href)
  }

  return (
    <nav className="flex justify-left space-x-8 uppercase py-1">
      <PageBuffer ref={bufferRef} />
      {links.map(({ label, href }) => (
        <Link
          key={href}
          href={href}
          className="transition-opacity duration-200 opacity-60 hover:opacity-100 p-1"
          onClick={handleNav(href)}
        >
          {label}
        </Link>
      ))}
    </nav>
  )
}

export default FooterNav