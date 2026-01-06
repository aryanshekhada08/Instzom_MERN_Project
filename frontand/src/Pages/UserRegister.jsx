import React from 'react';
import AuthForm from '../components/AuthForm';

const UserRegister = () => {
  return (
    <AuthForm 
      title="Create Account"
      subtitle="Sign up to order food"
      isRegister={true}
      togglePath="/user/login"
      isPartner={false}
      switchPortalPath="/foodpartner/register"
      switchPortalText="Are you a Restaurant Partner?"
      apiEndpoint="http://localhost:3000/api/auth/user/register"
    />
  );
};
export default UserRegister;