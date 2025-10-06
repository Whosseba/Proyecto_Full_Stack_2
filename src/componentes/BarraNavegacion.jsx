import { Link } from "react-router-dom";
import { useAuth } from "../contextos/ContextoAuth";

const BarraNavegacion = () => {
  const { usuario, logout } = useAuth();

  return (
    <nav className="barra-navegacion">
      <Link to="/">TechStore</Link>
      <Link to="/laptops">Laptops</Link>
      <Link to="/mouses">Mouses</Link>

      <div className="ms-auto">
        {usuario ? (
          <>
            <span className="text-white me-2">{usuario.nombre}</span>
            <button onClick={logout}>Cerrar sesión</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/registro">Registro</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default BarraNavegacion;
