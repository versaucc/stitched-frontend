'use client'

import { useParams } from 'next/navigation'
import { useState } from 'react'
import { products } from '../../../data/product'
import MinimalNavbar from '../../../components/navbar/MinimalNavbar'
import { useUser } from '@supabase/auth-helpers-react'
import { useCart } from '../../../lib/cart'
import toast, { Toaster } from 'react-hot-toast'

export default function ProductPage() {
  const { slug } = useParams()
  const fullSlug = Array.isArray(slug) ? slug.join('/') : slug

  const product = products.find((p) => p.slug === fullSlug)

  const userData = useUser()

  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || '')

  if (!product) return <div className="text-white p-8">Product not found</div>

  const { cart, addToCart } = useCart()

  const handleAddToCart = async () => {
    try {
      await addToCart({ product_id: product.id, size: selectedSize, quantity: 1 })
      toast.success('Added to cart!')
    } catch {
      toast.error('Failed to add to cart')
    }
  }

  return (
    <div className="bg-black text-white w-screen h-screen overflow-x-hidden">
      <MinimalNavbar />
      <Toaster position="top-right" reverseOrder={false} />

      {/* Product Content */}
      <div className="flex flex-col items-center">

        <div className="flex flex-row w-full mt-[6rem] px-8 py-4">

          <div className="flex flex-1 w-full items-center ml-[25vw]">
            {/* Image gallery */}
            <div className="grid grid-cols-1 w-[20vw]">
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

              <button
                className="bg-gray-800 hover:bg-gray-700 mt-4 py-2 px-6 border border-white"
                onClick={handleAddToCart}
              >
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
