import { useState } from "react";
import { useAuth } from "../contextos/ContextoAuth";
import { useNavigate } from "react-router-dom";

const PaginaRegistro = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [rut, setRut] = useState("");
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [ubicacion, setUbicacion] = useState("");

  const handleRegistro = (e) => {
    e.preventDefault();

    const nuevoUsuario = {
      rut,
      nombreCompleto,
      email,
      contrasena,
      ubicacion
    };

    login(nuevoUsuario); 
    navigate("/"); 
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="mb-4 text-center">Registro de Usuario</h2>
      <form onSubmit={handleRegistro} className="d-flex flex-column gap-3">
        <input
          type="text"
          placeholder="RUT"
          value={rut}
          onChange={(e) => setRut(e.target.value)}
          required
          className="form-control"
        />
        <input
          type="text"
          placeholder="Nombre completo"
          value={nombreCompleto}
          onChange={(e) => setNombreCompleto(e.target.value)}
          required
          className="form-control"
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="form-control"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          required
          className="form-control"
        />
        <input
          type="text"
          placeholder="Ubicación"
          value={ubicacion}
          onChange={(e) => setUbicacion(e.target.value)}
          required
          className="form-control"
        />
        <button type="submit" className="btn btn-primary mt-2">
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default PaginaRegistro;
