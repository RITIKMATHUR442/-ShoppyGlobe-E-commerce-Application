// import React from 'react';
// import OrderForm from '../components/OrderForm';
// import './OrderPage.css';
// const OrderPage = () => {
//   const handleSave = (formData) => {
//     console.log('Order data:', formData);
//     // Handle form data submission
//   };

//   return (
//     <div className="order-page">
//       <h1>Order Page</h1>
//       <OrderForm onSave={handleSave} />
//     </div>
//   );
// };

// export default OrderPage;

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import OrderForm from './OrderForm';
import './OrderPage.css';

const OrderPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cartItems = location.state?.cartItems || [];

  const handleSave = (formData) => {
    navigate('/checkout', { state: { formData, cartItems } }); // Navigate to checkout with form data and cart items
  };

  return (
    <div className="order-page">
      <h1>Order Page</h1>
      <OrderForm onSave={handleSave} />
    </div>
  );
};

export default OrderPage;