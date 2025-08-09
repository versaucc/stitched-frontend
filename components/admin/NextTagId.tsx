'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

const NextTagId: React.FC = () => {
  const [nextTagId, setNextTagId] = useState<number | null>(null);

  useEffect(() => {
    const fetchNextTagId = async () => {
      try {
        const { data, error } = await supabase
          .from('production')
          .select('tagId')
          .order('tagId', { ascending: false })
          .limit(1);

        if (error) {
          console.error('Error fetching tagId:', error.message);
          return;
        }

        const highestTagId = data?.[0]?.tagId || 0;
        setNextTagId(highestTagId + 1);
      } catch (err) {
        console.error('Unexpected error:', err);
      }
    };

    fetchNextTagId();
  }, []);

  return (
    <div className="next-tag-id">
      <p>Next Tag ID: {nextTagId !== null ? nextTagId : 'Loading...'}</p>
    </div>
  );
};

export default NextTagId;