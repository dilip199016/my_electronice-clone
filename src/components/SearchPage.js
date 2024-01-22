// src/components/Search.js
import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Card, CardContent, Tabs, Tab, Checkbox } from '@mui/material';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [sortBy, setSortBy] = useState('rating');
  const [filterOptions, setFilterOptions] = useState({
    category: [],
    brand: [],
    sellerTag: [],
  });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    try {
      setLoading(true);

      const filterQuery = Object.entries(filterOptions)
        .filter(([key, value]) => value.length > 0)
        .map(([key, value]) => `{"${key}":["${value.join('","')}"]}`)
        .join(',');

      const response = await fetch(`https://academics.newtonschool.co/api/v1/ecommerce/electronics/products?search={"${sortBy}":"${searchTerm}"${filterQuery ? `,${filterQuery}` : ''}}&limit=10&page=${page}`, {
        headers: {
          'projectId': 'YOUR_PROJECT_ID', // Replace with your actual project ID
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const jsonData = await response.json();
      setSearchResults(jsonData.data);
      setLoading(false);
    } catch (error) {
      console.error('Error searching products:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchTerm.trim() !== '') {
      handleSearch();
    } else {
      setSearchResults([]);
    }
  }, [searchTerm, sortBy, filterOptions, page]);

  const handleSortChange = (event, newValue) => {
    setSortBy(newValue);
  };

  const handleFilterChange = (category, value) => {
    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      [category]: value,
    }));
  };

  const handleIntersection = (entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, { threshold: 1 });
    const bottomBoundaryRef = document.getElementById('bottomBoundary');
    if (bottomBoundaryRef) {
      observer.observe(bottomBoundaryRef);
    }

    return () => {
      observer.disconnect();
    };
  }, [page]);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Search Results for: "{searchTerm}"
      </Typography>
      <TextField
        label="Search for products"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button variant="contained" onClick={handleSearch}>
        Search
      </Button>

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
          {/* For example, assuming categories is an array of available categories */}
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

      {/* Search Results */}
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {searchResults.map((product) => (
          <Card key={product.id} style={{ width: '200px', margin: '10px' }}>
            {/* Add product details, image, and rating */}
            <CardContent>
              <Typography variant="h6">{product.name}</Typography>
              <Typography variant="body2">Price: {product.price}</Typography>
              <Typography variant="body2">Rating: {product.rating}</Typography>
            </CardContent>
            <Button variant="outlined" onClick={() => console.log(`Redirect to ${product.name} page`)}>
              View Details
            </Button>
          </Card>
        ))}
      </div>

      {/* Infinite Scroll */}
      <div id="bottomBoundary" style={{ height: '1px' }}></div>
      {loading && <p>Loading...</p>}
    </div>
  );
}

export default Search;
