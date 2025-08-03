'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../lib/supabase';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [redirect, setRedirect] = useState('/');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    // Step 1: Create the user through Supabase
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      return;
    }

    const user = authData.user;

    if (!user) {
      setError('Failed to retrieve user information.');
      return;
    }

    // Step 2: Send a verification link
    const verificationLink = 'https://stitchedpdx.com/verify'; // Replace with your verification link
    setMessage(`Check your email to verify your account.`);

    // Step 3: Save user data to the 'profiles' table
    const { error: profileError } = await supabase
      .from('profiles')
      .insert([
        {
          UID: user.id, // Save user ID as UID
          name,
          email,
          phone,
        },
      ]);

    if (profileError) {
      setError(profileError.message);
      return;
    }

    if (redirect) {
      await new Promise((resolve) => setTimeout(resolve, 3000)); // 3-second delay
      router.push(redirect);
    }
  };

  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get('redirect');
    setRedirect(param || '/home');
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl font-bold mb-6">Sign Up</h1>
      <form onSubmit={handleRegister} className="w-full max-w-sm space-y-4">
        <input
          type="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 rounded bg-white text-black placeholder-gray-500"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded bg-white text-black placeholder-gray-500"
          required
        />
        <input
          type="phone"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-3 rounded bg-white text-black placeholder-gray-500"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded bg-white text-black placeholder-gray-500"
          required
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {message && <p className="text-green-500 text-sm">{message}</p>}
        <button type="submit" className="w-full bg-white text-black py-2 rounded hover:bg-gray-200">
          Sign Up
        </button>
      </form>
    </div>
  );
}