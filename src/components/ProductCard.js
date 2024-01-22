// src/components/ProductCard.js
import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';

function ProductCard({ product }) {
  return (
    <Card style={{ maxWidth: '300px', margin: '10px' }}>
      <CardMedia component="img" height="140" image={product.image} alt={product.name} />
      <CardContent>
        <Typography variant="h6">{product.name}</Typography>
        <Typography variant="body2">Price: {product.price}</Typography>
        <Typography variant="body2">Rating: {product.rating}</Typography>
        <Button variant="outlined" onClick={() => console.log(`Redirect to ${product.name} page`)}>
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
