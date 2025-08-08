'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

// Function to log viewer data to Supabase
const logViewerData = async () => {
  try {
    const url = window.location.href; // Current page URL
    const ipAddress = await fetch('https://api.ipify.org?format=json')
      .then((res) => res.json())
      .then((data) => data.ip)
      .catch(() => 'unknown'); // Fetch IP address

    const userAgent = navigator.userAgent; // User agent string

    const { error } = await supabase.from('page_views').insert([
      {
        url,
        ip_address: ipAddress,
        user_agent: userAgent,
      },
    ]);

    if (error) {
      console.error('Error logging viewer data:', error.message);
    }
  } catch (err) {
    console.error('Unexpected error logging viewer data:', err);
  }
};

// Function to fetch current viewers
const fetchCurrentViewers = async () => {
  try {
    const { data, error } = await supabase
      .from('page_views')
      .select('ip_address, url'); // Select IP addresses and URLs

    if (error) {
      console.error('Error fetching viewer data:', error.message);
      return [];
    }

    // Use a Set to get unique IPs
    const uniqueViewers = data || [];
    return uniqueViewers;
  } catch (err) {
    console.error('Unexpected error fetching viewer data:', err);
    return [];
  }
};

const SiteViewers: React.FC = () => {
  const [viewerData, setViewerData] = useState<{ ip_address: string; url: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Log viewer data when the component mounts
    logViewerData();

    // Fetch current viewers
    const fetchData = async () => {
      const viewers = await fetchCurrentViewers();
      setViewerData(viewers);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="site-viewers">
      <h2>Current Site Viewers</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <p><strong>Total Viewers:</strong> {viewerData.length}</p>
          <div className="viewer-list">
            {viewerData.map((viewer, index) => (
              <div key={index} className="viewer-item">
                <p><strong>IP:</strong> {viewer.ip_address}</p>
                <p><strong>URL:</strong> {viewer.url}</p>
              </div>
            ))}
          </div>
        </>
      )}

      <style jsx>{`
        .site-viewers {
          padding: 1rem;
          background: #1a1919;
          color: white;
          border-radius: 0.5rem;
          box-shadow: 0 1px 2px rgba(143, 126, 126, 0.05);
          max-height: 300px; /* Limit height */
          overflow-y: auto; /* Enable scrolling */
        }

        .viewer-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .viewer-item {
          padding: 0.5rem;
          border: 1px solid #a20024;
          border-radius: 0.375rem;
          background: black;
        }

        .viewer-item p {
          margin: 0;
          font-size: 0.875rem;
        }
      `}</style>
    </div>
  );
};

export default SiteViewers;