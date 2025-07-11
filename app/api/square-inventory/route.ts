import { NextRequest, NextResponse } from 'next/server';
import { squareClient } from '../lib/square';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const sku = searchParams.get('SKU');

    if (!sku) {
      return NextResponse.json({ error: 'SKU is required' }, { status: 400 });
    }

    // Step 1: Search items by SKU
    const searchResult = await squareClient.catalog.searchItems({
      textFilter: sku,
      productTypes: ['REGULAR'],
    });

    const item = searchResult.items?.[0];
    if (!item?.id) {
      return NextResponse.json({ error: 'No matching item found' }, { status: 404 });
    }

    // Step 2: Retrieve full catalog object with variations
    const fullCatalog = await squareClient.catalog.batchGet({
      objectIds: [item.id],
    });

  const variation = fullCatalog.objects
    ?.filter(obj => obj.type === 'ITEM_VARIATION')
    .find(obj => obj.itemVariationData?.sku === sku);



    if (!variation) {
      return NextResponse.json({ error: 'No variation with that SKU found' }, { status: 404 });
    }

    const catalogObjectId = variation.id;

    // Step 3: Fetch inventory for that variation
    const countsPage = await squareClient.inventory.batchGetCounts({
      catalogObjectIds: [catalogObjectId],
      locationIds: [process.env.SQUARE_LOCATION_ID!],
    });

    const counts = [];
    for await (const count of countsPage) {
      counts.push(count);
    }

    return NextResponse.json({ inventory: counts });
  } catch (err: any) {
    console.error('[SQUARE_INVENTORY_BY_SKU_ERROR]', err);
    return NextResponse.json({
      error: err.message || 'Failed to fetch inventory by SKU',
    }, { status: 500 });
  }
}
