// data/products.ts

export interface Product {
  id: string
  slug: string
  title: string
  price: string
  imageUrl: string
  hoverImageUrl?: string
  sizes: string[]
  modelInfo: string
  modelHeight: string
  modelSize: string
  description: string
  images: string[]
}

export const products: Product[] = [
  {
    id: '1',
    slug: 'lw-s',
    title: 'Light Wash "S"',
    price: '$110',
    imageUrl: '/products/jeans/lw-s/sam-lw-s.jpg',
    hoverImageUrl: '/products/jeans/lw-s/sam-lw-s.jpg',
    sizes: ['28', '30', '32', '34'],
    modelInfo: 'Model (height 4"10) wears size 32',
    modelHeight: '4"10',
    modelSize: '32',
    description: 'Hand-sewn / 100% cotton / baggy fit',
    images: [
      '/lookbook/collection-1/00.JPG',
      '/lookbook/collection-1/01.JPG',
      '/lookbook/collection-1/02.JPG',
      '/lookbook/collection-1/03.JPG',
      '/lookbook/collection-1/04.JPG',
      '/lookbook/collection-1/05.JPG',
      '/lookbook/collection-1/06.JPG',
      '/lookbook/collection-1/07.JPG',
      '/lookbook/collection-1/08.JPG',
    ],
  },
  {
    id: '2',
    slug: 'jorts-lw',
    title: 'Jorts',
    price: '$160',
    imageUrl: '/products/jorts/sam-jorts-1.jpg',
    hoverImageUrl: '/products/jorts/sam-jorts-2.jpg',
    sizes: ['28', '30', '32', '34'],
    modelInfo: 'Model (height 186) wears size 32',
    modelHeight: '186cm',
    modelSize: '32',
    description: '14.5oz raw denim / 100% cotton / fits true to size',
    images: [
      '/lookbook/collection-1/00.JPG',
      '/lookbook/collection-1/01.JPG',
      '/lookbook/collection-1/02.JPG',
      '/lookbook/collection-1/03.JPG',
      '/lookbook/collection-1/04.JPG',
      '/lookbook/collection-1/05.JPG',
      '/lookbook/collection-1/06.JPG',
      '/lookbook/collection-1/07.JPG',
      '/lookbook/collection-1/08.JPG',
    ],
  },
  // Duplicate the rest of the objects below and replace only the ID as needed (3 through 18)
  // Each one can reuse the same dummy values for modelInfo, description, sizes, and gallery
]
