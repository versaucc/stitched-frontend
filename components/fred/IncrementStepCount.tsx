'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabase'

export async function IncrementStepCount() {
  const orderId = localStorage.getItem('current_order_id')
  if (!orderId) return

  const { data: current, error: fetchError } = await supabase
    .from('custom_orders')
    .select('step_ct')
    .eq('id', orderId)
    .single()

  if (fetchError) {
    console.error('Error fetching current step:', fetchError)
    return
  }

  const newStepCount = (current?.step_ct || 0) + 1

  const { error: updateError } = await supabase
    .from('custom_orders')
    .update({ step_ct: newStepCount })
    .eq('id', orderId)

  if (updateError) {
    console.error('Error updating step count:', updateError)
  }
}
