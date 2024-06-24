import React from 'react';

// import components
import HamburgerMenu from '../components/HamburgerMenu.jsx';
import MapComponent from '../components/Map.jsx';
import { Button } from '@mui/material';
import { useState } from 'react';  
import GasStationDialog from '../components/GasStationDialog.jsx';


// import css
import '../App.css';

export function Home() {
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
                <HamburgerMenu className="hamburger-menu" />
                <Button sx={buttonStyles} variant="contained" color="primary">Carparks</Button>
                <Button sx={buttonStyles} variant="contained" color="primary" onClick={handleClickOpen}>Gas stations</Button>
                <Button sx={buttonStyles} variant="contained" color="primary">Vehicle services</Button>
            </div>

            <MapComponent />

            <GasStationDialog open={open} onClose={handleClose} />
            
        </div>
    );
}
