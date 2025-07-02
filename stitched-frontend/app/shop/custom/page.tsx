'use client'

import MatrixRain from '../../../components/matrix-rain-enhanced'
import MinimalNavbar from '../../../components/MinimalNavbar'
import { useRouter } from 'next/navigation'

export default function CustomPage() {
  const router = useRouter()

  return (
    <div className="relative min-h-screen bg-black text-white flex flex-col items-center">
      {/* Top navigation bar */}
      <MinimalNavbar />

      {/* Left edge Matrix Rain */}
      <div className="absolute top-0 left-0 h-full w-[20vw] z-0 pointer-events-none">
        <MatrixRain />
      </div>

      {/* Right edge Matrix Rain */}
      <div className="absolute top-0 right-0 h-full w-[20vw] z-0 pointer-events-none">
        <MatrixRain />
      </div>

      {/* Main content */}
      <div className="relative z-10 mt-32 text-center px-6 max-w-2xl">
        <h1 className="text-4xl font-bold mb-6">Custom Order Suite</h1>
        <p className="text-lg text-gray-300 mb-10">
          This is your space to describe your vision. Whether it’s one-of-one jorts made from your dad’s jeans or
          an experimental denim top, we’ll make it happen.
        </p>
        <button
          onClick={() => router.push('/shop/custom/custom-suite')}
          className="px-6 py-3 bg-white text-black text-lg rounded hover:bg-gray-200 transition"
        >
          Enter Custom Suite
        </button>
      </div>
    </div>
  )
}

