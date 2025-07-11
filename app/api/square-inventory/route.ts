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

    return NextResponse.json({ message: 'Inventory created', data });
  } catch (err: any) {
    console.error('[SQUARE-INVENTORY-API]', err);
    return NextResponse.json({ error: err.message || 'Unexpected server error' }, { status: 500 });
  }
}

// ✅ Optional: allow GET request for testing/debugging
export async function GET() {
  return NextResponse.json({
    message: 'Use POST to create a new inventory item at this endpoint.',
  });
}

// ❌ If you want to block unsupported methods like PUT/DELETE, you can optionally do this:
export async function PUT() {
  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
}

export async function DELETE() {
  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
}
