import { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@/lib/supabaseClient'
// import { verifySquareSignature } from '@/lib/squareVerify' // Optional

export const config = {
  api: {
    bodyParser: false, // Required to verify Square signatures (raw body)
  },
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  // Optional: verifySquareSignature(req) → return 401 if invalid

  let body = ''
  await new Promise<void>((resolve) => {
    req.on('data', (chunk) => {
      body += chunk
    })
    req.on('end', () => resolve())
  })

  try {
    const payload = JSON.parse(body)
    console.log('Square webhook payload:', payload)

    // Extract useful info (e.g., product ID, quantity, event type)
    const eventType = payload.type
    const object = payload.data?.object

    // EXAMPLE: Handle inventory update
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

    return res.status(200).json({ message: 'Handled' })
  } catch (err) {
    console.error('Webhook error:', err)
    return res.status(400).json({ message: 'Invalid payload' })
  }
}
