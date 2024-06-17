import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Loggin from './Loggin/Loggin';
import Dashboard from './Dashboards/Dashboard';
import DashboardMobility from './Dashboards/DashboardMobility';
import { DashboardHome } from './Dashboards/DashboardHome';
import { DashboardC5 } from './Dashboards/DashboardC5';
import LandingPage from './LandingPage/LandingPage';

function App() {
  //const navigate = useNavigate();

  //navigate('/dashboard');
  
  return (
  <Router>
      <Routes>
        {/* <Route path="/loggin" element={<Loggin />} /> */}
        <Route path="/" element={<LandingPage />} />  {/* Nueva ruta predeterminada */}
        <Route path="/loggin" element={<Loggin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboardMobility" element={<DashboardMobility />} />
        <Route path="/dashboardHome" element={<DashboardHome />} />
        <Route path="/dashboardC5" element={<DashboardC5 />} />
      </Routes>
  </Router>
  );
}

export default App;
