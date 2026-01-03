import React from 'react';
import AuthForm from '../components/AuthForm';

const UserLogin = () => {
  return (
    <AuthForm 
      title="Welcome Back"
      subtitle="Login to order food"
      isRegister={false}
      togglePath="/user/register"
      // New Switch Links
      switchPortalPath="/foodpartner/login"
      switchPortalText="Are you a Restaurant Partner?"
    />
  );
};
export default UserLogin;