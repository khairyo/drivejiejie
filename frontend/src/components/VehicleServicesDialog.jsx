import React from 'react';
import { Divider, Dialog, DialogContent, DialogTitle, Button, List, ListItem } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

// custom styling
const buttonStyles = {
  backgroundColor: 'var(--primary-color)',
  borderRadius: '8px',
  color: 'white',
  textTransform: 'none',
  fontFamily: 'var(--font-family)',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
  display: 'flex',
  justifyContent: 'space-between',
  padding: '10px 20px',
  whiteSpace: 'normal',
};

const services = [
  { label: "General maintenance and repairs", query: "auto repair shops" },
  { label: "Vehicle towing", query: "vehicle towing" },
  { label: "Car wash", query: "car wash" },
  { label: "Car detailing", query: "car detailing" },
];

const VehicleServicesDialog = ({ open, onClose, onServiceSelect }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="vehicle-services-dialog-title"
      aria-describedby="vehicle-services-dialog-description"
      className="vehicle-services-dialog"
      PaperProps={{
        sx: {
          width: '60%',
          fontFamily: 'var(--font-family)',
          padding: '5px',
          paddingTop: '10px',
          borderRadius: '30px',
        },  
      }}
    >
      {/* Dialog title */}
      <DialogTitle
        id="vehicle-services-dialog-title"
        sx={{
          textAlign: 'center',
          fontFamily: 'var(--font-family)',
          fontSize: '18px',
          fontWeight: 'bold',
          color: 'var(--primary-color)',
          marginBottom: '-5px',
        }}
      >
        How can we assist you?
      </DialogTitle>

      <Divider
        sx={{
          backgroundColor: 'rgba(0, 123, 255, 0.5)',
          width: '90%',
          margin: 'auto',
          marginBottom: '-5px',
        }}
      />

      {/* Dialog content */}
      <DialogContent>
        <List>
          {services.map((service, index) => (
            <ListItem key={index} sx={{ justifyContent: 'center' }}>
              <Button
                variant="contained"
                color="primary"
                sx={{ ...buttonStyles, width: '100%' }}
                onClick={() => onServiceSelect(service.query)}
                endIcon={<KeyboardArrowRightIcon />}
              >
                {service.label}
              </Button>
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
};

export default VehicleServicesDialog;
