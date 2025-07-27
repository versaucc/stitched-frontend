'use client'

import { FC } from 'react'
import { ChevronRight } from 'lucide-react'

interface LookbookArchiveProps {
  /** array of image URLs for the archive thumbnails */
  images: string[]
  /** click handler when the header arrow is clicked */
  onNext?: () => void
}

const LookbookArchive: FC<LookbookArchiveProps> = ({ images, onNext }) => (
  <aside className="lookbook-archive">
    <div className="lookbook-archive-header">
      <span>lookbook archive</span>
      <button onClick={onNext} className="archive-next">
        <ChevronRight size={14} />
      </button>
    </div>

    <div className="lookbook-archive-grid">
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`Lookbook archive ${i + 1}`}
          className="archive-thumb"
        />
      ))}
    </div>
  </aside>
)

export default LookbookArchive
