import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../../styles/Profile.css';

const Profile = () => {
  const { id } = useParams();

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

        const userRes = await axios.get(
          `http://localhost:3000/api/auth/foodpartner/${partnerId}`
        );
        const partner = userRes.data;

        setProfile({
          businessName: partner.name,
          address: partner.address || 'Gujarat, India',
          avatar: partner.profileImage || '',
          totalMeals: partner.totalMeals || 0,
          customersServed: partner.customersServed || 0
        });

        const foodRes = await axios.get(
          `http://localhost:3000/api/food/user/${partnerId}`
        );
        const foods = foodRes.data.foods || [];
        setMyReels(foods);
        setProfile((prev) => ({
          ...prev,
          totalMeals: Number(partner.totalMeals) || foods.length,
          customersServed: Number(partner.customersServed) || 0
        }));
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

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-header-section">
          <div className="avatar-container">
            <div className="avatar-circle">
              {profile.avatar ? (
                <img src={profile.avatar} alt="profile" />
              ) : (
                <span>{getInitials(profile.businessName)}</span>
              )}
            </div>
          </div>

          <div className="info-actions">
            <div className="info-badge">{profile.businessName}</div>
            <div className="info-badge">{profile.address}</div>
          </div>
        </div>

        <div className="stats-row">
          <div className="stat-item">
            <span className="stat-label">Total Meals</span>
            <span className="stat-number">{profile.totalMeals}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Customers Served</span>
            <span className="stat-number">{profile.customersServed}</span>
          </div>
        </div>

        <div className="section-divider"></div>

        <div className="instagram-grid">
          {loading ? (
            <p style={{ textAlign: 'center', width: '100%', padding: '20px' }}>Loading...</p>
          ) : myReels.length === 0 ? (
            <p style={{ textAlign: 'center', width: '100%', padding: '20px' }}>
              No videos found for this profile.
            </p>
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
                <span style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>
                  Rs. {selectedVideo.price}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
