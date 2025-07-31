'use client';

import React, { useState } from 'react';
import '../../../styles/admin.css';
import AddNew from '../../../components/admin/AddNew';

export default function ProductionEdit() {
  const [activeComponent, setActiveComponent] = useState<'add' | 'edit'>('add');

  return (
    <div className="production-page">
      <header className="production-header">
        <h1>Inventory Manager</h1>
      </header>
      <div className="toggle-switch">
        <button
          className={`toggle-button ${activeComponent === 'add' ? 'active' : ''}`}
          onClick={() => setActiveComponent('add')}
        >
          Add New
        </button>
        <button
          className={`toggle-button ${activeComponent === 'edit' ? 'active' : ''}`}
          onClick={() => setActiveComponent('edit')}
        >
          Edit Existing
        </button>
      </div>
      <div className="component-container">
        {activeComponent === 'add' ? <AddNew /> : <p>Edit Existing Component Coming Soon</p>}
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
      `}</style>
    </div>
  );
}