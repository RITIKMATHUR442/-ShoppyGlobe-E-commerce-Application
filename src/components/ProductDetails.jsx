import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../actions/cartActions';
import Loader from './Loader';
import './ProductDetails.css';

// ProductDetails component to display detailed information about a selected product
const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Error loading product details.</div>;
  }

  return (
    <div className="product-details">
      <div className="card">
        <div className="card-header">{product.title}</div>
        <img src={product.thumbnail} alt={product.title} />
        <div className="card-content">
          <p className="price">Price: ₹{product.price}</p>
          <p className="discounted-price">
            Discounted Price: ₹{(product.price * (1 - product.discountPercentage / 100)).toFixed(2)}
          </p>
          <p className="stock">Stock: {product.stock > 0 ? 'In Stock' : 'Low Stock'}</p>
          <p className="brand">Brand: {product.brand}</p>
          <p className="category">Category: {product.category}</p>
          <p className="description">Description: {product.description}</p>
          
          {product.dimensions && (
            <div className="dimensions">
              <p className="width">Width: {product.dimensions.width} cm</p>
              <p className="height">Height: {product.dimensions.height} cm</p>
              <p className="depth">Depth: {product.dimensions.depth} cm</p>
            </div>
          )}
          
          <p className="weight">Weight: {product.weight} gm</p>
          <p className="discount">Discount: {product.discountPercentage}%</p>
          <p className="min-order-quantity">Minimum Order Quantity: {product.minimumOrderQuantity}</p>
          <p className="rating">Rating: {product.rating}</p>
          <p className="return-policy">Return Policy: {product.returnPolicy}</p>
          <p className="shipping">Shipping Information: {product.shippingInformation}</p>
          <p className="warranty">Warranty: {product.warrantyInformation}</p>
          <p className="availability-status">Availability: {product.availabilityStatus}</p>
          <p className="sku">SKU: {product.sku}</p>
          <p className="tags">Tags: {product.tags.join(', ')}</p>
          <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>

      <h2>Reviews</h2>
      {product.reviews && product.reviews.length > 0 ? (
        product.reviews.map((review, index) => (
          <div key={index} className="review">
            <strong>{review.reviewerName}</strong>
            <p className="review-email">📧 {review.reviewerEmail}</p>
            <p className="review-rating">⭐ Rating: {review.rating}</p>
            <p className="review-comment">💬 {review.comment}</p>
          </div>
        ))
      ) : (
        <p className="no-reviews">No reviews available.</p>
      )}
    </div>
  );
};

export default ProductDetails;