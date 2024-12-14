import React, { useEffect, useState } from 'react';

const Tablero = () => {
  const [activos, setActivos] = useState([]);

  useEffect(() => {
    const storedActivos = JSON.parse(localStorage.getItem('activos')) || [];
    setActivos(storedActivos);
  }, []);

  const borrarActivos = () => {
    localStorage.removeItem('activos');
    setActivos([]);
    alert('Todos los activos han sido borrados!');
  };

  return (
    <div className="container mt-4">
      <table className="table" id="tablaActivos">
        <thead>
          <tr>
            <th scope="col">Nombre de activo</th>
            <th scope="col">Ubicación</th>
            <th scope="col">Fecha de adquisición</th>
            <th scope="col">Valor</th>
          </tr>
        </thead>
        <tbody>
          {activos.map((activo, index) => (
            <tr key={index}>
              <td>{activo.nombre}</td>
              <td>{activo.ubicacion}</td>
              <td>{activo.fechaAdquisicion}</td>
              <td>{activo.valor}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button type="button" className="btn btn-primary mt-4" onClick={borrarActivos}>Borrar activos</button>
    </div>
  );
};

export default Tablero;
