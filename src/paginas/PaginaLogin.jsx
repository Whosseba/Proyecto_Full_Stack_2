import { useState } from "react";
import { useAuth } from "../contextos/ContextoAuth";
import { useNavigate } from "react-router-dom";

const PaginaLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [mensajeError, setMensajeError] = useState("");

  const usuariosRegistrados = [
    { nombre: "admin" },
    { nombre: "seba" },
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    const encontrado = usuariosRegistrados.find(u => u.nombre === nombre);

    if (encontrado) {
      login(encontrado);
      navigate("/"); 
    } else {
      setMensajeError("No existe ese usuario, vaya a registrarse");
    }
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#0b0c10",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundImage: "radial-gradient(circle at top left, #1f2833, #0b0c10)"
  };

  const cardStyle = {
    backdropFilter: "blur(12px)",
    background: "rgba(0, 0, 0, 0.7)",
    padding: "35px 45px",
    borderRadius: "15px",
    boxShadow: "0 0 25px #00ffff, 0 0 50px #0ff",
    width: "360px",
    color: "#00ffff",
    textAlign: "center",
    border: "1px solid #00ffff"
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    margin: "12px 0",
    borderRadius: "8px",
    border: "1px solid #00ffff",
    backgroundColor: "#1b1b1b",
    color: "#00ffff",
    outline: "none",
    fontSize: "16px",
    transition: "all 0.3s",
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#0ff",
    color: "#000",
    fontWeight: "bold",
    fontSize: "16px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 0 10px #0ff, 0 0 20px #00ffff"
  };

  const errorStyle = {
    color: "#ff3860",
    marginBottom: "10px",
    fontWeight: "bold",
    textShadow: "0 0 5px #ff3860"
  };

  const footerStyle = {
    marginTop: "15px",
    fontSize: "14px",
    color: "#ccc"
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={{ marginBottom: "25px", textShadow: "0 0 10px #00ffff" }}>Iniciar Sesión</h2>
        {mensajeError && <p style={errorStyle}>{mensajeError}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Nombre de usuario"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            style={inputStyle}
            onFocus={(e) => e.currentTarget.style.boxShadow = "0 0 10px #0ff, 0 0 20px #00ffff"}
            onBlur={(e) => e.currentTarget.style.boxShadow = "none"}
          />
          <button
            type="submit"
            style={buttonStyle}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#00ffff"}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#0ff"}
          >
            Entrar
          </button>
        </form>
        <p style={footerStyle}>
          ¿No tienes cuenta? <a href="/registro" style={{ color: "#00ffff", textDecoration: "underline" }}>Regístrate</a>
        </p>
      </div>
    </div>
  );
};

export default PaginaLogin;
