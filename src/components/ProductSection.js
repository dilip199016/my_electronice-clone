
import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

function ProductSection({ title, products }) {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {products.map((product) => (
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
    </div>
  );
}

export default ProductSection;
