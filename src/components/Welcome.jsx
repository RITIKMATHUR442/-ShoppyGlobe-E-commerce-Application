import React from 'react';
import { Link } from 'react-router-dom';
import './Welcome.css';
import Footer from './Footer';

const Welcome = () => {
  return (
    <>
      <div className="welcome-page">
        <div className="centered-text">
          <h1>Welcome to ShoppyGlobe</h1>
          <p>Your one-stop shop for all your needs!</p>
          <Link to="/products">
            <button>Start Shopping</button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Welcome;