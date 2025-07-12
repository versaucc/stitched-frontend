/**
 * Shared Square client singleton
 * --------------------------------
 * Make sure the following env-vars are defined in Vercel *and* `.env.local`
 *   SQUARE_ACCESS_TOKEN   –  Production access token
 *   SQUARE_ENV            –  "production" | "sandbox"
 */
import { Client, Environment } from '@square/square';

const env = process.env.SQUARE_ENV === 'production'
  ? Environment.Production
  : Environment.Sandbox;

export const squareClient = new Client({
  accessToken : process.env.SQUARE_ACCESS_TOKEN!,
  environment : env,
});
