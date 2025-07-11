import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Client } from 'square';

export async function POST(req: Request) {
  const body = await req.json();

  const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE!);

  const square = new Client({
    accessToken: process.env.SQUARE_ACCESS_TOKEN!,
    environment: 'production',
  });

  try {
    const { result } = await square.catalogApi.upsertCatalogObject({
      idempotencyKey: crypto.randomUUID(),
      object: {
        type: 'ITEM',
        id: '#TEMP_ID',
        itemData: {
          name: body.name,
          description: body.description,
          variations: [
            {
              type: 'ITEM_VARIATION',
              id: '#TEMP_VAR',
              itemVariationData: {
                name: 'Default',
                pricingType: 'FIXED_PRICING',
                priceMoney: {
                  amount: body.price,
                  currency: 'USD',
                },
              },
            },
          ],
        },
      },
    });

    const itemId = result.catalogObject?.id;
    const variationId = result.catalogObject?.itemData?.variations?.[0]?.id;

    // Update Supabase with returned Square IDs
    await supabase
      .from('inventory')
      .update({ square_item_id: itemId, square_variation_id: variationId })
      .eq('id', body.id);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error syncing to Square:', err);
    return NextResponse.json({ error: 'Failed to sync to Square' }, { status: 500 });
  }
}
