import React, { createContext, useContext, useState } from 'react';

// Crea el contexto de los activos
const AssetsContext = createContext();

export const AssetsProvider = ({ children }) => {
  // Estado para almacenar los activos
  const [assets, setAssets] = useState([]);

  // Función para agregar un activo al estado
  const addAsset = (asset) => {
    setAssets((prevAssets) => [...prevAssets, asset]);
  };

  return (
    <AssetsContext.Provider value={{ assets, addAsset }}>
      {children}
    </AssetsContext.Provider>
  );
};

// Hook personalizado para usar el contexto de los activos
export const useAssets = () => {
  return useContext(AssetsContext);
};
