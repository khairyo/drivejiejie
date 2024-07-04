import React from 'react';
import { useState } from 'react';
import { Button } from '@mui/material';

// import components
import MapComponent from './components/Map.jsx';
import GasStationDialog from './components/GasStationDialog.jsx';
import Menu from './components/Menu.jsx';

// import css
import './App.css';

export default function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </Router>
  );
}