'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import InvisibleNavbar from '../../components/navbar/InvisibleNavbar'
import MatrixRain from '../../components/backgrounds/matrix-rain-enhanced'
import FuzzyText from '../../components/effects/text/FuzzyText';

const rotatingContent = [
  {
    label: 'Jorts',
    images: ['/home/jorts-1.jpg', '/home/jorts-2.jpg', '/home/jorts-3.jpg'],
    route: '/jorts',
  },
  {
    label: 'Jeans',
    images: ['/home/jeans-1.jpg', '/home/jeans-2.jpg', '/home/jeans-3.jpg'],
    route: '/jeans',
  },
  {
    label: 'Custom',
    images: ['/custom/img1.jpg', '/custom/img2.jpg', '/custom/img3.jpg'],
    route: '/shop/custom',
  },
]

const galleryImages = Array.from({ length: 12 }, (_, i) => `/gallery/pic${i + 1}.JPG`)

export default function HomePage() {
  const router = useRouter()
  const [activeIndex, setActiveIndex] = useState(0)
  const [galleryStartIndex, setGalleryStartIndex] = useState(0)

  // rotate every 3 sec
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % rotatingContent.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const visibleGallery = galleryImages.slice(galleryStartIndex, galleryStartIndex + 4)

  const handlePrevGallery = () => {
    setGalleryStartIndex((prev) => Math.max(prev - 2, 0))
  }

  const handleNextGallery = () => {
    setGalleryStartIndex((prev) =>
      prev + 2 >= galleryImages.length ? 0 : prev + 2
    )
  }

  return (
    <div className="relative w-screen h-full overflow-auto bg-black">
        <MatrixRain/>
      <InvisibleNavbar></InvisibleNavbar>
    <div className="absolute mx-auto w-[70%] md:w-[80%] lg:w-[70%] inset-0 z-10 p-16 text-white">

      

      {/* Top Rotating Banner */}
      <div className="mb-12 mt-10 space-y-6">
        <h1 className="mx-[40%] font-bold">
        <FuzzyText 
          baseIntensity={0.2} 
          hoverIntensity={1} 
          enableHover={true}
        >
          {rotatingContent[activeIndex].label}
        </FuzzyText></h1>
        <div className="flex justify-center gap-4">
          {rotatingContent[activeIndex].images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`${rotatingContent[activeIndex].label}-${idx}`}
              onClick={() => router.push(rotatingContent[activeIndex].route)}
              className="w-40 h-40 object-cover rounded cursor-pointer hover:scale-105 transition"
            />
          ))}
        </div>
      </div>

      {/* Gallery with Side Scroll */}
      <div className="relative w-full max-w-6xl mb-4 pd-4">
        <h1 className="mx-[38.5%] font-bold">        
          <FuzzyText 
            baseIntensity={0.2} 
            hoverIntensity={1} 
            enableHover={true}
                  >Gallery  
        </FuzzyText></h1>
        <div className="flex items-center justify-between mb-8 pt-4">
          <button onClick={handlePrevGallery} className="text-2xl pr-4">⟨</button>
          <div className="grid grid-cols-4 gap-6 w-full">
            {visibleGallery.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`gallery-${idx}`}
                className="w-full h-60 object-cover rounded shadow"
              />
            ))}
          </div>
          <button onClick={handleNextGallery} className="text-2xl pl-4">⟩</button>
        </div>
      </div>
    </div>
    </div>
  )
}
