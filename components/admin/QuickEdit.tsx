'use client';

import React, { useState } from 'react';
import '../../styles/inventoryform.css';
import { supabase } from '../../lib/supabase';

const QuickEdit: React.FC = () => {
  const [searchTag, setSearchTag] = useState('');
  const [formData, setFormData] = useState<any>(null);
  const [submitResult, setSubmitResult] = useState<{ message: string; isError: boolean } | null>(null);

  const handleSearch = async () => {
    const { data, error } = await supabase
      .from('production')
      .select('has_panels, seam_ripped, embroidered, sewn, patch, done')
      .eq('tagId', searchTag)
      .single();

    if (error) {
      console.error('Error fetching data:', error.message);
      alert('No pair found with the provided Tag ID.');
    } else {
      setFormData(data);
    }
  };

  const handleCheckboxChange = (field: string, checked: boolean) => {
    setFormData((prev: any) => ({ ...prev, [field]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase
      .from('production')
      .update(formData)
      .eq('tagId', searchTag);

    if (error) {
      setSubmitResult({ message: `Error: ${error.message}`, isError: true });
    } else {
      setSubmitResult({ message: 'Successfully updated the row!', isError: false });
      setTimeout(() => setSubmitResult(null), 2000); // Reset after 2 seconds
    }
  };

  return (
    <div className="quick-edit">
      <header className="sticky-header">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by Tag ID"
            value={searchTag}
            onChange={(e) => setSearchTag(e.target.value)}
          />
          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
        </div>
      </header>

      {formData && (
        <form className="quick-edit-form" onSubmit={handleSubmit}>
          <div className="checkbox-grid">
          {Object.entries(formData).map(([key, value]) => (
            <div key={key} className="form-group">
              <label htmlFor={key}>{key.replace(/_/g, ' ')}</label>
              <input
                type="checkbox"
                id={key}
                name={key}
                checked={typeof value === 'boolean' ? value : false} // Ensure value is a boolean
                onChange={(e) => handleCheckboxChange(key, e.target.checked)}
              />
            </div>
          ))}
          </div>
          <button type="submit" className="submit-button">Update</button>
          {submitResult && (
            <p
              className={`submit-result ${
                submitResult.isError ? 'error' : 'success'
              }`}
            >
              {submitResult.message}
            </p>
          )}
        </form>
      )}
    </div>
  );
};

export default QuickEdit;