import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MobileFooter from '../../components/MobileFooter';
import '../../styles/EditFoodPartnerProfile.css';

function EditFoodPartnerProfile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    customersServed: '0'
  });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/auth/me', {
          withCredentials: true
        });
        const profile = response.data;
        setFormData({
          name: profile.name || '',
          address: profile.address || '',
          customersServed: String(profile.customersServed || 0)
        });
        setPreviewImage(profile.profileImage || '');
      } catch (err) {
        const msg = err.response?.data?.message || 'Failed to load profile';
        setError(msg);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0] || null;
    setProfileImage(file);
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      setSaving(true);
      const payload = new FormData();
      payload.append('name', formData.name);
      payload.append('address', formData.address);
      payload.append('customersServed', formData.customersServed);
      if (profileImage) payload.append('profileImage', profileImage);

      const response = await axios.put('http://localhost:3000/api/auth/foodpartner/profile', payload, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      const updated = response.data.foodpatner;
      localStorage.setItem('foodPartnerProfile', JSON.stringify({
        id: updated._id,
        name: updated.name,
        email: updated.email,
        address: updated.address,
        profileImage: updated.profileImage
      }));
      setMessage('Profile updated successfully');
      setTimeout(() => navigate('/foodpartner/profile'), 700);
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to update profile';
      setError(msg);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <>
        <div className="edit-profile-page">
          <div className="edit-profile-card">Loading...</div>
        </div>
        <MobileFooter />
      </>
    );
  }

  return (
    <>
      <div className="edit-profile-page">
        <div className="edit-profile-card">
          <div className="edit-profile-head">
            <h2>Edit Profile</h2>
            <p>Update your business details</p>
          </div>

          {error && <div className="edit-error">{error}</div>}
          {message && <div className="edit-success">{message}</div>}

          <form onSubmit={handleSubmit} className="edit-profile-form">
            <div className="avatar-edit-wrap">
              <div className="avatar-preview">
                {previewImage ? (
                  <img src={previewImage} alt="Profile" />
                ) : (
                  <span>{formData.name?.charAt(0)?.toUpperCase() || 'P'}</span>
                )}
              </div>
              <input type="file" accept="image/*" onChange={handleImageChange} />
            </div>

            <input
              type="text"
              name="name"
              placeholder="Business Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Business Address"
              value={formData.address}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              min="0"
              name="customersServed"
              placeholder="Customers Served"
              value={formData.customersServed}
              onChange={handleChange}
              required
            />

            <div className="edit-actions">
              <button type="submit" disabled={saving}>
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
              <button type="button" className="ghost-btn" onClick={() => navigate('/foodpartner/profile')}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      <MobileFooter />
    </>
  );
}

export default EditFoodPartnerProfile;
