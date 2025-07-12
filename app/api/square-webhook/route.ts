/**
 * Minimal webhook receiver.
 *  – Verifies the Square signature.
 *  – Echoes event type for observability.
 *
 *  Add the following env-vars:
 *    SQUARE_WEBHOOK_SIGNATURE_KEY
 *    SQUARE_WEBHOOK_URL     (exact URL configured in Square Dashboard)
 */

import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const sigKey = process.env.SQUARE_WEBHOOK_SIGNATURE_KEY!;
const webhookUrl = process.env.SQUARE_WEBHOOK_URL!;

function isValid(payload: string, sigHeader: string | null) {
  if (!sigHeader) return false;

  const hmac = crypto
    .createHmac('sha1', sigKey)
    .update(webhookUrl + payload)
    .digest('base64');

  return crypto.timingSafeEqual(Buffer.from(hmac), Buffer.from(sigHeader));
}

export async function POST(req: NextRequest) {
  const raw = await req.text();
  const sig = req.headers.get('x-square-signature');

  if (!isValid(raw, sig)) {
    return NextResponse.json({ error: 'Signature mismatch' }, { status: 400 });
  }

  const event = JSON.parse(raw);
  console.log('[Square Webhook]', event.type, event.event_id);

  // ──> Add any custom logic (e.g. sync to DB) here

  return NextResponse.json({ received: true });
}
