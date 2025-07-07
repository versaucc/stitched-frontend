import { notFound } from 'next/navigation'
import ProductDetail from '../../../../components/products/ProductDetail'

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

export default function ProductSlugPage({ params }: { params: { slug: string } }) {
  const product = allProducts.find(p => p.slug === params.slug)

  if (!product) return notFound()

  return <ProductDetail product={product} />
}
