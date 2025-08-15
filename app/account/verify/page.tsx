'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../lib/supabase';

export default function VerifyAccountPage() {
  const [verificationStatus, setVerificationStatus] = useState<'success' | 'failure' | null>(null);
  const router = useRouter();

  useEffect(() => {
    const verifyAccount = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (data?.session) {
        setVerificationStatus('success');
      } else {
        setVerificationStatus('failure');
      }
    };

    verifyAccount();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black-100">
      <div className="p-6 bg-black rounded shadow-md">
        {verificationStatus === 'success' ? (
          <h1 className="text-green-500 text-xl font-bold">Account Verified!</h1>
        ) : verificationStatus === 'failure' ? (
          <h1 className="text-red-500 text-xl font-bold">Hmmm.</h1>
        ) : (
          <h1 className="text-white-500 text-xl font-bold">Verifying...</h1>
        )}
        <div className="mt-4 flex space-x-4">
          <button
            onClick={() => router.push('/')}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-red-600"
          >
            Home
          </button>
          <button
            onClick={() => router.push('/account/login')}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-red-600"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}