'use client'

import MatrixRain from '../../components/matrix-rain-enhanced'
import InvisibleNavbar from '../../components/InvisibleNavbar'

export default function Gallery() {
  const photos = Array.from({ length: 12 }, (_, i) => `/gallery/pic${i + 1}.jpg`)

  return (
    <div className="relative w-screen h-full overflow-auto bg-black">
      <InvisibleNavbar></InvisibleNavbar>
      <MatrixRain />

      <div className="absolute mx-auto w-[70%] md:w-[80%] lg:w-[70%] inset-0 z-10 p-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-10">
          {photos.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`photo ${idx}`}
              className="w-full h-auto rounded shadow-lg object-cover"
            />
          ))}
        </div>
      </div>
    </div>
  )
}
