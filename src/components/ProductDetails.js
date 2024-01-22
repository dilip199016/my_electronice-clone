// src/components/ProductDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Button, Card, CardContent } from '@mui/material';

function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`https://academics.newtonschool.co/api/v1/ecommerce/product/${productId}`, {
          headers: {
            'projectId': 'YOUR_PROJECT_ID', // Replace with your actual project ID
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const jsonData = await response.json();
        setProduct(jsonData.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    const fetchProductReviews = async () => {
      try {
        const response = await fetch(`https://academics.newtonschool.co/api/v1/ecommerce/review/${productId}`, {
          headers: {
            'projectId': 'YOUR_PROJECT_ID', // Replace with your actual project ID
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const jsonData = await response.json();
        setReviews(jsonData.data);
      } catch (error) {
        console.error('Error fetching product reviews:', error);
      }
    };

    fetchProductDetails();
    fetchProductReviews();
  }, [productId]);

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        {product.name}
      </Typography>

      {/* Images or Videos */}
      <div>
        {/* Use product.videos, product.images, and product.displayimage */}
        {/* Implement navigation buttons for images or videos */}
        <img src={product.displayimage} alt={product.name} style={{ maxWidth: '100%' }} />
      </div>

      {/* Key Features */}
      <div>
        <Typography variant="h6">Key Features:</Typography>
        <ul>
          {product.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>

      {/* Overview of the Product */}
      <div>
        <Typography variant="h6">Overview:</Typography>
        <p>{product.description}</p>
      </div>

      {/* Customer Reviews */}
      <div>
        <Typography variant="h6">Customer Reviews:</Typography>
        {reviews.map((review) => (
          <Card key={review.id} style={{ marginBottom: '10px' }}>
            <CardContent>
              <Typography variant="subtitle1">{review.user}</Typography>
              <Typography variant="body2">Rating: {review.rating}</Typography>
              <Typography variant="body2">Review: {review.review}</Typography>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add to Cart and Buy Now Buttons */}
      <div>
        <Button variant="contained" color="primary" onClick={() => console.log('Added to Cart')}>
          Add to Cart
        </Button>
        <Button variant="contained" color="secondary" onClick={() => console.log('Buy Now')}>
          Buy Now
        </Button>
      </div>

      {/* Optional: Wishlist Button */}
      {/* Implement Wishlist functionality as described in Feature 09 */}
    </div>
  );
}

export default ProductDetails;
