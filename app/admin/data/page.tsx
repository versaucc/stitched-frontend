'use client';

import React, { useState } from 'react';

export default function DataDashboard() {
  const [activeView, setActiveView] = useState<'web-traffic' | 'ask-chat' | 'economy'>('web-traffic');

  return (
    <div className="production-page">
      <header className="production-header">
        <h2>Analytics Dashboard</h2>
      </header>

      <div className="toggle-switch">
        <button
          className={`toggle-button ${activeView === 'web-traffic' ? 'active' : ''}`}
          onClick={() => setActiveView('web-traffic')}
        >
          Web Traffic
        </button>
        <button
          className={`toggle-button ${activeView === 'ask-chat' ? 'active' : ''}`}
          onClick={() => setActiveView('ask-chat')}
        >
          Ask Chat
        </button>
        <button
          className={`toggle-button ${activeView === 'economy' ? 'active' : ''}`}
          onClick={() => setActiveView('economy')}
        >
          Economy
        </button>
      </div>

      <div className="component-container">
        {activeView === 'web-traffic' && (
          <div className="production-card">
            <h2 className="text-center">Web Traffic</h2>
            <p>Example analytics for web traffic will go here.</p>
          </div>
        )}

        {activeView === 'ask-chat' && (
          <div className="production-card">
            <h2 className="text-center">Ask Chat</h2>
            <p>Example analytics for chat interactions will go here.</p>
          </div>
        )}

        {activeView === 'economy' && (
          <div className="production-card">
            <h2 className="text-center">Economy</h2>
            <p>Example analytics for economic data will go here.</p>
          </div>
        )}
      </div>

      <style jsx>{`
        .toggle-switch {
          display: flex;
          justify-content: center;
          margin: 2rem 0;
        }
        .toggle-button {
          padding: 0.5rem 1rem;
          margin: 0 0.5rem;
          border: 1px solid #a20024;
          background: black;
          color: white;
          cursor: pointer;
          border-radius: 0.375rem;
        }
        .toggle-button.active {
          background: #a20024;
          color: white;
        }
        .component-container {
          display: flex;
          justify-content: center;
          width: 100%;
        }
        .production-card {
          padding: 1rem;
          background: #1a1919;
          color: white;
          border-radius: 0.5rem;
          box-shadow: 0 1px 2px rgba(143, 126, 126, 0.05);
          text-align: center;
          width: 80%;
        }
        .production-card h2 {
          font-size: 1.25rem;
          margin-bottom: 1rem;
        }
        .production-card p {
          font-size: 0.875rem;
        }
      `}</style>
    </div>
  );
}