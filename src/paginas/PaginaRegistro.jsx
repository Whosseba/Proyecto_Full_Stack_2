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
  const [errorRut, setErrorRut] = useState(""); // nuevo estado para errores

  // --- Función de validación del RUT ---
  const validarRut = (rutCompleto) => {
    rutCompleto = rutCompleto.replace(/\./g, "").replace(/-/g, "").toUpperCase();

    if (!/^[0-9]+[0-9K]$/.test(rutCompleto)) return false;

    const cuerpo = rutCompleto.slice(0, -1);
    const dv = rutCompleto.slice(-1);

    let suma = 0;
    let multiplo = 2;

    // cálculo del dígito verificador
    for (let i = 1; i <= cuerpo.length; i++) {
      const index = multiplo * rutCompleto.charAt(cuerpo.length - i);
      suma += index;
      multiplo = multiplo < 7 ? multiplo + 1 : 2;
    }

    const dvEsperado = 11 - (suma % 11);
    let dvCalculado =
      dvEsperado === 11 ? "0" : dvEsperado === 10 ? "K" : dvEsperado.toString();

    return dvCalculado === dv;
  };

  const handleRegistro = (e) => {
    e.preventDefault();

    if (!validarRut(rut)) {
      setErrorRut("El RUT ingresado no es válido");
      return;
    }

    setErrorRut(""); // limpiar si está correcto

    const nuevoUsuario = {
      rut,
      nombreCompleto,
      email,
      contrasena,
      ubicacion,
    };

    login(nuevoUsuario);
    navigate("/");
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="mb-4 text-center">Registro de Usuario</h2>
      <form onSubmit={handleRegistro} className="d-flex flex-column gap-3">
        <div>
          <input
            type="text"
            placeholder="RUT (sin puntos, con guión: 12345678-9)"
            value={rut}
            onChange={(e) => setRut(e.target.value)}
            required
            className="form-control"
          />
          {errorRut && (
            <small className="text-danger">{errorRut}</small>
          )}
        </div>

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
