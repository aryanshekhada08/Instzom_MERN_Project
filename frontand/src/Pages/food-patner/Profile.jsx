import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/Profile.css';

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [myReels, setMyReels] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null); 
  
  // Profile State with Dummy Data fallback
  const [profile, setProfile] = useState({
    businessName: "My Business Name",
    address: "123 Main Street, City",
    avatar: "", 
    totalMeals: 43,
    customersServed: "15K"
  });

  // Fetch Data (Simulated for layout demo)
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/food', {
          withCredentials: true 
        });

        // Use real data if available, otherwise use dummy array of 9 items for grid
        const allFoods = response.data.foods || response.data || [];
        
        // If no data, create 9 dummy items to match your image layout
        const displayReels = allFoods.length > 0 ? allFoods : Array.from({ length: 9 });

        setMyReels(displayReels);
        setLoading(false);

      } catch (error) {
        console.error("Error fetching profile:", error);
        // Fallback to dummy data on error
        setMyReels(Array.from({ length: 9 }));
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const closePixel = () => setSelectedVideo(null);

  return (
    <div className="profile-page">
      <div className="profile-card">
        
        {/* --- Top Section: Avatar & Info Buttons --- */}
        <div className="profile-header-section">
          
          {/* Left: Avatar Circle */}
          <div className="avatar-container">
            <div className="avatar-circle">
               {profile.avatar ? <img src={profile.avatar} alt="profile" /> : <span>MB</span>}
            </div>
          </div>

          {/* Right: Info Buttons */}
          <div className="info-actions">
            <div className="info-badge">{profile.businessName}</div>
            <div className="info-badge">{profile.address}</div>
          </div>
        </div>

        {/* --- Middle Section: Stats --- */}
        <div className="stats-row">
          <div className="stat-item">
            <span className="stat-label">total meals</span>
            <span className="stat-number">{profile.totalMeals}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">customer serve</span>
            <span className="stat-number">{profile.customersServed}</span>
          </div>
        </div>

        {/* Divider Line */}
        <div className="section-divider"></div>

        {/* --- Bottom Section: 3-Column Video Grid --- */}
        <div className="instagram-grid">
          {myReels.map((reel, index) => (
            <div 
              key={reel?._id || index} 
              className="grid-box" 
              onClick={() => reel?._id && setSelectedVideo(reel)}
            >
              {reel?.Video ? (
                <>
                  <video src={reel.Video} className="grid-video" muted />
                  <div className="play-overlay">▶</div>
                </>
              ) : (
                <span className="placeholder-text">video</span>
              )}
            </div>
          ))}
        </div>

      </div>

      {/* --- Modal Popup (Same as before) --- */}
      {selectedVideo && (
        <div className="video-modal-overlay" onClick={closePixel}>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
             <button className="close-btn" onClick={closePixel}>&times;</button>
             <video src={selectedVideo.Video} controls autoPlay className="full-video"/>
             <div className="modal-info">
                <h3>{selectedVideo.name}</h3>
                <p>{selectedVideo.description}</p>
             </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Profile;