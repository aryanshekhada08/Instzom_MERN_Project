import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/MobileFooter.css';

function MobileFooter() {
  const location = useLocation();
  const pathname = location.pathname;
  const hasPartner = Boolean(localStorage.getItem('foodPartnerProfile'));
  const hasUser = Boolean(localStorage.getItem('userProfile'));
  const role = hasPartner ? 'partner' : hasUser ? 'user' : 'guest';

  const isHome = pathname === '/';
  const isManage = pathname === '/create-food';
  const isPartnerProfile = pathname.startsWith('/foodpartner/profile') || pathname.startsWith('/profile/');
  const isOrders = pathname === '/user/orders';
  const isUserAccount = pathname === '/user/account';
  const isUserLogin = pathname === '/user/login' || pathname === '/user/register';
  const isPartnerLogin = pathname === '/foodpartner/login' || pathname === '/foodpartner/register';

  return (
    <nav className="mobile-footer" aria-label="Bottom navigation">
      {role === 'partner' ? (
        <>
          <Link to="/" className={`footer-link ${isHome ? 'active' : ''}`}>
            <span className="footer-label">Home</span>
          </Link>
          <Link to="/create-food" className={`footer-link ${isManage ? 'active' : ''}`}>
            <span className="footer-label">Manage</span>
          </Link>
          <Link to="/foodpartner/profile" className={`footer-link ${isPartnerProfile ? 'active' : ''}`}>
            <span className="footer-label">Profile</span>
          </Link>
        </>
      ) : role === 'user' ? (
        <>
          <Link to="/" className={`footer-link ${isHome ? 'active' : ''}`}>
            <span className="footer-label">Home</span>
          </Link>
          <Link to="/user/orders" className={`footer-link ${isOrders ? 'active' : ''}`}>
            <span className="footer-label">Orders</span>
          </Link>
          <Link to="/user/account" className={`footer-link ${isUserAccount ? 'active' : ''}`}>
            <span className="footer-label">Account</span>
          </Link>
        </>
      ) : (
        <>
          <Link to="/" className={`footer-link ${isHome ? 'active' : ''}`}>
            <span className="footer-label">Home</span>
          </Link>
          <Link to="/user/login" className={`footer-link ${isUserLogin ? 'active' : ''}`}>
            <span className="footer-label">User Login</span>
          </Link>
          <Link to="/foodpartner/login" className={`footer-link ${isPartnerLogin ? 'active' : ''}`}>
            <span className="footer-label">Partner Login</span>
          </Link>
        </>
      )}
    </nav>
  );
}

export default MobileFooter;
