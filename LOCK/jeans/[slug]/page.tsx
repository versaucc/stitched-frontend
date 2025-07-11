// app/shop/jeans/[slug]/page.tsx
import { notFound } from 'next/navigation'
import ProductDetail from '../../../../components/products/ProductDetail'

interface PageProps {
  params: {
    slug: string
  }
}

const allProducts = [
  {
    slug: 'casual',
    name: 'Casual',
    price: 110,
    description:
      'presented on handpicked vintage (vintage name) featuring (fit) and (embroideries)\n\n*warning* this garment may display stains, blemishes.\nThese imperfections are representative of our commitment to sustainability and should be worn with pride.\n\nproduct images are used as an example of what buyers may receive',
    images: [
      '/products/jeans/noah-cargo-pants-1.jpg',
      '/products/jeans/noah-cargo-pants-2.jpg',
    ],
  },
]

export default function ProductSlugPage({ params }: PageProps) {
  const product = allProducts.find((p) => p.slug === params.slug)

  if (!product) return notFound()

  return <ProductDetail product={product} />
}

