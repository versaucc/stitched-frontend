// components/ShopGrid.tsx
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

export interface Product {
  id: string
  slug: string
  title: string
  price: string
  imageUrl: string
  hoverImageUrl?: string
  sizes: string[]
  modelInfo: string
  description: string
  images: string[]
  modelHeight: string
  modelSize: string
}

interface ShopGridProps {
  /** optional heading above the grid */
  title?: string
  /** list of products to render */
  products: Product[]
}

const ShopGrid: FC<ShopGridProps> = ({ title, products }) => {
  return (
    <div className="flex-1 overflow-y-auto px-1 py-1">
      {title && (
        <h2 className="text-2xl font-bold mb-6">{title}</h2>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/items/${product.slug}`}
            className="group block relative overflow-hidden rounded-sm"
          >
            <Image
              src={product.imageUrl}
              alt={product.title}
              width={400}
              height={400}
              className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-white bg-opacity-70 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-black font-semibold">{product.title}</p>
              <p className="text-black mt-1">{product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default ShopGrid
