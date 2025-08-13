import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import React from 'react';

import './App.css';
import './pages/Admin'
import Admin from './pages/Admin';
import Order from './components/Order';
import UserHome from './pages/UserHome';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserHome/>} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/order/:id" element={<Order/>} />
      </Routes>
    </Router>
  );
}

export default App;
