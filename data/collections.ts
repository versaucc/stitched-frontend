// src/data/collections.ts

export interface Collection {
  id: number
  /** hero + thumbs */
  images: string[]
  /** e.g. "187cm wears M top and 30 bottom" */
  modelInfo: string
}

/**
 * Sample collections pulling from /public/gallery
 */
export const collections: Collection[] = [
  {
    id: 1,
    modelInfo: '187cm wears M top and 30 bottom',
    images: [
      '/gallery/pic1.jpg',  // hero
      '/gallery/pic2.jpg',
      '/gallery/pic3.jpg',
      '/gallery/pic4.jpg',
      '/gallery/pic5.jpg',
    ],
  },
  {
    id: 2,
    modelInfo: '182cm wears L top and 32 bottom',
    images: [
      '/gallery/pic6.jpg',
      '/gallery/pic7.jpg',
      '/gallery/pic8.jpg',
      '/gallery/pic9.jpg',
    ],
  },
  {
    id: 3,
    modelInfo: '190cm wears XL top and 34 bottom',
    images: [
      '/gallery/pic10.jpg',
      '/gallery/pic11.jpg',
      '/gallery/pic12.jpg',
    ],
  },
]
