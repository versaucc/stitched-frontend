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
      {/* ─── LEFT SIDEBAR ───────────────────────────── */}
      <aside className="sidebar">
        <Sidebar itemCount={0} currency="USD" />
      </aside>

      {/* ─── MAIN CONTENT ───────────────────────────── */}
      <main className="main-content">
        {/* Header: categories + filter */}
        <div className="header">
          <CategoryNav
            categories={[
              'All','Jorts','Pants','Accessories', 'Custom'
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
        <div className="footer">
          <FooterNav
            links={[
              { label: 'shop',         href:'/shop' },
              { label: 'custom',       href:'/shop/custom' },
              { label: 'lookbook',     href:'/lookbook' },
              { label: 'archive',      href:'/archive' },
              { label: 'contact',      href:'/contact' },
              { label: 'stores',       href:'/stores' },
              { label: 'jobs',         href:'/jobs' },
            ]}
          />
        </div>
      </main>
    </div>
  )
}
