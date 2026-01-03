import React from 'react';
import AuthForm from '../components/AuthForm';

const PartnerLogin = () => {
  return (
    <AuthForm 
      title="Partner Portal"
      subtitle="Login to manage restaurant"
      isRegister={false}
      togglePath="/foodpartner/register"
      // New Switch Links
      switchPortalPath="/user/login"
      switchPortalText="Looking to order food?"
    />
  );
};
export default PartnerLogin;