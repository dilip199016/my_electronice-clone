// src/components/ShoppingCart.js
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, Button, Card, CardContent } from '@mui/material';

function ShoppingCart() {
  const history = useHistory();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Fetch cart items for the logged-in user
    // Replace the following with your actual authentication logic to get the user's cart items
    const isLoggedIn = true; // Replace with your authentication check
    if (isLoggedIn) {
      // Fetch user's cart items using the user's ID or any identifier
      const userId = '123'; // Replace with your actual user ID or identifier
      fetch(`https://academics.newtonschool.co/api/v1/ecommerce/cart/user/${userId}`, {
        headers: {
          'projectId': 'YOUR_PROJECT_ID', // Replace with your actual project ID
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setCartItems(data.data);
        })
        .catch((error) => {
          console.error('Error fetching cart items:', error);
        });
    } else {
      // Redirect to Login or Register Page if not logged in
      history.push('/login'); // Replace with your actual login page route
    }
  }, [history]);

  const handleRemoveFromCart = (productId) => {
    // Implement logic to remove item from cart
    // Call the API to remove the item from the cart
    // Replace the following with your actual API endpoint
    fetch(`https://academics.newtonschool.co/api/v1/ecommerce/cart/${productId}`, {
      method: 'DELETE',
      headers: {
        'projectId': 'YOUR_PROJECT_ID', // Replace with your actual project ID
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Update the cart items state after successful removal
        setCartItems((prevItems) => prevItems.filter((item) => item.productId !== productId));
      })
      .catch((error) => {
        console.error('Error removing item from cart:', error);
      });
  };

  const handleMoveToWishlist = (productId) => {
    // Implement logic to move item to wishlist (Optional feature)
    // You can create a separate API endpoint for moving items to the wishlist
    // and call that API to move the item
    console.log('Move to Wishlist clicked for productId:', productId);
  };

  const handleCheckout = () => {
    // Redirect to the Checkout page
    history.push('/checkout'); // Replace with your actual checkout page route
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>

      {cartItems.map((item) => (
        <Card key={item.productId} style={{ marginBottom: '10px' }}>
          <CardContent>
            <Typography variant="h6">{item.name}</Typography>
            <Typography variant="body1">Quantity: {item.quantity}</Typography>
            <Typography variant="body1">Price: ${item.price}</Typography>
            <Button onClick={() => handleRemoveFromCart(item.productId)}>Remove</Button>
            <Button onClick={() => handleMoveToWishlist(item.productId)}>Move to Wishlist</Button>
          </CardContent>
        </Card>
      ))}

      {cartItems.length > 0 && (
        <div>
          <Typography variant="h6">Order Summary</Typography>
          {/* Calculate and display total cart amount */}
          <Typography variant="body1">Total: ${calculateTotal()}</Typography>
          <Button variant="contained" color="primary" onClick={handleCheckout}>
            Checkout
          </Button>
        </div>
      )}
    </div>
  );
}

export default ShoppingCart;

// Helper function to calculate total cart amount
function calculateTotal() {
  // Replace with your actual calculation logic
  return 0;
}
