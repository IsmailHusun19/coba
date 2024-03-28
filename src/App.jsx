import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './component/Navbar';
import Login from './pages/login';
import Home from './pages/Home';
import SignUp from './pages/signUp';
import AboutUs from './pages/AboutUs';
import { SortableTable } from './component/table';
import FormInputData from './pages/InputData';
import Footer from './component/footer';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<SortableTable />} />
        <Route path="/form" element={<FormInputData />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/aboutus" element={<AboutUs />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
