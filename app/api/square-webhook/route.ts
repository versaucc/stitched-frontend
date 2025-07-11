// app/api/square-webhook/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const signature = req.headers.get('x-square-signature');
  const body = await req.text(); // Square signs the raw body

  // TODO: Replace with your own verification logic using your webhook signature key
  const isValid = true; // Implement signature validation here

  if (!isValid) {
    return new NextResponse('Invalid signature', { status: 401 });
  }

  const event = JSON.parse(body);
  console.log('[SQUARE WEBHOOK EVENT]', event);

  // Handle specific event types if needed
  if (event.type === 'inventory.count.updated') {
    // Process inventory update
  }

  return new NextResponse('ok', { status: 200 });
}
