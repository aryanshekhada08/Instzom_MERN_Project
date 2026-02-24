import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import MobileFooter from '../../components/MobileFooter';
import '../../styles/CreateFoodPatner.css';

const initialForm = {
  name: '',
  price: '',
  description: ''
};

function CreateFoodPatner() {
  const [formData, setFormData] = useState(initialForm);
  const [videoFile, setVideoFile] = useState(null);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState(null);

  const loadMyFoods = async () => {
    setFetching(true);
    setError('');
    try {
      const response = await axios.get('http://localhost:3000/api/food/my', {
        withCredentials: true
      });
      setFoods(response.data.foods || []);
    } catch (err) {
      const msg = err.response?.data?.message || 'Could not load your foods';
      setError(msg);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    loadMyFoods();
  }, []);

  const filteredFoods = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return foods;
    return foods.filter((food) =>
      `${food.name} ${food.description}`.toLowerCase().includes(q)
    );
  }, [foods, search]);

  const totalDishes = foods.length;
  const averagePrice = useMemo(() => {
    if (!foods.length) return 0;
    const total = foods.reduce((sum, item) => sum + Number(item.price || 0), 0);
    return Math.round(total / foods.length);
  }, [foods]);

  const resetForm = () => {
    setFormData(initialForm);
    setVideoFile(null);
    setEditingId(null);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    setVideoFile(e.target.files?.[0] || null);
  };

  const startEdit = (food) => {
    setError('');
    setMessage('');
    setEditingId(food._id);
    setFormData({
      name: food.name || '',
      price: String(food.price || ''),
      description: food.description || ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!editingId && !videoFile) {
      setError('Please select a video file');
      return;
    }

    try {
      setLoading(true);
      const payload = new FormData();
      payload.append('name', formData.name);
      payload.append('price', formData.price);
      payload.append('description', formData.description);
      if (videoFile) payload.append('video', videoFile);

      if (editingId) {
        const response = await axios.put(`http://localhost:3000/api/food/${editingId}`, payload, {
          withCredentials: true,
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        const updatedFood = response.data.food;
        setFoods((prev) => prev.map((item) => (item._id === updatedFood._id ? updatedFood : item)));
        setMessage('Dish updated successfully');
      } else {
        const response = await axios.post('http://localhost:3000/api/food', payload, {
          withCredentials: true,
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        const createdFood = response.data.food;
        setFoods((prev) => [createdFood, ...prev]);
        setMessage('Dish added successfully');
      }

      resetForm();
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to save dish';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (foodId) => {
    const ok = window.confirm('Delete this dish?');
    if (!ok) return;
    try {
      setError('');
      setMessage('');
      await axios.delete(`http://localhost:3000/api/food/${foodId}`, {
        withCredentials: true
      });
      setFoods((prev) => prev.filter((item) => item._id !== foodId));
      if (editingId === foodId) resetForm();
      setMessage('Dish deleted successfully');
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to delete food';
      setError(msg);
    }
  };

  return (
    <>
    <div className="create-food-page">
      <div className="create-food-card">
        <div className="manager-head">
          <h2>Food Manager</h2>
          <p className="create-food-subtitle">Add, edit and manage your dishes</p>
        </div>

        <div className="stats-grid">
          <div className="stat-box">
            <span>Total Dishes</span>
            <strong>{totalDishes}</strong>
          </div>
          <div className="stat-box">
            <span>Avg Price</span>
            <strong>Rs. {averagePrice}</strong>
          </div>
        </div>

        {error && <div className="create-food-error">{error}</div>}
        {message && <div className="create-food-success">{message}</div>}

        <form className="create-food-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <input
              type="text"
              name="name"
              placeholder="Dish name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              min="1"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          <textarea
            name="description"
            placeholder="Dish description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            required
          />
          <input type="file" accept="video/*" onChange={handleFileChange} />
          {editingId && (
            <p className="hint-text">
              Editing mode: video is optional. Upload only if you want to replace current video.
            </p>
          )}

          <div className="btn-row">
            <button type="submit" disabled={loading}>
              {loading ? 'Saving...' : editingId ? 'Update Dish' : 'Add Dish'}
            </button>
            {editingId && (
              <button type="button" className="ghost-btn" onClick={resetForm}>
                Cancel Edit
              </button>
            )}
          </div>
        </form>

        <div className="create-food-list">
          <div className="list-head">
            <h3>Your Dishes</h3>
            <input
              type="text"
              className="search-input"
              placeholder="Search dishes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {fetching ? (
            <p>Loading...</p>
          ) : filteredFoods.length === 0 ? (
            <p>No dishes found.</p>
          ) : (
            filteredFoods.map((food) => (
              <div className="dish-item" key={food._id}>
                <video src={food.Video} controls className="dish-video" />
                <div className="dish-meta">
                  <p className="dish-title">{food.name}</p>
                  <p className="dish-desc">{food.description}</p>
                  <p className="dish-price">Rs. {food.price}</p>
                </div>
                <div className="action-col">
                  <button type="button" className="edit-btn" onClick={() => startEdit(food)}>
                    Edit
                  </button>
                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => handleDelete(food._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
    <MobileFooter />
    </>
  );
}

export default CreateFoodPatner;
