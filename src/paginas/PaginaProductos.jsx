import { useState } from "react";
import { useAuth } from "../contextos/ContextoAuth";

const PaginaProductos = () => {
  const { usuario, login } = useAuth();
  const [nombre, setNombre] = useState("");
  const [mensajeError, setMensajeError] = useState("");

  // Usuarios registrados "de ejemplo"
  const usuariosRegistrados = [{ nombre: "admin" }, { nombre: "seba" }];

  const handleLogin = (e) => {
    e.preventDefault();
    const encontrado = usuariosRegistrados.find(u => u.nombre === nombre);
    if (encontrado) {
      login(encontrado);
      setMensajeError("");
    } else {
      setMensajeError("No existe ese usuario, vaya a registrarse");
    }
  };

  const productosDisponibles = [
    { id: 1, nombre: "Laptop Gamer", precio: 1500 },
    { id: 2, nombre: "Mouse RGB", precio: 50 },
  ];

  return (
    <div className="container">
      {!usuario && (
        <div style={{ marginBottom: "2rem" }}>
          <h3>Iniciar Sesión</h3>
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
      )}

      <h2>Productos Disponibles</h2>
      <ul>
        {productosDisponibles.map((p) => (
          <li key={p.id}>
            {p.nombre} - ${p.precio}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PaginaProductos;
