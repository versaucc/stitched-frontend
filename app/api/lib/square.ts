import { SquareClient } from 'square';

export const square = new SquareClient({
  token: process.env.SQUARE_ACCESS_TOKEN!,
  environment: 'production', // or 'sandbox'
});
