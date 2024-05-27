import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Loggin from './Loggin/Loggin';
import Dashboard from './Dashboards/Dashboard';
import DashboardMobility from './Dashboards/DashboardMobility';
import { DashboardHome } from './Dashboards/DashboardHome';


function App() {
  //const navigate = useNavigate();

  //navigate('/dashboard');
  
  return (
  <Router>
      <Routes>
        {/* <Route path="/loggin" element={<Loggin />} /> */}
        <Route path="/" element={<Loggin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboardMobility" element={<DashboardMobility />} />
        <Route path="/dashboardHome" element={<DashboardHome/>} />
      </Routes>
  </Router>
  );
}

export default App;
