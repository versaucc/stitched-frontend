import { notFound } from 'next/navigation'
import ProductDetail from '../../../../components/products/ProductDetail'

const allProducts = [
  {
    slug: 'casual',
    name: 'Casual',
    price: 110,
    description: 'presented on handpicked vintage (vintage name) featuring (fit) and (embroideries) \n *warning* this garment may display stains, blemishes. \n These imperfections are representative of our commitment to sustainability and should be warn with pride. \n product images are used as an example of what buyers may recieve',
    images: [
      '/products/jeans/noah-cargo-pants-1.jpg',
      '/products/jeans/noah-cargo-pants-2.jpg',
    ],
  },
  {
    slug: 'jorts/lw',
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
