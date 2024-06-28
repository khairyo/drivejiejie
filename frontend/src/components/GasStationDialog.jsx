import React from 'react';
import { Divider, Dialog, DialogContent, DialogTitle } from '@mui/material';
import GasStationTable from './GasStationTable';

export default function GasStationDialog({ open, onClose, onSearch }) {
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
          paddingLeft: '20px',
          paddingRight: '20px',
          paddingTop: '10px',
          paddingBottom: '5px',
          borderRadius: '30px',
        },
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
        <GasStationTable onSearch={onSearch} />
      </DialogContent>
    </Dialog>
  );
}
