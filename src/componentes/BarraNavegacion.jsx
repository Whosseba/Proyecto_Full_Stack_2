import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contextos/ContextoAuth';
import { useCarrito } from '../contextos/ContextoCarrito';
import { 
  FaShoppingCart, 
  FaUserCircle, 
  FaLaptop, 
  FaMouse, 
  FaKeyboard, 
  FaTv, 
  FaCube 
} from 'react-icons/fa';

const BarraNavegacion = () => {
  const { usuario, logout } = useAuth();
  const { carrito } = useCarrito();
  const totalArticulos = carrito.reduce((total, item) => total + item.cantidad, 0);

  return (
    <nav 
      className="navbar navbar-expand-lg fixed-top shadow-lg"
      style={{
        backdropFilter: "blur(12px)",
        background: "rgba(0, 0, 0, 0.65)",
        borderBottom: "2px solid rgba(0, 123, 255, 0.4)"
      }}
    >
      <div className="container-fluid">

        {/* LOGO */}
        <Link 
          className="navbar-brand fw-bold fs-3 d-flex align-items-center"
          to="/"
          style={{
            color: "#0d6efd",
            textShadow: "0px 0px 12px rgba(13,110,253,0.8)"
          }}
        >
          ⚡ TechStore
        </Link>

        {/* BOTÓN RESPONSIVE */}
        <button 
          className="navbar-toggler bg-primary"
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* CONTENIDO */}
        <div className="collapse navbar-collapse" id="navbarNav">

          {/* CATEGORÍAS */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            {[
              { ruta: "laptops", icono: <FaLaptop />, texto: "Laptops" },
              { ruta: "mouses", icono: <FaMouse />, texto: "Mouses" },
              { ruta: "teclados", icono: <FaKeyboard />, texto: "Teclados" },
              { ruta: "monitores", icono: <FaTv />, texto: "Monitores" },
              { ruta: "gabinetes", icono: <FaCube />, texto: "Gabinetes" }
            ].map((item, i) => (
              <li className="nav-item" key={i}>
                <Link 
                  className="nav-link fw-semibold d-flex align-items-center"
                  to={`/productos/${item.ruta}`}
                  style={{
                    color: "#dcdcdc",
                    transition: "0.3s"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = "#0d6efd";
                    e.target.style.textShadow = "0px 0px 8px rgba(13,110,253,0.8)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = "#dcdcdc";
                    e.target.style.textShadow = "none";
                  }}
                >
                  <span className="me-2 text-primary">{item.icono}</span> 
                  {item.texto}
                </Link>
              </li>
            ))}

            {/* SOBRE NOSOTROS DESTACADO */}
            <li className="nav-item">
              <Link 
                className="nav-link fw-bold px-3 py-1 rounded-pill"
                to="/sobre-nosotros"
                style={{
                  background: "rgba(13,110,253,0.15)",
                  border: "1px solid #0d6efd",
                  color: "#0d6efd",
                  transition: "0.3s",
                  boxShadow: "0px 0px 10px rgba(13,110,253,0.4)"
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "#0d6efd";
                  e.target.style.color = "#fff";
                  e.target.style.boxShadow = "0px 0px 15px rgba(13,110,253,0.9)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "rgba(13,110,253,0.15)";
                  e.target.style.color = "#0d6efd";
                  e.target.style.boxShadow = "0px 0px 10px rgba(13,110,253,0.4)";
                }}
              >
                Sobre Nosotros
              </Link>
            </li>

          </ul>

          {/* DERECHA */}
          <ul className="navbar-nav">

            {/* ADMIN */}
            {usuario && usuario.rol === 'ADMIN' && (
              <li className="nav-item">
                <Link 
                  className="nav-link fw-bold"
                  to="/admin"
                  style={{
                    color: "#ffc107",
                    textShadow: "0px 0px 8px rgba(255,193,7,0.8)"
                  }}
                >
                  ⚙ Admin
                </Link>
              </li>
            )}

            {/* USUARIO */}
            {usuario ? (
              <li className="nav-item dropdown">
                <a 
                  className="nav-link dropdown-toggle d-flex align-items-center fw-semibold"
                  href="#" 
                  id="navbarUserDropdown" 
                  role="button" 
                  data-bs-toggle="dropdown"
                  style={{ color: "#dcdcdc" }}
                >
                  <FaUserCircle className="me-1 fs-5 text-primary" /> {usuario.nombre}
                </a>

                <ul className="dropdown-menu dropdown-menu-end shadow border-0 rounded">
                  <li>
                    <button 
                      className="dropdown-item text-danger fw-semibold"
                      onClick={logout}
                    >
                      Cerrar Sesión
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              <li className="nav-item">
                <Link 
                  className="nav-link fw-semibold"
                  to="/login"
                  style={{ color: "#dcdcdc" }}
                >
                  Iniciar Sesión
                </Link>
              </li>
            )}

            {/* CARRITO */}
            <li className="nav-item">
              <Link 
                className="nav-link position-relative fs-5"
                to="/carrito"
                style={{ color: "#dcdcdc" }}
              >
                <FaShoppingCart className="text-primary" />

                {totalArticulos > 0 && (
                  <span 
                    className="badge bg-danger position-absolute top-0 start-100 translate-middle rounded-pill"
                  >
                    {totalArticulos}
                  </span>
                )}
              </Link>
            </li>

          </ul>

        </div>
      </div>
    </nav>
  );
};

export default BarraNavegacion;