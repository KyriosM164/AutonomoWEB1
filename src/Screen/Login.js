import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './Login.css'; // Importa el archivo de estilos

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));

    if (storedUser && storedUser.username === username && storedUser.password === password) {
      login({ username });
      navigate('/'); // Redirige al usuario a la página principal
    } else {
      alert('Credenciales incorrectas');
    }
  };

  return (
    <div className="container mt-4">
      <div className="login-form">
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary mt-4 w-100">Login</button>
          <Link to="/register" className="btn btn-secondary mt-4 ml-2">Register</Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
