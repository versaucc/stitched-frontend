'use client'

import { useEffect, useState } from 'react'
import { supabase } from './supabase'

type CartItem = {
  product_id: string
  size: string
  quantity: number
}

export function useCart() {
  const [cart, setCart] = useState<{ [key: string]: CartItem }>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return setLoading(false)

        // Fetch profile by UID (Supabase Auth UUID)
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('cart')
          .eq('UID', user.id)
          .single()

        if (profileError) throw profileError

        setCart(profile?.cart || {})
      } catch (err: any) {
        console.error(err)
        setError('Failed to fetch cart.')
      } finally {
        setLoading(false)
      }
    }

    fetchCart()
  }, [])

  const addToCart = async (item: CartItem) => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('User not logged in')

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('cart')
        .eq('UID', user.id)
        .single()

      if (profileError) throw profileError

      const newCart = { ...(profile?.cart || {}) }
      const nextKey = `item${Object.keys(newCart).length + 1}`
      newCart[nextKey] = item

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ cart: newCart })
        .eq('UID', user.id)

      if (updateError) throw updateError

      setCart(newCart)
      return newCart
    } catch (err: any) {
      console.error(err)
      setError('Failed to add item to cart.')
      throw err
    }
  }

  return { cart, addToCart, loading, error }
}

