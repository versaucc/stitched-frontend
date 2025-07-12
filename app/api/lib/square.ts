import { SquareClient } from 'square';

export const squareClient = new SquareClient({
  token: process.env.SQUARE_ACCESS_TOKEN!,
  environment: 'production', // ← this is required for production mode
});