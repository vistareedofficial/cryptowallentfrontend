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
import CreditCardInputPage from './components/CreditCardInputPage/CreditCardInputPage'
import BitcoinPaymentPage from './components/BitcoinPaymentPage/BitcoinPaymentPage'
import GiftCardPaymentPage from './components/GiftCardPaymentPage/GiftCardPaymentPage'
import Contact from './components/Contact/Contact'
import OtpVerification from './components/OtpVerification/OtpVerification';
import WithdrawCrypto from './components/WithdrawCrypto/WithdrawCrypto'
import PreWithdrawal from './components/PreWithdrawal/PreWithdrawal'
import DepositCrypto from './components/DepositCrypto/DepositCrypto'
// import DepositCrypto from './components/DepositCrypto'

function App() {
  return (
    <Router>
      <Navbar />
      <div className="main-content">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/RegularSubscription" element={<RegularSubscription />} />
        <Route path="/PremiumSubscription" element={<PremiumSubscription />} />
        <Route path="/VIPSubscription" element={<VIPSubscription />} />
        <Route path="/PreWithdrawal" element={<PreWithdrawal />} />
        <Route path="/PaymentOptionsPage" element={<PaymentOptionsPage />} />
        <Route path="/DepositCrypto" element={<DepositCrypto />} />
        <Route path="/CreditCardInputPage" element={<CreditCardInputPage />} />
        <Route path="/WithdrawCrypto" element={<WithdrawCrypto />} />
        <Route path="/BitcoinPaymentPage" element={<BitcoinPaymentPage />} />
        <Route path="/GiftCardPaymentPage" element={<GiftCardPaymentPage />} />
        <Route path="/OtpVerification" element={<OtpVerification />} />
        <Route path="/Contact" element={<Contact />} />

      </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
