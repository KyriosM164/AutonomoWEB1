import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Todos los campos son obligatorios');
      return;
    }
    const usernamePattern = /^[A-Z][a-z]*$/;
    const passwordPattern = /^(?=.*[A-Z]).{6,8}$/;
    if (!usernamePattern.test(username)) {
      setError('El nombre de usuario debe comenzar con una letra mayúscula y contener solo letras');
      return;
    }
    if (!passwordPattern.test(password)) {
      setError('La contraseña debe tener entre 6 y 8 caracteres y contener al menos una letra mayúscula');
      return;
    }
    register(username, password);
    setUsername('');
    setPassword('');
    setError('');
    alert('Usuario registrado exitosamente');
    navigate('/login'); // Redirige al usuario a la página de login después del registro
  };

  return (
    <div className="container mt-4">
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Usuario:</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <span className="error">{error}</span>}
        <button type="submit" className="btn btn-primary mt-4">Registrarse</button>
        <button type="button" className="btn btn-secondary mt-4 ml-2" onClick={() => navigate('/login')}>Ir a Login</button>
      </form>
    </div>
  );
};

export default Register;
