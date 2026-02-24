import React from 'react';
import MobileFooter from '../../components/MobileFooter';
import '../../styles/UserPages.css';

function UserOrders() {
  return (
    <>
      <div className="user-page">
        <div className="user-card">
          <h2>Your Orders</h2>
          <p className="user-subtitle">Track your recent and upcoming orders.</p>

          <div className="empty-state">
            <h3>No orders yet</h3>
            <p>Your placed orders will appear here.</p>
          </div>
        </div>
      </div>
      <MobileFooter />
    </>
  );
}

export default UserOrders;
