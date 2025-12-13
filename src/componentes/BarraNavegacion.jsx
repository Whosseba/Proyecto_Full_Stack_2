import React, { useState } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contextos/ContextoAuth';
import { useCarrito } from '../contextos/ContextoCarrito';
import { FaShoppingCart, FaUserCircle, FaSearch } from 'react-icons/fa';

import logo from '../imagenes/logos_empresa/logo_techstore_oficial.png';
import './BarraNavegacion.css';

const BarraNavegacion = () => {
  const { usuario, logout } = useAuth();
  const { carrito = [] } = useCarrito() || {};
  const totalArticulos = carrito.reduce((total, item) => total + (item.cantidad || 0), 0);
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/productos?search=${encodeURIComponent(query)}`);
    }
  };

  const categorias = [
    { nombre: 'Laptops', path: '/productos/laptops' },
    { nombre: 'Mouses', path: '/productos/mouses' },
    { nombre: 'Teclados', path: '/productos/teclados' },
    { nombre: 'Monitores', path: '/productos/monitores' },
    { nombre: 'Gabinetes', path: '/productos/gabinetes' },
    { nombre: 'Audifonos', path: '/productos/audifonos' },
  ];

  return (
    <div className="fixed-top">
      <nav className="barra-navegacion navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            <img src={logo} alt="TechStore Logo" />
          </NavLink>

          <div className="flex-grow-1 px-lg-5">
            <form className="d-flex" onSubmit={handleSearch}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Buscar productos, marcas y más..."
                aria-label="Buscar"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button className="btn btn-outline-purple" type="submit">
                <FaSearch />
              </button>
            </form>
          </div>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav" style={{ flexGrow: 0 }}>
            <ul className="navbar-nav ms-auto align-items-center">
              {usuario && usuario.rol === 'ADMIN' && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/admin">Administración</NavLink>
                </li>
              )}
              {usuario ? (
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle d-flex align-items-center" href="#" id="navbarUserDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <FaUserCircle className="me-2" size="1.2em" /> {usuario.nombre}
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarUserDropdown">
                    <li><button className="dropdown-item" onClick={logout}>Cerrar Sesión</button></li>
                  </ul>
                </li>
              ) : (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">Iniciar Sesión</NavLink>
                </li>
              )}
              <li className="nav-item">
                <NavLink className="nav-link" to="/carrito">
                  <FaShoppingCart size="1.2em" />
                  {totalArticulos > 0 && <span className="badge rounded-pill ms-1">{totalArticulos}</span>}
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
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
      <div className="promo-banner">
        ¡Retira GRATIS tus compras en nuestra tienda! Además, aprovecha miles de productos con Despacho Gratis <a href="#">AQUÍ</a>
      </div>
    </div>
  );

}
export default BarraNavegacion;

