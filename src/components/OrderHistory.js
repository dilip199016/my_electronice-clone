// src/components/OrderHistory.js
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, Card, CardContent } from '@mui/material';

function OrderHistory() {
  const history = useHistory();
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    // Fetch order history for the logged-in user
    // ... (replace with your authentication logic to get the user's order history)

    // Fetch order history
    fetchOrderHistory();
  }, [history]);

  const fetchOrderHistory = () => {
    // Fetch user's order history using the user's ID or any identifier
    const userId = '123'; // Replace with your actual user ID or identifier
    fetch(`https://academics.newtonschool.co/api/v1/ecommerce/order/user/${userId}`, {
      headers: {
        'Authorization': 'Bearer YOUR_JWT_TOKEN',
        'projectID': 'Your_ProjectId',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setOrderHistory(data.data);
      })
      .catch((error) => {
        console.error('Error fetching order history:', error);
      });
  };

  const handleViewOrderDetails = (orderId) => {
    // Redirect to the order details page
    history.push(`/order-details/${orderId}`); // Replace with your actual order details page route
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Order History
      </Typography>

      {orderHistory.map((order) => (
        <Card key={order.orderId} style={{ marginBottom: '10px' }}>
          <CardContent>
            <Typography variant="h6">Order ID: {order.orderId}</Typography>
            <Typography variant="body1">Order Date: {order.orderDate}</Typography>
            <p>Order Details</p>
            <button onClick={() => handleViewOrderDetails(order.orderId)}>
              View Order Details
            </button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default OrderHistory;
