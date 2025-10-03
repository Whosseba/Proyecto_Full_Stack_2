import { useState } from "react";
import { useAuth } from "../contextos/ContextoAuth";
import { useNavigate } from "react-router-dom";

const PaginaLogin = () => {
  const { login, usuario } = useAuth();
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [mensajeError, setMensajeError] = useState("");

  // Simulamos una "base de datos" de usuarios registrados
  const usuariosRegistrados = [
    { nombre: "admin" },
    { nombre: "seba" },
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    const encontrado = usuariosRegistrados.find(u => u.nombre === nombre);

    if (encontrado) {
      login(encontrado);
      navigate("/"); // Redirige a la página principal
    } else {
      setMensajeError("No existe ese usuario, vaya a registrarse");
    }
  };

  return (
    <div className="container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Nombre de usuario"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <button type="submit">Iniciar Sesión</button>
      </form>
      {mensajeError && <p style={{ color: "red" }}>{mensajeError}</p>}
    </div>
  );
};

export default PaginaLogin;
