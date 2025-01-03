import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart, decrementCartItem } from '../actions/cartActions';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';
import './Cart.css';
import Footer from './Footer';

// Cart component to display items added to the cart
const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      dispatch({ type: 'SET_CART', payload: JSON.parse(savedCart) });
    }
    setLoading(false);
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleIncrement = (item) => {
    dispatch(addToCart(item));
  };

  const handleDecrement = (id) => {
    dispatch(decrementCartItem(id));
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

  if (!cartItems.length) return <div>Your cart is empty.</div>;

  const handlePlaceOrderClick = () => {
    navigate('/order', { state: { cartItems } });
  };

  return (
    <>
      <div className="cart">
        <h1>Your Cart</h1>
        <ul>
          {cartItems.map((item) => (
            <li key={item.id} className="cart-item">
              <img src={item.thumbnail} alt={item.title} />
              <div className="cart-item-details">
                <h3>{item.title}</h3>
                <p>${(item.price * item.quantity).toFixed(2)}</p>
              </div>
              <div className="cart-item-controls">
                <button onClick={() => handleDecrement(item.id)}>-</button>
                <span>{item.quantity || 1}</span>
                <button onClick={() => handleIncrement(item)}>+</button>
              </div>
            </li>
          ))}
        </ul>
        <div className="price-details">
          <h2>Price Details</h2>
          <p>Price ({priceDetails.totalItems} items): ${priceDetails.price}</p>
          <p>Discount: ${priceDetails.discount}</p>
          <p>Delivery Charges: ${priceDetails.deliveryCharges}</p>
          <p><strong>Total Amount: ${priceDetails.totalAmount}</strong></p>
          <p>You will save ${priceDetails.discount} on this order</p>
          <button className="place-order" onClick={handlePlaceOrderClick}>Place Order</button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;