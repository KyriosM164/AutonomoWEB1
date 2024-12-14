import React, { useState } from 'react';

const Registro = () => {
  const [nombreActivo, setNombreActivo] = useState('');
  const [ubicacionActivo, setUbicacionActivo] = useState('');
  const [fechaAdquisicion, setFechaAdquisicion] = useState('');
  const [valorActivo, setValorActivo] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    const nombrePattern = /^[A-Za-z\s]+$/;
    const ubicacionPattern = /^[A-Za-z0-9\s]+$/;

    if (!nombreActivo) {
      newErrors.nombreActivo = 'El nombre es obligatorio';
    } else if (!nombrePattern.test(nombreActivo)) {
      newErrors.nombreActivo = 'El nombre solo puede contener letras';
    }

    if (!ubicacionActivo) {
      newErrors.ubicacionActivo = 'La ubicación es obligatoria';
    } else if (!ubicacionPattern.test(ubicacionActivo)) {
      newErrors.ubicacionActivo = 'La ubicación solo puede contener letras y números';
    }

    if (!fechaAdquisicion) newErrors.fechaAdquisicion = 'La fecha es obligatoria';

    // Validación adicional para el valor
    if (!valorActivo) {
      newErrors.valorActivo = 'El valor es obligatorio';
    } else if (valorActivo < 0) {
      newErrors.valorActivo = 'El valor no puede ser negativo';
    }

    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const activo = { nombre: nombreActivo, ubicacion: ubicacionActivo, fechaAdquisicion, valor: valorActivo };
    const activos = JSON.parse(localStorage.getItem('activos')) || [];
    activos.push(activo);
    localStorage.setItem('activos', JSON.stringify(activos));
    alert('Formulario exitoso');

    setNombreActivo('');
    setUbicacionActivo('');
    setFechaAdquisicion('');
    setValorActivo('');
    setErrors({});
  };

  const hasErrors = () => {
    return Object.keys(errors).length > 0;
  };

  const isFormEmpty = () => {
    return !nombreActivo || !ubicacionActivo || !fechaAdquisicion || !valorActivo;
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="asset-name">Nombre del Activo:</label>
          <input
            type="text"
            className="form-control"
            id="asset-name"
            value={nombreActivo}
            onChange={(e) => setNombreActivo(e.target.value)}
          />
          {errors.nombreActivo && <span className="error">{errors.nombreActivo}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="asset-ubi">Ubicación:</label>
          <input
            type="text"
            className="form-control"
            id="asset-ubi"
            value={ubicacionActivo}
            onChange={(e) => setUbicacionActivo(e.target.value)}
          />
          {errors.ubicacionActivo && <span className="error">{errors.ubicacionActivo}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="asset-date">Fecha de Adquisición:</label>
          <input
            type="date"
            className="form-control"
            id="asset-date"
            value={fechaAdquisicion}
            onChange={(e) => setFechaAdquisicion(e.target.value)}
          />
          {errors.fechaAdquisicion && <span className="error">{errors.fechaAdquisicion}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="asset-value">Valor:</label>
          <input
            type="number"
            className="form-control"
            id="asset-value"
            value={valorActivo}
            onChange={(e) => setValorActivo(e.target.value)}
            min="0" // Restringir el campo a números no negativos
          />
          {errors.valorActivo && <span className="error">{errors.valorActivo}</span>}
        </div>
        <button
          type="submit"
          className="btn btn-primary mt-4"
          disabled={hasErrors() || isFormEmpty()}
        >
          Agregar Activo
        </button>
      </form>
    </div>
  );
};

export default Registro;
