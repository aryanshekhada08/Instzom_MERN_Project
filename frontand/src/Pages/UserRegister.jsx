import React from 'react';
import AuthForm from '../components/AuthForm';
import axios from 'axios'

const UserRegister = () => {
  return (
    <AuthForm 
      title="Create Account"
      subtitle="Sign up to order food"
      isRegister={true}
      togglePath="/user/login"
      switchPortalPath="/foodpartner/register"
      switchPortalText="Are you a Restaurant Partner?"
    />
  );
};
export default UserRegister;