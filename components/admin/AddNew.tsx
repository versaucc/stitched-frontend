import React from 'react';
import '../../styles/inventoryform.css';

const AddNew: React.FC = () => {
  return (
    <form className="add-new-form">
      <div className="form-group smallest">
        <label htmlFor="tag-id">*Tag ID*</label>
        <input type="text" id="tag-id" name="tag-id" required />
      </div>
      <div className="form-group small">
        <label htmlFor="wash">Wash</label>
        <input type="text" id="wash" name="wash" />
      </div>
      <div className="form-group smallest">
        <label htmlFor="size">Size</label>
        <input type="number" id="size" name="size" />
      </div>
        <div className="form-group small">
        <label htmlFor="brand">Brand</label>
        <input type="text" id="brand" name="brand" />
      </div>
        <div className="form-group medium">
        <label htmlFor="silhouette">Silhouette</label>
        <input type="text" id="silhouette" name="silhouette" />
      </div>
      <div className="form-group small">
        <label htmlFor="for-panels">For Panels</label>
        <select id="for-panels" name="for-panels" defaultValue="false">
          <option value="false">False</option>
          <option value="true">True</option>
        </select>
      </div>
      <div className="form-group small">
        <label htmlFor="for-scrap">For Scrap</label>
        <select id="for-scrap" name="for-scrap" defaultValue="false">
          <option value="false">False</option>
          <option value="true">True</option>
        </select>
      </div>
      <div className="form-group smallest">
        <label htmlFor="collection-id">Collection</label>
        <input type="text" id="collection-id" name="collection-id" />
      </div>
      <div className="form-group smallest">
        <label htmlFor="price">Price</label>
        <input type="number" id="price" name="price" step="0.01" />
      </div>
      <div className="form-group small">
        <label htmlFor="finished">Finished</label>
        <select id="finished" name="finished" defaultValue="false">
          <option value="false">False</option>
          <option value="true">True</option>
        </select>
      </div>
      <div className="form-group small">
        <label htmlFor="category">Category</label>
        <select id="category" name="category" defaultValue="pants">
          <option value="jeans">Jeans</option>
          <option value="jorts">Jorts</option>
          <option value="shirts">Shirts</option>
          <option value="pants">Pants</option>
        </select>
      </div>
      <div className="form-group medium">
        <label htmlFor="notes">Notes</label>
        <textarea id="notes" name="notes" rows={3} style={{ resize: 'none', overflow: 'hidden' }} />
      </div>
        <div className="form-group small">
        <label htmlFor="image">Image</label>
        <input type="file" id="image" name="image" accept="image/*" />
      </div>
      <button type="submit" className="submit-button">Add New</button>
    </form>
  );
};

export default AddNew;