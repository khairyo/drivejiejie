import * as React from 'react'; 
// import Button from '@mui/material/Button'; 
import Dialog from '@mui/material/Dialog'; 
// import DialogActions from '@mui/material/DialogActions'; 
import DialogContent from '@mui/material/DialogContent'; 
import DialogContentText from '@mui/material/DialogContentText'; 
import DialogTitle from '@mui/material/DialogTitle'; 
 
// import css 
// import '../css/gas-station-dialog.module.css'; 
 
export default function GasStationDialog({ open, onClose }) { 
  return ( 
    <Dialog 
      open={open} 
      onClose={onClose} 
      aria-labelledby="alert-dialog-title" 
      aria-describedby="alert-dialog-description" 
      className="gas-station-dialog" 
    > 
      <DialogTitle id="alert-dialog-title"> 
        {"Compare Latest Fuel Prices"} 
      </DialogTitle> 
      <DialogContent> 
        <DialogContentText id="alert-dialog-description"> 
          bing bing bong bong
        </DialogContentText> 
      </DialogContent> 
      {/* <DialogActions> 
        <Button onClick={onClose}>Disagree</Button> 
        <Button onClick={onClose} autoFocus> 
          Agree 
        </Button> 
      </DialogActions>  */}
    </Dialog> 
  ); 
}