import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css'; // Ensure this matches your CSS file location

const AuthForm = ({ 
  title, 
  subtitle, 
  isRegister, 
  isPartner = false, // Default is false (User mode)
  togglePath, 
  switchPortalPath, 
  switchPortalText,
  apiEndpoint 
}) => {
  
  const navigate = useNavigate();
  
  // State matches your MongoDB Model fields exactly
  const [formData, setFormData] = useState({
    name: '',       // Backend expects 'name' (not fullName)
    email: '',
    password: '',
    address: ''     // Backend expects 'address' (only for partners)
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    try {
      // 1. Send Data
      const response = await axios.post(apiEndpoint, formData, {
        withCredentials: true
      });
      if (response.data.user) {
    localStorage.setItem("userProfile", JSON.stringify(response.data.user));
}

      // 2. Success
      alert("Success: " + (response.data.message || "Welcome!"));
      
      // 3. Redirect
      // If it was a Login, go to Home or Dashboard od Partner
      if (!isRegister) {
         navigate(isPartner ? '/foodpartner/dashboard' : '/');
      } else {
         // If Register, go to Login page
         navigate(togglePath);
      }

    } catch (err) {
      // 4. Handle Errors
      const msg = err.response?.data?.error || "Server Error";
      setError(msg);
      console.error("Auth Error:", err);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{title}</h2>
        <p className="subtitle">{subtitle}</p>

        {error && <div className="error-msg">{error}</div>}

        <form onSubmit={handleSubmit}>
          
          {/* NAME FIELD (Only for Register) */}
          {isRegister && (
            <div className="form-group">
              <label className="form-label">
                {isPartner ? "Business Name" : "Full Name"}
              </label>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                placeholder={isPartner ? "Pizza Palace" : "John Doe"}
                required 
              />
            </div>
          )}

          {/* EMAIL FIELD */}
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input 
               type="email" 
               name="email" 
               value={formData.email} 
               onChange={handleChange} 
               required 
            />
          </div>

          {/* ADDRESS FIELD (Only for Partner Registration) */}
          {isRegister && isPartner && (
            <div className="form-group">
              <label className="form-label">Business Address</label>
              <input 
                type="text" 
                name="address" 
                value={formData.address} 
                onChange={handleChange} 
                placeholder="Rajkot, Gujarat"
                required 
              />
            </div>
          )}

          {/* PASSWORD FIELD */}
          <div className="form-group">
            <label className="form-label">Password</label>
            <input 
               type="password" 
               name="password" 
               value={formData.password} 
               onChange={handleChange} 
               required 
            />
          </div>

          <button type="submit" className="auth-btn">
            {isRegister ? 'Create Account' : 'Sign In'}
          </button>
        </form>
        
        {/* FOOTER LINKS */}
        <div className="auth-footer">
          {isRegister ? "Already have an account?" : "Don't have an account?"}
          <Link to={togglePath}>
            {isRegister ? ' Log in' : ' Sign up'}
          </Link>
        </div>

        <div className="switch-portal">
          <Link to={switchPortalPath}>
            {switchPortalText} <strong>Click here &rarr;</strong>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default AuthForm;