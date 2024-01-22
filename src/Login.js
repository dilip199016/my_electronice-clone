// src/components/Login.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, TextField, Button } from '@mui/material';

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('https://academics.newtonschool.co/api/v1/user/login', {
        method: 'POST',
        headers: {
          'projectID': 'YOUR_PROJECT_ID', // Replace with your actual project ID
        },
        body: JSON.stringify({
          email,
          password,
          appType: 'ecommerce',
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // If login is successful, redirect to home page or the desired route
      history.push('/');
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <TextField
        label="Email"
        type="email"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Login
      </Button>
      <Typography>
        New User: <span onClick={() => history.push('/register')}>Register New Account</span>
      </Typography>
    </div>
  );
}

export default Login;
