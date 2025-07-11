import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { type, data } = body;

  if (type === 'catalog.version.updated') {
    // Optional: fetch item data and update your Supabase inventory
    // Or re-fetch from Square here
  }

  if (type === 'inventory.count.updated') {
    const { catalog_object_id, location_id, quantity } = data.object.inventory_counts[0];

    // Update Supabase with new stock count
    await supabase
      .from('inventory')
      .update({ stock: parseInt(quantity, 10) })
      .eq('square_variation_id', catalog_object_id);
  }

  return NextResponse.json({ received: true });
}
