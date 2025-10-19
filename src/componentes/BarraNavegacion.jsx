import { Link } from "react-router-dom";
import { useAuth } from "../contextos/ContextoAuth";

const BarraNavegacion = () => {
  const { usuario, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">
        <Link className="navbar-brand" to="/">TechStore</Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNavDropdown" 
          aria-controls="navbarNavDropdown" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <span 
                className="nav-link dropdown-toggle" 
                id="categoriasDropdown" 
                role="button" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
              >
                Categorías
              </span>
              <ul className="dropdown-menu" aria-labelledby="categoriasDropdown">
                <li><Link className="dropdown-item" to="/categoria/laptops">Laptops</Link></li>
                <li><Link className="dropdown-item" to="/categoria/mouses">Mouses</Link></li>
                <li><Link className="dropdown-item" to="/categoria/teclados">Teclados</Link></li>
                <li><Link className="dropdown-item" to="/categoria/monitores">Monitores</Link></li>
                <li><Link className="dropdown-item" to="/categoria/gabinetes">Gabinetes</Link></li>
              </ul>
            </li>
          </ul>

          <div className="d-flex">
            {usuario ? (
              <>
                <span className="navbar-text text-white me-2">{usuario.nombre}</span>
                <button className="btn btn-outline-light" onClick={logout}>Cerrar sesión</button>
              </>
            ) : (
              <>
                <Link className="btn btn-outline-light me-2" to="/login">Login</Link>
                <Link className="btn btn-outline-light me-2" to="/registro">Registro</Link>
                <Link className="btn btn-outline-light" to="/carrito">Carrito</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default BarraNavegacion;
