// src/App.js
import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import { Login } from '@mui/icons-material';

import Log from'./log'
import SignUpPage from './components/Login';

function App() {
  return (
    <div className="App">
      <Navbar/>
      {/* <ProductList /> */}
      <switch/>
      Add other components and features
      <ProductList/>
      <SignUpPage/>
<Log/>
    </div>
  );
}

export default App;
