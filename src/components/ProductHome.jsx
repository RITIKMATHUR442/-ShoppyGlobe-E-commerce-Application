import React, { useState, useEffect } from 'react';
import ProductList from './ProductList';
import Footer from './Footer';
import Loader from './Loader'; // Import the Loader component
import './ProductHome.css';

const ProductHome = () => {
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    // Fetch products from an API
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        setProducts(data.products);
        setFilteredProducts(data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Filter products based on search query
    setFilteredProducts(
      products.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, products]);
 // Handle search input change
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  if (loading) {
    return <Loader />; // Show loader while loading
  }

  return (
    <div className="home">
      <div className="browse-products-page">
        {/* Search input container */}
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search Products..."
            value={search}
            onChange={handleSearchChange}
          />
        </div>
        {/* Featured products section */}
        <div className="featured-products">
          <h2>Featured Products</h2>
          {/* Display filtered products or a message if no products are found */}
          {filteredProducts.length > 0 ? (
            <ProductList products={filteredProducts} />
          ) : (
            <p className="no-products">No products found.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductHome;