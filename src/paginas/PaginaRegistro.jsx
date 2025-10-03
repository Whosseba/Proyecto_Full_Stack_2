import { useState } from "react";
import { useAuth } from "../contextos/ContextoAuth";
import { useNavigate } from "react-router-dom";

const PaginaRegistro = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");

  const handleRegistro = (e) => {
    e.preventDefault();
    // Registramos usuario en nuestra "base de datos"
    const nuevoUsuario = { nombre };
    login(nuevoUsuario); // Iniciamos sesión directamente
    navigate("/"); // Redirige a la página principal
  };

  return (
    <div className="container">
      <h2>Registro</h2>
      <form onSubmit={handleRegistro}>
        <input
          type="text"
          placeholder="Nombre de usuario"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default PaginaRegistro;
