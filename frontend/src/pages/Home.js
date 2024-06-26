import React, { useState } from 'react';

// import components
import HamburgerMenu from '../components/HamburgerMenu.jsx';
import MapComponent from '../components/Map.jsx';
import GasStationDialog from '../components/GasStationDialog.jsx';
import driveJieJieLogo from '../images/drivejiejie-logo-blue.png';
import { Button } from '@mui/material';

// import styles
import '../App.css';
import { buttonStyle } from '../styles/buttonStyle.js';

export function Home() {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearch = (selectedStation) => {
    setSearchQuery(`${selectedStation} gas station`);
    setOpen(false);
  };

  return (
    <div className="App">
      <div className="menu-bar">
        <HamburgerMenu className="hamburger-menu" />
        <Button sx={buttonStyle} variant="contained" color="primary">
          Carparks
        </Button>
        <Button sx={buttonStyle} variant="contained" color="primary" onClick={handleClickOpen}>
          Gas stations
        </Button>
        <Button sx={buttonStyle} variant="contained" color="primary">
          Vehicle services
        </Button>
      </div>

      <MapComponent searchQuery={searchQuery} />

      <GasStationDialog open={open} onClose={handleClose} onSearch={handleSearch} />

      <div className="drivejiejie-logo-container">
          <img src={driveJieJieLogo} alt="DriveJieJie Logo" className="drivejiejie-logo" />
          <span>Drive</span>JieJie
      </div>
    </div>
  );
}
