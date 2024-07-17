import React, { useState } from 'react';
import { Dialog, Button, TextField, CircularProgress } from '@mui/material';
import axios from 'axios';

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
      <div style={{ padding: 20 }}>
        <h2>Ask the AI</h2>
        <TextField
          label="Your Question"
          variant="outlined"
          fullWidth
          value={query}
          onChange={handleInputChange}
          style={{ marginBottom: '20px' }}
        />
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Submit'}
        </Button>
        {response && (
          <div style={{ marginTop: '20px' }}>
            <h3>Response:</h3>
            <p>{response}</p>
          </div>
        )}
        <Button onClick={onClose} variant="contained" color="secondary" style={{ marginTop: '20px' }}>
          Close
        </Button>
      </div>
    </Dialog>
  );
};

export default RobotDialog;
