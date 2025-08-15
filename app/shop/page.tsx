'use client'

import '/styles/shop.css'
import { useState } from 'react'

import MinimalNavbar from '../../components/navbar/MinimalNavbar'
import Sidebar from '../../components/shop/Sidebar'
import CategoryNav from '../../components/shop/CategoryNav'
import FilterToggle from '../../components/shop/FilterToggle'
import ShopGrid from '../../components/shop/ShopGrid'
import FooterNav from '../../components/shop/FooterNav'
import { products } from '../../data/product'

export default function ShopPage() {
  const [category, setCategory] = useState('All')
  const [filter, setFilter]     = useState('Plain')

  return (
    <div className="shop-container">
      <MinimalNavbar />

      {/* ─── MAIN CONTENT ───────────────────────────── */}
      <main className="main-content">
        {/* Header: categories + filter */}
        <div className="header">
          <CategoryNav
            categories={[
              'Featured','Pants','Jorts', 'Custom'
            ]}
            active={category}
            onSelect={setCategory}
          />
        </div>

        {/* Scrollable product grid */}
        <div className="product-grid">
          <ShopGrid products={products} />
        </div>

        {/* Footer nav links */}
        <div className="footer text-sm">
          <FooterNav
            links={[
              { label: 'custom',       href:'/shop/custom' }, // Make stay tuned page/component
              { label: 'lookbook',     href:'/lookbook' },
              { label: 'contact',      href:'/contact' },
              { label: 'account',       href:'/account' },
            ]}
          />
        </div>
      </main>
    </div>
  )
}
