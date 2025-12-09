import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contextos/ContextoAuth';
import { useCarrito } from '../contextos/ContextoCarrito';
import { FaShoppingCart, FaUserCircle, FaSearch } from 'react-icons/fa';

import logo from '../imagenes/logos_empresa/logo_techstore.png';

const BarraNavegacion = () => {
  const { usuario, logout } = useAuth();
  const { carrito } = useCarrito();
  const totalArticulos = carrito.reduce((total, item) => total + item.cantidad, 0);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      // Por ahora, navegaremos a una página de resultados de búsqueda que necesitará ser creada.
      navigate(`/productos?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <>
      <nav className="barra-navegacion navbar navbar-expand-lg navbar-dark fixed-top" style={{ padding: '10px 0', backgroundColor: 'var(--color-fondo)' }}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="TechStore Logo" style={{ height: '50px' }} />
          </Link>
          
          {/* Search Bar en el centro */}
          <div className="flex-grow-1 px-3">
            <form className="d-flex" onSubmit={handleSearch}>
              <input
                className="form-control form-control-lg me-2"
                type="search"
                placeholder="Buscar productos, marcas y más..."
                aria-label="Buscar"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button className="btn btn-lg btn-outline-light" type="submit">
                <FaSearch />
              </button>
            </form>
          </div>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav" style={{ flexGrow: 0 }}>
            {/* Íconos y links de la derecha */}
            <ul className="navbar-nav ms-auto">
              {usuario && usuario.rol === 'ADMIN' && (
                <li className="nav-item">
                  <Link className="nav-link" to="/admin">Administración</Link>
                </li>
              )}
              {usuario ? (
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="navbarUserDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <FaUserCircle className="me-1" /> {usuario.nombre}
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarUserDropdown">
                    <li><button className="dropdown-item" onClick={logout}>Cerrar Sesión</button></li>
                  </ul>
                </li>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Iniciar Sesión</Link>
                </li>
              )}
              <li className="nav-item">
                <Link className="nav-link" to="/carrito">
                  <FaShoppingCart />
                  {totalArticulos > 0 && <span className="badge bg-danger ms-1">{totalArticulos}</span>}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div style={{ 
        padding: '10px', 
        backgroundColor: 'var(--color-primario)', 
        color: 'var(--color-texto)', 
        textAlign: 'center',
        fontWeight: 'bold'
      }}>
        ¡Retira GRATIS tus compras en nuestra tienda! Además, aprovecha miles de productos con Despacho Gratis <a href="#" style={{ color: 'var(--color-texto)', textDecoration: 'underline' }}>AQUÍ</a>
      </div>
    </>
  );
};

export default BarraNavegacion;
