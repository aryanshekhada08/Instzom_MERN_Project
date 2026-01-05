import React from 'react';
import AuthForm from '../components/AuthForm';

const FoodPartnerRegister = () => {
  return (
    <AuthForm 
      title="Partner Registration"
      subtitle="Grow your business with us"
      isRegister={true}
      
      // 👇 THIS TURNS ON THE ADDRESS BOX
      isPartner={true} 
      
      togglePath="/foodpartner/login"
      switchPortalPath="/user/register"
      switchPortalText="Looking to order food?"
      apiEndpoint="http://localhost:3000/api/auth/foodpartner/register"
    />
  );
};

export default FoodPartnerRegister;