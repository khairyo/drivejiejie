import React from 'react';

// import components
import HamburgerMenu from './components/HamburgerMenu.jsx';
import MapComponent from './components/Map.jsx';
import { Button } from '@mui/material';


function App() {
  return (
    <div className="App">

      <div className="menu-bar">
        <HamburgerMenu className="hamburger-menu"/>
        <Button className="button" variant="contained" color="primary">Carparks</Button>
        <Button className="button" variant="contained" color="primary">Gas stations</Button>
        <Button className="button" variant="contained" color="primary">Vehicle services</Button>
      </div>

      <MapComponent />
    </div>
  );
}

export default App;