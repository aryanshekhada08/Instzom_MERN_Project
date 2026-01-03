import React from 'react';
import AuthForm from '../components/AuthForm';

const PartnerRegister = () => {
  return (
    <AuthForm 
      title="Become a Partner"
      subtitle="Register your restaurant"
      isRegister={true}
      togglePath="/foodpartner/login"
      switchPortalPath="/user/register"
      switchPortalText="Looking to order food?"
    />
  );
};
export default PartnerRegister;