'use client'

import { supabase } from '../../lib/supabase'

export async function FinalizeOrder() {
  const orderId = localStorage.getItem('current_order_id')
  if (!orderId) return

  const { error } = await supabase
    .from('custom_orders')
    .update({ saved: true, step_ct: 0 })
    .eq('id', orderId)

  if (error) {
    console.error('Error finalizing order:', error)
  }
}
