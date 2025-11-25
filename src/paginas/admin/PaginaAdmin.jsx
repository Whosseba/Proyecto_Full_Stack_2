import React, { useState } from 'react';
import GestionProductos from './GestionProductos';
import GestionUsuarios from './GestionUsuarios';
import './Admin.css';

const PaginaAdmin = () => {
  const [activeTab, setActiveTab] = useState('productos');

  return (
    <div className="container mt-5 admin-panel">
      <h1 className="mb-4">Panel de Administración</h1>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'productos' ? 'active' : ''}`} 
            onClick={() => setActiveTab('productos')}
          >
            Gestión de Productos
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'usuarios' ? 'active' : ''}`} 
            onClick={() => setActiveTab('usuarios')}
          >
            Gestión de Usuarios
          </button>
        </li>
      </ul>
      <div className="tab-content mt-3">
        {activeTab === 'productos' && <GestionProductos />}
        {activeTab === 'usuarios' && <GestionUsuarios />}
      </div>
    </div>
  );
};

export default PaginaAdmin;