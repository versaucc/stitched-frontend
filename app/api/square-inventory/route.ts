// app/api/square-inventory/route.ts

import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const itemId = body.item_id
  const newQuantity = body.quantity

  const squareResponse = await fetch(`https://connect.squareup.com/v2/inventory/adjust`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.SQUARE_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      idempotency_key: crypto.randomUUID(),
      location_id: process.env.SQUARE_LOCATION_ID,
      changes: [
        {
          type: "ADJUSTMENT",
          adjustment: {
            catalog_object_id: itemId,
            from_state: "IN_STOCK",
            to_state: "IN_STOCK",
            quantity: String(newQuantity)
          }
        }
      ]
    }),
  })

  const data = await squareResponse.json()
  return NextResponse.json(data)
}
