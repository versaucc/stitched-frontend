// components/Sidebar.tsx
'use client'

import { FC } from 'react'
import { useRouter } from 'next/navigation'

interface SidebarProps {
  /** Number of items in cart */
  itemCount: number
  /** Current currency code (e.g. "USD") */
  currency: string
  /** Called when user clicks “cart” */
  onViewCart?: () => void
  /** Called when user clicks “shop” */
  onContinueShopping?: () => void
  /** Called when user selects a different currency */
  onCurrencyChange?: (newCurrency: string) => void
}

/** Renders the branded logo block */
const LogoBox: FC = () => (
  <div className="w-full max-h-64 border border-white mb-4 flex items-center justify-center overflow-hidden">
    <div className="text-center">
      <h1 className="text-2xl font-bold mb-2">stitched</h1>
      <img
        src="/fred/fred-wave.png"
        alt="Fred"
        className="max-w-full max-w-full object-contain"
      />
    </div>
  </div>
)

/** Renders the cart status & action box */
const CartBox: FC<SidebarProps> = ({
  itemCount,
  currency,
  onViewCart,
  onContinueShopping,
  onCurrencyChange,
}) => {
  const router = useRouter()

  return (
    <div className="w-full border border-white p-4">
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold">CART</span>
        <select
          value={currency}
          onChange={(e) => onCurrencyChange?.(e.target.value)}
          className="bg-black text-white border-none outline-none"
        >
          <option value="USD">$ USD</option>
          <option value="EUR">€ EUR</option>
          {/* add more currencies here */}
        </select>
      </div>

      <p className="mb-4">{itemCount} Items</p>

      <div className="flex space-x-4">
        <button
          onClick={onViewCart ?? (() => router.push('/cart'))}
          className="border border-white px-4 py-1 uppercase text-sm"
        >
          cart
        </button>
        <button
          onClick={onContinueShopping ?? (() => router.push('/shop'))}
          className="border border-white px-4 py-1 uppercase text-sm"
        >
          shop
        </button>
      </div>
    </div>
  )
}

/** Sidebar wraps LogoBox + CartBox */
const Sidebar: FC<SidebarProps> = (props) => (
  <aside className="flex flex-col w-full max-w-xs space-y-2">
    <LogoBox />
    <CartBox {...props} />
  </aside>
)

export default Sidebar
