// ...existing imports...
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
    <div className="flex flex-col h-full bg-black text-white">
      <div className="flex-col">
        {/* Archive Link */}
        <div className="flex justify-end mr-[10vw] mt-[15vh] px-4 py-2">
          <Link
            href="/lookbook/archive"
            className="text-sm uppercase underline hover:text-gray-300"
          >
            lookbook archive
          </Link>
        </div>
        {/* LOOKBOOK CONTENT */}
        <div className="
          flex-1
          flex 
          flex-col 
          lg:flex-row 
          lg:ml-[11vw] 
          lg:w-[80vw] 
          overflow-hidden 
          gap-x-8 
          h-auto">
          {/* Hero image */}
          <section
            className="
              relative
              w-[35%]
              lg:px-[clamp(0rem,5%,5rem)]
              h-[70vh]
            "
          >
            <Image
              src={`/lookbook/collection-1/${heroImage}`} // CHANGE TO CURRENT COLLECTION
              alt={`Collection ${current.id} main`}
              fill
              className="object-cover"
            />
            <TransparentTextBox>
              5"10, 32" waist, 32" inseam, wearing size M top
            </TransparentTextBox>
          </section>

          {/* Thumbnails */}
          <nav
            className="
              w-[35%]
              flex flex-row overflow-x-auto overflow-y-hidden gap-0
              lg:grid lg:grid-cols-4 lg:overflow-y-auto lg:overflow-x-hidden
              h-[70vh]
            "
          >
            {current.images.map((img, idx) => (
              <div
                key={idx}
                className="
                  flex-shrink-0 w-32 h-32
                  lg:aspect-[4/5] lg:relative
                  overflow-hidden
                  cursor-pointer
                "
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

        {/* FooterNav */}
        <div className='footer'>
          <FooterNav
            links={[
              { label: 'shop', href: '/shop' },
              { label: 'custom', href: '/shop/custom' },
              { label: 'lookbook', href: '/lookbook' },
              { label: 'contact', href: '/contact' },
              { label: 'locations', href: '/locations' },
              { label: 'jobs', href: '/jobs' },
            ]}
          />
        </div>
      </div>
    </div>
  )
}