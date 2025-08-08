import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server'; // Import NextRequest
import { v4 as uuidv4 } from 'uuid';
import { supabase } from './lib/supabase';

// Toggle verbose debugging
const VERBOSE_DEBUG = false;

export async function middleware(req: NextRequest) { // Use NextRequest
  if (VERBOSE_DEBUG) console.log('Middleware executed for URL:', req.url);

  const ipAddress = req.headers.get('x-forwarded-for') || 'unknown'; // Get IP address
  const userAgent = req.headers.get('user-agent') || 'unknown'; // Get user agent

  if (VERBOSE_DEBUG) {
    console.log('Request details:');
    console.log('IP Address:', ipAddress);
    console.log('User Agent:', userAgent);
  }

  // Generate or retrieve session ID
  let sessionId = req.cookies.get('session_id')?.value; // Extract the value as a string
  if (!sessionId) {
    sessionId = uuidv4(); // Generate a new session ID
    const response = NextResponse.next();
    response.cookies.set('session_id', sessionId, { path: '/', maxAge: 60 * 60 * 24 }); // Set cookie for 24 hours

    if (VERBOSE_DEBUG) console.log('Generated new session ID:', sessionId);
    return response;
  }

  if (VERBOSE_DEBUG) console.log('Existing session ID:', sessionId);

  // Log session data to Supabase
  try {
    // Fetch the existing session data
    const { data: existingSession, error: fetchError } = await supabase
      .from('sessions')
      .select('click_count')
      .eq('session_id', sessionId)
      .single();

    if (fetchError) {
      console.error('Error fetching existing session data:', fetchError.message);
    }

    const updatedClickCount = (existingSession?.click_count || 0) + 1;

    const { data, error } = await supabase
      .from('sessions')
      .upsert({
        session_id: sessionId,
        ip_address: ipAddress,
        user_agent: userAgent,
        last_click: new Date().toISOString(),
        click_count: updatedClickCount,
        console_errors: [], // Placeholder for console errors
      }, { onConflict: 'session_id' }); // Use onConflict to handle updates

    if (VERBOSE_DEBUG) {
      console.log('Supabase response:', { data, error });
    }

    if (error) {
      console.error('Error logging session data:', error.message);
    }
  } catch (err) {
    console.error('Unexpected error logging session data:', err);
  }

  return NextResponse.next();
}