'use client'

import { useParams } from 'next/navigation'
import { useState } from 'react'
import { products } from '../../../data/product'
import MinimalNavbar from '../../../components/navbar/MinimalNavbar'
import { useUser } from '@supabase/auth-helpers-react'
import { useCart } from '../../../lib/cart'
import toast, { Toaster } from 'react-hot-toast'
import '../../../styles/items.css'

export default function ProductPage() {
  const { slug } = useParams()
  const fullSlug = Array.isArray(slug) ? slug.join('/') : slug

  const product = products.find((p) => p.slug === fullSlug)
  const userData = useUser()
  const { cart, addToCart } = useCart()

  // Always default to safe values
  const [heroImage, setHeroImage] = useState(product?.images?.[0] ?? '')
  const [selectedWaist, setSelectedWaist] = useState('')
  const [selectedLength, setSelectedLength] = useState('')
  const [selectedLegOpening, setSelectedLegOpening] = useState('')

  if (!product) return <div className="text-white p-8">Product not found</div>

  const handleAddToCart = async () => {
    if (!selectedWaist || !selectedLength || !selectedLegOpening) {
      toast.error('Please select waist, length, and leg opening.')
      return
    }

    try {
      await addToCart({
        product_id: product.id,
        size: `${selectedWaist}x${selectedLength}-${selectedLegOpening}`,
        quantity: 1,
      })
      toast.success('Added to cart!')
    } catch {
      toast.error('Failed to add to cart')
    }
  }

  return (
    <div className="bg-black text-white w-screen min-h-screen overflow-x-hidden">
      <MinimalNavbar />
      <Toaster position="top-right" reverseOrder={false} />

      <div className="product-container">
        {/* Image gallery */}
        <div className="gallery">
          {heroImage ? (
            <img src={heroImage} alt={product.title} className="hero-image" />
          ) : (
            <div className="hero-image placeholder">No image</div>
          )}

          <div className="thumbnail-row">
            {(product.images ?? []).map((img, idx) => (
              <img
                key={idx}
                src={img}
                className={`thumbnail ${heroImage === img ? 'active' : ''}`}
                onClick={() => setHeroImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Product info + controls */}
        <div className="info">
          <h1 className="title">{product.title ?? 'Untitled Product'}</h1>
          <p className="price">${product.price ?? 'N/A'}</p>
          <p className="shipping">
            <span className="underline">Shipping</span> calculated at checkout.
          </p>

          {/* Waist */}
          {(product.waist ?? []).length > 0 && (
            <div className="option-block">
              <p className="option-label">Waist</p>
              <div className="option-grid">
                {(product.waist ?? []).map((w: string, idx: number) => (
                  <button
                    key={idx}
                    className={`option-btn ${selectedWaist === w ? 'selected' : ''}`}
                    onClick={() => setSelectedWaist(w)}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Length */}
          {(product.inseam ?? []).length > 0 && (
            <div className="option-block">
              <p className="option-label">Length</p>
              <div className="option-grid">
                {(product.inseam ?? []).map((l: string, idx: number) => (
                  <button
                    key={idx}
                    className={`option-btn ${selectedLength === l ? 'selected' : ''}`}
                    onClick={() => setSelectedLength(l)}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Leg Opening */}
          {(product.legOpening ?? []).length > 0 && (
            <div className="option-block">
              <p className="option-label">Leg Opening</p>
              <div className="option-grid">
                {(product.legOpening ?? []).map((lo: string, idx: number) => (
                  <button
                    key={idx}
                    className={`option-btn ${selectedLegOpening === lo ? 'selected' : ''}`}
                    onClick={() => setSelectedLegOpening(lo)}
                  >
                    {lo}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            ADD TO CART
          </button>

          {/* Description */}
          {product.description && <p className="description">{product.description}</p>}
          {(product.modelHeight || product.modelSize) && (
            <p className="model-note">
              Model (height {product.modelHeight ?? 'N/A'}) wears size{' '}
              {product.modelSize ?? 'N/A'}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
