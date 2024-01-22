// src/components/Wishlist.js
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Typography,
  Button,
  Card,
  CardContent,
  Snackbar,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function Wishlist() {
  const history = useHistory();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    
    fetchWishlistItems();
  }, [history]);

  const fetchWishlistItems = () => {
    
    const userId = '123'; 
    fetch(`https://academics.newtonschool.co/api/v1/ecommerce/wishlist/user/${userId}`, {
      headers: {
        'Authorization': 'Bearer YOUR_JWT_TOKEN',
        'projectID': 'Your_ProjectId',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setWishlistItems(data.data);
      })
      .catch((error) => {
        console.error('Error fetching wishlist items:', error);
      });
  };

  const handleRemoveFromWishlist = (productId) => {
    // Remove a specific product from the wishlist
    fetch(`https://academics.newtonschool.co/api/v1/ecommerce/wishlist/${productId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer YOUR_JWT_TOKEN',
        'projectID': 'Your_ProjectId',
      },
    })
      .then(() => {
               setWishlistItems((prevItems) => prevItems.filter((item) => item.productId !== productId));
        setSnackbarOpen(true); // Show a snackbar to indicate successful removal
      })
      .catch((error) => {
        console.error('Error removing item from wishlist:', error);
      });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        My Wishlist
      </Typography>

      {wishlistItems.map((item) => (
        <Card key={item.productId} style={{ marginBottom: '10px' }}>
          <CardContent>
            <Typography variant="h6">{item.name}</Typography>
        
            <Button onClick={() => handleRemoveFromWishlist(item.productId)}>
              Remove from Wishlist
            </Button>
          </CardContent>
        </Card>
      ))}

      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message="Item removed from wishlist"
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackbarClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </div>
  );
}

export default Wishlist;
