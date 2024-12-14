import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Navbar from './Navbar';
import Registro from './Screen/Registro';
import Mantenimiento from './Screen/Mantenimiento';
import Seguimiento from './Screen/Seguimiento';
import Tablero from './Screen/Tablero';
import { AssetsProvider } from './Screen/AssetsContext';
import { AuthProvider } from './Screen/AuthContext';
import Register from './Screen/Register';
import Login from './Screen/Login';
import ProtectedRoute from './ProtectedRoute';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <AuthProvider>
      <AssetsProvider>
        <Router>
          <div className="App">
            <Header title="Activos Fijos" />
            <Navbar />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<div>Hola</div>} />
              <Route path="/mantenimiento" element={<ProtectedRoute element={<Mantenimiento />} />} />
              <Route path="/registro" element={<ProtectedRoute element={<Registro />} />} />
              <Route path="/tablero" element={<ProtectedRoute element={<Tablero />} />} />
              <Route path="/seguimiento" element={<ProtectedRoute element={<Seguimiento />} />} />
            </Routes>
          </div>
        </Router>
      </AssetsProvider>
    </AuthProvider>
  );
}

export default App;
