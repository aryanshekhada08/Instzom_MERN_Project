import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MobileFooter from '../../components/MobileFooter';
import '../../styles/UserPages.css';

function UserAccount() {
  const navigate = useNavigate();
  const savedUser = JSON.parse(localStorage.getItem('userProfile') || 'null');

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:3000/api/auth/user/logout', {
        withCredentials: true
      });
    } catch (error) {
      console.error('User logout failed:', error);
    } finally {
      localStorage.removeItem('userProfile');
      navigate('/user/login');
    }
  };

  return (
    <>
      <div className="user-page">
        <div className="user-card">
          <h2>My Account</h2>
          <p className="user-subtitle">Profile details for your user account.</p>

          <div className="account-row">
            <span>Name</span>
            <strong>{savedUser?.fullName || 'User'}</strong>
          </div>
          <div className="account-row">
            <span>Email</span>
            <strong>{savedUser?.email || '-'}</strong>
          </div>

          <button className="user-logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
      <MobileFooter />
    </>
  );
}

export default UserAccount;
