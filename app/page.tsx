'use client'

import MinimalNavbar from '../components/navbar/MinimalNavbar'
import VectorAnimation from '../components/backgrounds/VectorAnimation'
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase'

import '../styles/homepage.css'

export default function HomePage() {
  const [email, setEmail] = useState(''); // State to store the email
  const [message, setMessage] = useState(''); // State to store feedback message
  const [placeholder, setPlaceholder] = useState('Enter your email…'); // State for placeholder

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth <= 768) {
      setPlaceholder('Email'); // Set placeholder for mobile
    }
  }, []); // Run only once on the client side

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const { error } = await supabase
        .from('emails')
        .insert([{ email }]); // Insert email into the 'emails' table

      if (error) {
        console.error('Error saving email:', error.message);
        setMessage('Failed to save email.');
      } else {
        setMessage('We got it! Stay tuned for updates.');
        setEmail(''); // Clear the input field
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setMessage('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="homepage-root">
      <VectorAnimation />

      {/* navbar */}
      <nav className="homepage-navbar">
        <MinimalNavbar />
      </nav>

      {/* content: input + menu */}
      <main className="homepage-main">
        {/* email box */}
        <form onSubmit={handleSubmit} className="homepage-form">
          <div className="homepage-input-wrapper">
            <input
              className="homepage-input"
              type="email"
              placeholder={placeholder} // Use the dynamic placeholder
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update state on input change
              required // Ensure email is required
            />
            <button type="submit" className="homepage-input-arrow">
              ◉
            </button>
          </div>
        </form>
        {message && <p className="homepage-message">{message}</p>} {/* Feedback message */}

        {/* menu directly under input */}
        <nav className="homepage-menu">
          <a href="./lookbook">Lookbook</a>
          <a href="./account">Account</a>
        </nav>
      </main>
    </div>
  );
}