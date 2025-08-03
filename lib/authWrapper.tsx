'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '../lib/supabase';

const AuthWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        const currentPath = window.location.pathname; // Get the current path
        router.push(`/account/login?redirect=${encodeURIComponent(currentPath)}`); // Redirect to login with the current path as a query parameter
        return;
      }

      const userId = session.user.id;

      // Check if the user has admin privileges
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('UID', userId)
        .single();

      if (error || !profile?.is_admin) {
        setIsNotFound(true); // Mark as 404 if not admin
        return;
      }

      setLoading(false); // User is authenticated and has admin privileges
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while checking authentication
  }

  if (isNotFound) {
    return <div>404 - Not Found</div>; // Show 404 page if user is not an admin
  }

  return <>{children}</>;
};

export default AuthWrapper;