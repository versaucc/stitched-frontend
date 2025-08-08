'use client';

import React, { useState } from 'react';

export default function ProductPage() {
  const [activeCard, setActiveCard] = useState<'publish' | 'inventory'>('publish');

  return (
    <div className="production-page">
      <header className="production-header">
        <h2>Product Manager</h2>
      </header>

      <div className="toggle-switch">
        <button
          className={`toggle-button ${activeCard === 'publish' ? 'active' : ''}`}
          onClick={() => setActiveCard('publish')}
        >
          Publish Product
        </button>
        <button
          className={`toggle-button ${activeCard === 'inventory' ? 'active' : ''}`}
          onClick={() => setActiveCard('inventory')}
        >
          Add to Inventory
        </button>
      </div>

      <div className="component-container">
        {activeCard === 'publish' && (
          <div className="production-card">
            <h2 className="text-center">Publish Product</h2>
            <form className="publish-form">
              <div className="form-group">
                <label htmlFor="product-name">Product Name</label>
                <input type="text" id="product-name" placeholder="Enter product name" />
              </div>
              <div className="form-group">
                <label htmlFor="product-description">Description</label>
                <textarea id="product-description" placeholder="Enter product description"></textarea>
              </div>
              <button type="submit" className="submit-button">
                Publish
              </button>
            </form>
          </div>
        )}

        {activeCard === 'inventory' && (
          <div className="production-card">
            <h2 className="text-center">Add Product to Inventory</h2>
            <form className="inventory-form">
              <div className="form-group">
                <label htmlFor="inventory-name">Product Name</label>
                <input type="text" id="inventory-name" placeholder="Enter product name" />
              </div>
              <div className="form-group">
                <label htmlFor="inventory-quantity">Quantity</label>
                <input type="number" id="inventory-quantity" placeholder="Enter quantity" />
              </div>
              <button type="submit" className="submit-button">
                Add to Inventory
              </button>
            </form>
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
        .publish-form,
        .inventory-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .form-group {
          display: flex;
          flex-direction: column;
        }
        .form-group label {
          font-size: 0.875rem;
          margin-bottom: 0.25rem;
        }
        .form-group input,
        .form-group textarea {
          padding: 0.5rem;
          border: 2px solid #a20024;
          border-radius: 0.375rem;
          background: black;
          color: white;
          font-size: 0.875rem;
        }
        .submit-button {
          padding: 0.5rem 1rem;
          background: #a20024;
          color: white;
          border: none;
          border-radius: 0.375rem;
          cursor: pointer;
        }
        .submit-button:hover {
          background: #00872d;
        }
      `}</style>
    </div>
  );
}