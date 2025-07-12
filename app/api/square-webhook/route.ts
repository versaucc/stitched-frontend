// app/api/square-webhook/route.js
import { NextResponse } from 'next/server';
import crypto from 'node:crypto';

const WEBHOOK_SECRET = process.env.SQUARE_WEBHOOK_SIGNATURE_KEY;

/** quick-and-dirty validator; follow the full Square guide in production */
function isValid(rawBody, headerSig) {
  if (!WEBHOOK_SECRET || !headerSig) return false;
  const hmac = crypto
    .createHmac('sha1', WEBHOOK_SECRET)
    .update(rawBody)
    .digest('base64');
  return crypto.timingSafeEqual(Buffer.from(headerSig), Buffer.from(hmac));
}

export async function POST(req) {
  const raw = await req.text();
  const sig = req.headers.get('x-square-signature');

  if (!isValid(raw, sig)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  const event = JSON.parse(raw);
  console.log('[Square Webhook]', event.type);
  // TODO: react to event if you need to

  return NextResponse.json({ received: true });
}
