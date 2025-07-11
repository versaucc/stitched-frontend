// app/api/square-inventory/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { squareClient } from '../lib/square';

export async function GET(req: NextRequest) {
  try {
    const { result } = await squareClient.inventory.batchGetCounts({
      locationIds: [process.env.SQUARE_LOCATION_ID!],
      limit: 100,
    });

    return NextResponse.json(result.counts);
  } catch (error) {
    console.error('[INVENTORY_ERROR]', error);
    return NextResponse.json({ error: 'Failed to fetch inventory.' }, { status: 500 });
  }
}

