import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from './Loader';
import './CheckoutPage.css';
import Footer from './Footer';

// CheckoutPage component to display the checkout process
const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state?.formData;
  const cartItems = location.state?.cartItems || [];
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a delay to show the loader
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleEditAddress = () => {
    navigate('/order', { state: { cartItems } });
  };

  const handleEditBag = () => {
    navigate('/cart');
  };

  const calculatePriceDetails = () => {
    const totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const price = cartItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
    const discount = (price * 0.05).toFixed(2); // Assuming 5% discount
    const deliveryCharges = 50.0;
    const totalAmount = (price - discount + deliveryCharges).toFixed(2);

    return { totalItems, price: price.toFixed(2), discount, deliveryCharges, totalAmount };
  };

  const priceDetails = calculatePriceDetails();

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="checkout-page">
        <div className="card">
          <h2>Shipping Address</h2>
          {formData && (
            <>
              <p>{formData.fullName}</p>
              <p>{formData.streetAddress}</p>
              <p>{formData.apartment}</p>
              <p>{formData.city}, {formData.state}, {formData.zipcode}</p>
              <p>{formData.country}</p>
              <p>Email: {formData.email}</p>
              <p>Phone: {formData.phoneNumber}</p>
            </>
          )}
          <button onClick={handleEditAddress}>Edit</button>
        </div>

        <div className="card">
          <h2>Payment Method (Static Data)</h2>
          <ul className="payment-method">
            <li>Your saved method</li>
            <li>PhonePe / Wallet</li>
            <li>Credit / Debit / ATM Card</li>
            <li>Net Banking</li>
            <li>EMI (Easy Installments)</li>
            <li>Cash on Delivery</li>
            <li>Gift Card \ Vouchers</li>
            <li>Axis Credit Card</li>
            <li>47** **** **** **66</li>
            <li>CVV</li>
            <li>HDFC debit Card</li>
            <li>53** **** **** **00</li>
            <li>CVV</li>
          </ul>
        </div>

        <div className="card">
          <h2>Your Order Summary</h2>
          <button onClick={handleEditBag}>Edit Bag</button>
          <table>
            <thead>
              <tr>
                <th>Item Description</th>
                <th>Quantity</th>
                <th>Saving</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img src={item.thumbnail} alt={item.title} />
                    <p>{item.title}</p>
                    <p>{item.brand}</p>
                  </td>
                  <td>{item.quantity || 1}</td>
                  <td>7.17% Off</td>
                  <td>₹{(item.price * (item.quantity || 1)).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>Subtotal: ₹{priceDetails.price}</p>
          <p>Shipping Charges: ₹{priceDetails.deliveryCharges}</p>
          <p>Total: ₹{priceDetails.totalAmount}</p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CheckoutPage;