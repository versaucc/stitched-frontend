// app/api/square-inventory/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { squareClient } from '../lib/square';

export async function GET(req: NextRequest) {
  try {
    const countsPage = await squareClient.inventory.batchGetCounts({
      locationIds: [process.env.SQUARE_LOCATION_ID!],
      limit: 100,
    });

    // If you want all counts (across pages):
    const counts = [];
    for await (const count of countsPage) {
      counts.push(count);
    }

    return NextResponse.json(counts);
  } catch (error) {
    console.error('[INVENTORY_ERROR]', error);
    return NextResponse.json({ error: 'Failed to fetch inventory.' }, { status: 500 });
  }
}
