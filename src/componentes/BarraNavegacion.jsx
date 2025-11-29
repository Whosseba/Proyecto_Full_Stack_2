import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contextos/ContextoAuth';
import { useCarrito } from '../contextos/ContextoCarrito';
import { FaShoppingCart, FaUserCircle } from 'react-icons/fa';

const BarraNavegacion = () => {
  const { usuario, logout } = useAuth();
  const { carrito } = useCarrito();
  const totalArticulos = carrito.reduce((total, item) => total + item.cantidad, 0);

  return (
    <nav className="barra-navegacion navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">TechStore</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Categorías
              </Link>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><Link className="dropdown-item" to="/productos/laptops">Laptops</Link></li>
                <li><Link className="dropdown-item" to="/productos/mouses">Mouses</Link></li>
                <li><Link className="dropdown-item" to="/productos/teclados">Teclados</Link></li>
                <li><Link className="dropdown-item" to="/productos/monitores">Monitores</Link></li>
                <li><Link className="dropdown-item" to="/productos/gabinetes">Gabinetes</Link></li>
              </ul>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/sobre-nosotros">Sobre Nosotros</Link>
            </li>
          </ul>
          <ul className="navbar-nav">
            {usuario && usuario.rol === 'ADMIN' && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin">Administración</Link>
              </li>
            )}
            {usuario ? (
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarUserDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <FaUserCircle /> {usuario.nombre}
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
  );
};

export default BarraNavegacion;