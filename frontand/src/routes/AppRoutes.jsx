import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

// 1. Import the pages we created
import UserLogin from '../Pages/UserLogin';       // Go up one folder, then into Pages
import UserRegister from '../Pages/UserRegister'; // (Make sure you create this file!)
import PartnerLogin from '../Pages/PartnerLogin';
import PartnerRegister from '../Pages/PartnerRegister'; //
import Home from '../Pages/Gernal/Home';
import CreateFoodPatner from '../Pages/food-patner/CreateFoodPatner';
import Profile from '../Pages/food-patner/Profile';

// 2. A temporary Home Page so you don't see a blank screen at localhost:5173
// const Home = () => {
//   return (
//     <div style={{ textAlign: 'center', marginTop: '50px' }}>
//       <h1>Welcome to FoodApp</h1>
//       <p>Select a portal to enter:</p>
      
//       <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '20px' }}>
//         {/* User Links */}
//         <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
//           <h3>For Users</h3>
//           <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
//             <Link to="/user/login">User Login</Link>
//             <Link to="/user/register">User Register</Link>
//           </div>
//         </div>

//         {/* Partner Links */}
//         <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
//           <h3>For Restaurant Partners</h3>
//           <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
//             <Link to="/foodpartner/login">Partner Login</Link>
//             <Link to="/foodpartner/register">Partner Register</Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* LANDING PAGE */}
        <Route path="/" element={<Home />} />

        {/* USER ROUTES */}
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/register" element={<UserRegister />} />
        

        {/* PARTNER ROUTES */}
        <Route path="/foodpartner/login" element={<PartnerLogin />} />
        <Route path="/foodpartner/register" element={<PartnerRegister />} />
        <Route path="/create-food" element={<CreateFoodPatner />} />
        <Route path="/foodpartner/profile" element={<Profile />} />
        <Route path="/profile/:id" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;