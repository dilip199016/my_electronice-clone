import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';

function CheckoutProcess({ cartItems }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    street: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
  });

  const handleOpen = () => {
   
    const isLoggedIn = true; 
    if (isLoggedIn) {
      setOpen(true);
    } else {
      
      navigate('/login'); 
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePay = () => {
   
    if (!shippingAddress.street || !shippingAddress.city || !shippingAddress.state || !shippingAddress.country || !shippingAddress.zipCode) {
     
      return;
    }

    
    const userId = '123'; 
    const productId = '456'; 
    const orderData = {
      productId,
      quantity: 2,
      addressType: 'HOME',
      address: shippingAddress,
    };

    fetch(`https://academics.newtonschool.co/api/v1/ecommerce/order`, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer YOUR_JWT_TOKEN',
        'projectID': 'Your_ProjectId',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    })
      .then((response) => response.json())
      .then((data) => {
        
        console.log('Order placed successfully:', data);
      })
      .catch((error) => {
        console.error('Error placing order:', error);
       
      });

    
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Checkout
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Checkout Process</DialogTitle>
        <DialogContent>
          <Typography variant="h6">Shipping Address</Typography>
          ... (rest of the code remains unchanged)
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handlePay} color="primary">
            Pay
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CheckoutProcess;
