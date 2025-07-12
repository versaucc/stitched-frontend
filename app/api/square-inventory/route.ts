import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../lib/supabaseClient';
import { squareClient } from '../lib/square';
import crypto from 'crypto';

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
      status,
    } = body;

    if (!name || !SKU || quantity === undefined || !size) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Insert into Supabase
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
          status,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('[SUPABASE INSERT ERROR]', error);
      return NextResponse.json({ error: 'Failed to insert inventory record' }, { status: 500 });
    }

    // Sync to Square only if status === 'available'
    if (status === 'available') {
      const searchResult = await squareClient.catalog.searchItems({
        textFilter: 'Jeans 1',
        productTypes: ['REGULAR'],
      });

      const jeansItem = searchResult.items?.[0];
      if (!jeansItem) {
        return NextResponse.json({ error: 'Square item "Jeans 1" not found' }, { status: 404 });
      }

      const fullCatalog = await squareClient.catalog.batchGet({
        objectIds: [jeansItem.id],
      });

      const matchingVariation = fullCatalog.objects
        ?.filter((obj) => obj.type === 'ITEM_VARIATION')
        .find((variation) => variation.itemVariationData?.name?.toLowerCase() === size.toLowerCase());

      if (!matchingVariation) {
        return NextResponse.json({ error: `No variation matching size "${size}" found in Square` }, { status: 404 });
      }

      const catalogObjectId = matchingVariation.id;

      // Adjust inventory via Square
      await squareClient.inventory.adjustInventory({
        body: {
          idempotencyKey: crypto.randomUUID(),
          adjustment: {
            catalogObjectId,
            locationId: process.env.SQUARE_LOCATION_ID!,
            fromState: 'NONE',
            toState: 'IN_STOCK',
            quantity: quantity.toString(),
          },
        },
      });
    }

    return NextResponse.json({ message: 'Inventory synced', data });
  } catch (err: any) {
    console.error('[SQUARE-INVENTORY-API ERROR]', err);
    return NextResponse.json({ error: err.message || 'Unexpected server error' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Use POST to create a new inventory item at this endpoint.',
  });
}

export async function PUT() {
  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
}

export async function DELETE() {
  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
}
