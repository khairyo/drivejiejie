import React from 'react'; 
import { useState } from 'react'; 
import { Button } from '@mui/material'; 
 
// import components 
import HamburgerMenu from './components/HamburgerMenu.jsx'; 
import MapComponent from './components/Map.jsx'; 
import GasStationDialog from './components/GasStationDialog.jsx'; 
 
// import css 
import './App.css'; 
 
function App() { 

  // MUI component custom styling (button)
  const buttonStyles = {
    backgroundColor: 'var(--primary-color)',
    borderRadius: 'var(--border-radius)',
    color: 'white',
    textTransform: 'none',
    fontFamily: 'var(--font-family)',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    marginLeft: '10px',
  };
 
  // gas station dialog 
  const [open, setOpen] = useState(false); 
  const handleClickOpen = () => { 
    setOpen(true); 
  }; 
  const handleClose = () => { 
    setOpen(false); 
  }; 
 
  return ( 
    <div className="App"> 
 
      <div className="menu-bar"> 
        <HamburgerMenu className="hamburger-menu"/> 
        <Button sx={buttonStyles} variant="contained">Carparks</Button> 
        <Button sx={buttonStyles} variant="contained" onClick={handleClickOpen}>Gas stations</Button> 
        <Button sx={buttonStyles} variant="contained">Vehicle services</Button> 
      </div> 
 
      <MapComponent /> 
 
      <GasStationDialog open={open} onClose={handleClose} /> 
    </div> 
  ); 
} 
 
export default App;