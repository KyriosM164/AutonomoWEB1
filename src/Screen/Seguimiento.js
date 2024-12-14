import React, { useState } from 'react';
import { useAssets } from './AssetsContext';

const Seguimiento = () => {
  const [nombreActivo, setNombreActivo] = useState('');
  const [ubicacionActivo, setUbicacionActivo] = useState('');
  const [personalAsignado, setPersonalAsignado] = useState('');
  const [error, setError] = useState('');
  const { assets, addAsset } = useAssets();

  const validarCampos = () => {
    const nombreValido = /^[a-zA-Z\s]+$/.test(nombreActivo);
    const ubicacionValida = /^[a-zA-Z0-9\s]+$/.test(ubicacionActivo);
    const personalValido = /^[a-zA-Z\s]+$/.test(personalAsignado);

    if (!nombreActivo || !ubicacionActivo || !personalAsignado) {
      setError('Todos los campos son obligatorios.');
      return false;
    }

    if (!nombreValido) {
      setError('El nombre del activo solo puede contener letras.');
      return false;
    }

    if (!ubicacionValida) {
      setError('La ubicación del activo solo puede contener letras y números.');
      return false;
    }

    if (!personalValido) {
      setError('El personal asignado solo puede contener letras.');
      return false;
    }

    setError('');
    return true;
  };

  const agregarActivo = () => {
    if (validarCampos()) {
      const activo = {
        nombre: nombreActivo,
        ubicacion: ubicacionActivo,
        personalAsignado: personalAsignado
      };
      addAsset(activo);
      setNombreActivo('');
      setUbicacionActivo('');
      setPersonalAsignado('');
    }
  };

  return (
    <div className="container mt-4">
      <div className="mt-4">
        <input
          type="text"
          className="form-control my-2"
          placeholder="Nombre del Activo"
          value={nombreActivo}
          onChange={(e) => setNombreActivo(e.target.value)}
        />
        <input
          type="text"
          className="form-control my-2"
          placeholder="Ubicación del Activo"
          value={ubicacionActivo}
          onChange={(e) => setUbicacionActivo(e.target.value)}
        />
        <input
          type="text"
          className="form-control my-2"
          placeholder="Personal Asignado"
          value={personalAsignado}
          onChange={(e) => setPersonalAsignado(e.target.value)}
        />
        {error && <div className="alert alert-danger mt-2">{error}</div>}
        <button
          className="btn btn-primary mt-2"
          onClick={agregarActivo}
          disabled={!nombreActivo || !ubicacionActivo || !personalAsignado}
        >
          Agregar Activo
        </button>
      </div>
      <h3 className="mt-4">Activos agregados:</h3>
      <div id="listaActivos">
        {assets.map((activo, index) => (
          <div className="card my-2" style={{ width: '18rem' }} key={index}>
            <div className="card-body">
              <h5 className="card-title">{activo.nombre}</h5>
              <p className="card-text">Ubicación: {activo.ubicacion}</p>
              <p className="card-text">Personal Asignado: {activo.personalAsignado}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Seguimiento;
