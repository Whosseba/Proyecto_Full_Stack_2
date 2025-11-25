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
  const [errorRut, setErrorRut] = useState("");

  const validarRut = (rutCompleto) => {
    rutCompleto = rutCompleto.replace(/\./g, "").replace(/-/g, "").toUpperCase();
    if (!/^[0-9]+[0-9K]$/.test(rutCompleto)) return false;
    const cuerpo = rutCompleto.slice(0, -1);
    const dv = rutCompleto.slice(-1);
    let suma = 0;
    let multiplo = 2;
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
    setErrorRut("");
    const nuevoUsuario = { rut, nombreCompleto, email, contrasena, ubicacion };
    login(nuevoUsuario);
    navigate("/");
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const cardStyle = {
    backdropFilter: "blur(10px)",
    background: "rgba(0, 0, 0, 0.6)",
    padding: "30px 40px",
    borderRadius: "15px",
    boxShadow: "0 0 20px rgba(0, 123, 255, 0.7)",
    width: "400px",
    color: "#fff",
    textAlign: "center",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "1px solid #0ff",
    outline: "none",
    background: "rgba(255,255,255,0.05)",
    color: "#fff",
    fontSize: "16px",
    transition: "0.3s",
  };

  const inputFocusStyle = {
    borderColor: "#0ff",
    boxShadow: "0 0 10px #0ff",
    background: "rgba(0,255,255,0.1)",
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#00f",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "16px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    marginTop: "10px",
  };

  const buttonHoverStyle = {
    backgroundColor: "#0ff",
    color: "#000",
    boxShadow: "0 0 15px #0ff",
  };

  const errorStyle = {
    color: "#ff4d4d",
    marginBottom: "10px",
  };

  const footerStyle = {
    marginTop: "15px",
    fontSize: "14px",
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={{ marginBottom: "20px" }}>Registro de Usuario</h2>
        {errorRut && <p style={errorStyle}>{errorRut}</p>}
        <form onSubmit={handleRegistro}>
          <input
            type="text"
            placeholder="RUT (12345678-9)"
            value={rut}
            onChange={(e) => setRut(e.target.value)}
            required
            style={inputStyle}
            onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
            onBlur={(e) => Object.assign(e.target.style, inputStyle)}
          />
          <input
            type="text"
            placeholder="Nombre completo"
            value={nombreCompleto}
            onChange={(e) => setNombreCompleto(e.target.value)}
            required
            style={inputStyle}
            onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
            onBlur={(e) => Object.assign(e.target.style, inputStyle)}
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
            onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
            onBlur={(e) => Object.assign(e.target.style, inputStyle)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
            style={inputStyle}
            onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
            onBlur={(e) => Object.assign(e.target.style, inputStyle)}
          />
          <input
            type="text"
            placeholder="Ubicación"
            value={ubicacion}
            onChange={(e) => setUbicacion(e.target.value)}
            required
            style={inputStyle}
            onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
            onBlur={(e) => Object.assign(e.target.style, inputStyle)}
          />
          <button
            type="submit"
            style={buttonStyle}
            onMouseOver={(e) => Object.assign(e.currentTarget.style, buttonHoverStyle)}
            onMouseOut={(e) => Object.assign(e.currentTarget.style, buttonStyle)}
          >
            Registrarse
          </button>
        </form>
        <p style={footerStyle}>
          ¿Ya tienes cuenta? <a href="/login" style={{ color: "#0ff", textDecoration: "underline" }}>Iniciar sesión</a>
        </p>
      </div>
    </div>
  );
};

export default PaginaRegistro;
