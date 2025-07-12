import { squareClient } from '../lib/square';
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

type ReqBody = { size: string; delta: number };

export async function POST(req: NextRequest) {
  let body: ReqBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { size, delta } = body;
  if (!size || !Number.isInteger(delta)) {
    return NextResponse.json({ error: 'size and integer delta required' }, { status: 400 });
  }

  /** -------------------------------------------------
   * 1. Look-up “Jeans 1” variations that match the size
   * ------------------------------------------------- */
  const catalogRes = await squareClient.catalog.searchItems({
    textFilter: 'Jeans 1',
    limit: 100,
  });

  if (catalogRes.errors?.length || !catalogRes.result?.items?.length) {
    return NextResponse.json({ error: 'Item not found in catalog' }, { status: 404 });
  }

  const variation = catalogRes.result.items
    .flatMap(i => i.variations ?? [])
    .find(v => (v.itemVariationData?.name ?? '').toLowerCase() === size.toLowerCase());

  if (!variation?.id) {
    return NextResponse.json({ error: `No variation for size ${size}` }, { status: 404 });
  }

  /** -----------------------------------------
   * 2. Push inventory delta with batchCreateChanges
   * ----------------------------------------- */
  const locRes = await squareClient.locations.list();
  const location = locRes.result.locations?.find(l => l.name === 'Stitched PDX LLC');
  if (!location?.id) {
    return NextResponse.json({ error: 'Location “Stitched PDX LLC” not found' }, { status: 404 });
  }

  const resp = await squareClient.inventory.batchCreateChanges({
    idempotencyKey: crypto.randomUUID(),
    ignoreUnchangedCounts: true,
    changes: [{
      type: 'ADJUSTMENT',
      adjustment: {
        catalogObjectId: variation.id,
        locationId      : location.id,
        fromState       : 'IN_STOCK',
        toState         : 'IN_STOCK',
        quantity        : delta.toString(),
        occurredAt      : new Date().toISOString(),
      },
    }],
  });

  if (resp.errors?.length) {
    return NextResponse.json({ error: resp.errors }, { status: 500 });
  }

  return NextResponse.json({ ok: true, variationId: variation.id });
}
