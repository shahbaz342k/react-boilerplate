import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import ProtectedDashboard from './ProtectedDashboard';
import Registration from './components/Registration';
import Login from './components/Login';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public login route */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />

        {/* Protected dashboard route */}
        {/* <Route path="/dashboard" component={ProtectedDashboard} /> */}

        {/* Other routes */}
      </Routes>
    </Router>
  );
};

export default App;
