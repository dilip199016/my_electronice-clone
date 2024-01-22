// src/components/Navbar.js
import './Navbar.css'
import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
// import Login from './Log';



function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://academics.newtonschool.co/api/v1/ecommerce/electronics/categories', {
          headers: {
            'projectId': 'YOUR_PROJECT_ID', // Replace with your actual project ID
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const jsonData = await response.json();
        setCategories(jsonData.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCategoryClick = (category) => {
    // Implement category redirection logic
    console.log(`Redirect to ${category} page`);
    handleMenuClose();
  };

  return (



    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <img className='image' src="https://upload.wikimedia.org/wikipedia/commons/a/ad/Reliance_Digital.svg" alt="Reliance Digital Logo" />
        </Typography>

        <div className='seacrh'><input placeholder='Search Items'></input> <button>Search</button></div>


        <IconButton
          size="large"
          edge="end"
          color="inherit"
          onClick={handleMenuClick}
          sx={{ marginRight: 2 }}
        >

          <MenuIcon />

        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          {categories.map((category) => (
            <MenuItem key={category.id} onClick={() => handleCategoryClick(category.name)}>
              {category.name}
            </MenuItem>
          ))}
        </Menu>
        {/* Add other Navbar options like Search Bar, Location Input, User Icon, My Cart, etc. */}
      </Toolbar>
    </AppBar>


  );
}

export default Navbar;
