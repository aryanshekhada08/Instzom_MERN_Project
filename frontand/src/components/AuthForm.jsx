import React, { useState } from 'react'; // 1. Import useState
import { Link } from 'react-router-dom';
import '../App.css'; // Import the CSS file for styling

const AuthForm = ({ 
  title, 
  subtitle, 
  isRegister, 
  togglePath, 
  switchPortalPath, 
  switchPortalText 
}) => {
  
  // 2. Create the "State" to hold the data
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });

  // 3. Create a function to handle typing
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,    // Keep existing data (like email) while typing password
      [name]: value   // Update only the field being typed
    }));
  };

  // 4. Create a function to handle the Button Click
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the page from refreshing
    
    // FOR NOW: We just print the data to see if it works
    console.log("Form Submitted:", formData); 
    
    // LATER: We will send this 'formData' to your Node backend here
    if (isRegister) {
       console.log("Sending Register request...");
    } else {
       console.log("Sending Login request...");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-header">
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>

      {/* 5. Connect the handleSubmit to the form */}
      <form onSubmit={handleSubmit}>
        
        {isRegister && (
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input 
              type="text" 
              name="fullName"      // Must match state key
              value={formData.fullName} 
              onChange={handleChange} 
              className="form-input" 
              placeholder="e.g. John Doe" 
            />
          </div>
        )}

        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input 
            type="email" 
            name="email"           // Must match state key
            value={formData.email}
            onChange={handleChange}
            className="form-input" 
            placeholder="name@example.com" 
          />
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <input 
            type="password" 
            name="password"        // Must match state key
            value={formData.password}
            onChange={handleChange}
            className="form-input" 
            placeholder="••••••••" 
          />
        </div>

        {/* Change type="button" to type="submit" */}
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

      <div style={{ 
          marginTop: '20px', 
          paddingTop: '15px', 
          borderTop: '1px solid var(--border-color)', 
          textAlign: 'center',
          fontSize: '0.85rem'
        }}>
        <Link to={switchPortalPath} style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
          {switchPortalText} <strong>Click here &rarr;</strong>
        </Link>
      </div>
    </div>
  );
};

export default AuthForm;