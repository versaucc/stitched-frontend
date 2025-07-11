import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../lib/supabaseClient';
import { squareClient } from '../lib/square';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      SKU,
      quantity,
      category,
      brand,
      wash,
      size,
      cost,
      price,
      description,
      image_url,
      square_item_id,
      patches,
    } = body;

    if (!name || !SKU || quantity === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // ✅ Insert into Supabase inventory table
    const { data, error } = await supabase
      .from('inventory')
      .insert([
        {
          name,
          SKU,
          quantity,
          category,
          brand,
          wash,
          size,
          cost,
          price,
          description,
          image_url,
          square_item_id,
          patches,
          stock: quantity > 0,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('[SUPABASE INSERT ERROR]', error);
      return NextResponse.json({ error: 'Failed to insert inventory record' }, { status: 500 });
    }

    // ✅ Optionally send to Square (comment this out if not using)
    // const squareRes = await squareClient.inventory.batchInventory({ ... })

    return NextResponse.json({ message: 'Inventory created', data });
  } catch (err: any) {
    console.error('[SQUARE-INVENTORY-API]', err);
    return NextResponse.json({ error: err.message || 'Unexpected server error' }, { status: 500 });
  }
}
