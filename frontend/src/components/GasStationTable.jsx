import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Radio, RadioGroup, FormControlLabel } from '@mui/material';

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
    fontWeight: 'bold',
    fontFamily: 'var(--font-family)',
  },
};

const tableRowStyles = {
  '&:nth-of-type(even)': {
    backgroundColor: 'rgba(0, 123, 255, 0.1)',
  },
  fontFamily: 'var(--font-family)',
};

export default function GasStationTable() {
  const [headers, setHeaders] = useState([]);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

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
      { label: "", img: "../../images/esso-logo.png" },
      { label: "", img: "../../images/shell-logo.png" },
      { label: "", img: "../../images/spc-logo.png" },
      { label: "", img: "../../images/caltex-logo.png" },
      { label: "", img: "../../images/sinopec-logo.png" }
    ]);

  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const filteredRows = rows.filter(row => !row.includes("Learn More"));

  console.log("Headers", headers);


  return (
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
            <TableCell align="left"></TableCell>
            <RadioGroup row sx={{ display: 'contents' }}>
              {headers.slice(1).map((_, index) => (
                <TableCell key={index} align="right" sx={{ padding: '12px 20px' }}>
                  <FormControlLabel
                    value={`radio-${index}`}
                    control={<Radio sx={{ padding: '0' }} />}
                    label=""
                    sx={{ margin: '0' }}
                  />
                </TableCell>
              ))}
            </RadioGroup>
          </TableRow>

        </TableBody>
        
      </Table>
    </TableContainer>
  );
}
