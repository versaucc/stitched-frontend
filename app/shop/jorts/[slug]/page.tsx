// app/shop/jorts/[slug]/page.tsx
import { notFound } from 'next/navigation'
import ProductDetail from '../../../../components/products/ProductDetail'

interface PageProps {
  params: {
    slug: string
  }
}

const allProducts = [
  {
    slug: 'lw',
    name: 'Jorts',
    price: 160,
    description: 'Oversized distressed jorts cut from recycled denim.',
    images: [
      '/products/jorts/sam-jorts-1.jpg',
      '/products/jorts/sam-jorts-2.jpg',
    ],
  },
]

export default function ProductSlugPage({ params }: PageProps) {
  const product = allProducts.find((p) => p.slug === params.slug)

  if (!product) return notFound()

  return <ProductDetail product={product} />
}
