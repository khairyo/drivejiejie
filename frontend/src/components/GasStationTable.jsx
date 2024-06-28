import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Radio, RadioGroup, FormControlLabel, Button } from '@mui/material';

// MUI custom styling (table)
const tableContainerStyles = {
  borderRadius: '25px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
  width: 'auto',
  fontFamily: 'var(--font-family)',
};

const tableHeadStyles = {
  backgroundColor: 'var(--primary-color)',
  '& th': {
    color: 'white',
    fontFamily: 'var(--font-family)',
  },
};

const tableRowStyles = {
  '&:nth-of-type(even)': {
    backgroundColor: 'rgba(0, 123, 255, 0.1)',
  },
  fontFamily: 'var(--font-family)',
};

const buttonStyles = {
  backgroundColor: 'var(--primary-color)',
  borderRadius: 'var(--border-radius)',
  color: 'white',
  textTransform: 'none',
  fontFamily: 'var(--font-family)',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
  marginLeft: '10px',
};

export default function GasStationTable({ onSearch }) {
  const [headers, setHeaders] = useState([]);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStation, setSelectedStation] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/fuel-prices');
        setRows(response.data.rows);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();

    setHeaders([
      { label: "Grade", img: null },
      { label: "Esso", img: "../../images/esso-logo.png" },
      { label: "Shell", img: "../../images/shell-logo.png" },
      { label: "SPC", img: "../../images/spc-logo.png" },
      { label: "Caltex", img: "../../images/caltex-logo.png" },
      { label: "Sinopec", img: "../../images/sinopec-logo.png" }
    ]);

  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const filteredRows = rows.filter(row => !row.includes("Learn More"));

  const handleSearchClick = () => {
    onSearch(selectedStation);
  };

  return (
    <div>
      <TableContainer component={Paper} sx={tableContainerStyles}>
        <Table sx={{ minWidth: 650 }} aria-label="fuel prices table">
          <TableHead sx={tableHeadStyles}>
            <TableRow>
              {headers.map((header, index) => (
                <TableCell key={index} align={index === 0 ? 'left' : 'right'}>
                  {header.img ? (
                    <img src={header.img} alt={header.label} style={{ maxHeight: '35px' }} />
                  ) : (
                    header.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row, rowIndex) => (
              <TableRow key={rowIndex} sx={tableRowStyles}>
                {row.map((cell, cellIndex) => (
                  <TableCell key={cellIndex} align={cellIndex === 0 ? 'left' : 'right'}>
                    {cell}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            <TableRow sx={{ height: 'auto' }}>
              <TableCell align="left">Select</TableCell>
              {headers.slice(1).map((header, index) => (
                <TableCell key={index} align="right" sx={{ padding: '12px 20px' }}>
                  <FormControlLabel
                    value={header.label}
                    control={<Radio sx={{ padding: '0' }} />}
                    label=""
                    sx={{ margin: '0' }}
                    checked={selectedStation === header.label}
                    onChange={(e) => setSelectedStation(e.target.value)}
                  />
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Button sx={{ marginTop: 2, ...buttonStyles }} onClick={handleSearchClick} variant="contained" color="primary">
        Search
      </Button>
    </div>
  );
}
