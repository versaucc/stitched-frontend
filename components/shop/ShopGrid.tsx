// components/ShopGrid.tsx
import Image from 'next/image'
import { FC } from 'react'

export interface Product {
  id: string
  name: string
  price: string   // e.g. '$120'
  imageUrl: string
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
        <h2 className="text-2xl font-bold mb-6">
          {title}
        </h2>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1">
        {products.map((product) => (
          <div
            key={product.id}
            className="group relative overflow-hidden rounded-sm"
          >
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={400}
              height={400}
              className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
            />

            <div
              className="
                absolute inset-0
                bg-white bg-opacity-70
                flex flex-col items-center justify-center
                opacity-0 group-hover:opacity-100
                transition-opacity duration-300
              "
            >
              <p className="text-black font-semibold">{product.name}</p>
              <p className="text-black mt-1">{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ShopGrid
