import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectedRoutes from './components/ProtectedRoutes';

// import pages
import { Home } from './pages/Home'
import { LoginPage } from './pages/loginPage';
import { RegisterPage } from './pages/registerPage';
import { Clear } from './pages/clear';
import CameraOCR from './components/CameraOCR';

// import css
import './App.css';

export default function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/clear' element={<Clear />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* <Route element={<ProtectedRoutes />}> */}
          <Route path="/" element={<Home />} />
          {/* </Route> */}

          <Route path="/camera-ocr" element={<CameraOCR />} />

        </Routes>
      </div>
    </Router>
  );
}