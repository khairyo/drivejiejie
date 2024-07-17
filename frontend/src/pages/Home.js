import React, { useState } from 'react';
import { Button } from '@mui/material';
import axios from 'axios';
import MapComponent from '../components/Map.jsx';
import GasStationDialog from '../components/GasStationDialog.jsx';
import VehicleServicesDialog from '../components/VehicleServicesDialog.jsx';
import Menu from '../components/Menu.jsx';
import driveJieJieLogo from '../images/drivejiejie-logo-blue.png';
import { buttonStyle } from '../styles/buttonStyle.js';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput
} from '@chatscope/chat-ui-kit-react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';

export function Home() {
  const [gasDialogOpen, setGasDialogOpen] = useState(false);
  const [vehicleDialogOpen, setVehicleDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState('sushimallows8@gmail.com');
  const [userName, setUserName] = useState('Khairyo');
  const [messages, setMessages] = useState([]);
  const [chatOpen, setChatOpen] = useState(false);

  const handleGasDialogOpen = () => {
    setGasDialogOpen(true);
  };

  const handleGasDialogClose = () => {
    setGasDialogOpen(false);
  };

  const handleVehicleDialogOpen = () => {
    setVehicleDialogOpen(true);
  };

  const handleVehicleDialogClose = () => {
    setVehicleDialogOpen(false);
  };

  const handleSearch = (selectedService) => {
    setSearchQuery(selectedService);
    setSearchType(selectedService.toLowerCase().includes('carpark') ? 'carpark' : '');
    setGasDialogOpen(false);
    setVehicleDialogOpen(false);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  const handleCarparksSearch = () => {
    setSearchQuery('carpark');
    setSearchType('carpark');
  };

  // const handleGasStationsSearch = () => {
  //   setSearchQuery('gas station');
  //   setSearchType('');
  // };

  // const handleVehicleServicesSearch = () => {
  //   setSearchQuery('vehicle service');
  //   setSearchType('');
  // };

  const handleSendMessage = async (message) => {
    const newMessage = {
      content: message,
      direction: 'outgoing',
      sender: userName,
    };
    setMessages([...messages, newMessage]);

    const response = await axios.post('http://127.0.0.1:5000/api/chat', { message });
    const reply = {
      content: response.data.reply,
      direction: 'incoming',
      sender: 'Ollama',
    };
    setMessages([...messages, newMessage, reply]);
  };

  return (
    <div className="App">
      <div className="menu-bar">
        <Menu
          email={email}
          userName={userName}
          open={menuOpen}
          onClose={handleMenuClose}
        />
        <Button sx={buttonStyle} variant="contained" color="primary" onClick={handleCarparksSearch}>
          Carparks
        </Button>
        <Button sx={buttonStyle} variant="contained" color="primary" onClick={handleGasDialogOpen}>
          Gas stations
        </Button>
        <Button sx={buttonStyle} variant="contained" color="primary" onClick={handleVehicleDialogOpen}>
          Vehicle services
        </Button>
      </div>

      <MapComponent searchQuery={searchQuery} searchType={searchType} />

      <GasStationDialog open={gasDialogOpen} onClose={handleGasDialogClose} onSearch={handleSearch} />
      <VehicleServicesDialog open={vehicleDialogOpen} onClose={handleVehicleDialogClose} onServiceSelect={handleSearch} />

      {/* DriveJieJie logo */}
      <div className="drivejiejie-logo-container">
        <img src={driveJieJieLogo} alt="DriveJieJie Logo" className="drivejiejie-logo" />
        <span>Drive</span>JieJie
      </div>

      {/* Chatbot Icon */}
      <div className="chatbot-icon" onClick={() => setChatOpen(!chatOpen)}>
        <img src="/chatbot-icon.png" alt="Chatbot Icon" />
      </div>

      {/* Chat Dialog */}
      {chatOpen && (
        <div className="chat-dialog">
          <MainContainer>
            <ChatContainer>
              <MessageList>
                {messages.map((msg, index) => (
                  <Message key={index} model={{ message: msg.content, direction: msg.direction, sender: msg.sender }} />
                ))}
              </MessageList>
              <MessageInput placeholder="Type a message..." onSend={handleSendMessage} />
            </ChatContainer>
          </MainContainer>
        </div>
      )}
    </div>
  );
}

export default Home;
