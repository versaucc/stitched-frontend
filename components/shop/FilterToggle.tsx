'use client'

import { FC, useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface FilterToggleProps {
  /** 'product' or 'model' */
  mode: 'product' | 'model'
  onModeChange: (next: 'product' | 'model') => void

  /** list of categories to show in dropdown */
  filterOptions: string[]
  /** currently selected category */
  selectedFilter: string
  onFilterChange: (filter: string) => void
}

const FilterToggle: FC<FilterToggleProps> = ({
  mode,
  onModeChange,
  filterOptions,
  selectedFilter,
  onFilterChange,
}) => {
  const [open, setOpen] = useState(false)

  const toggleMode = () =>
    onModeChange(mode === 'product' ? 'model' : 'product')

  const pickFilter = (opt: string) => {
    onFilterChange(opt)
    setOpen(false)
  }

  return (
    <div className="flex flex-col space-y-4">
      {/* ── Mode Switch Button ── */}
      <button
        onClick={toggleMode}
        className="
          border border-white
          px-4 py-2
          uppercase text-sm
          transition-colors duration-200
          hover:bg-white hover:text-black
        "
      >
        {mode === 'product' ? 'Show Models' : 'Show Products'}
      </button>

      {/* ── Filter Dropdown ── */}
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="
            flex justify-between items-center
            w-full
            border border-white
            px-4 py-2
            uppercase text-sm
            transition-colors duration-200
            hover:bg-white hover:text-black
          "
        >
          <span>{selectedFilter}</span>
          <ChevronDown size={16} />
        </button>

        {open && (
          <ul className="
              absolute left-0 right-0 mt-1
              bg-black border border-white
              text-sm
              z-10
            ">
            {filterOptions.map((opt) => (
              <li key={opt}>
                <button
                  onClick={() => pickFilter(opt)}
                  className="
                    block w-full text-left
                    px-4 py-2
                    hover:bg-white hover:text-black
                  "
                >
                  {opt}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default FilterToggle

