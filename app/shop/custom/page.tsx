'use client'

import MatrixRainEnhanced from '../../../components/backgrounds/matrix-rain-enhanced'
import { useState, useEffect } from 'react'
import MinimalNavbar from '../../../components/navbar/MinimalNavbar'
import { useRouter } from 'next/navigation'
import GradientText from '../../../components/effects/text/GradientText'

export default function CustomPage() {
  const router = useRouter()

  const allImages = [
    '/customs/work1.jpg',
    '/customs/work2.jpg',
    '/customs/work3.jpg',
    '/customs/work4.jpg',
    '/customs/work5.jpg',
    '/customs/work6.jpg',
    '/customs/work7.jpg',
    '/customs/work8.jpg',
  ]

  const [slideIndex, setSlideIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % 2) // 0 or 1
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const visibleImages = allImages.slice(slideIndex * 4, slideIndex * 4 + 4)

  return (
    <div className="relative min-h-screen bg-black text-white flex flex-col items-center">
      <MinimalNavbar />

      {/* Left & Right Matrix Rain */}
      <div className="absolute top-0 left-0 h-full w-[20vw] z-0 pointer-events-none">
        <MatrixRainEnhanced />
      </div>
      <div className="absolute top-0 right-0 h-full w-[20vw] z-0 pointer-events-none">
        <MatrixRainEnhanced />
      </div>

      {/* Main section */}
      <div className="relative z-10 mt-24 text-center px-6 max-w-2xl">
        <h1 className="text-4xl font-bold mb-6">        
          <GradientText
          colors={["#ff000d", "#e03039", "#94070e", "#cbe00d", "#f2ff7e"]}
          animationSpeed={3}
          showBorder={false}
          className="custom-class"
        >
          Custom Jeans With Fred
        </GradientText></h1>
        <p className="text-lg text-gray-300 mb-8">
          This is your space to describe your vision. Whether it’s one-of-one jorts made from your dad’s jeans or
          an experimental denim top, we’ll make it happen.
        </p>
        <button
          onClick={() => router.push('/fred')}
          className="px-6 py-3 bg-white text-black text-lg rounded hover:bg-gray-200 transition"
        >
          Start Designing
        </button>
      </div>

      {/* About + Our Work Section */}
      <div className="relative z-10 mt-12 w-full max-w-4xl px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
        {/* About Column */}
        <div>
          <h2 className="text-2xl font-bold mb-4">About</h2>
          <p className="text-gray-300 w-[70%] mb-6">
            Every pair is hand-sourced, hand-cut, and hand-sewn in Oregon. We work with you to build something
            unique, personal, and wearable. This is more than denim — it’s stitched with intent.
          </p>
          <button
            onClick={() => router.push('/shop/customs/about')}
            className="mt-2 px-4 py-2 bg-white text-black text-sm rounded hover:bg-gray-200 transition"
          >
            Learn More
          </button>
        </div>

        {/* Slideshow Column */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Our Work</h2>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {visibleImages.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`work-${idx}`}
                className="w-full h-40 object-cover rounded shadow"
              />
            ))}
          </div>
          <button
            onClick={() => router.push('/shop/customs/gallery')}
            className="mt-0 px-4 py-2 bg-white text-black text-sm rounded hover:bg-gray-200 transition"
          >
            View Gallery
          </button>
        </div>
      </div>
    </div>
  )
}

