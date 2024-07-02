import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import HomePage from './pages/Home';
import AdminLogin from './pages/login/admin_login';
import AgentLogin from './pages/login/agent_login';
import CustomerLogin from './pages/login/customer_login';
import AdminDashboard from './pages/admin_db';
import AgentDashboard from './pages/agent_db';
import CustomerDashboard from './pages/customer_db';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/agent-login" element={<AgentLogin />} />
          <Route path="/customer-login" element={<CustomerLogin />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} /> {/* Add the route for Admin Dashboard */}
          <Route path="/agent-dashboard" element={<AgentDashboard />} />
          <Route path="/customer-dashboard" element={<CustomerDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
