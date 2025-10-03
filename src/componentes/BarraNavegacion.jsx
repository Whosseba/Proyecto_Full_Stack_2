import { Link } from "react-router-dom";
import { useAuth } from "../contextos/ContextoAuth";

const BarraNavegacion = () => {
  const { usuario, logout } = useAuth();

  return (
    <nav className="barra-navegacion">
      <div className="botones">
        {usuario ? (
          <>
            <span className="usuario">Hola, {usuario.nombre}</span>
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
