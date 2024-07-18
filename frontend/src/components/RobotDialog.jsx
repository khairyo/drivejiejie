import React, { useState } from 'react';
import { Dialog, Button, TextField, CircularProgress } from '@mui/material';
import axios from 'axios';
import '../App.css'; // Assuming you have a CSS file for global styles

const buttonStyles = {
  backgroundColor: 'var(--primary-color)',
  borderRadius: 'var(--border-radius)',
  color: 'white',
  textTransform: 'none',
  fontFamily: 'var(--font-family)',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
  fontSize: '14px',
};

const textFieldStyles = {
  fontFamily: 'var(--font-family)',
};

const RobotDialog = ({ open, onClose }) => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async () => {
    if (!query) return;

    setLoading(true);
    setResponse('');

    try {
      const res = await axios.post('http://localhost:5001/api/ollama', { query }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setResponse(res.data.answer || 'No answer from AI.');
    } catch (error) {
      setResponse('There was an error processing your request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <div className="robot-dialog-container">
        <h2 className="dialog-title">Ask DriveJieJie anything!</h2>
        <TextField
          label="Question"
          variant="outlined"
          fullWidth
          value={query}
          onChange={handleInputChange}
          className="dialog-input"
          sx={textFieldStyles}
        />
        <div style={{ textAlign: 'right' }}>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            disabled={loading}
            sx={{ ...buttonStyles, marginTop: '15px' }}
          >
            {loading ? <CircularProgress size={22} /> : 'Submit'}
          </Button>
        </div>
        {response && (
          <div className="response-container">
            <p className="response-text">{response}</p>
          </div>
        )}
      </div>
    </Dialog>
  );
};

export default RobotDialog;
