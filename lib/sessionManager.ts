'use client'; 

import { supabase } from './supabase';
import { CustomPairSession } from '../types/customPairSession'

const STORAGE_KEY = 'custom_session'

export function getStoredSession(): CustomPairSession | null {
  const raw = localStorage.getItem(STORAGE_KEY)
  return raw ? JSON.parse(raw) : null
}

export function setStoredSession(data: CustomPairSession) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function clearStoredSession() {
  localStorage.removeItem(STORAGE_KEY)
}

export const logPageView = async (url: string) => { // Accept URL as a parameter
  try {
    const referrer = document.referrer; // Referrer URL
    const userAgent = navigator.userAgent; // User agent string

    // Fetch IP address using an external service
    const ipAddress = await fetch('https://api.ipify.org?format=json')
      .then((res) => res.json())
      .then((data) => data.ip)
      .catch(() => 'unknown');

    const { error } = await supabase.from('page_views').insert([
      {
        url, // Use the passed URL
        referrer,
        ip_address: ipAddress,
        user_agent: userAgent,
      },
    ]);

    if (error) {
      console.error('Error logging page view:', error.message);
    }
  } catch (err) {
    console.error('Unexpected error logging page view:', err);
  }
};