// src/components/Home.js
import React, { useState, useEffect, useRef } from 'react';
import ProductSection from './ProductSection';

function Home() {
  const [lowestPrices, setLowestPrices] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1); // Track the current page for Infinite Scroll
  const [loading, setLoading] = useState(false);
  const bottomBoundaryRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async (url, setState) => {
      try {
        setLoading(true);

        const response = await fetch(`${url}&limit=10&page=${page}`, {
          headers: {
            'projectId': 'YOUR_PROJECT_ID', // Replace with your actual project ID
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const jsonData = await response.json();
        setState((prevProducts) => [...prevProducts, ...jsonData.data]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    // Fetch Lowest Prices of the Today
    fetchProducts('https://academics.newtonschool.co/api/v1/ecommerce/electronics/products?sort={"price":1}', setLowestPrices);

    // Fetch Trending Products
    fetchProducts('https://academics.newtonschool.co/api/v1/ecommerce/electronics/products?sort={"rating":-1}', setTrendingProducts);

    // Fetch Products by Categories
    // Replace 'add_your_subCategory' with actual subcategories like 'tv', 'refrigeration', 'mobile', 'ac', etc.
    fetchProducts('https://academics.newtonschool.co/api/v1/ecommerce/electronics/products?filter={"subCategory":"add_your_subCategory"}', setCategories);
  }, [page]); // Trigger fetchProducts when the page changes

  const handleIntersection = (entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, { threshold: 1 });
    if (bottomBoundaryRef.current) {
      observer.observe(bottomBoundaryRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div>
      <img
        src="/logo.png"
        alt="Logo"
        style={{ width: '100px', height: 'auto', marginBottom: '20px' }}
      />
      <ProductSection title="Lowest Prices of the Today" products={lowestPrices} />
      <ProductSection title="Trending Products" products={trendingProducts} />
      <ProductSection title="Products by Categories" products={categories} />
      <div ref={bottomBoundaryRef}></div>
      {loading && <p>Loading...</p>}
    </div>
  );
}

export default Home;
