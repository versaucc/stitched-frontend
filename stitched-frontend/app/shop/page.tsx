'use client'

import InvisibleNavbar from '../../components/InvisibleNavbar'
import MatrixRain from '../../components/matrix-rain-enhanced'
import ShopNavbar from '../../components/ShopNavbar'

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-black text-black flex flex-col items-center">
      <ShopNavbar />
      <MatrixRain />

      <div className="flex space-x-6 mb-12 mt-12">
      </div>

      <div className="italic text-white-500">Pick a category to explore styles</div>
    </div>
  )
}


