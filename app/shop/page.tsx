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
              'New','Pants','Jorts'
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
              { label: 'lookbook',     href:'/lookbook' },
              { label: 'account',       href:'/account' },
              { label: 'local',      href:'/local' },
              { label: 'about',      href:'/about' },
              { label: 'contact',      href:'/contact' },
            ]}
          />
        </div>
      </main>
    </div>
  )
}
