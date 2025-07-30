'use client'

import { useState, useEffect } from 'react'
import MinimalNavbar from '../../../components/navbar/MinimalNavbar'
import { useRouter } from 'next/navigation'

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


  return (
    <div className="relative min-h-screen bg-black text-white flex flex-col items-center">
      <MinimalNavbar />

      {/* Main section */}
      <div className="relative z-10 mt-[15vh] text-center px-6 max-w-2xl">
        <h1 className="text-4xl font-bold mb-6">      
          Custom Jeans With Fred
        </h1>
        <p className="text-lg text-gray-300 mb-8">
            Every pair is hand-sourced, hand-cut, and hand-sewn in Oregon. We work with you to build something
            unique, personal, and wearable. This is more than denim — it’s stitched with intent.
        </p>
        <button
          onClick={() => router.push('/fred')}
          className="px-6 py-3 bg-white text-black text-lg rounded hover:bg-gray-200 transition"
        >
          Start Designing
        </button>

      
      </div>

    </div>
  )
}

