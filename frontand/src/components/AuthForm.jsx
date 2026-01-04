import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // <--- 1. Import Axios here
import '../App.css';

const AuthForm = ({ 
  title, 
  subtitle, 
  isRegister, 
  togglePath, 
  switchPortalPath, 
  switchPortalText,
  apiEndpoint 
}) => {
  
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // --- THE NEW AXIOS SUBMIT FUNCTION ---
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 2. Send the Request
      // axios.post(URL, DATA)
      const response = await axios.post(apiEndpoint, formData, 
        { withCredentials: true}
      );
      // 3. Success (Axios only reaches here if status is 200/201)
      alert("Success: " + response.data.message);
      
      // Redirect to login
      navigate(togglePath);

    } catch (error) {
      // 4. Failure (Axios jumps here if status is 400/500)
      if (error.response) {
        // The server responded with a specific error message (e.g., "Email already exists")
        alert("Error: " + error.response.data.error);
      } else if (error.request) {
        // The request was made but no response (Server is offline)
        alert("Server is not responding. Is it running?");
      } else {
        // Something else happened
        alert("Error: " + error.message);
      }
      console.error("Axios Error:", error);
    }
  };

  return (
    <div className="auth-container">
      {/* ... (The rest of your JSX code remains exactly the same) ... */}
      <div className="auth-header">
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>

      <form onSubmit={handleSubmit}>
        {isRegister && (
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input 
              type="text" 
              name="fullName" 
              value={formData.fullName} 
              onChange={handleChange} 
              className="form-input" 
              required // Add HTML5 validation
            />
          </div>
        )}

        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input 
             type="email" 
             name="email" 
             value={formData.email} 
             onChange={handleChange} 
             className="form-input" 
             required 
          />
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <input 
             type="password" 
             name="password" 
             value={formData.password} 
             onChange={handleChange} 
             className="form-input" 
             required 
          />
        </div>

        <button type="submit" className="btn-submit">
          {isRegister ? 'Create Account' : 'Sign In'}
        </button>
      </form>
      
      <div className="auth-footer">
        {isRegister ? "Already have an account?" : "Don't have an account?"}
        <Link to={togglePath} className="auth-link">
          {isRegister ? 'Log in' : 'Sign up'}
        </Link>
      </div>

      <div style={{ marginTop: '20px', paddingTop: '15px', borderTop: '1px solid var(--border-color)', textAlign: 'center', fontSize: '0.85rem' }}>
        <Link to={switchPortalPath} style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
          {switchPortalText} <strong>Click here &rarr;</strong>
        </Link>
      </div>
    </div>
  );
};

export default AuthForm;