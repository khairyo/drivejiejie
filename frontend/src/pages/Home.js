import React from 'react';
import { useState } from 'react';  

// import components
import HamburgerMenu from '../components/HamburgerMenu.jsx';
import MapComponent from '../components/Map.jsx';
import GasStationDialog from '../components/GasStationDialog.jsx';
import { Button } from '@mui/material';

// import styles
import '../App.css';
import { buttonStyle } from '../styles/buttonStyle.js';

export function Home() {
     
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
                <HamburgerMenu className="hamburger-menu" />
                <Button sx={buttonStyle} variant="contained" color="primary">Carparks</Button>
                <Button sx={buttonStyle} variant="contained" color="primary" onClick={handleClickOpen}>Gas stations</Button>
                <Button sx={buttonStyle} variant="contained" color="primary">Vehicle services</Button>
            </div>

            <MapComponent />

            <GasStationDialog open={open} onClose={handleClose} />
            
        </div>
    );
}
