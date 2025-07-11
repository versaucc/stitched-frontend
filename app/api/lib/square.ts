import Square from 'square';

const client = new Square.Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN!,
  environment: 'production', // or 'sandbox'
});

export const square = client;
