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
  ];

  return (
    <nav className="sub-barra-navegacion">
      <div className="container-fluid">
        <ul className="sub-nav-list">
          {categorias.map((categoria) => (
            <li key={categoria.path} className="sub-nav-item">
              <Link to={categoria.path} className="sub-nav-link">{categoria.nombre}</Link>
            </li>
          ))}
          <li className="sub-nav-item">
            <Link to="/sobre-nosotros" className="sub-nav-link">Sobre Nosotros</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default SubBarraNavegacion;
