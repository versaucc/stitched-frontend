'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import FooterNav from '../shop/FooterNav'
import TransparentTextBox from '../tools/TransparentTextBox'

// WHEN CAN : restore archive link and model desc box

import 'styles/lookbook.css'

interface Collection {
  id: number
  images: string[]
}

interface LookbookProps {
  collections: Collection[]
  collectionId?: number // Optional prop to specify a collection ID
}

export default function Lookbook({ collections }: LookbookProps) {
  const [collectionIndex, setCollectionIndex] = useState(0)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [hoveredImageIndex, setHoveredImageIndex] = useState<number | null>(null)
  const current = collections[collectionIndex]
  const heroImage =
    hoveredImageIndex !== null
      ? current.images[hoveredImageIndex]
      : current.images[selectedImageIndex]

  return (
    <div className="lookbook-root">
      <div className="lookbook-header">
        <span className="lookbook-title">summer 25</span>
        <Link href="/lookbook/archive" className="lookbook-archive-link">
          archive
        </Link>
      </div>

      <div className="lookbook-content lookbook-content-lg">
        {/* Hero image */}
        <section className="lookbook-hero">
          <Image
            src={`/lookbook/collection-${current.id}/${heroImage}`}
            alt={`Collection ${current.id} main`}
            fill
            className="object-cover"
          />
        </section>

        {/* Thumbnails */}
        <nav className="lookbook-thumbnails lookbook-thumbnails-lg">
          {current.images.map((img, idx) => (
            <div
              key={idx}
              className="thumb-wrapper thumb-wrapper-lg"
              onMouseEnter={() => setHoveredImageIndex(idx)}
              onMouseLeave={() => setHoveredImageIndex(null)}
              onClick={() => setSelectedImageIndex(idx)}
            >
              <Image
                src={`/lookbook/collection-${current.id}/${img}`}
                alt={`Thumb ${idx}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </nav>
      </div>
        <div className="mx-auto text-sm">
        <FooterNav 
            links={[
              { label: 'shop',     href:'/shop' },
              { label: 'account',       href:'/account' },
              { label: 'local',      href:'/local' },
              { label: 'about',      href:'/about' },
              { label: 'contact',      href:'/contact' },
          ]}/>
        </div>
    </div>
  )
}