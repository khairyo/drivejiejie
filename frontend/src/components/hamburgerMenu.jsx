import * as React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';

import '../css/HamburgerMenu.component.css';

export default function HamburgerMenu() {
  return (
    <Paper
      // component="form"
      className="hamburger-menu"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 43, borderRadius: '30px' }}
    >
      <IconButton sx={{ p: '10px' }} aria-label="menu">
        <MenuIcon />
      </IconButton>
    </Paper>
  );  
}