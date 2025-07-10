'use client'

import { useState } from 'react'

export default function ProductDetail({ product }) {
  const [selectedSize, setSelectedSize] = useState('30x30')

  const sizes = ['30x30', '28x30', '32x30', '32x32']

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12 flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto">

      {/* LEFT: Product Images */}
      <div className="flex-1 space-y-4">
        {product.images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Product image ${i + 1}`}
            className="w-full rounded-lg object-cover border border-gray-700"
          />
        ))}
      </div>

      {/* MIDDLE: Size Dropdown */}
      <div className="w-full lg:w-40 flex-shrink-0 flex items-start justify-center pt-6">
        <div className="w-full">
          <label htmlFor="size" className="block text-sm font-semibold mb-2">
            Select Size
          </label>
          <select
            id="size"
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            className="bg-black border border-white text-white px-4 py-2 rounded w-full"
          >
            {sizes.map((size) => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>
      </div>

      {/* RIGHT: Product Info */}
      <div className="flex-1 space-y-6">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-lg text-gray-300">${product.price}</p>
        <p className="text-gray-400">{product.description}</p>

        <button className="mt-6 bg-white text-black px-6 py-3 rounded hover:bg-gray-200 font-semibold">
          Add to Cart
        </button>
      </div>

    </div>
  )
}
