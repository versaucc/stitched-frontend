'use client';

import React, { useState } from 'react';
import '../../styles/inventoryform.css';
import { supabase } from '../../lib/supabase';

const EditExisting: React.FC = () => {
  const [searchTag, setSearchTag] = useState('');
  const [formData, setFormData] = useState<any>(null);
  const [submitResult, setSubmitResult] = useState<{ message: string; isError: boolean } | null>(null);

  const handleSearch = async () => {
    const { data, error } = await supabase
      .from('production')
      .select('*')
      .eq('tagId', searchTag)
      .single();

    if (error) {
      console.error('Error fetching data:', error.message);
      alert('No pair found with the provided Tag ID.');
    } else {
      // Clean 'created_at' field before setting formData
      if (data?.created_at) {
        data.created_at = formatDate(data.created_at);
      }
      setFormData(data);
    }
  };

  const handleFieldChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { id, ...updatedData } = formData; // Exclude 'id' field from the update
    const { error } = await supabase
      .from('production')
      .update(updatedData)
      .eq('tagId', formData.tagId);

    if (error) {
      setSubmitResult({ message: `Error: ${error.message}`, isError: true });
    } else {
      setSubmitResult({ message: 'Successfully updated the row!', isError: false });
      setTimeout(() => setSubmitResult(null), 2000); // Reset after 2 seconds
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Intl.DateTimeFormat('en-US', options).format(date).replace(',', '');
  };

  return (
    <div className="edit-existing">
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
        <form className="add-new-form grid-form" onSubmit={handleSubmit}>
        {Object.entries(formData).map(([key, value]) => (
          key !== 'id' && ( // Ignore 'id' field
            <div key={key} className="form-group">
              <label htmlFor={key}>{key.replace(/_/g, ' ')}</label>
              <input
                type="text"
                id={key}
                name={key}
                value={typeof value === 'string' || typeof value === 'number' ? value : ''} // Ensure value is a string or number
                onChange={(e) => handleFieldChange(key, e.target.value)}
              />
            </div>
          )
        ))}
          <button type="submit" className="submit-button">Submit Changes</button>
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

export default EditExisting;