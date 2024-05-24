import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Loggin from './Loggin/Loggin';
import Dashboard from './Dashboard/Dashboard';

function App() {
  //const navigate = useNavigate();

  //navigate('/dashboard');
  
  return (
  <Router>
      <Routes>
        {/* <Route path="/loggin" element={<Loggin />} /> */}
        <Route path="/" element={<Loggin />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
  </Router>
  );
}

export default App;
