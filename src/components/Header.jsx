import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
const Header = () => {
  return (
    <header>
      <nav>
        <Link to="/">Home</Link> {/* Link to the Welcome page */}
        <Link to="/products">Products</Link> {/* Link to the Home page renamed as Products */}
        <Link to="/cart">Cart</Link>
        <Link to="/checkout">Checkout</Link> {/* Link to the Checkout page */}
      </nav>
    </header>
  );
};

export default Header;