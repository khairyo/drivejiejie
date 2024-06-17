import React from 'react';

// import components
import HamburgerMenu from './components/HamburgerMenu.jsx';
import MapComponent from './components/Map.jsx';
import './App.css';

function App() {
  return (
    <div className="App">
      <HamburgerMenu />
      <MapComponent />
    </div>
  );
}

export default App;
