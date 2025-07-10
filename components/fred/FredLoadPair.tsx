'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabase'

export default function FredLoadPair({ onComplete }: { onComplete: () => void }) {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [userName, setUserName] = useState<string>('')
  const [savedOrders, setSavedOrders] = useState<any[]>([])
  const [pairName, setPairName] = useState('')
  const router = useRouter()
  const [userID, setUserId] = useState('')
  const [phone, setPhone] = useState('')
  const [instagram, setInstagram] = useState('')

  useEffect(() => {
    const fetchOrders = async () => {
      const { data: { user }, error: userErr } = await supabase.auth.getUser()
      if (userErr || !user) {
        router.push('/account/login?redirect=/fred')
        return
      }

      setUser(user)


      // Fetch user's name from profile
      const { data: profile, error: profileErr } = await supabase
        .from('profiles')
        .select('name')
        .eq('id', user.id)
        .single()

      if (profileErr) {
        console.warn('Profile not found:', profileErr.message)
      } else {
        setUserName(profile.name)
      }

      // Fetch any saved custom orders
      const { data: orders, error: ordersErr } = await supabase
        .from('custom_orders')
        .select('id, pair_name')
        .eq('user_id', user.id)

      if (ordersErr) {
        console.error('Error fetching saved orders:', ordersErr)
      }

      setSavedOrders(orders || [])
      setLoading(false)
    }

    fetchOrders()
  }, [])

  const handleStartNew = async () => {
    if (!pairName) return

    const session_id = crypto.randomUUID()

    // Fetch user's name from profile
    const { data: profile, error: profileErr } = await supabase
      .from('profiles')
      .select('name, UID, phone, instagram')
      .eq('UID', user.id)
      .single()

    if (profileErr) {
      console.warn('Profile not found:', profileErr.message)
    } else {

    const { data, error } = await supabase.from('custom_orders').insert([
      {
        user_id: user.id,
        email: user.email,
        name: profile.name,
        pair_name: pairName,
        saved : false, 
        UID : profile.UID,
        ordered : false,
        phone : profile.phone, 
        instagram : profile.instagram | '',
        session_id,
      }
    ]).select().single()
    
    if (error) {
      console.error('Error creating order:', error)
      return
    } 

    localStorage.setItem('current_order_id', data.id)
    localStorage.setItem('custom_session_id', session_id)

    await supabase.from('profiles').update({
      custom_session_id: session_id,
      custom_orders_working: data.id,
    }).eq('id', user.id)

    onComplete()
    }
  }

  const handleLoadExisting = async (orderId: string) => {
    localStorage.setItem('current_order_id', orderId)

    const { data: order, error } = await supabase
      .from('custom_orders')
      .select('session_id')
      .eq('id', orderId)
      .single()

    if (error) {
      console.error('Error fetching existing order:', error)
    }

    if (order?.session_id) {
      localStorage.setItem('custom_session_id', order.session_id)

      await supabase.from('profiles').update({
        custom_session_id: order.session_id,
        custom_orders_working: orderId,
      }).eq('id', user.id)
    }

    onComplete()
  }

  if (loading) return <div className="text-white text-center">Loading saved pairs...</div>

  return (
    <div className="flex flex-col items-center justify-center text-white space-y-6">
      <h2 className="text-2xl font-bold">Welcome back!</h2>
      {user?.email && (
        <p className="text-sm text-gray-400 -mt-4">Signed in under {user.email}</p>
      )}

      {savedOrders.length > 0 && (
        <div className="space-y-3 w-full max-w-sm">
          <p className="text-lg">Load a saved pair:</p>
          {savedOrders.map(order => (
            <button
              key={order.id}
              onClick={() => handleLoadExisting(order.id)}
              className="w-full bg-white text-black py-2 px-4 rounded hover:bg-gray-200"
            >
              {order.pair_name || 'Unnamed Pair'}
            </button>
          ))}
        </div>
      )}

      <div className="w-full max-w-sm space-y-4">
        <p className="text-lg mt-4">or start a new pair:</p>
        <input
          type="text"
          placeholder="Enter name for your pair"
          value={pairName}
          onChange={(e) => setPairName(e.target.value)}
          className="w-full p-3 rounded bg-white text-black placeholder-gray-500"
        />
        <button
          onClick={handleStartNew}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded"
        >
          Start Custom Pair
        </button>
      </div>
    </div>
  )
}
