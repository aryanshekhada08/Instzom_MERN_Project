import React from 'react';

const VideoReel = ({ videoSrc, description, shopName }) => {
  return (
    <div className="reel-card">
      {/* The Video */}
      <video 
        className="reel-video"
        src={videoSrc}
        loop 
        muted 
        autoPlay // Simple autoplay (Advanced: use IntersectionObserver)
        playsInline // Required for mobile
      />

      {/* The UI Overlay */}
      <div className="reel-overlay">
        {/* 1. Truncated Description */}
        <p className="reel-description">
          <strong style={{fontSize: '1.1rem'}}>{shopName}</strong><br/>
          {description}
        </p>

        {/* 2. Visit Store Button */}
        <button className="visit-store-btn" onClick={() => alert("Redirecting to " + shopName)}>
          Visit Store &rarr;
        </button>
      </div>
    </div>
  );
};

export default VideoReel;