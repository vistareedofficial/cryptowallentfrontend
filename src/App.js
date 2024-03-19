import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import SignUp from './components/Signup/Signup';
import Login from './components/Login/Login';

import Footer from './components/Footer/footer';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Dashboard from './components/Dashboard/Dashboard'; // Import your Dashboard component
import RegularSubscription from './components/RegularSubscription/RegularSubscription'; // Import RegularSubscription component
import PremiumSubscription from './components/PremiumSubscription/PremiumSubscription '
import VIPSubscription from './components/VIPSubscription/VIPSubscription ';
import PaymentOptionsPage from './components/PaymentOptionsPage/PaymentOptionsPage';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/RegularSubscription" element={<RegularSubscription />} />
        <Route path="/PremiumSubscription" element={<PremiumSubscription />} />
        <Route path="/VIPSubscription" element={<VIPSubscription />} />
        <Route path="/PaymentOptionsPage" element={<PaymentOptionsPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
