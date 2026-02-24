import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

import UserLogin from '../Pages/UserLogin';
import UserRegister from '../Pages/UserRegister';
import PartnerLogin from '../Pages/PartnerLogin';
import PartnerRegister from '../Pages/PartnerRegister';
import Home from '../Pages/Gernal/Home';
import CreateFoodPatner from '../Pages/food-patner/CreateFoodPatner';
import Profile from '../Pages/food-patner/Profile';
import EditFoodPartnerProfile from '../Pages/food-patner/EditFoodPartnerProfile';
import UserOrders from '../Pages/user/UserOrders';
import UserAccount from '../Pages/user/UserAccount';

const UserOnlyRoute = ({ children }) => {
  const isUser = Boolean(localStorage.getItem('userProfile'));
  if (!isUser) return <Navigate to="/user/login" replace />;
  return children;
};

const PartnerOnlyRoute = ({ children }) => {
  const isPartner = Boolean(localStorage.getItem('foodPartnerProfile'));
  if (!isPartner) return <Navigate to="/foodpartner/login" replace />;
  return children;
};

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/register" element={<UserRegister />} />
        <Route
          path="/user/orders"
          element={
            <UserOnlyRoute>
              <UserOrders />
            </UserOnlyRoute>
          }
        />
        <Route
          path="/user/account"
          element={
            <UserOnlyRoute>
              <UserAccount />
            </UserOnlyRoute>
          }
        />

        <Route path="/foodpartner/login" element={<PartnerLogin />} />
        <Route path="/foodpartner/register" element={<PartnerRegister />} />
        <Route
          path="/create-food"
          element={
            <PartnerOnlyRoute>
              <CreateFoodPatner />
            </PartnerOnlyRoute>
          }
        />
        <Route
          path="/foodpartner/profile"
          element={
            <PartnerOnlyRoute>
              <Profile />
            </PartnerOnlyRoute>
          }
        />
        <Route
          path="/foodpartner/profile/edit"
          element={
            <PartnerOnlyRoute>
              <EditFoodPartnerProfile />
            </PartnerOnlyRoute>
          }
        />
        <Route path="/profile/:id" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
