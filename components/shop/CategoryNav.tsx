'use client'

import { FC } from 'react'

interface CategoryNavProps {
  /** e.g. ['All', 'Jorts', 'Tops', …] */
  categories: string[]
  /** currently selected category */
  active: string
  /** called with the clicked category */
  onSelect: (category: string) => void
}

const CategoryNav: FC<CategoryNavProps> = ({ categories, active, onSelect }) => (
  <nav className="flex space-x-6 uppercase text-sm font-medium">
    {categories.map((cat) => (
      <button
        key={cat}
        onClick={() => onSelect(cat)}
        className={`
          transition-opacity duration-200
          ${active === cat ? 'opacity-100 underline' : 'opacity-60 hover:opacity-100'}
        `}
      >
        {cat}
      </button>
    ))}
  </nav>
)

export default CategoryNav
