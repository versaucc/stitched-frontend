// /app/api/square-test/route.ts
import { squareClient } from '../lib/square';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const result = await squareClient.catalog.searchItems({ textFilter: 'Jeans' });
    return NextResponse.json({ ok: true, items: result.items });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
