import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Registration from './components/Registration';
import Login from './components/Login';
import ProtectedDashboard from './components/dashboard/ProtectedDashboard';
import DashboardHome from './components/dashboard/DashboardHome';
import DashboardProfile from './components/dashboard/DashboardProfile';
import DashboardSettings from './components/dashboard/DashboardSettings';
import Logout from './components/Logout';

const App = () => {
  return (
    <Router>
     

      <Routes>
        {/* Public Route: Login */}
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/registration" element={<Registration />} />


        {/* Protected Routes: Dashboard */}
        <Route path="/dashboard" element={<ProtectedDashboard />}>
          <Route path="home" element={<DashboardHome />} />
          <Route path="profile" element={<DashboardProfile />} />
          <Route path="settings" element={<DashboardSettings />} />
        </Route>

        {/* Redirect from root to login */}
        <Route path="*" element={<Login />} />
      </Routes>

    </Router>
  );
};

export default App;
