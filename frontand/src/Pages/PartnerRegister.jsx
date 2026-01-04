import React from 'react';
import AuthForm from '../components/AuthForm';

const PartnerRegister = () => {
  return (
    <AuthForm 
      title="Become a Partner"
      subtitle="Register your restaurant"
      isRegister={true}
      togglePath="create-food"
      switchPortalPath="/user/register"
      switchPortalText="Looking to order food?"
      apiEndpoint="http://localhost:3000/api/auth/foodpartner/register"

    />
  );
};
export default PartnerRegister;