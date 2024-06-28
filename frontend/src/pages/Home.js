import React, { useState } from 'react';

// import components
import HamburgerMenu from '../components/HamburgerMenu.jsx';
import MapComponent from '../components/Map.jsx';
import GasStationDialog from '../components/GasStationDialog.jsx';
import VehicleServicesDialog from '../components/VehicleServicesDialog.jsx';
import Menu from '../components/Menu.jsx';
import driveJieJieLogo from '../images/drivejiejie-logo-blue.png';
import { Button } from '@mui/material';

// import styles
import '../App.css';
import { buttonStyle } from '../styles/buttonStyle.js';

export function Home() {
  const [gasDialogOpen, setGasDialogOpen] = useState(false);
  const [vehicleDialogOpen, setVehicleDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleGasDialogOpen = () => {
    setGasDialogOpen(true);
  };

  const handleGasDialogClose = () => {
    setGasDialogOpen(false);
  };

  const handleVehicleDialogOpen = () => {
    setVehicleDialogOpen(true);
  };

  const handleVehicleDialogClose = () => {
    setVehicleDialogOpen(false);
  };

  const handleSearch = (selectedService) => {
    setSearchQuery(selectedService);
    setGasDialogOpen(false);
    setVehicleDialogOpen(false);
  };

  const [menuOpen, setMenuOpen] = useState(false);

  // const handleMenuClick = () => {
  //     setMenuOpen(true);
  // };

  const handleMenuClose = () => {
      setMenuOpen(false);
  };
  const [email, setEmail] = useState('sushimallows8@gmail.com');
  const [userName, setUserName] = useState('Khairyo');

  return (
    <div className="App">
      <div className="menu-bar">
        <Menu
          email={email}
          userName={userName}
          open={menuOpen}
          onClose={handleMenuClose}
        />
        <Button sx={buttonStyle} variant="contained" color="primary">
          Carparks
        </Button>
        <Button sx={buttonStyle} variant="contained" color="primary" onClick={handleGasDialogOpen}>
          Gas stations
        </Button>
        <Button sx={buttonStyle} variant="contained" color="primary" onClick={handleVehicleDialogOpen}>
          Vehicle services
        </Button>
      </div>

      <MapComponent searchQuery={searchQuery} />

      <GasStationDialog open={gasDialogOpen} onClose={handleGasDialogClose} onSearch={handleSearch} />
      <VehicleServicesDialog open={vehicleDialogOpen} onClose={handleVehicleDialogClose} onServiceSelect={handleSearch} />

      {/* DriveJieJie logo */}
      <div className="drivejiejie-logo-container">
        <img src={driveJieJieLogo} alt="DriveJieJie Logo" className="drivejiejie-logo" />
        <span>Drive</span>JieJie
      </div>
    </div>
  );
}

export default Home;
