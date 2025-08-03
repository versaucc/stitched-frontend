'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

const SiteViewers: React.FC = () => {
  const [viewerCount, setViewerCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchViewerCount = async () => {
      const { data, error } = await supabase
        .from('page_views')
        .select('ip_address', { count: 'exact', distinct: true });

      if (error) {
        console.error('Error fetching viewer count:', error.message);
      } else {
        setViewerCount(data.length);
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