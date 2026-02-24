import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import MobileFooter from '../../components/MobileFooter';
import '../../styles/Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const canEdit = !id;

  const [loading, setLoading] = useState(true);
  const [myReels, setMyReels] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [profile, setProfile] = useState({
    businessName: '',
    address: '',
    avatar: '',
    totalMeals: 0,
    customersServed: 0
  });

  useEffect(() => {
    const fetchPartnerData = async () => {
      try {
        let partnerId = id;

        if (!partnerId) {
          try {
            const meRes = await axios.get('http://localhost:3000/api/auth/me', {
              withCredentials: true
            });
            partnerId = meRes.data?._id;
          } catch (authError) {
            const savedPartner = JSON.parse(localStorage.getItem('foodPartnerProfile') || 'null');
            partnerId = savedPartner?.id;
            if (!partnerId) {
              console.error('Could not resolve partner id from cookie or local storage', authError);
            }
          }
        }

        if (!partnerId) {
          setLoading(false);
          return;
        }

        const userRes = await axios.get(`http://localhost:3000/api/auth/foodpartner/${partnerId}`);
        const partner = userRes.data;

        const foodRes = await axios.get(`http://localhost:3000/api/food/user/${partnerId}`);
        const foods = foodRes.data.foods || [];

        setMyReels(foods);
        setProfile({
          businessName: partner.name,
          address: partner.address || 'Gujarat, India',
          avatar: partner.profileImage || '',
          totalMeals: Number(partner.totalMeals) || foods.length,
          customersServed: Number(partner.customersServed) || 0
        });
      } catch (error) {
        console.error('Error fetching partner profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPartnerData();
  }, [id]);

  const closePixel = () => setSelectedVideo(null);
  const getInitials = (name) => (name ? name.charAt(0).toUpperCase() : 'B');
  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:3000/api/auth/foodpartner/logout', {
        withCredentials: true
      });
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      localStorage.removeItem('foodPartnerProfile');
      navigate('/foodpartner/login');
    }
  };

  return (
    <>
      <div className="profile-page">
        <div className="profile-shell">
          <div className="profile-hero">
            <div className="hero-avatar-wrap">
              <div className="hero-avatar">
                {profile.avatar ? (
                  <img src={profile.avatar} alt="profile" />
                ) : (
                  <span>{getInitials(profile.businessName)}</span>
                )}
              </div>
            </div>

            <div className="hero-meta">
              <h2>{profile.businessName || 'Food Partner'}</h2>
              <p>{profile.address || 'Address not available'}</p>
            </div>

            {canEdit && (
              <div className="hero-actions">
                <button className="edit-profile-btn" onClick={() => navigate('/foodpartner/profile/edit')}>
                  Edit Profile
                </button>
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>

          <div className="stats-row modern">
            <div className="stat-card">
              <span className="stat-label">Total Meals</span>
              <span className="stat-number">{profile.totalMeals}</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Customers Served</span>
              <span className="stat-number">{profile.customersServed}</span>
            </div>
          </div>

          <div className="feed-head">
            <h3>Dishes</h3>
            <span>{myReels.length} items</span>
          </div>

          <div className="instagram-grid">
            {loading ? (
              <p className="grid-message">Loading...</p>
            ) : myReels.length === 0 ? (
              <p className="grid-message">No videos found for this profile.</p>
            ) : (
              myReels.map((reel, index) => (
                <div
                  key={reel._id || index}
                  className="grid-box"
                  onClick={() => setSelectedVideo(reel)}
                >
                  {reel.Video ? (
                    <>
                      <video src={reel.Video} className="grid-video" muted />
                      <div className="play-overlay">Play</div>
                    </>
                  ) : (
                    <span className="placeholder-text">No Video</span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {selectedVideo && (
          <div className="video-modal-overlay" onClick={closePixel}>
            <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="close-btn" onClick={closePixel}>
                &times;
              </button>
              <video src={selectedVideo.Video} controls autoPlay className="full-video" />
              <div className="modal-info">
                <h3>{selectedVideo.name}</h3>
                <p>{selectedVideo.description}</p>
                {selectedVideo.price && (
                  <span className="modal-price">Rs. {selectedVideo.price}</span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <MobileFooter />
    </>
  );
};

export default Profile;
