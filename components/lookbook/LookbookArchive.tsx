'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import FooterNav from '../shop/FooterNav'
import TransparentTextBox from '../tools/TransparentTextBox'

import 'styles/lookbook.css'

interface Collection {
  id: number
  images: string[]
}

interface LookbookProps {
  collections: Collection[]
  collectionId?: number // Optional prop to specify a collection ID
}

export default function LookbookArchive({ collections }: LookbookProps) {
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
      <div className="lookbook-archive-link">
        <Link href="/lookbook" className="lookbook-archive-link">
          current lookbook
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
          <TransparentTextBox>
            5"10, 32" waist, 32" inseam, wearing size M top
          </TransparentTextBox>
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
    </div>
  )
}