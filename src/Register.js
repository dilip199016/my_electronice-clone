// src/components/Register.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, TextField, Button } from '@mui/material';

function Register() {
  const history = useHistory();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await fetch('https://academics.newtonschool.co/api/v1/user/signup', {
        method: 'POST',
        headers: {
          'projectID': 'YOUR_PROJECT_ID', // Replace with your actual project ID
        },
        body: JSON.stringify({
          name,
          email,
          password,
          appType: 'ecommerce',
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // If registration is successful, redirect to login page
      history.push('/login');
    } catch (error) {
      console.error('Error registering:', error);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Register
      </Typography>
      <TextField label="Name" fullWidth value={name} onChange={(e) => setName(e.target.value)} />
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
      <Button variant="contained" color="primary" onClick={handleRegister}>
        Register
      </Button>
      <Typography>
        Already have an account? <span onClick={() => history.push('/login')}>Login</span>
      </Typography>
    </div>
  );
}

export default Register;
