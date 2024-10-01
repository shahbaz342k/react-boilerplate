import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import ProtectedDashboard from './ProtectedDashboard';
import Registration from './components/Registration';
import Login from './components/Login';
import Userlogin from './components/Userlogin';
// import Nav from './components/Nav';
import DashboardHome from './components/UserDashboard/DashboardHome';
import ProtectedDashboard from './components/UserDashboard/ProtectedDashboard';
import AddBill from './components/UserDashboard/AddBill';
import ListBill from './components/UserDashboard/ListBill';
import './App.css';


const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public login route */}
        <Route path="/" element={<Userlogin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />

        <Route path="/dashboard" element={<ProtectedDashboard />}>
          <Route path="home" element={<DashboardHome />} />
          <Route path="add-bill" element={< AddBill/>} />
          <Route path="list-bills" element={<ListBill />} />
        </Route>

        {/* Redirect from root to login */}
        <Route path="*" element={<Login />} />

        {/* Other routes */}
      </Routes>
    </Router>
  );
};

export default App;
