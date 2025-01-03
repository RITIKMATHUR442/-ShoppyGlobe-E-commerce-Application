import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../actions/cartActions';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './ProductItem.css';

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 1000);
  };

  return (
    <div className="product-item">
      <img src={product.thumbnail} alt={product.title} />
      <h3>{product.title}</h3>
      <p>${product.price}</p>
      <div className="buttons">
        <Link to={`/product/${product.id}`}>View Details</Link>
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
      {showPopup && <div className="popup">Product added to cart!</div>}
    </div>
  );
};

ProductItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductItem;