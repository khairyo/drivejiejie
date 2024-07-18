import React, { useState } from 'react';
import { IconButton,  Button } from '@mui/material';

// import components
import MapComponent from '../components/Map.jsx';
import GasStationDialog from '../components/GasStationDialog.jsx';
import VehicleServicesDialog from '../components/VehicleServicesDialog.jsx';
import Menu from '../components/Menu.jsx';
import RobotDialog from '../components/RobotDialog.jsx';

// import images
import driveJieJieLogo from '../images/drivejiejie-logo-blue.png';
import robotButton from '../images/chatbot.png';

// import styles
import '../App.css';
import { buttonStyle } from '../styles/buttonStyle.js';

export function Home() {
  const [gasDialogOpen, setGasDialogOpen] = useState(false);
  const [vehicleDialogOpen, setVehicleDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState('sushimallows8@gmail.com');
  const [userName, setUserName] = useState('Khairyo');
  const [robotDialogOpen, setRobotDialogOpen] = useState(false); 
  
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
    setSearchType(selectedService.toLowerCase().includes('carpark') ? 'carpark' : '');
    setGasDialogOpen(false);
    setVehicleDialogOpen(false);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  const handleCarparksSearch = () => {
    setSearchQuery('carpark');
    setSearchType('carpark');
  };

  const handleGasStationsSearch = () => {
    setSearchQuery('gas station');
    setSearchType('');
  };

  const handleVehicleServicesSearch = () => {
    setSearchQuery('vehicle service');
    setSearchType('');
  };

  const handleRobotDialogOpen = () => {
    setRobotDialogOpen(true);
  };

  const handleRobotDialogClose = () => {
    setRobotDialogOpen(false);
  };

  return (
    <div className="App">
      <div className="menu-bar">
        <Menu
          email={email}
          userName={userName}
          open={menuOpen}
          onClose={handleMenuClose}
        />
        <Button sx={buttonStyle} variant="contained" color="primary" onClick={handleCarparksSearch}>
          Carparks
        </Button>
        <Button sx={buttonStyle} variant="contained" color="primary" onClick={handleGasDialogOpen}>
          Gas stations
        </Button>
        <Button sx={buttonStyle} variant="contained" color="primary" onClick={handleVehicleDialogOpen}>
          Vehicle services
        </Button>
      </div>

      <MapComponent searchQuery={searchQuery} searchType={searchType} />

      <GasStationDialog open={gasDialogOpen} onClose={handleGasDialogClose} onSearch={handleSearch} />
      <VehicleServicesDialog open={vehicleDialogOpen} onClose={handleVehicleDialogClose} onServiceSelect={handleSearch} />

      {/* DriveJieJie logo */}
      <div className="drivejiejie-logo-container">
        <img src={driveJieJieLogo} alt="DriveJieJie Logo" className="drivejiejie-logo" />
        <span>Drive</span>JieJie
      </div>

      {/* Robot Button */}
      <IconButton
        onClick={handleRobotDialogOpen}
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          padding: 8,
          borderRadius: '50%',
          backgroundColor: '#1887fd',
          boxShadow: '0 0 10px rgba(0,0,0,0.2)',
        }}
      >
        <img src={robotButton} alt="Robot Button" style={{ width: 40, height: 40 }} />
      </IconButton>

      {/* Robot Dialog */}
      <RobotDialog open={robotDialogOpen} onClose={handleRobotDialogClose} />
    </div>
  );
}

export default Home;