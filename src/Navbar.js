import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './Screen/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { currentUser, logout } = useAuth();

  return (
    <div className="container mt-4">
      <ul className="nav justify-content-end">
        {currentUser ? (
          <>
            <li className="nav-item">
              <Link className="nav-link" to="/mantenimiento">Mantenimiento</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/registro">Registro</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/tablero">Tablero</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/seguimiento">Seguimiento</Link>
            </li>
            <li className="nav-item">
              <button className="nav-link btn btn-link" onClick={logout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
