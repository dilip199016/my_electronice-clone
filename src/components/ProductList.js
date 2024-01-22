// src/components/ProductList.js
import React, { useState, useEffect } from 'react';
import { Typography, Tabs, Tab, Checkbox } from '@mui/material';
import ProductCard from './ProductCard';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState('rating');
  const [filterOptions, setFilterOptions] = useState({
    category: [],
    brand: [],
    sellerTag: [],
  });

  // Placeholder for categories (replace it with your actual data)
  const categories = ['Electronics', 'Clothing', 'Books'];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`https://academics.newtonschool.co/api/v1/ecommerce/electronics/products?sort={"${sortBy}":1}`, {
          headers: {
            'projectId': 'YOUR_PROJECT_ID', // Replace with your actual project ID
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const jsonData = await response.json();
        setProducts(jsonData.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [sortBy]);

  const handleSortChange = (event, newValue) => {
    setSortBy(newValue);
  };

  const handleFilterChange = (category, value) => {
    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      [category]: value,
    }));
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        All Products
      </Typography>

      {/* Sorting Tabs */}
      <Tabs
        value={sortBy}
        onChange={handleSortChange}
        textColor="primary"
        indicatorColor="primary"
        aria-label="Sort By"
        style={{ marginTop: '10px' }}
      >
        <Tab label="Top Rated" value="rating" />
        <Tab label="Price (Lowest to Highest)" value="price" />
        <Tab label="Price (Highest to Lowest)" value="-price" />
      </Tabs>

      {/* Filtering Options */}
      <div>
        <Typography variant="h6">Filter By:</Typography>
        <div>
          <Typography variant="subtitle1">Categories:</Typography>
          {/* Add checkboxes for categories */}
          {categories.map((category) => (
            <Checkbox
              key={category}
              label={category}
              checked={filterOptions.category.includes(category)}
              onChange={(e) => handleFilterChange('category', category)}
            />
          ))}
        </div>
        {/* Add similar sections for brand and sellerTag filtering */}
      </div>

      {/* Product Cards */}
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
