import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/MobileFooter.css';

function MobileFooter() {
  const location = useLocation();
  const pathname = location.pathname;

  const isHome = pathname === '/';
  const isManage = pathname === '/create-food';
  const isProfile = pathname.startsWith('/foodpartner/profile') || pathname.startsWith('/profile/');

  return (
    <nav className="mobile-footer" aria-label="Bottom navigation">
      <Link to="/" className={`footer-link ${isHome ? 'active' : ''}`}>
        <span className="footer-label">Home</span>
      </Link>
      <Link to="/create-food" className={`footer-link ${isManage ? 'active' : ''}`}>
        <span className="footer-label">Manage</span>
      </Link>
      <Link to="/foodpartner/profile" className={`footer-link ${isProfile ? 'active' : ''}`}>
        <span className="footer-label">Profile</span>
      </Link>
    </nav>
  );
}

export default MobileFooter;
