import React from 'react';
import { useNavigate } from 'react-router-dom';

const VideoReel = ({ videoSrc, shopId, description, shopName }) => {
  // 👇 MOVED INSIDE THE COMPONENT
  const navigate = useNavigate();

  const handleVisitStore = () => {
    // Navigate to a dynamic URL using the ID
    navigate(`/profile/${shopId}`); 
  };

  return (
    <div className="reel-card">
      {/* The Video */}
      <video 
        className="reel-video"
        src={videoSrc}
        loop 
        muted 
        autoPlay 
        playsInline 
      />

      {/* The UI Overlay */}
      <div className="reel-overlay">
        {/* 1. Truncated Description */}
        <p className="reel-description">
          <strong style={{fontSize: '1.1rem'}}>{shopName}</strong><br/>
          {description}
        </p>

        {/* 2. Visit Store Button */}
        <button className="visit-store-btn" onClick={handleVisitStore}>
           Visit Store &rarr;
        </button>
      </div>
    </div>
  );
};

export default VideoReel;