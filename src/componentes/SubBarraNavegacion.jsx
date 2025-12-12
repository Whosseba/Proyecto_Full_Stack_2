import React from 'react';
import { Link } from 'react-router-dom';
import './SubBarraNavegacion.css';

const SubBarraNavegacion = () => {
  const categorias = [
    { nombre: 'Laptops', path: '/productos/laptops' },
    { nombre: 'Mouses', path: '/productos/mouses' },
    { nombre: 'Teclados', path: '/productos/teclados' },
    { nombre: 'Monitores', path: '/productos/monitores' },
    { nombre: 'Gabinetes', path: '/productos/gabinetes' },
    { nombre: 'Audifonos', path: '/productos/audifonos' },
  ];

  return (
    <nav className="sub-barra-navegacion">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <ul className="sub-nav-list">
          {categorias.map((categoria) => (
            <li key={categoria.path} className="sub-nav-item">
              <Link to={categoria.path} className="sub-nav-link">{categoria.nombre}</Link>
            </li>
          ))}
        </ul>
        <div className="d-flex align-items-center">
            <Link to="/sobre-nosotros" className="sub-nav-link me-4">Sobre Nosotros</Link>
        </div>
      </div>
    </nav>
  );
};

export default SubBarraNavegacion;