import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Register from './components/Register';
import Dasboard from './components/Dashboard';
import ProductForm from './components/ProductForm';
import ClientForm from './components/ClientForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/dashboard" element={<Dasboard/>} />
        <Route path="/products" element={<ProductForm/>} />
        <Route path="/ClientForm" element={<ClientForm/>} />
      </Routes>
    </Router>
  );
}

export default App;