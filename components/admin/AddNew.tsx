'use client';

import React, { useState } from 'react';
import '../../styles/inventoryform.css';
import { supabase } from '../../lib/supabase';

const AddNew: React.FC = () => {
  const [formData, setFormData] = useState({
    tagId: '',
    silhouette: '',
    waist: '',
    inseam: '',
    wash: '',
    brand: '',
    using: false,
    donor: false,
    scrap: false,
    collection: '',
    category: '',
    price: '',
    finished: false,
    notes: '',
    image: '',
    embroideries: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value, // Narrow type for checkbox
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('production').insert({
      tagId: formData.tagId,
      silhouette: formData.silhouette,
      waist: formData.waist ? parseInt(formData.waist) : null,
      inseam: formData.inseam ? parseInt(formData.inseam) : null,
      wash: formData.wash,
      brand: formData.brand,
      using: formData.using,
      donor: formData.donor,
      scrap: formData.scrap,
      collection: formData.collection,
      category: formData.category,
      price: formData.price ? parseFloat(formData.price) : null,
      finished: formData.finished,
      notes: formData.notes,
      image: formData.image,
      embroideries: formData.embroideries, 
    });

    if (error) {
      console.error('Error inserting data:', error.message);
    } else {
      alert('Data added successfully!');
      setFormData({
        tagId: '',
        silhouette: '',
        waist: '',
        inseam: '',
        wash: '',
        brand: '',
        using: false,
        donor: false,
        scrap: false,
        collection: '',
        category: '',
        price: '',
        finished: false,
        notes: '',
        image: '',
        embroideries: '', 
      });
    }
  };

  return (
    <form className="add-new-form" onSubmit={handleSubmit}>
      <div className="form-group smallest">
        <label htmlFor="tagId">Tag ID</label>
        <input type="text" id="tagId" name="tagId" value={formData.tagId} onChange={handleChange} required />
      </div>
      <div className="form-group medium">
        <label htmlFor="silhouette">Silhouette</label>
        <input type="text" id="silhouette" name="silhouette" value={formData.silhouette} onChange={handleChange} />
      </div>
      <div className="form-group small">
        <label htmlFor="waist">Waist</label>
        <input type="number" id="waist" name="waist" value={formData.waist} onChange={handleChange} />
      </div>
      <div className="form-group small">
        <label htmlFor="inseam">Inseam</label>
        <input type="number" id="inseam" name="inseam" value={formData.inseam} onChange={handleChange} />
      </div>
      <div className="form-group small">
        <label htmlFor="wash">Wash</label>
        <input type="text" id="wash" name="wash" value={formData.wash} onChange={handleChange} />
      </div>
      <div className="form-group small">
        <label htmlFor="brand">Brand</label>
        <input type="text" id="brand" name="brand" value={formData.brand} onChange={handleChange} />
      </div>
      <div className="form-group small">
        <label htmlFor="using">Using</label>
        <select id="using" name="using" value={formData.using.toString()} onChange={handleChange}>
          <option value="false">False</option>
          <option value="true">True</option>
        </select>
      </div>
      <div className="form-group small">
        <label htmlFor="donor">Donor</label>
        <select id="donor" name="donor" value={formData.donor.toString()} onChange={handleChange}>
          <option value="false">False</option>
          <option value="true">True</option>
        </select>
      </div>
      <div className="form-group small">
        <label htmlFor="scrap">Scrap</label>
        <select id="scrap" name="scrap" value={formData.scrap.toString()} onChange={handleChange}>
          <option value="false">False</option>
          <option value="true">True</option>
        </select>
      </div>
        <div className="form-group medium">
        <label htmlFor="embroideries">Embroideries</label>
        <textarea id="embroideries" name="embroideries" value={formData.embroideries} onChange={handleChange} />
      </div>
      <div className="form-group small">
        <label htmlFor="collection">Collection</label>
        <input type="text" id="collection" name="collection" value={formData.collection} onChange={handleChange} />
      </div>
      <div className="form-group small">
        <label htmlFor="category">Category</label>
        <input type="text" id="category" name="category" value={formData.category} onChange={handleChange} />
      </div>
      <div className="form-group small">
        <label htmlFor="price">Price</label>
        <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} />
      </div>
      <div className="form-group small">
        <label htmlFor="finished">Finished</label>
        <select id="finished" name="finished" value={formData.finished.toString()} onChange={handleChange}>
          <option value="false">False</option>
          <option value="true">True</option>
        </select>
      </div>
      <div className="form-group medium">
        <label htmlFor="notes">Notes</label>
        <textarea id="notes" name="notes" value={formData.notes} onChange={handleChange} />
      </div>
      <div className="form-group medium">
        <label htmlFor="image">Image</label>
        <input type="text" id="image" name="image" value={formData.image} onChange={handleChange} />
      </div>
      <button type="submit" className="submit-button">Add New</button>
    </form>
  );
};

export default AddNew;