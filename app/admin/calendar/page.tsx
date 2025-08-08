'use client';

import React, { useState } from 'react';

export default function CalendarPage() {
  const [view, setView] = useState<'day' | 'week' | 'month' | 'year'>('month');

  return (
    <div className="calendar-page">
      <header className="calendar-header">
        <h1>Calendar</h1>
        <div className="view-toggle">
          <button
            className={`toggle-button ${view === 'day' ? 'active' : ''}`}
            onClick={() => setView('day')}
          >
            Day
          </button>
          <button
            className={`toggle-button ${view === 'week' ? 'active' : ''}`}
            onClick={() => setView('week')}
          >
            Week
          </button>
          <button
            className={`toggle-button ${view === 'month' ? 'active' : ''}`}
            onClick={() => setView('month')}
          >
            Month
          </button>
          <button
            className={`toggle-button ${view === 'year' ? 'active' : ''}`}
            onClick={() => setView('year')}
          >
            Year
          </button>
        </div>
      </header>

      <main className="calendar-content">
        <p>Currently viewing: {view}</p>
        {/* Placeholder for calendar content */}
        <div className="calendar-placeholder">
          <p>Calendar content for {view} view will go here.</p>
        </div>
      </main>

      <style jsx>{`
        .calendar-page {
          padding: 1rem;
          background: #f5f5f5;
          min-height: 100vh;
        }

        .calendar-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 2rem;
        }

        .calendar-header h1 {
          font-size: 2rem;
          margin-bottom: 1rem;
        }

        .view-toggle {
          display: flex;
          gap: 0.5rem;
        }

        .toggle-button {
          padding: 0.5rem 1rem;
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

        .calendar-content {
          text-align: center;
        }

        .calendar-placeholder {
          margin-top: 2rem;
          padding: 1rem;
          border: 1px dashed #ccc;
          background: #fff;
        }
      `}</style>
    </div>
  );
}