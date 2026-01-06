import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/Profile.css';

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [myReels, setMyReels] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null); 
  
  // Initial State (Will be replaced by Real Data)
  const [profile, setProfile] = useState({
    businessName: "Loading...",
    address: "...",
    avatar: "", 
    totalMeals: 0,
    customersServed: "-"
  });

  // --- FETCH REAL DATA ---
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // 1. Fetch User Details (Name, Address, etc.)
        // This requires the '/me' route we created earlier
       if (savedUser) {
    setProfile(prev => ({
        ...prev,
        businessName: savedUser.name,
        address: savedUser.address || "Gujarat, India",
        avatar: savedUser.profileImage || ""
    }));
}
        // 2. Fetch User's Videos
        const foodRes = await axios.get('http://localhost:3000/api/food', {
          withCredentials: true 
        });

        const realFoods = foodRes.data.foods || foodRes.data || [];

        setMyReels(realFoods);
        setLoading(false);

      } catch (error) {
        console.error("Error fetching data:", error);
      
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const closePixel = () => setSelectedVideo(null);

  // Helper to get initials if no image (e.g., "Pizza Palace" -> "P")
  const getInitials = (name) => name ? name.charAt(0).toUpperCase() : "B";

  return (
    <div className="profile-page">
      <div className="profile-card">
        
        {/* --- Top Section: Avatar & Info Buttons --- */}
        <div className="profile-header-section">
          
          {/* Left: Avatar Circle */}
          <div className="avatar-container">
            <div className="avatar-circle">
               {profile.avatar ? (
                 <img src={profile.avatar} alt="profile" />
               ) : (
                 // Show First Letter of Business Name if no image
                 <span>{getInitials(profile.businessName)}</span>
               )}
            </div>
          </div>

          {/* Right: Info Buttons (Now displaying REAL Name & Address) */}
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
            <span className="stat-label">customers served</span>
            <span className="stat-number">{profile.customersServed}</span>
          </div>
        </div>

        {/* Divider Line */}
        <div className="section-divider"></div>

        {/* --- Bottom Section: Video Grid --- */}
        <div className="instagram-grid">
          {loading ? (
            <p style={{textAlign:'center', width:'100%', padding:'20px'}}>Loading...</p>
          ) : (
            myReels.map((reel, index) => (
              <div 
                key={reel._id || index} 
                className="grid-box" 
                onClick={() => setSelectedVideo(reel)}
              >
                {/* Check if reel has a Video URL */}
                {reel.Video ? (
                  <>
                    <video src={reel.Video} className="grid-video" muted />
                    <div className="play-overlay">▶</div>
                  </>
                ) : (
                  // Fallback if video is missing
                  <span className="placeholder-text">No Video</span>
                )}
              </div>
            ))
          )}
        </div>

      </div>

      {/* --- Modal Popup --- */}
      {selectedVideo && (
        <div className="video-modal-overlay" onClick={closePixel}>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
             <button className="close-btn" onClick={closePixel}>&times;</button>
             
             {/* Full Player */}
             <video 
                src={selectedVideo.Video} 
                controls 
                autoPlay 
                className="full-video"
             />
             
             <div className="modal-info">
                <h3>{selectedVideo.name}</h3>
                <p>{selectedVideo.description}</p>
                {selectedVideo.price && (
                   <span style={{color: 'var(--primary-color)', fontWeight:'bold'}}>
                     ₹{selectedVideo.price}
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