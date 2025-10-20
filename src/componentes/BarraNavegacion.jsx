import { Link } from "react-router-dom";
import { useAuth } from "../contextos/ContextoAuth";
import { useCarrito } from "../contextos/ContextoCarrito"; 
import { FaShoppingCart, FaSearch } from "react-icons/fa";

const BarraNavegacion = ({ onBuscar }) => {
  const { usuario, logout } = useAuth();
  const { carrito } = useCarrito(); 
  const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  const manejarCambio = (e) => {
    if(onBuscar) onBuscar(e.target.value);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top barra-navegacion">
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

          <form className="d-flex me-3" role="search" onSubmit={e => e.preventDefault()}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Buscar..."
              aria-label="Buscar"
              onChange={manejarCambio}
            />
            <button className="btn btn-outline-light" type="button">
              <FaSearch />
            </button>
          </form>

          <div className="d-flex align-items-center">
            <Link to="/carrito" className="btn btn-outline-light position-relative me-3">
              <FaShoppingCart />
              {cantidadTotal > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cantidadTotal}
                </span>
              )}
            </Link>

            {usuario ? (
              <>
                <span className="navbar-text text-white me-2">{usuario.nombre}</span>
                <button className="btn btn-outline-light" onClick={logout}>Cerrar sesión</button>
              </>
            ) : (
              <>
                <Link className="btn btn-outline-light me-2" to="/login">Login</Link>
                <Link className="btn btn-outline-light" to="/registro">Registro</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default BarraNavegacion;
