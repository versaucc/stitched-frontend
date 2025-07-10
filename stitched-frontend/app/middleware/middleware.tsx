import { withMiddlewareAuth } from '@supabase/auth-helpers-nextjs';

export const middleware = withMiddlewareAuth();

export const config = {
  matcher: ['/admin', '/dashboard'], // secure routes
};
