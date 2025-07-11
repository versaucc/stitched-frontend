// app/api/square-inventory/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { squareClient } from '../lib/square';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const sku = searchParams.get('sku');

    if (!sku) {
      return NextResponse.json({ error: 'SKU is required' }, { status: 400 });
    }

    // ✅ Search catalog items by SKU using searchItems (not searchCatalogObjects)
    const result = await squareClient.catalog.searchItems({
      textFilter: sku,
      productTypes: ['REGULAR'],
    });

    const match = result.items
      ?.flatMap((item) => item.variations || [])
      .find((variation) => variation.itemVariationData?.sku === sku);

    if (!match) {
      return NextResponse.json({ error: 'No item variation with that SKU found' }, { status: 404 });
    }

    const catalogObjectId = match.id;

    // ✅ Fetch inventory for the matching catalog object
    const response = await squareClient.inventory.batchGetCounts({
      catalogObjectIds: [catalogObjectId],
      locationIds: [process.env.SQUARE_LOCATION_ID!],
    });

    const counts = [];
    for await (const item of response) {
      counts.push(item);
    }

    return NextResponse.json({ inventory: counts });
  } catch (err: any) {
    console.error('[SQUARE_INVENTORY_SKU]', err);
    return NextResponse.json({
      error: err.message || 'Failed to fetch inventory by SKU',
    }, { status: 500 });
  }
}
