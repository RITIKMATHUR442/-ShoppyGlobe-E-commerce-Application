import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart, decrementCartItem } from '../actions/cartActions';
import PropTypes from 'prop-types';
import './CartItem.css';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch(addToCart(item));
  };

  const handleDecrement = () => {
    dispatch(decrementCartItem(item.id));
  };

  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
  };

  return (
    <div className="cart-item">
      <img src={item.thumbnail} alt={item.title} />
      <div className="cart-item-details">
        <h3>{item.title}</h3>
        <p>${(item.price * item.quantity).toFixed(2)}</p>
      </div>
      <div className="cart-item-controls">
        <button onClick={handleDecrement}>-</button>
        <span>{item.quantity}</span>
        <button onClick={handleIncrement}>+</button>
        <button onClick={handleRemove} className="remove">Remove</button>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
};

export default CartItem;