import React from 'react';
import { useNavigate } from 'react-router-dom';

const VideoReel = ({ videoSrc, shopId, description, shopName, foodId, canOrder, onOrder }) => {
  const navigate = useNavigate();

  const handleVisitStore = () => {
    if (!shopId) return;
    navigate(`/profile/${shopId}`);
  };

  return (
    <div className="reel-card">
      <video className="reel-video" src={videoSrc} loop muted autoPlay playsInline />

      <div className="reel-overlay">
        <p className="reel-description">
          <strong style={{ fontSize: '1.1rem' }}>{shopName}</strong>
          <br />
          {description}
        </p>

        <div className="reel-actions">
          <button className="visit-store-btn" onClick={handleVisitStore} disabled={!shopId}>
            Visit Store &rarr;
          </button>
          {canOrder && (
            <button className="order-btn" onClick={() => onOrder?.(foodId)} disabled={!foodId}>
              Order Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoReel;
