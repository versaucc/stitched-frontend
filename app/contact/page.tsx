'use client';

import { useState, useEffect } from 'react';
import MinimalNavbar from '../../components/navbar/MinimalNavbar';
import { supabase } from '../../lib/supabase';
import '../../styles/contactform.css'; // Import the new stylesheet

export default function ContactPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [reason, setReason] = useState('');
  const [message, setMessage] = useState('');
  const [feedback, setFeedback] = useState(''); // State to store feedback message

  useEffect(() => {
    const fetchUserEmail = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setEmail(user.email); // Pre-fill email if logged in
      }
    };

    fetchUserEmail();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { error } = await supabase
        .from('contact-forms')
        .insert([{ email, name, reason, message }]); // Insert form data into the 'contact-forms' table

      if (error) {
        console.error('Error submitting form:', error.message);
        setFeedback('Failed to submit the form. Please try again.');
      } else {
        setFeedback('Your message has been sent successfully!');
        setEmail(''); // Clear the email field if not logged in
        setName('');
        setReason('');
        setMessage('');
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setFeedback('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="contact-page">
      <MinimalNavbar />
      <main className="contact-form-container">
        <h1 className="form-title">Contact Us</h1>
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="reason">Reason</label>
            <select
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
            >
              <option value="" disabled>Select a reason</option>
              <option value="option1">Product information</option>
              <option value="option2">Size and fit</option>
              <option value="option3">Account help</option>
              <option value="option4">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your message"
              rows={5}
              required
            />
          </div>
          <button type="submit" className="submit-button">Submit</button>
        </form>
        {feedback && <p className="form-feedback">{feedback}</p>} {/* Feedback message */}
      </main>
    </div>
  );
}