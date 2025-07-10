// /app/api/square-inventory/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '../lib/supabaseClient'

export async function POST(req: NextRequest) {
  const rawBody = await req.text()

  try {
    const payload = JSON.parse(rawBody)
    console.log('Square webhook payload:', payload)

    const eventType = payload.type
    const object = payload.data?.object

    if (eventType === 'inventory.count.updated' && object?.inventory_counts) {
      const supabase = createClient()

      for (const item of object.inventory_counts) {
        const { catalog_object_id, quantity } = item

        await supabase
          .from('inventory')
          .update({ quantity: parseInt(quantity) })
          .eq('square_item_id', catalog_object_id)
      }
    }

    return NextResponse.json({ message: 'Handled' }, { status: 200 })
  } catch (err) {
    console.error('Webhook error:', err)
    return NextResponse.json({ message: 'Invalid payload' }, { status: 400 })
  }
}
