import * as React from 'react'; 
import { Button, Divider, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from '@mui/material'; 
import { buttonStyle } from '../styles/buttonStyle.js'; 

// import gas station table
import GasStationTable from './GasStationTable';
 
export default function GasStationDialog({ open, onClose }) { 

  return ( 
    <Dialog 
      open={open} 
      onClose={onClose} 
      aria-labelledby="alert-dialog-title" 
      aria-describedby="alert-dialog-description" 
      className="gas-station-dialog" 
      maxWidth={false} 
      PaperProps={{
        sx: {
          width: 'auto',
          maxWidth: 'none',
          fontFamily: 'var(--font-family)',
          padding: '5px',
          paddingTop: '10px',
          borderRadius: '30px',
        }
      }}
    > 

      {/* dialog title */}
      <DialogTitle 
        id="alert-dialog-title"
        sx={{ 
          textAlign: 'center',
          fontFamily: 'var(--font-family)',
          fontSize: '18px',
          fontWeight: 'bold',
          color: 'var(--primary-color)',
        }}
      > 
        {"Compare Today's Fuel Prices"} 
      </DialogTitle> 

      <Divider 
        sx={{ 
          backgroundColor: 'rgba(0, 123, 255, 0.5)',
          width: '90%',
          margin: 'auto',
        }}
      /> 
        
      {/* dialog content */}
      <DialogContent sx={{ fontFamily: 'var(--font-family)' }}> 
        {/* <DialogContentText id="alert-dialog-description"> 
        </DialogContentText>  */}
        <GasStationTable />
      </DialogContent> 

      <DialogActions> 
        <Button sx={{ buttonStyle }} onClick={onClose} variant="contained">Search</Button> 
      </DialogActions> 
    </Dialog> 
  ); 
}