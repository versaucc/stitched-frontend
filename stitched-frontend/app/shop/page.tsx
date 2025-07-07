'use client'

import { useState } from 'react'
import InvisibleNavbar from '../../components/navbar/InvisibleNavbar'
import MatrixRain from '../../components/backgrounds/matrix-rain-enhanced'
import ShopNavbar from '../../components/navbar/ShopNavbar'
import ShopAscii from '../../components/navbar/ShopAscii'
import FuzzyText from '../../components/effects/text/FuzzyText'

const products = [
  {
    id: 1,
    slug: 'jeans/casual',
    name: 'Casual',
    price: '$110',
    image: '/products/jeans/noah-cargo-pants-1.jpg',
    hoverImage: '/products/jeans/noah-cargo-pants-2.jpg',
  },
  {
    id: 2,
    slug: 'jorts/lw',
    name: 'Jorts',
    price: '$160',
    image: '/products/jorts/sam-jorts-1.jpg',
    hoverImage: '/products/jorts/sam-jorts-2.jpg',
  },
  // Add more...
]

export default function ShopPage() {
  return (
    <div className="bg-black text-white min-h-screen mx-4 py-10">
      <ShopNavbar></ShopNavbar>
        <div className="pl-[40%] py-14 bg-black text-white">
             <FuzzyText
                baseIntensity={0.2}
                hoverIntensity={1}
                enableHover={true}
              >
                Shop All
              </FuzzyText>
     </div>
      {/* Product Grid Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-2 mt-4">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  )
}


import { useRouter } from 'next/navigation'

function ProductCard({ slug, name, price, image, hoverImage }: any) {
  const [hovered, setHovered] = useState(false)
  const router = useRouter()

  return (
    <div
      onClick={() => router.push(`/shop/${slug}`)}
      className="cursor-pointer group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-200">
        <img
          src={image}
          alt={name}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${hovered ? 'opacity-0' : 'opacity-100'}`}
        />
        <img
          src={hoverImage}
          alt={`${name} alt`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`}
        />
      </div>
      <div className="mt-3 text-center">
        <h2 className="text-lg font-medium">{name}</h2>
        <p className="text-sm text-gray-400">{price}</p>
      </div>
    </div>
  )
}



