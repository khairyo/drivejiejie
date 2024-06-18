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
        <Button className="button" variant="contained" color="primary">Carparks</Button> 
        <Button className="button" variant="contained" color="primary" onClick={handleClickOpen}>Gas stations</Button> 
        <Button className="button" variant="contained" color="primary">Vehicle services</Button> 
      </div> 
 
      <MapComponent /> 
 
      <GasStationDialog open={open} onClose={handleClose} /> 
    </div> 
  ); 
} 
 
export default App;