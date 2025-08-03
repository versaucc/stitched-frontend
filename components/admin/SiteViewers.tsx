'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

const SiteViewers: React.FC = () => {
  const [viewerCount, setViewerCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchViewerCount = async () => {
      try {
        const { data, error } = await supabase
          .from('page_views')
          .select('ip_address'); // Select IP addresses

        if (error) {
          console.error('Error fetching viewer count:', error.message);
          return;
        }

        // Get unique IPs using a Set
        const uniqueIPs = new Set(data.map((item) => item.ip_address));
        setViewerCount(uniqueIPs.size); // Count unique IPs
      } catch (err) {
        console.error('Unexpected error fetching viewer count:', err);
      }
    };

    fetchViewerCount();
  }, []);

  return (
    <div className="site-viewers">
      <h2>Current Site Viewers</h2>
      <p>{viewerCount !== null ? viewerCount : 'Loading...'}</p>
    </div>
  );
};

export default SiteViewers;