import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import ProductHome from './components/ProductHome';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import NotFound from './components/NotFound';
import OrderPage from './components/OrderPage';
import CheckoutPage from './components/CheckoutPage';
import Welcome from './components/Welcome';
import Footer from './components/Footer';

// import './App.css'; // Import global CSS

const App = () => (
  <div className="app">
    <Header />
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/products" element={<ProductHome />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
    {/* <Footer /> */}
  </div>
);

export default App;