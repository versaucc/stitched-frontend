'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

const Clock: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [clockedIn, setClockedIn] = useState(false);
  const [clockInTime, setClockInTime] = useState<Date | null>(null);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) {
          console.error('Error fetching session:', sessionError.message);
          return;
        }

        const userId = session?.user?.id;

        if (!userId) {
          console.error('User ID not found in session.');
          return;
        }

        const { data, error } = await supabase
          .from('profiles')
          .select('name')
          .eq('UID', userId)
          .single();

        if (error) {
          console.error('Error fetching user name:', error.message);
        } else {
          setUserName(data?.name || 'User');
        }
      } catch (err) {
        console.error('Unexpected error:', err);
      }
    };

    fetchUserName();
  }, []);

  const handleClockIn = async () => {
    const now = new Date();
    setClockInTime(now);
    setClockedIn(true);

    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();

      if (sessionError) {
        console.error('Error fetching session:', sessionError.message);
        return;
      }

      const userId = session?.user?.id;

      if (!userId) {
        console.error('User ID not found in session.');
        return;
      }

      const { error } = await supabase
        .from('profiles')
        .update({ clock_in: now.toISOString() })
        .eq('UID', userId);

      if (error) {
        console.error('Error clocking in:', error.message);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
    }
  };

  const handleClockOut = async () => {
    const now = new Date();
    const hoursWorked = clockInTime ? (now.getTime() - clockInTime.getTime()) / (1000 * 60 * 60) : 0;
    setClockedIn(false);
    setClockInTime(null);

    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();

      if (sessionError) {
        console.error('Error fetching session:', sessionError.message);
        return;
      }

      const userId = session?.user?.id;

      if (!userId) {
        console.error('User ID not found in session.');
        return;
      }

      const { error } = await supabase
        .from('profiles')
        .update({ hours: hoursWorked })
        .eq('UID', userId);

      if (error) {
        console.error('Error clocking out:', error.message);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
    }
  };

  return (
    <div className="clock">
      <p>Welcome, {userName}</p>
      {clockedIn ? (
        <button onClick={handleClockOut} className="clock-button">
          Clock Out
        </button>
      ) : (
        <button onClick={handleClockIn} className="clock-button">
          Clock In
        </button>
      )}
    </div>
  );
};

export default Clock;