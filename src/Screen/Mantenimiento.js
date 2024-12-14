import React, { useState, useEffect } from 'react';

const Mantenimiento = () => {
  const [taskName, setTaskName] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [taskType, setTaskType] = useState('');
  const [tasks, setTasks] = useState([]);
  const [errors, setErrors] = useState({});
  const [sortOrder, setSortOrder] = useState('asc'); // Estado para manejar el orden de la lista

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  const validate = () => {
    const newErrors = {};
    const taskNamePattern = /^[A-Za-z\s]+$/;

    if (!taskName) newErrors.taskName = 'El nombre de la tarea es obligatorio';
    else if (!taskNamePattern.test(taskName)) newErrors.taskName = 'El nombre de la tarea solo puede contener letras';

    if (!taskDate) newErrors.taskDate = 'La fecha de la tarea es obligatoria';
    if (!taskType) newErrors.taskType = 'El tipo de tarea es obligatorio';
    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const task = { nombre: taskName, fecha: taskDate, tipo: taskType };
    const newTasks = [...tasks, task];
    setTasks(newTasks);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
    alert('Formulario de tarea exitoso');
    setTaskName('');
    setTaskDate('');
    setTaskType('');
    setErrors({});
  };

  const handleSortOrderChange = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    if (sortOrder === 'asc') {
      return new Date(a.fecha) - new Date(b.fecha);
    }
    return new Date(b.fecha) - new Date(a.fecha);
  });

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit} id="task-form">
        <div className="form-group">
          <label htmlFor="task-name">Nombre de la Tarea:</label>
          <input
            type="text"
            className="form-control"
            id="task-name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          {errors.taskName && <span className="error">{errors.taskName}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="task-date">Fecha:</label>
          <input
            type="date"
            className="form-control"
            id="task-date"
            value={taskDate}
            onChange={(e) => setTaskDate(e.target.value)}
          />
          {errors.taskDate && <span className="error">{errors.taskDate}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="task-type">Tipo de Tarea:</label>
          <select
            className="form-control"
            id="task-type"
            value={taskType}
            onChange={(e) => setTaskType(e.target.value)}
          >
            <option value="">Selecciona el tipo de tarea</option>
            <option value="preventivo">Preventivo</option>
            <option value="corrección">Corrección</option>
            <option value="daño">Daño</option>
          </select>
          {errors.taskType && <span className="error">{errors.taskType}</span>}
        </div>
        <button type="submit" className="btn btn-primary mt-4">
          Agregar Tarea
        </button>
      </form>

      <div className="container mt-4">
        <h2>Lista de Tareas</h2>
        <button className="btn btn-secondary mb-3" onClick={handleSortOrderChange}>
          Ordenar por Fecha: {sortOrder === 'asc' ? 'Ascendente' : 'Descendente'}
        </button>
        <ul className="list-group">
          {sortedTasks.map((task, index) => (
            <li key={index} className="list-group-item">
              <h5>{task.nombre}</h5>
              <p>Fecha: {task.fecha}</p>
              <p>Tipo: {task.tipo}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Mantenimiento;
