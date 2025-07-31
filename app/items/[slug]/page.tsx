'use client'

import { useParams } from 'next/navigation'
import { useState } from 'react'
import { products } from '../../../data/product'
import Sidebar from '../../../components/shop/Sidebar'

export default function ProductPage() {
  const { slug } = useParams()
  const fullSlug = Array.isArray(slug) ? slug.join('/') : slug

  const product = products.find((p) => p.slug === fullSlug)

  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || '')

  if (!product) return <div className="text-white p-8">Product not found</div>

  return (
    <div className="bg-black text-white w-screen h-screen">

      {/* Product Content */}
      <div className="flex-col align-items-center">

      <div className="flex flex-row w-full mt-[4rem] px-8 py-4">
            {/* Sidebar */}
      <div className="w-[20vw] ml-[15vw] p-2">
        <Sidebar itemCount={0} currency="USD"/>
      </div>

        <div className="flex flex-1 w-full align-items-center ml-[2rem]">
          {/* Image gallery */}
          <div className="
              grid grid-cols-1 w-[20vw]
              ">
            <img
              src={product.images[0]}
              alt={product.title}
              className="h-auto"
            />
            <div className="flex flex-row max-w-[20vw] overflow-x-auto">
              {product.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  className="h-24 w-24 object-cover border border-white"
                />
              ))}
            </div>
          </div>

          {/* Info + Controls */}
          <div className="flex flex-col items-center justify-evenly px-4 ml-[2rem]">
            <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
            <p className="text-lg mb-4">${product.price}</p>
            <p className="mb-2">
              <span className="underline">Shipping</span> calculated at checkout.
            </p>

            <label htmlFor="size" className="block mb-2 mt-4">
              Size
            </label>
            <select
              id="size"
              className="bg-black border border-white p-2 text-white"
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
            >
              {product.sizes.map((size, idx) => (
                <option key={idx} value={size}>
                  {size}
                </option>
              ))}
            </select>

            <button className="bg-gray-800 hover:bg-gray-700 mt-4 py-2 px-6 border border-white">
              ADD TO CART
            </button>

            <p className="text-sm mt-4 max-w-md whitespace-pre-line">
              {product.description}
            </p>

            <p className="mt-4 text-sm italic">
              Model (height {product.modelHeight}) wears size {product.modelSize}
            </p>

            <button className="max-w-[30%] mt-4 px-3 py-1 border border-white text-xs ">
              measurements
            </button>
          </div>
          </div>
        </div>
      </div>
    </div>

  )
}
